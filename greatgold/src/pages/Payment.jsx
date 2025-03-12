import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Load Stripe with your public key
const stripePromise = loadStripe("pk_test_51R1v5EDvY66hTenzdgSemisLGjL4NDzCSszlevj7QYa0IGk6nZttUK39zrBjwULwuQjG6lh3ZKlUcI5r2boJVMy300z850Vtug");

// Payment Form Component
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    if (error) {
      console.error(error);
      alert("Payment failed!");
    } else {
      console.log("Payment Successful:", paymentMethod);
      alert("Payment successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Enter Card Details</h2>
      <CardElement className="p-2 border rounded mb-4" />
      <button type="submit" disabled={!stripe} className="bg-blue-500 text-white px-4 py-2 rounded">
        Pay Now
      </button>
    </form>
  );
};

// Main Payment Page Component
const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <CheckoutForm />
      </div>
    </Elements>
  );
};

export default Payment;
