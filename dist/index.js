"use strict";
const form = document.querySelector('#regform');
form.onsubmit = (ev) => {
    var _a;
    if (((_a = ev.submitter) === null || _a === void 0 ? void 0 : _a.id) === "register") {
        const formData = new FormData(form);
        const email = formData.get('email');
        const pwd = formData.get('pwd');
        const cpwd = formData.get('cpwd');
        const fname = formData.get('fname');
        const lname = formData.get('lname');
        const phone = formData.get('phone');
        const gender = formData.get('gender');
        const address = formData.get('address');
        let validationVerdict = validateForm(email, pwd, cpwd, phone);
        if (validationVerdict === true) {
            console.log("First Name:", fname, "Last Name:", lname, "Email:", email, "Password", pwd, "Gender:", gender, "Phone:", phone, "Address:", address);
            form.reset();
        }
    }
    else {
        console.log("Form submission cancelled");
        form.reset();
    }
    return false;
};
function validateForm(email, pwd, cpwd, phone) {
    let checksPassed = true;
    if (pwd !== null && cpwd !== null) {
        const pwdStr = pwd === null || pwd === void 0 ? void 0 : pwd.toString();
        const cpwdStr = cpwd === null || cpwd === void 0 ? void 0 : cpwd.toString();
        const cpwdErr = document.getElementById('cpwd-err');
        if (pwdStr !== cpwdStr) {
            checksPassed = false;
            if (cpwdErr !== null) {
                cpwdErr.title = "Passwords don't match";
                cpwdErr.style.display = "block";
            }
        }
        else {
            if (cpwdErr !== null) {
                cpwdErr.style.display = "none";
                cpwdErr.title = "";
            }
        }
    }
    if (email !== null) {
        const emailStr = email === null || email === void 0 ? void 0 : email.toString();
        const emailErr = document.getElementById('email-err');
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailStr) == false) {
            if (emailErr) {
                emailErr.style.display = "block";
                emailErr.title = "Invaild email format";
            }
            checksPassed = false;
        }
        else {
            if (emailErr) {
                emailErr.style.display = "none";
                emailErr.title = "";
            }
        }
    }
    if (phone !== null) {
        const phoneStr = phone === null || phone === void 0 ? void 0 : phone.toString();
        const phoneErr = document.getElementById('phone-err');
        let errType = 0;
        if (/[6-9][0-9]+/.test(phoneStr) == false) {
            checksPassed = false;
            errType = 1;
        }
        else if (phoneStr.length != 10) {
            checksPassed = false;
            errType = 2;
        }
        if (phoneErr) {
            if (errType == 1) {
                phoneErr.style.display = "block";
                phoneErr.title = "Phone number should start with 6-9 and contain only digits";
            }
            else if (errType == 2) {
                phoneErr.style.display = "block";
                phoneErr.title = "Phone number must be 10 digits long";
            }
            else {
                phoneErr.style.display = "none";
                phoneErr.title = "";
            }
        }
    }
    return checksPassed;
}
//# sourceMappingURL=index.js.map