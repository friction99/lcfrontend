import Navbar from "./Navbar";
import Carousel from "./Carousel";
import About from "./About"
import Events from "./Events"
import Footer from "./Footer"
import Cards from "./Cards";
const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-24 p-4">
                <Carousel/>
                <About/>
                <Cards/>
                <Events/>
                <Footer/>
            </div>
        </div>
    );
}

export default Home;
