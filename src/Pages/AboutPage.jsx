import About from "../Components/About";
import Footer from "../Components/Footer";
import Cards from "../Components/Cards";
import Navbar from "../Components/Navbar";
const AboutPage = ()=>{
    return(
        <div>
            <Navbar/>
            <div className="pt-24 p-4">
                <About/>
                <Cards/>
                <Footer/>
            </div>
        </div>
    )
};
export default AboutPage;