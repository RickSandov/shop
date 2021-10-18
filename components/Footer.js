export default function Footer(params) {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <div className='footer__row footer__row--first'>
          <div className='footer__col'>
            <h5 className='footer__heading'>Navegación</h5>
            <a className='footer__link' href='/'>
              Inicio
            </a>
            <a className='footer__link' href='/carrito'>
              Mi carrito
            </a>
            <a className='footer__link' href='/faqs'>
              Preguntas frequentes
            </a>
            <a className='footer__link' href='/privacidad'>
              Politica de Privacidad
            </a>
            <a className='footer__link' href='/terminos-y-condiciones'>
              Terminos y Condiciones
            </a>
          </div>
          <div className='footer__col'>
            <h5 className='footer__heading'>¡Estamos creciendo!</h5>
            <p className='footer__paraph'>
              Estamos empezando este emprendimiento. Puedes esperar nueva
              funcionalidad y un catalogo más grande en el futuro.
            </p>
            <p className='footer__paraph'>
              ¡Agrega nuestra página a marcadores para que puedas entrar y
              comprar tus prendas favoritas en cualquier momento!
            </p>
          </div>
          <div className='footer__col'>
            {/* <h5 className='footer__heading'>
              Siguenos en nuestras redes sociales
            </h5> */}
          </div>
        </div>
        <div className='footer__row footer__row--second'>
          <p className='footer__sub'>© 2021 Pretty Prieto</p>
        </div>
      </div>
    </footer>
  );
}
