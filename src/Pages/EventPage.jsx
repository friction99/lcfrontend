import Events from "../Components/Events";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
const EventPage = ()=>{
    return(
        <div>
            <Navbar/>
            <div className="pt-24 p-4">
                <Events/>
                <Footer/>
            </div>
        </div>
    )
};
export default EventPage;