
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { cartCreate } from '../../actions/cart';
import { uiTempToast } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import CardForm from './CardForm';
// import conekta from 'https://pay.conekta.com/v1.0/js/conekta-checkout.min.js';

export default function Checkout({ formValues, shipment, setLoading }) {

    const { cart } = useSelector(state => state);

    const [cardValues, handleInputChange] = useForm({
        exp: '0525',
        cvc: '135',
        name: 'John Doe',
        number: '4242424242424242'
    })

    const dispatch = useDispatch();

    useEffect(() => {

        window.ConektaCheckoutComponents.iFrame({
            publicKey: "key_Aryho89vKyrSk7vzhCi9qxg",
            options: {
                hidePayButton: false
            },
            styles: {
                color: "#FF0000"
            },
            targetIFrame: "#conektaIframeContainer"
        })

    }, [])

    const getToken = (card) => {

        console.log(card);
        console.log(window.ConektaCheckoutComponents);

        // conekta.api_key = 'key_eYvWV7gSDkNYXsmr'; //  <-- Mock private key, please use YOUR personal private key
        // conekta.api_version = '2.0.0';

        // let customer = conekta.Customer.create({
        //     name: "Payment Link Name",
        //     email: "juan.perez@conekta.com"
        // }, function (err, res) {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //     console.log(res.toObject());
        // });

        // return new Promise(async (resolve, reject) => {
        //     try {

        //         const tokenRes = await fetch('https://api.conekta.io/tokens', {
        //             method: 'POST',
        //             body: {
        //                 checkout: { returns_control_on: "Token" }
        //             },
        //             headers: {
        //                 Accept: 'application/vnd.conekta-v2.0.0+json',
        //                 'Content-Type': 'application/json',
        //                 Authorization: 'Basic a2V5X0FyeWhvODl2S3lyU2s3dnpoQ2k5cXhn=='
        //             }
        //         });

        //         const token = await tokenRes.json();

        //         console.log(tokenRes);

        //         resolve(token);

        //     } catch (err) {
        //         reject(err);
        //     }
        // })
    }

    const tokenizeCard = () => {

        getToken(cardValues)
        // .then(data => {
        //     console.log(data);
        // })
        // .catch(err => console.log(err))

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // setLoading(true);

        const key = 'key_Aryho89vKyrSk7vzhCi9qxg';

        const tokenPromise = window.ConektaCheckoutComponents.createToken()
        tokenPromise.then(function (token) {
            console.log("Token created: " + token)
        }).catch(function (error) {
            console.log(error.message_to_purchaser)
        })



        // if (!error) {
        //     const { id } = paymentMethod;

        //     const { name, phoneNum, street, col, zip, extNumber, intNumber } = formValues;

        //     const data = {
        //         customer: {
        //             name,
        //             phoneNum
        //         },
        //         address: {
        //             street,
        //             col,
        //             zip,
        //             extNumber
        //         },
        //         items: cart.map(({ product, qty }) => ({
        //             product,
        //             qty
        //         })),
        //         payment: {
        //             method: 'tarjeta',
        //             // shipment: shipment || 120,
        //             shipment: true,
        //             token: '' // aquí va el token
        //         },
        //         methodId: id
        //     }

        //     const response = await fetch('https://prettyprieto.com/api/private/sales/', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     });

        //     const res = await response.json();

        //     console.log(res);

        //     if (res.status === 'OK') {
        //         setLoading(false);
        //         dispatch(uiTempToast('Pago realizado con éxito'));
        //         dispatch(cartCreate());
        //     } else {
        //         dispatch(uiTempToast('Revisa tu información', true));
        //     }

        // } else {
        //     setLoading(false);
        //     dispatch(uiTempToast('Hubo un error con tu método de pago', true));
        //     console.log(error.message);
        // }

    }

    return (
        <form className='checkout' onSubmit={handleSubmit} >
            <h3>Información de pago</h3>

            {/* <CardForm cardValues={cardValues} handleInputChange={handleInputChange} /> */}

            <h2>Merchant Payment</h2>
            <p>Ingresa los datos de tu tarjeta de crédito</p>
            <div
                className="alert alert-success fade alert-token"
                id="alertToken"
                role="alert"
            ></div>
            <div className="conekta-iframe-container">
                <div id="conektaIframeContainer"></div>
            </div>
            <div className="d-flex flex-row-reverse">
                <div className="buttons text-left">
                    <button id="messageButton" className="btn btn-primary">Pagar</button>
                </div>
            </div>


            <div className="btn">
                <button >
                    pagar
                </button>
            </div>
        </form>
    )
}

