import DisplayProduct from "../components/products/DisplayProduct";
import Hero from "../components/ui/Hero";

export async function getStaticProps() {
  const res = await fetch('https://prettyprieto.com/api/public/products'); // obtener productos por categoría
  const data = await res.json();

  return {
    props: {
      products: data.products
    }
  }
}

export default function Home({ products }) {

  const dispProducts = [products[0], products[3], products[4], products[5]];

  return (
    <>
      <div className="container">
        <Hero />
        <h2
          style={{
            marginBottom: '3rem',
            fontSize: '3.5rem',
            color: '#006fc3'
          }}
        >Productos Destacados</h2>
        <div className="products-list">
          {
            dispProducts.map(product => (
              <DisplayProduct key={product._id} product={product} />
            ))
          }
        </div>
      </div>

    </>
  )
}
