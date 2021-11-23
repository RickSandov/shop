import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function DisplayCart() {
  const { cart } = useSelector(state => state);

  return (
    <>
      <Link href={`/carrito`}>
        <a className='display-cart'>
          <svg>
            <use href='/icons/cart.svg#cart'></use>
          </svg>
          <p>Carrito</p>
          <div className='display-cart__qty'>
            <span>{cart.length}</span>
          </div>
        </a>
      </Link>
    </>
  );
}
