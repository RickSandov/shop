
import { useRouter } from 'next/router';
import DisplayProduct from '../../components/products/DisplayProduct';;

export async function getStaticPaths() {

    // const res = await fetch()
    // const data = await res.json()

    const categories = [
        {
            name: 'prietas'
        },
        {
            name: 'prietos'
        },
        {
            name: 'prietes'
        }
    ]

    // Temp
    const paths = categories.map(({ name }) => ({
        params: { categoria: name }
    }))

    return {
        paths,
        fallback: false
    }

}

export async function getStaticProps({ params: { categoria } }) {


    // const res = await fetch(); // obtener productos por categoría
    // const data = await res.json();

    // Temporal
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

    const tempProducts = products.filter(({ category }) => category === categoria)

    // let subcategories = [];

    // products.forEach(({ subcategory, category }) => {

    //     if (!subcategories.includes(subcategory)) {
    //         const subctg = {
    //             category,
    //             subcategory
    //         }
    //         subcategories.push(subctg)
    //     }

    // })

    return {
        props: {
            products: tempProducts
        }
    }
}

export default function CategoryPage({ products }) {

    const router = useRouter();

    const { categoria } = router.query;

    // console.log(products);



    return (
        <div className="container">

            {/* <SubcategoriesMenu category={categoria} subcategories={catSubctg} /> */}

            <div className="products-list">
                {
                    products.map((product) => (
                        <DisplayProduct key={product._id} product={product} />
                    ))
                }
            </div>

        </div>
    )
};
