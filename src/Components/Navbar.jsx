import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
    const token = useSelector((state) => state.auth.token);
    return (
        <div className="fixed top-0 left-0 right-0 w-full bg-slate-50 z-50 rounded-lg shadow-md">
            <div className="flex justify-between items-center p-4 text-lg">
                <div className="flex items-center gap-24">
                    <ul className="flex space-x-24">
                        <li className="hover:underline"><Link to="/">Home</Link></li>
                        <li className="hover:underline"><Link to="/about">About</Link></li>
                        <li className="hover:underline"><Link to="/members">Members</Link></li>
                        <li className="hover:underline"><Link to="/events">Events</Link></li>
                    </ul>
                    <img src="/LC_LOGO_black.png" alt="logo" className="w-70 h-20 ml-12" />
                </div>
                <ul className="flex space-x-8">
                    <li className="hover:underline"><Link to="/blog">Blog</Link></li>
                    {token && <li className="hover:underline"><Link to="/newblog">NewBlog</Link></li>}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
