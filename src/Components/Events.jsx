import { useState, useEffect } from 'react';

const images = [
    './events/e1.jpg',
    './events/e2.jpg',
    './events/e3.jpg',
    './events/e4.jpg',
];

const Events = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex flex-col md:flex-row justify-around w-full h-auto md:h-[85vh] p-4 mx-auto'>
            <div className="flex flex-col items-center justify-center text-center w-full md:w-1/2 p-4 mx-auto my-4">
                <span className="text-2xl md:text-3xl font-medium">EVENTS</span>
                <p className="leading-8 md:leading-10 text-base md:text-xl mt-4">
                LCBITP has always believed in crafting a platform to bring together writers, orators, and even those who believe in unique ideas and making an impact. To enhance our skills, we conduct a variety of literary events such as poetry readings, book discussions, and story writing workshops. Our club also organizes competitions and interactive sessions with literary figures, fostering a vibrant literary culture on campus.
                </p>
            </div>
            <div className="carousel w-full md:w-[70vh] h-[50vh] md:h-[70vh] overflow-hidden rounded-lg my-4 relative">
                {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
