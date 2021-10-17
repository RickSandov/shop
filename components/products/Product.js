import { useState } from 'react'
import Image from 'next/image'

const tallas = ['S', 'M', 'G', 'XL']

export default function Product({ product }) {

    const { _id, name, description, price, imgs } = product;

    const [counter, setCounter] = useState(1);
    const [size, setSize] = useState('');

    return (
        <div className="product-page">

            <div className="product">

                <div className="product__img-box">
                    <Image alt={name} src={imgs[0]} layout='fill' className='img' ></Image>
                </div>

                <div className="product__info">
                    <div className="box">
                        <h1 className="title">
                            {name}
                        </h1>
                        <div className="item price">
                            <p className="item__title">
                                precio
                            </p>
                            <p className="price">
                                MXN ${price.toLocaleString()}
                            </p>
                        </div>
                        <div className="item">
                            <p className="item__title">
                                talla
                            </p>
                            <div className="item__list">
                                {
                                    tallas.map(talla => (
                                        <span
                                            onClick={() => setSize(talla)}
                                            className={`${size === talla && 'active'}`} key={talla} >{talla}</span>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="item">
                            <p className="item__title">
                                cantidad
                            </p>
                            <div className="item__counter">
                                <button
                                    onClick={() => setCounter(counter - 1)}
                                    disabled={counter <= 1}
                                > - </button>
                                <span className="qty"> {counter} </span>
                                <button
                                    onClick={() => setCounter(counter + 1)}
                                > + </button>
                            </div>
                        </div>
                    </div>

                    <div className="bottom">
                        <button className="btn-add">
                            Agregar a la bolsa
                        </button>
                        <div className="description">
                            <h3>Descripción del producto</h3>
                            <p>{description}</p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}
