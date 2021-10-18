import { useSelector } from "react-redux"
import ClientInfo from "./ClientInfo";
import ProductResume from "./ProductResume";

export default function Cart() {

    const { cart } = useSelector(state => state);

    const cartLength = cart.length;

    console.log(cartLength);

    return (
        <>

            {
                cartLength < 1 ?
                    (
                        <div className="carrito-empty">
                            <p>
                                Aún no tienes productos en tu carrito
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
                            </div>
                            <ClientInfo />

                        </div>
                    )
            }

        </>
    )
};
