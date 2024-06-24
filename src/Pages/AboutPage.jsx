import About from "../Components/About";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Cards from "../Components/Cards";
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