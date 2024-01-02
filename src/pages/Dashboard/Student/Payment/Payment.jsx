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

// Load the Stripe public key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  // Get route parameters
  const params = useParams();
  const [axiosSecure] = useAxiosSecure();
  const { addDashBoardTitle } = useAuthContext();

  // Fetch data for the selected class using React Query
  const {
    isLoading,
    error,
    data: singleClass,
  } = useQuery({
    queryKey: ["myClasses", params?.id],
    queryFn: async () => {
      // Fetch data for a single class using Axios
      const res = await axiosSecure.get(`/getSingleClass/${params?.id}`);
      return res.data;
    },
  });

  // Set dashboard title on component mount
  useEffect(() => {
    addDashBoardTitle("Payment");
  }, []);

  // Loading state: Display skeleton while data is being fetched
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

  // Error state: Display error message if there's an issue with fetching data
  if (error) return <h2>Error Ocurred {error.message}</h2>;

  return (
    <div className="payment-container">
      {/* Stripe Elements wrapper for the CheckoutForm */}
      <Elements stripe={stripePromise}>
        {/* Pass relevant data to the CheckoutForm */}
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
