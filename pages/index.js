import DisplayProduct from '../components/products/DisplayProduct';
import Hero from '../components/ui/Hero';
import Link from 'next/link';
import { useEffect } from 'react';

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/public/products'); // obtener productos por categoría
  const data = await res.json();

  return {
    props: {
      products: data.products,
      test: data.products.filter(({ category }) => category === 'test'),
    },
  };
}

export default function Home({ products }) {
  const dispProducts = products.filter((p, index) => index < 4);

  useEffect(() => {
    const getInfo = async () => {
      const res = await fetch(`http://localhost:3000/api/private/sales`);
      const data = await res.json();

      let total = 0;

      data.sales.forEach(({ payment }, index) => {
        if (index > 14) {
          total += payment.total;
        }
      });

      console.log(`Ingreso total: $${total.toLocaleString()}`);
      console.log(data.sales);
    };

    getInfo();
  }, []);

  return (
    <>
      <div className='container'>
        <h2
          style={{
            marginBottom: '3rem',
            marginTop: '3rem',
            fontSize: '3rem',
            color: '#006fc3',
          }}>
          Productos Destacados
        </h2>
        <div className='products-list'>
          {dispProducts.map(product => (
            <DisplayProduct key={product._id} product={product} />
          ))}
        </div>

        <Link href='/Playeras'>
          <a className='btn'>Ver más</a>
        </Link>
      </div>
    </>
  );
}
