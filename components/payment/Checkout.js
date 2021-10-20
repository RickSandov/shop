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
    number: '4242424242424242',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const key = 'key_Y4fSx3ztSKgiQFVCDWB2hdg'; // producción
    // const key = 'key_Aryho89vKyrSk7vzhCi9qxg'; // desarrollo
    ConektaCheckoutComponents.iFrame({
      publicKey: key,
      options: {
        hidePayButton: true,
      },
      styles: {
        color: '#FF0000',
        backgroundcolor: '#ccc',
      },
      targetIFrame: '#conektaIframeContainer',
    });
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    let tokenPromise;

    try {

      tokenPromise = await window.ConektaCheckoutComponents.createToken();

    } catch (err) {
      dispatch(uiTempToast(err.message_to_purchaser, true));
    }

    setLoading(false);

    if (tokenPromise) {

      const { id } = tokenPromise;

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
          shipment: true,
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
      } else {
        dispatch(uiTempToast('Revisa los datos ingresados', true));
        res?.error && console.log(res.error);
      }

    }

  };

  return (
    <form className='checkout' onSubmit={handleSubmit}>
      <h3>Información de pago</h3>

      <div
        className='alert alert-success fade alert-token'
        id='alertToken'
        role='alert'></div>
      <div className='conekta-iframe-container'>
        <div id='conektaIframeContainer'></div>
      </div>

      <div className='btn'>
        <button>pagar</button>
      </div>
    </form>
  );
}
