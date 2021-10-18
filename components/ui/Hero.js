
import Image from 'next/image';

export default function Hero() {
    return (
        <div className="hero">
            <Image alt={'halloween banner'} src={'/img/halloween.png'} layout='fill' objectFit className='img' priority></Image>
        </div>

    )
}
