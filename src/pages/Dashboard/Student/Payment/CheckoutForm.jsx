import { Alert, AlertTitle, Button } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const CheckoutForm = ({ price, classId, instructor_email }) => {
  console.log(price);
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const queryClient = useQueryClient();
  const { currentUser } = useAuthContext();

  const { mutate } = useMutation({
    mutationFn: async (paymentInfo) => {
      const res = await axiosSecure.post(`/payments`, paymentInfo);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mySelectedClasses"],
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

  console.log(mutation.data?.data?.clientSecret);

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
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      //   console.log("[PaymentMethod]", paymentMethod);
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
      console.log(confirmError);
      setCardError(confirmError?.message);
    } else {
      setProcessing(false);
      console.log(paymentIntent);
      setCardError("");
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      //   saving payment information to the server
      const paymentInfo = {
        student_email: currentUser?.email,
        instructor_email: instructor_email,
        transactionId: paymentIntent.id,
        price,
        classId,
        status: "service pending",
        date: Date.now(),
      };

      mutate(paymentInfo);

      //   axiosSecure.post("/payments", paymentInfo).then((res) => {
      //     console.log(res.data);
      //     if (res.data.insertedId) {
      //       // succesfully saved payment info
      //     }
      //   });
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
