import { useRouter } from 'next/router';
import Product from '../../../components/products/Product';

export async function getStaticPaths() {

    // Get products

    const products = [
        {
            _id: '1',
            name: 'Chamarra de cuero',
            description: 'Chamarra de piel de perro',
            price: 1199,
            imgs: ['/img/chamarra.jpg'],
            category: 'prietos',
            subcategory: 'chaquetas'
        },
        {
            _id: '2',
            name: 'Camiseta 1',
            description: 'Camiseta para prietos',
            price: 499,
            imgs: ['/img/chamarra.jpg'],
            category: 'prietos',
            subcategory: 'camisetas'
        },
        {
            _id: '3',
            name: 'Camiseta 2',
            description: 'Camiseta para prietas',
            price: 499,
            imgs: ['/img/chamarra.jpg'],
            category: 'prietas',
            subcategory: 'camisetas'
        },
        {
            _id: '4',
            name: 'Hoodie Galaxia',
            description: 'Hoodie con serigrafía de galaxias',
            price: 749,
            imgs: ['/img/chamarra.jpg'],
            category: 'prietos',
            subcategory: 'hoodies'
        }
    ]

    const paths = products.map(product => ({
        params: { categoria: product.category, id: product._id.toString() }
    }))

    return {
        paths,
        fallback: false
    }

}

export async function getStaticProps() {

    // Get Product

    return {
        props: {
            product: {
                _id: '1',
                name: 'Chamarra de cuero',
                description: 'Chamarra de piel de perro',
                price: 750,
                imgs: ['/img/chamarra.jpg'],
                category: 'prietos'
            }
        }
    }
}

export default function ProductPage({ product }) {

    return (
        <Product product={product} />
    )

};
