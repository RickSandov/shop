import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function Checkout({ product }) {

    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        if (!error) {
            const { id } = paymentMethod;

            console.log('este es el id', id);

            // const response = await fetch('http://localhost:3001/api/checkout', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         id,
            //         amount: (50) * 100
            //     })
            // });

            // console.log(response);

            elements.getElement(CardElement).clear();

        } else {
            console.log(error.message);
        }

    }

    return (
        <form onSubmit={handleSubmit} >
            <CardElement />
            <button disabled={!stripe} >
                Pagar
            </button>
        </form>
    )
}
