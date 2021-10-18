import DisplayProduct from "../components/products/DisplayProduct";

export async function getStaticProps() {
  const res = await fetch('/api/public/products'); // obtener productos por categoría
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
        <h2
          style={{
            marginBottom: '3rem',
            fontSize: '2.3rem',
            color: '#D52E2D'
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
