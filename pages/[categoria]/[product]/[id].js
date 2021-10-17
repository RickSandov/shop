import { useRouter } from 'next/router';
import Product from '../../../components/products/Product';

export default function ProductPage() {

    const router = useRouter();

    console.log(router.query);


    return (
        <Product />
    )

};
