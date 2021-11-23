import Footer from './Footer';
import Navbar from './Navbar';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cartCreate, updateCart } from '../actions/cart';
import Toast from './ui/Toast';
import OrderModal from './orders/OrderModal';

export default function Layout({ children }) {
  const { ui } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');

    if (!storedCart) {
      dispatch(cartCreate());
    } else {
      dispatch(updateCart(JSON.parse(storedCart)));
    }
  }, [dispatch]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pay.conekta.com/v1.0/js/conekta-checkout.min.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Head>
        <title>G Rings</title>
        <meta name='description' content='G Rings' />
        <link rel='icon' href='/favicon.ico' />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        {/* <script src="https://www.paypal.com/sdk/js?client-id=test"></script> */}
      </Head>

      <Navbar />
      {children}
      <Footer />
      {ui.toastActive && <Toast />}
      {ui.modalActive && <OrderModal orderId={ui.orderId} />}
    </>
  );
}
