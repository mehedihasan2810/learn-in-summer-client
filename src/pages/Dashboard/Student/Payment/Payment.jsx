import { loadStripe } from "@stripe/stripe-js";
import "./Payment.css";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useEffect } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const params = useParams();
  const [axiosSecure] = useAxiosSecure();
  const { addDashBoardTitle } = useAuthContext();

  

  const {
    isLoading,
    error,
    data: singleClass,
  } = useQuery({
    queryKey: ["myClasses", params?.id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getSingleClass/${params?.id}`);
      return res.data;
    },
  });

  useEffect(() => {
    addDashBoardTitle("Payment");
  }, [])


  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error Ocurred {error.message}</h2>;

  return (
    <div className="payment-container">
      <Elements stripe={stripePromise}>
        <CheckoutForm
          price={singleClass?.price}
          classId={singleClass?._id}
          instructor_email={singleClass?.email}
          class_name={singleClass?.class_name}
          instructor_name={singleClass?.instructor_name}
        />
      </Elements>
    </div>
  );
};

export default Payment;
