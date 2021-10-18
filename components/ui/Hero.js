
import Image from 'next/image';

export default function Hero({ src }) {
    return (
        <div className="hero">
            <Image alt={'halloween banner'} src={src} layout='fill' objectFit className='img'></Image>
        </div>

    )
}
