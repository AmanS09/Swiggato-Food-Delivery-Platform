function Validation(values){
    alert("")
    let error= {}
    const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const number_pattern=/^(7|8|9)\d{9}$/

    if(values.name === ""){
        error.name = "Name should not be empty"
    }
    else if(/\d/.test(values.name)) {
        error.name = "Name should not contain numbers"
    }
    else {
        error.name = ""
    }

    
    if(values.number === ""){
        error.number = "Phone Number should not be empty"
    }
    else if(!number_pattern.test(values.number)){
        error.number = "Phone Number is not Valid "
    }
   else{
        error.number = ""
    }

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