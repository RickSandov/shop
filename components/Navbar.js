
import Link from 'next/link';
import Image from 'next/image';
import DisplayCart from './cart/DisplayCart';
import ActiveLink from './ActiveLink';

export async function getStaticProps() {

    // const res = await fetch(url)
    // const data = await res.json();

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

    return {
        props: {
            categories: categories.map(({ name }) => name)
        }
    }

}

export default function Navbar({ categories = ['prietas', 'prietos', 'prietes'] }) {

    return (
        <nav className='navbar' >
            <div className="ad">
                <p>Envío gratis en pedidos superiores a MXN$1,000.00</p>
            </div>
            <div className="navbar__top">
                <div className="logo">

                    <Link href={'/'} >
                        <a>
                            <Image src="/img/logo.jpg" alt="Vercel Logo" width={72} height={72} />
                        </a>
                    </Link>

                </div>


                <DisplayCart />


            </div>
            <div className="navbar__bottom">
                <div className="navbar__links">
                    {
                        categories.map(categorie => (
                            <div key={categorie} className="link">
                                <ActiveLink className="link" activeClassName='link active' href={`/${categorie}`} >
                                    <a> {categorie} </a>
                                </ActiveLink>
                            </div>
                        ))
                    }
                </div>
            </div>
        </nav>
    )
};

