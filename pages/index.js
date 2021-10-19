import DisplayProduct from "../components/products/DisplayProduct";
import Hero from "../components/ui/Hero";
import Link from 'next/link'

export async function getStaticProps() {
  const res = await fetch('https://prettyprieto.com/api/public/products'); // obtener productos por categoría
  const data = await res.json();

  return {
    props: {
      products: data.products,
      test: data.products.filter(({ category }) => category === 'test')
    }
  }
}

export default function Home({ products, test }) {

  const dispProducts = products.filter((p, index) => index < 4);

  console.log(products);

  console.log(test);

  return (
    <>
      <div className="container">
        <Hero src='/img/halloween.png' />
        <h2
          style={{
            marginBottom: '3rem',
            marginTop: '3rem',
            fontSize: '3rem',
            color: '#006fc3'
          }}
        >Productos Destacados</h2>
        <div className="products-list">
          {
            dispProducts.map(product => (
              <DisplayProduct key={product._id} product={product} />
            ))
          }
          {
            // test[0] && (
            //   <DisplayProduct key={test[0]._id} product={test[0]} />
            // )
          }
        </div>

        <Link href="/Playeras" >
          <a className="btn" >Ver más</a>
        </Link>

        <Hero src='/img/octubre.png' />
      </div>

    </>
  )
}
