import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";
import Script from 'next/script';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartCreate, updateCart } from "../actions/cart";
import Toast from "./ui/Toast";
import OrderModal from "./orders/OrderModal";

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

    }, [dispatch])

    return (
        <>
            <Head>
                <title>Pretty Prieto</title>
                <meta name="description" content="Pretty Prieto tienda de ropa en línea" />
                <link rel="icon" href="/favicon.ico" />
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                {/* <script src="https://www.paypal.com/sdk/js?client-id=test"></script> */}
            </Head>
            <Script
                src="https://www.paypal.com/sdk/js?client-id=AQWb-KvlTaCQu6a8Jmndt1ORUWs5LY4Md1WqFc-1MVr2lrTOuWu3OGrUlfl-s8mZz1jsmGOs1cpi7I6O"
                strategy="beforeInteractive"
            />

            <Navbar />
            {children}
            <Footer />
            {
                ui.toastActive && (
                    <Toast />
                )
            }
            {
                ui.modalActive && (
                    <OrderModal orderId={ui.orderId} />
                )
            }
        </>
    )
};
