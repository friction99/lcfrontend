import Mentors from "../Components/Mentors";
import Members from "../Components/Members";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
const MembersPage = ()=>{
    return(
        <div>
            <Navbar/>
            <div className="text-center pt-48 p-4">
                <span className="text-3xl font-bold">Mentors</span>
                <Mentors/>
                <div className="my-12">
                    <span className="text-3xl font-bold my-6">k21 Members</span>
                    <Members/>
                </div>
            </div>
            <Footer/>
        </div>
    )
};
export default MembersPage;