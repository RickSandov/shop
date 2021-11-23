import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ClientInfo from './ClientInfo';
import ProductResume from './ProductResume';

export default function Cart() {
  const { cart } = useSelector(state => state);

  const cartLength = cart.length;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tempTotal = 0;

    cart.forEach(({ qty, price }) => {
      tempTotal += qty * price;
    });

    setTotal(tempTotal);
  }, [cart]);

  return (
    <>
      {cartLength < 1 ? (
        <div className='carrito-empty'>
          <p>Tu carrito esta vacio.</p>
        </div>
      ) : (
        <div className='carrito'>
          <div className='products'>
            {cart.map(item => (
              <ProductResume key={item.product} product={item} />
            ))}
            <div className='price-resume'>
              <span>
                Subtotal:
                <strong> USD${total.toLocaleString()}</strong>{' '}
              </span>
              <p className={`shipment ${+total > 50 && 'free'}`}>
                Envío:
                <strong>{+total < 50 ? <del> USD$12</del> : ' USD$12'}</strong>
              </p>
              <p className='resume-total'>
                Total:
                <strong>
                  USD$
                  {+total > 50
                    ? (total + 12).toLocaleString()
                    : total.toLocaleString()}
                </strong>
              </p>
            </div>
          </div>
          <ClientInfo shipment={total > 50 ? 0 : 12} />
        </div>
      )}
    </>
  );
}
