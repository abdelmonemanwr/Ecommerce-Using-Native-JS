document.querySelector("form button").addEventListener("click", submitData);

function submitData(event) {
    event.preventDefault();
    let fullNameInput = document.querySelector(".full-name input");
    let emailInput = document.querySelector(".email input");
    let msgInput = document.querySelector(".message textarea");
    let passwordInput = document.querySelector(".password input");
    let confirmPassword = document.querySelector(".confirm-password input");

    let valid = true;

    // no symbols
    let fullNameInputValidation = /^[a-zA-Z0-9]{5,}/;

    fullNameInput.value = fullNameInput.value.trim();
    if(fullNameInput.value === "") {
        showError("Username can't be empty", ".full-name");
        valid = false;
    }
    // if name doesn't start with a character produce error
    else if(fullNameInput.value.length >= 5 && !fullNameInput.value.charAt(0).match(/^[a-zA-Z]+$/)) { 
        showError("Username must start with a charcter", ".full-name");
        valid = false;
    } 
    else if(fullNameInput.value.length >= 5 && fullNameInput.value.includes(" ")){
        console.log("test");
        showError("Username shouldn't contain any spaces", ".full-name");
        valid = false;
    }
    else if (fullNameInputValidation.test(fullNameInput.value)) {
        document.querySelector(`.full-name p`).style.cssText = "display:none;";
    } else {
        showError("Username length must be at least 5 characters", ".full-name");
        valid = false;
    }

    // let emailInputValidation = /^[a-zA-Z0-9]{5,}\@(gmail|yahoo|hotmail|outlook|icloud)\.com$/;

    // if (emailInputValidation.test(emailInput.value)) {
    //     document.querySelector(`.email p`).style.cssText = "display:none;";
    // } 
    // else if(!(emailInputValidation.value.includes("@gmail.com") || emailInputValidation.value.includes("@yahoo.com") || emailInputValidation.value.includes("@hotmail.com") || emailInputValidation.value.includes("@outlook.com")|| emailInputValidation.value.includes("@icloud.com"))){
    //     showError("your domain should be one of these gmail | yahoo | hotmail | outlook | icloud", ".email");
    //     valid = false;
    // } else {
    //     showError("email length must be at least 5 characters", ".email");
    //     valid = false;
    // }

    let emailInputValidation = /^[a-zA-Z0-9]{5,}@(gmail|yahoo|hotmail|outlook|icloud)\.com$/;
    if (emailInputValidation.test(emailInput.value)) {
        document.querySelector(`.email p`).style.cssText = "display:none;";
    } 
    else if(emailInput.value === "") {
        showError("Email can't be empty", ".email");
        valid = false;
    }
    else if(!(emailInput.value.includes("@gmail.com") || emailInput.value.includes("@yahoo.com") || emailInput.value.includes("@hotmail.com") || emailInput.value.includes("@outlook.com")|| emailInput.value.includes("@icloud.com"))){
        showError("your domain should be one of these: gmail | yahoo | hotmail | outlook | icloud", ".email");
        valid = false;
    } else {
        showError("email length must be at least 5 characters", ".email");
        valid = false;
    }


    // let passwordInputValidation = /^.{12,}/;
    // if(passwordInputValidation.value === "") {
    //     showError("Password can't be empty", ".password");
    //     valid = false;
    // }
    // else if (passwordInputValidation.test(passwordInput.value)) {
    //     document.querySelector(".password p").style.cssText = "display:none;";
    // } else {
    //     showError("password length must be at least 8", ".password");
    //     valid = false;
    // }

    // if(confirmPassword.value === "") {
    //     showError("Confirm Password can't be empty", ".confirm-password");
    //     valid = false;
    // }
    // else if (confirmPassword.value == passwordInput.value) {
    //     document.querySelector(".confirm-password p").style.cssText = "display:none;";
    // } else {
    //     showError("password not identical", ".confirm-password");
    //     valid = false;
    // }

     let passwordInputValidation = /^.{8,}$/;
    if(passwordInput.value === "") {
        showError("Password can't be empty", ".password");
        valid = false;
    }
    else if (passwordInputValidation.test(passwordInput.value)) {
        document.querySelector(".password p").style.cssText = "display:none;";
    } else {
        showError("Password length must be at least 8 characters", ".password");
        valid = false;
    }

    if(confirmPassword.value === "") {
        showError("Confirm Password can't be empty", ".confirm-password");
        valid = false;
    }
    else if (confirmPassword.value == passwordInput.value) {
        document.querySelector(".confirm-password p").style.cssText = "display:none;";
    } else {
        showError("Passwords not identical", ".confirm-password");
        valid = false;
    }


    let msgInputValidation = /^.{15,}/;
    if(msgInput.value === "") {
        showError("Message can't be empty", ".message");
        valid = false;
    }
    else if(msgInputValidation.test(msgInput.value)){
        document.querySelector(`.message p`).style.cssText = "display:none;";
    } else {
        showError("Message's length must be at least 15 characters", ".message");
        valid = false;
    }

    if (valid == true) {
        swal({
            title: "Message",
            text: "submitted successfully",
            icon: "success",
            button: "ok",
        });
        msgInput.value = "";
        emailInput.value = "";
        fullNameInput.value = "";
    } 
}
function showError(message, element){
    let errorP = document.querySelector(`${element} p`);
    errorP.innerText = message;
    errorP.style.cssText ="display:block;"
}