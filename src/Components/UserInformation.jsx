import { useState, useEffect } from "react";
import axios from "axios";
const UserInformation = ({ data }) => {
    const [edit, setEditMode] = useState(false);
    const [message, setMessage] = useState('');
    const [fullname, setFullname] = useState(data.fullname || '');
    const [email, setEmail] = useState(data.email || '');
    const [firstname, setFirstname] = useState(data.firstname || '');
    const [lastname, setLastname] = useState(data.lastname || '');
    const [aboutme, setAboutme] = useState(data.aboutme || '');
    const [image, setImage] = useState(null);
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {
        if (data) {
            setFullname(data.fullname || '');
            setEmail(data.email || '');
            setFirstname(data.firstname || '');
            setLastname(data.lastname || '');
            setAboutme(data.aboutme || '');
        }
    }, [data]);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('fullname', fullname);
        formData.append('aboutme', aboutme);
        formData.append('email', email);
        formData.append('image', image);
        try {
            const response = await axios.post(`${backendURL}/api/blog/get`, formData, {
                withCredentials:true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(response.status === 201){
                setEditMode(false);
                window.location.reload();
            }
        } catch (e) {
            setMessage(e?.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="bg-slate-50 p-4 md:p-8 m-2 md:m-4 mt-28 md:my-2">
            <div className="bg-white my-4 md:my-8 p-2">
                <h1>My account</h1>
            </div>
            <h1 className="my-2">User Information</h1>
            <form className="flex flex-col gap-4 md:gap-8" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row justify-evenly gap-4 md:gap-8 w-full">
                    <div className="flex flex-col flex-grow">
                        <label className="my-2">Full Name</label>
                        <input
                            type="text"
                            value={fullname}
                            className="bg-white p-2 m-2 w-full"
                            onChange={(e) => setFullname(e.target.value)}
                            readOnly={!edit}
                        />
                    </div>
                    <div className="flex flex-col flex-grow">
                        <label className="my-2">Email Address</label>
                        <input
                            type="text"
                            value={email}
                            className="bg-white p-2 m-2 w-full"
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly={!edit}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-evenly gap-4 md:gap-8 w-full">
                    <div className="flex flex-col flex-grow">
                        <label className="my-2">First Name</label>
                        <input
                            type="text"
                            value={firstname}
                            className="bg-white p-2 m-2 w-full"
                            onChange={(e) => setFirstname(e.target.value)}
                            readOnly={!edit}
                        />
                    </div>
                    <div className="flex flex-col flex-grow">
                        <label className="my-2">Last Name</label>
                        <input
                            type="text"
                            value={lastname}
                            className="bg-white p-2 m-2 w-full"
                            onChange={(e) => setLastname(e.target.value)}
                            readOnly={!edit}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="my-2">Profile Image</label>
                        <input
                            type="file"
                            className="bg-white p-2 m-2 w-full"
                            onChange={handleImageChange}
                            disabled={!edit}
                        />
                    </div>
                </div>
                <hr />
                <div>
                    <h1>About Me</h1>
                    <textarea
                        name="aboutme"
                        id="aboutme"
                        value={aboutme}
                        className="bg-white p-2 m-2 w-full h-32"
                        onChange={(e) => setAboutme(e.target.value)}
                        readOnly={!edit}
                    />
                </div>
                {message && <p className="my-1 font-bold text-red-600">{message}</p>}
                {edit && (
                    <div>
                        <button type="submit" className="p-2 m-2 bg-green-500 rounded mr-4 text-white">Submit</button>
                    </div>
                )}
                <button type="button" className="p-2 m-2 bg-green-500 rounded mr-4 text-white max-w-12" onClick={() => { setEditMode(!edit) }}>Edit</button>
            </form>
        </div>
    );
};

export default UserInformation;
