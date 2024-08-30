import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const id = useSelector((state) => state.auth.user_id);
    const url = `/blogspot/userProfile`;
    const [img, setImg] = useState("");
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const [IsLoggedIn, setIsLoggedIn] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (IsLoggedIn) {
                try {
                    const response = await axios.get(`${backendURL}/api/blog/get`, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });
                    if (response.status === 200) {
                        setImg(response.data.img_url);
                    }
                } catch (e) {
                    setIsLoggedIn(false);
                }
            }
        };
        fetchData();
    }, [backendURL, id, IsLoggedIn]);

    useEffect(() => {
        const CheckLoggedIn = async () => {
            try {
                const response = await axios.get(`${backendURL}/api/check-auth`, { withCredentials: true });
                if (response.data.message === 'Authenticated') {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        };
        CheckLoggedIn();
    }, [backendURL, id, IsLoggedIn]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="fixed top-0 left-0 right-0 w-full bg-slate-50 z-50 rounded-lg shadow-md">
            <div className="flex justify-between items-center p-4 text-lg">
                <div className="flex items-center">
                    <img src="/LC_LOGO_black.png" alt="logo" className={`w-36 h-20 md:w-60 md:h-20 ${menuOpen ? 'block' : 'hidden'} md:block`} />
                    <button className="block md:hidden ml-4" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
                    </button>
                </div>
                <div className={`flex-col md:flex md:flex-row items-center gap-4 md:gap-16 ${menuOpen ? 'flex' : 'hidden'}`}>
                    <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-24">
                        <li className="hover-underline"><Link to="/">Home</Link></li>
                        <li className="hover-underline"><Link to="/About">About</Link></li>
                        <li className="hover-underline"><Link to="/Members">Members</Link></li>
                        <li className="hover-underline"><Link to="/Events">Events</Link></li>
                    </ul>
                    <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-16">
                        {!IsLoggedIn && (
                            <li>
                                <button className="m-2 p-2 rounded-md bg-green-600 text-white"><Link to="/Login">LogIn</Link></button>
                            </li>
                        )}
                        {IsLoggedIn && (
                            <>
                                <li className="hover-underline">
                                    <Link to="/blogs">Blog</Link>
                                </li>
                                <li className="hover-underline">
                                    <Link to="/newblog">New Blog</Link>
                                </li>
                                {img ? (
                                    <li className="rounded-full overflow-hidden w-12 h-12 hover-underline">
                                        <Link to={url}>
                                            <img src={img} alt="User" className="w-full h-full object-cover" />
                                        </Link>
                                    </li>
                                ) : (
                                    <li className="hover-underline">
                                        <Link to={url}>User</Link>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
