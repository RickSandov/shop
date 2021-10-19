import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import ClientInfo from "./ClientInfo";
import ProductResume from "./ProductResume";
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_live_51JlloVAd9gcNukk0Y5Hz4jh0nEUtUunHbRj1kS9cTLjBF8l5o1LE7Sps1FGa7KQdk6qf9J3ejZspVMhRyclqrtTI00iFRWvuBV');

export default function Cart() {

    const { cart } = useSelector(state => state);

    const cartLength = cart.length;

    const [total, setTotal] = useState(0);

    useEffect(() => {

        let tempTotal = 0;

        cart.forEach(({ qty, price }) => {
            tempTotal += (qty * price);
        })

        setTotal(tempTotal);

    }, [cart]);

    return (
        <>

            {
                cartLength < 1 ?
                    (
                        <div className="carrito-empty">
                            <p>
                                Aún no tienes productos en tu bolsa
                            </p>
                        </div>
                    )
                    :
                    (
                        <div className="carrito">
                            <div className="products">
                                {
                                    cart.map((item) => (
                                        <ProductResume key={item.product} product={item} />
                                    ))
                                }
                                <div className="price-resume">
                                    <span >
                                        Subtotal:
                                        <strong> MXN${total.toLocaleString()}</strong> </span>
                                    <p className={`shipment ${+total > 1000 && 'free'}`}>
                                        Envío:
                                        <strong>
                                            {
                                                +total > 1000 ? <del> MXN$120</del> : ' MXN$120'
                                            }
                                        </strong>
                                    </p>
                                    <p className="resume-total">
                                        Total:
                                        <strong>
                                            MXN${+total < 1000 ? (total + 120).toLocaleString() : total.toLocaleString()}
                                        </strong>
                                    </p>
                                </div>
                            </div>
                            <Elements stripe={stripePromise} >
                                <ClientInfo shipment={total > 1000} />
                            </Elements>


                        </div>
                    )
            }

        </>
    )
};
