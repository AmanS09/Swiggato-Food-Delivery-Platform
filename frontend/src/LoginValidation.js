function Validation(values){
    alert("")
    let error= {}
    const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.email === ""){
        error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email Didn't match"
    }
    else{
        error.email = ""
    }

    if(values.password === ""){
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password = " Password should have at least one digit, one lowercase letter, one uppercase letter, and be a minimum of 8 characters long, without special character."
    }
    else{
        error.password = ""
    }
        return error;

}

export default Validation;