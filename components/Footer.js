import Link from 'next/link';
import Newsletter from './newsletter/Newsletter';

export default function Footer(params) {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <div className='footer__row footer__row--first'>
          <div className='footer__col'>
            <h3 className='footer__heading'>Navegación</h3>
            <Link href='/'>
              <a className='footer__link'>Inicio</a>
            </Link>
            <Link href='/carrito'>
              <a className='footer__link'>Carrito</a>
            </Link>
            <Link href='/ver-pedido'>
              <a className='footer__link'>Ver mi pedido</a>
            </Link>
            {/* <Link href='/contacto'>
              <a className='footer__link'>Contacto</a>
            </Link> */}
            <Link href='/preguntas-frecuentes'>
              <a className='footer__link'>Preguntas frecuentes</a>
            </Link>
            <Link href='/devoluciones'>
              <a className='footer__link'>Politica de Devoluciones</a>
            </Link>
            <Link href='/privacidad'>
              <a className='footer__link'>Politica de Privacidad</a>
            </Link>
            <Link href='/terminos-y-condiciones'>
              <a className='footer__link'>Terminos y Condiciones</a>
            </Link>
            {/* <Newsletter /> */}
          </div>
          <div className='footer__col'>
            <h3 className='footer__heading center'>Atención a cliente.</h3>
            <p className='footer__paraph'>
              <strong>Dirección:</strong> Calle Agata #317 , Joyas del Valle,
              C.P.34237, Durango, Durango México.
            </p>
            <p className='footer__paraph'>
              <strong>Correo:</strong> gringscontacto@gmail.com
            </p>
            <p className='footer__paraph'>
              <strong>Telefóno:</strong> 618-335-3212
            </p>
            <div className='cards'>
              <svg>
                <use href='/icons/mastercard.svg#mastercard'></use>
              </svg>
              <svg>
                <use href='/icons/visa.svg#visa'></use>
              </svg>
            </div>
          </div>
        </div>
        <div className='footer__row footer__row--second'>
          <p className='footer__sub'>© 2022 G-Rings</p>
        </div>
      </div>
    </footer>
  );
}
