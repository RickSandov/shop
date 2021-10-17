import React from 'react'

const tallas = ['S', 'M', 'G', 'XL']

export default function Product({ product = {
    _id: '1',
    name: 'Chamarra de cuero',
    description: 'Chamarra de piel de perro',
    price: 750,
    imgs: ['/img/chamarra.jpg'],
    category: 'prietos',
    subcategory: 'camisetas'
} }) {
    return (
        <div>
            hola
        </div>
    )
}
