import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartCreate, updateCart } from "../actions/cart";
import Toast from "./ui/Toast";

export default function Layout({ children }) {

    const { cart, ui } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {

        if (!localStorage.getItem('cart')) {
            dispatch(cartCreate());
        }


    }, [])

    return (
        <>
            <Head>
                <title>PrettyPrieto</title>
                <meta name="description" content="PrettyPrieto tienda de ropa en línea" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            {children}
            <Footer />
            {
                ui.toastActive && (
                    <Toast />
                )
            }
        </>
    )
};
