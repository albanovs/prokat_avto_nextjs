import Image from 'next/image';

const images = [
    '/1.png', '/2.png', '/3.png', '/4.png', '/5.png', '/6.png', '/7.png', '/8.png',
];

export default function Gallery() {
    return (
        <div className="flex flex-col items-center p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((src, index) => (
                    <div key={index} className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-lg">
                        <Image width={500} height={500} src={src} alt={`Gallery Image ${index + 1}`} objectFit="cover" />
                    </div>
                ))}
            </div>
        </div>
    );
}
