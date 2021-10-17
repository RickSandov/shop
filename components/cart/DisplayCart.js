
export default function DisplayCart({ cart = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4] }) {

    return (
        <div className="display-cart">

            <svg>
                <use href="/icons/cart.svg#cart" ></use>
            </svg>
            <p>bolsa</p>
            <div className="display-cart__qty">
                <span>
                    {cart.length}
                </span>
            </div>
        </div>
    )
};
