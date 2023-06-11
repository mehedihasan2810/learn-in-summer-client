import { Alert, AlertTitle, Button } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const CheckoutForm = ({ price }) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const queryClient = useQueryClient();
  const {currentUser} = useAuthContext();




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
    console.log(mutation.data);

    // setClientSecret(mutation.data.clientSecret);
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
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }





    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
       clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: currentUser?.display_name || 'unknown',
              email: currentUser?.email || 'anonymous'
            },
          },
        },
      );


      if(confirmError){
        console.log(confirmError)
      }

      console.log(paymentIntent)




  };


  

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          disabled={!stripe || !clientSecret}
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
    </>
  );
};

export default CheckoutForm;
