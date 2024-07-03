const Validate = (email,password)=>{
    const emailCheck = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    if(!emailCheck) return "Enter a Valid Email";
    if(!passwordCheck) return "Password should contain at least 8 characters with at least one uppercase letter, one lowercase letter, and one number.";
    return null;
}
export default Validate;