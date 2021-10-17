import Image from 'next/image'
import Link from 'next/link'

export default function DisplayProduct({ product }) {

    const { imgs, name, price, category, _id } = product;

    return (
        <Link href={`/${category}/product/${_id}`} >
            <a className="display-product">
                <div className="display-product__image">
                    <Image alt={name} src={imgs[0]} layout='fill' className='img' ></Image>
                </div>
                <div className="display-product__info">
                    <h3 className="product-name">
                        {name}
                    </h3>
                    <span className="price">
                        MXN${price.toLocaleString()}
                    </span>
                </div>
            </a>
        </Link>
    )
}
