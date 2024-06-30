const Validate = (email,password)=>{
    const emailCheck = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    if(!emailCheck) return "Enter a Valid Email";
    if(!passwordCheck) return "Enter a Valid password containing 8 digits[numbers,literals(One upperCase),special character]";
    return null;
}
export default Validate;