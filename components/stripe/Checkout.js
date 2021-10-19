import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { cartCreate } from '../../actions/cart';
import { uiTempToast } from '../../actions/ui';

export default function Checkout({ formValues, shipment, setLoading }) {

    const { cart } = useSelector(state => state);

    const dispatch = useDispatch();

    const stripe = useStripe();
    const elements = useElements();

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
                    // shipment: shipment || 120,
                    shipment: true
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

            if (res.status === 'OK') {
                setLoading(false);
                dispatch(uiTempToast('Pago realizado con éxito'));
                dispatch(cartCreate());
            } else {
                dispatch(uiTempToast('Revisa tu información', true));
            }

        } else {
            setLoading(false);
            dispatch(uiTempToast('Hubo un error con tu método de pago', true));
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
                <button disabled={!stripe} >
                    pagar
                </button>
            </div>
        </form>
    )
}
