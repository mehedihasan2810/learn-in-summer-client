import { Alert, AlertTitle, Button } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({
  price,
  classId,
  instructor_email,
  class_name,
  instructor_name,
}) => {
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const queryClient = useQueryClient();
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async (paymentInfo) => {
      const res = await axiosSecure.post(`/payments`, paymentInfo);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mySelectedClasses", "payment"],
      });
    },
  });

  const mutation = useMutation({
    mutationFn: async (price) => {
      const res = await axiosSecure.post(`/create-payment-intent`, { price });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mySelectedClasses"],
      });
    },
  });

  useEffect(() => {
    mutation.mutate(price);
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(mutation.data?.data?.clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: currentUser?.display_name || "unknown",
            email: currentUser?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError?.message);
    } else {
      setProcessing(false);
      setCardError("");
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      //   saving payment information to the server
      const paymentInfo = {
        class_name,
        instructor_name,
        instructor_email,
        student_name: currentUser?.displayName,
        student_email: currentUser?.email,
        transactionId: paymentIntent.id,
        price,
        classId,
        status: "service pending",
        date: Date.now(),
      };

      mutate(paymentInfo);
      navigate('/dashboard/payment-details')
    }
  };

  return (
    <>
      <form className="payment-form" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={!stripe || !mutation.data?.data?.clientSecret || processing}
        >
          Pay
        </Button>
      </form>
      {cardError && (
        <Alert severity="error">
          <AlertTitle>Error!</AlertTitle>
          {cardError} - <strong>Try Again!</strong>
        </Alert>
      )}
      {transactionId && <p>your transactionId {transactionId}</p>}
    </>
  );
};

export default CheckoutForm;
