import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Cards = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1 
    });

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delayChildren: 0.2,
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            ref={ref}
            className="w-full my-6 mx-4 p-4 flex flex-row gap-8 flex-wrap justify-center"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <motion.div className="m-4 p-4 rounded-lg w-[300px] bg-slate-50 shadow-md hover:shadow-lg" variants={cardVariants}>
                <div className="heading text-center my-4">
                    <span className="font-semibold text-xl">History</span>
                </div>
                <div className="container">
                    <p className="text-wrap leading-10 text-xl">The Literary Club was formed in the year 2015 with a vision to foster love for literature, creating a platform to express yourself.</p>
                </div>
            </motion.div>
            <motion.div className="m-4 p-4 rounded-lg w-[300px] bg-slate-50 shadow-md hover:shadow-lg" variants={cardVariants}>
                <div className="heading text-center my-4">
                    <span className="font-semibold text-xl">Goal</span>
                </div>
                <div className="container">
                    <p className="text-wrap leading-10 text-xl">We aim at building an amateur literary lover to a mature literatus. Writing, speaking, and presentation are professional life mantras; we aim to enhance these skills.</p>
                </div>
            </motion.div>
            <motion.div className="m-4 p-4 rounded-lg w-[300px] bg-slate-50 shadow-md hover:shadow-lg" variants={cardVariants}>
                <div className="heading text-center my-4">
                    <span className="font-semibold text-xl">Methodology</span>
                </div>
                <div className="container">
                    <p className="text-wrap leading-10 text-xl">We organize various events where we give an opportunity to participants to showcase their skills.</p>
                </div>
            </motion.div>
            <motion.div className="m-4 p-4 rounded-lg w-[300px] bg-slate-50 shadow-md hover:shadow-lg" variants={cardVariants}>
                <div className="heading text-center my-4">
                    <span className="font-semibold text-xl">Learning</span>
                </div>
                <div className="container">
                    <p className="text-wrap leading-10 text-xl">One can enhance their communication skills, learn to work in a team, make friends, and learn camaraderie.</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Cards;