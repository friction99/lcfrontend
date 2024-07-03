const validateEmail = (email)=>{
    const emailCheck = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    if (!emailCheck) return 'Invalid email';
    return null;
}
export default validateEmail;