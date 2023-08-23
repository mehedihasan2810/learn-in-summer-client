import { loadStripe } from "@stripe/stripe-js";
import "./Payment.css";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";

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
  }, []);

  if (isLoading)
    return (
      <div
        style={{
          maxInlineSize: "500px",
          marginBlock: "80px",
          marginInline: "auto",
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            style={{ blockSize: "40px", marginBlockStart: "1rem" }}
          />
        ))}
      </div>
    );
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
