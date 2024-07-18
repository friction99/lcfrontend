import {useState,useEffect} from 'react'

const images = [
    './valedict/IMG_8196.jpg',
    './valedict/IMG_8233.jpg',
    './valedict/IMG_8240.jpg',
    './valedict/IMG_8274.JPG',
];
const Carousel = ()=>{
    const [currentIndex,setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change slide every 3 seconds
        return () => clearInterval(interval);
      }, []);
    return (
        <div className='relative w-full h-[85vh] overflow-hidden rounded-lg my-4'>
            {
                images.map((image,index)=>{
                    return (
                        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100':'opacity-0'}`}>
                            <img src={image} alt={`Slide ${index+1}`} className="w-full h-full object-cover"/>
                        </div>
                    )
                })
            }
            <div className='absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-4'>
                {
                    images.map((_,index)=>{
                        return(
                            <div key={index} className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};
export default Carousel;