import Link from 'next/link'

export default function Footer(params) {
    return (
        <footer className='footer'>
            <div className='footer__container'>
                <div className='footer__row footer__row--first'>
                    <div className='footer__col'>
                        <h3 className='footer__heading'>Navegación</h3>
                        <Link href='/' >
                            <a className='footer__link' >
                                Inicio
                            </a>
                        </Link>

                        <Link href='/carrito' >
                            <a className='footer__link' >
                                Mi carrito
                            </a>
                        </Link>
                        <Link href='/ver-pedido' >
                            <a className='footer__link' >
                                Ver mi pedido
                            </a>
                        </Link>
                        <Link href='/privacidad' >
                            <a className='footer__link' >
                                Politica de Privacidad
                            </a>
                        </Link>
                        <Link href='/terminos' >
                            <a className='footer__link' >
                                Terminos y Condiciones
                            </a>
                        </Link>
                    </div>
                    <div className='footer__col'>
                        <h3 className='footer__heading center'>¡Estamos creciendo!</h3>
                        <p className='footer__paraph'>
                            Estamos empezando este emprendimiento. Puedes esperar nueva
                            funcionalidad y un catalogo más grande en el futuro.
                        </p>
                        <p className='footer__paraph'>
                            ¡Agrega nuestra página a marcadores para que puedas entrar y
                            comprar tus prendas favoritas en cualquier momento!
                        </p>
                    </div>
                </div>
                <div className='footer__row footer__row--second'>
                    <p className='footer__sub'>© 2021 Pretty Prieto</p>
                </div>
            </div>
        </footer>
    );
}