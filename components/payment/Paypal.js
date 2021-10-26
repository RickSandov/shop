import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { cartCreate } from '../../actions/cart';
import { uiActiveModal, uiTempToast } from '../../actions/ui';
import { PayPalButton } from "react-paypal-button-v2";
import { useRef } from 'react';

// const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

export default function Paypal({ formValues, shipment, setLoading }) {
    const { cart } = useSelector(state => state);

    const dispatch = useDispatch();

    const [amount, setAmount] = useState(0);

    useEffect(() => {
        let tempAmount = 0;

        cart.forEach(({ qty, price }) => {
            tempAmount += (+qty) * (+price)
        })

        tempAmount += shipment ? 0 : 120;
        setAmount(tempAmount)

    }, [cart, setAmount, shipment])

    const onApprove = (data, actions) => {
        return actions.order.capture();
    }

    const handleSubmit = async e => {
        e.preventDefault();

        setLoading(true);

        const { name, phone, street, col, zip, extNumber, intNumber, mail } = formValues;

        if (name.lenght === 0) {
            uiTempToast('Debe ingresar un nombre', true);
            setLoading(true);
            return;
        }

        if (phone.lenght === 0) {
            uiTempToast('Debe ingresar un número de contácto', true);
            setLoading(true);
            return;
        }

        if (mail.lenght === 0) {
            uiTempToast('Debe ingresar un correo electrónico', true);
            setLoading(true);
            return;
        }

        let tokenPromise;

        try {

            tokenPromise = await window.ConektaCheckoutComponents.createToken();

        } catch (err) {
            dispatch(uiTempToast(err.message_to_purchaser, true));
        }

        setLoading(false);

        if (tokenPromise) {

            const { id } = tokenPromise;

            const data = {
                customer: {
                    name,
                    phone,
                    email: mail
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
                    shipment: shipment || 120,
                    // shipment: true,
                    token: id // aquí va el token
                }
            }

            // console.log(data);

            const response = await fetch('https://prettyprieto.com/api/private/sales/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const res = await response.json();



            if (res.status === 'OK') {
                setLoading(false);
                dispatch(uiTempToast('Pago realizado con éxito'));
                dispatch(cartCreate());
                res.sale?._id && dispatch(uiActiveModal(res.sale?._id));
            } else {
                // dispatch(uiTempToast('Revisa los datos ingresados', true));
                res?.error?.details[0]?.message ? dispatch(uiTempToast(res?.error?.details[0]?.message, true)) : dispatch(uiTempToast('Revisa los datos ingresados', true));
                console.log(res?.error);
            }

        }

    };

    return (
        <form className='checkout' onSubmit={handleSubmit}>
            <h3>Pago</h3>

            {
                window.paypal && (
                    <PayPalButton
                        amount={amount}
                        createOrder={(data, actions) => {
                            const { name, phone, street, col, zip, extNumber, intNumber, mail } = formValues;

                            return fetch('http://localhost:3000/api/public/paypal/order', {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    customer: {
                                        name,
                                        phone,
                                        email: mail
                                    },
                                    address: {
                                        street,
                                        col,
                                        zip,
                                        extNumber,
                                        intNumber
                                    },
                                    items: cart.map(({ product, qty }) => ({
                                        product,
                                        qty
                                    })),
                                    payment: {
                                        shipment: shipment || 120
                                    }
                                })
                            }).then(res => {
                                return res.json();
                            }).then(({ order }) => {
                                console.log(order)

                                return order.id;
                            }).catch(err => {
                                console.log(err);
                                dispatch(uiTempToast('Ocurrió un error con tu pago', true))
                            })
                        }}


                        onApprove={(data, actions) => {

                            return fetch(`http://localhost:3000/api/public/paypal/order/${data.orderID}/capture`, {
                                method: 'post'
                            }).then(res => {
                                return res.json();
                            }).then(({ order }) => {
                                let errorDetail = Array.isArray(order.details) && order.details[0];

                                if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
                                    dispatch(uiTempToast('Tu pago ha sido declinado', true));
                                    return actions.restart(); // Recoverable state, per:
                                    // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
                                }

                                if (errorDetail) {
                                    let msg = 'Lo sentimos, tu pago no pudo ser procesado.';
                                    if (errorDetail.description) msg += '\n\n' + errorDetail.description;
                                    if (order.debug_id) msg += ' (' + order.debug_id + ')';
                                    return dispatch(uiTempToast(msg, true)); // Show a failure message (try to avoid alerts in production environments)
                                }

                                console.log('Capture result', order, JSON.stringify(order, null, 2));
                                dispatch(uiTempToast('Pago realizado con éxito'));
                            })
                        }}


                        onSuccess={(details, data) => {

                            dispatch(uiTempToast('Pago realizado con éxito'));
                            console.log(details, data);

                            return fetch(`http://localhost:3000/api/public/paypal/order/${data.orderID}/capture`, {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    customer: {
                                        name,
                                        phone,
                                        email: mail
                                    },
                                    address: {
                                        street,
                                        col,
                                        zip,
                                        extNumber,
                                        intNumber
                                    },
                                    items: cart.map(({ product, qty }) => ({
                                        product,
                                        qty
                                    })),
                                    payment: {
                                        shipment: shipment || 120
                                    }
                                })
                            }).then(res => {
                                return res.json();
                            }).then(({ order }) => {
                                // dispatch(uiTempToast('Pago realizado con éxito'));
                                dispatch(cartCreate());
                                order?.id && dispatch(uiActiveModal(order?.id));

                                return order.id;
                            }).catch(err => {
                                console.log(err);
                                dispatch(uiTempToast('Ocurrió un error con tu pago', true))
                            })
                        }}
                        catchError={(err) => {
                            dispatch(uiTempToast('Ocurrió un error con tu método de pago', true))
                        }}
                    />
                )
            }

        </form>
    );
}
