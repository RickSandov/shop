import Link from 'next/link';
import Image from 'next/image';
import DisplayCart from './cart/DisplayCart';
import ActiveLink from './ActiveLink';
import { useEffect, useState } from 'react';
import { asyncHandler } from '..//functions/GeneralHelpers';

export default function Navbar() {
  const [ctgs, setCategories] = useState([]);

  useEffect(async () => {
    const [rawCategories, fetchCategoriesError] = await asyncHandler(
      fetch('http://localhost:3000/api/public/categories')
    );

    const { categories } =
      (rawCategories && (await rawCategories.json())) || [];

    if (fetchCategoriesError || categories.length < 0)
      return setCategories(['Anillos', 'Anillos de Plata', 'Anillos de Oro']);

    if (categories && categories.length > 0)
      setCategories(categories.map(ctg => ctg.name));
  }, []);

  return (
    <nav className='navbar'>
      <div className='navbar__top'>
        <div className='logo-box'>
          <Link href={'/'}>
            <a className='logo'>
              <Image
                src='/img/logo.png'
                alt='G-Rings'
                width={270}
                height={180}
                priority
              />
              {/* <h1>G Rings</h1> */}
            </a>
          </Link>
        </div>

        <DisplayCart />
      </div>
      <div className='navbar__bottom'>
        <div className='navbar__links'>
          {ctgs.map(ctg => (
            <ActiveLink
              key={ctg}
              activeClassName='link active'
              href={`/${ctg}`}>
              <a className='link'> {ctg} </a>
            </ActiveLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
