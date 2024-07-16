import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="w-full pt-24 p-4 mx-auto"
        >
        <div className="font-sans font-medium text-center text-2xl md:text-3xl">
            ABOUT US
        </div>
        <div className="font-sans font-normal text-center text-wrap text-lg md:text-2xl md:p-4 mx-auto md:m-4">
            <p className="leading-8 md:leading-10 p-4 md:p-8 text-base md:text-xl">
            The Literary Club is known to be one of the most esteemed societies on campus ever since its establishment in 2015. We are dedicated to enriching students' outlooks by offering a place to practice their communication skills, making ourselves sound and literate. The Club has always believed in crafting a platform to bring together writers, orators, and even those who believe in unique ideas and making an impact. To enhance our skills, we conduct a variety of literary events such as poetry readings, book discussions, and story writing workshops. These events provide opportunities for students to delve into the world of literature, express their creativity, and refine their writing and speaking abilities. Our club also organizes competitions and interactive sessions with literary figures, fostering a vibrant literary culture on campus. Through these activities, we aim to cultivate a love for literature and effective communication among our members, helping them grow both personally and professionally.
            </p>
        </div>
        </motion.div>
    );
};

export default About;

