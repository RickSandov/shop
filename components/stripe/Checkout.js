import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Checkout({ formValues, shipment }) {

    const { cart } = useSelector(state => state);

    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        if (!error) {
            const { id } = paymentMethod;

            const { name, phoneNum, street, col, zip, extNumber, intNumber } = formValues;

            const data = {
                customer: {
                    name,
                    phoneNum
                },
                address: {
                    street,
                    col,
                    zip,
                    extNumber
                },
                items: cart.map(({ product, qty }) => ({
                    product,
                    qty
                })),
                payment: {
                    method: 'tarjeta',
                    shipment: shipment || 120
                },
                methodId: id
            }

            const response = await fetch('https://prettyprieto.com/api/private/sales/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const res = await response.json();

            console.log(res);
            setLoading(false);

            // elements.getElement(CardElement).clear();


        } else {
            console.log(error.message);
        }

    }

    return (
        <form className='checkout' onSubmit={handleSubmit} >
            <h3>Información de pago</h3>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '1rem',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="btn">
                <button disabled={loading} >
                    {
                        loading ? (
                            <div className="loader"></div>
                        ) : (
                            'Pagar'
                        )
                    }
                </button>
            </div>
        </form>
    )
}
