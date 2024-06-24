import Navbar from "./Navbar"
import About from "./About"
import Carousel from "./Carousel"
import Cards from "./Cards"
import Events from "./Events"
import Footer from "./Footer"
const Home = ()=>{
    return(
        <div>
            <Navbar/>
            <div className="pt-24 p-4"> 
                <Carousel/>
                <About/>
                <Cards/>
                <Events/>
                <Footer/>
            </div>
        </div>
    )
}
export default Home 