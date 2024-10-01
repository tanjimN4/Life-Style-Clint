import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";


const ChexkoutForm = ({ discount, filter }) => {
    const [money, setMoney] = useState(0)

    const { user } = useContext(AuthContext)
    const axiospublic = useAxiosPublic()
    const stripe = useStripe()
    const elements = useElements()
    const [clientSecret, setClientSecret] = useState()
    const [isPaymentComplete, setIsPaymentComplete] = useState(false)
    const [isProcessing, setProcessing] = useState(false)
    const queryClient = useQueryClient()






    useEffect(() => {
        if (discount) {
            setMoney(Math.floor(discount)); // Set money only when discount is non-zero
        }
    }, [discount])

    useEffect(() => {
        if (money > 0) {
            axiospublic.post('/create-payment-intent', { price: money })
                .then(res => {
                    const { clientSecret } = res.data;
                    setClientSecret(clientSecret);
                })
                .catch(err => {
                    console.error("Error creating payment intent:", err);
                });
        }
    }, [money, axiospublic])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            // console.error("Stripe, Elements, or ClientSecret is missing.");
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            // console.error("Card Element not found.");
            return;
        }
        setProcessing(true)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous',
            },
        });

        if (error) {
            // console.error("Payment method creation error:", error);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            console.error("Payment confirmation error:", confirmError);
            setProcessing(false)
        }

        if (paymentIntent && paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded!', paymentIntent);
            const filteredData = filter.map(item => {
                const { _id, ...dataWithoutId } = item; // Remove _id
                return dataWithoutId; // Wrap each object in a "data" key
            });
            axiospublic.post('/add/chart/payment', filteredData)
                .then(res => {
                    console.log('Payment saved to DB:', res.data);
                })
                .catch(err => {
                    console.error('Error saving payment to DB:', err);
                });
            setIsPaymentComplete(true)
            setMoney(0)
            const email = user.email
            axiospublic.delete('/add/chart', email)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            text: 'Your payment has been processed successfully.',
                        })
                        queryClient.invalidateQueries('addchart')
                    }
                })

        }
    };


    return (
        <div className="mt-2">
            <form onSubmit={handleSubmit} action="">
                <h1 className="text-xl font-bold">TotalAmount : ${money}</h1>
                <CardElement className="p-2 border border-blue-400 rounded-lg" options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                    hidePostalCode: false,
                }}></CardElement>
                <div className="text-center my-4">
                    <button disabled={!stripe || !clientSecret || money <= 0} className={`btn button`}>{isPaymentComplete ? 'Payment Complete' : 'Pay'}</button>
                </div>
            </form>
        </div>
    );
};

export default ChexkoutForm;