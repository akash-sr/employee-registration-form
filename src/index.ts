const form = document.querySelector('#regform') as HTMLFormElement;

form.onsubmit = (ev:SubmitEvent) => {
    if (ev.submitter?.id === "register"){
        const formData = new FormData(form);

        const email = formData.get('email');
        const pwd = formData.get('pwd');
        const cpwd = formData.get('cpwd');
        const fname = formData.get('fname');
        const lname = formData.get('lname');
        const phone = formData.get('phone');
        const gender = formData.get('gender');
        const address = formData.get('address');

        const validationVerdict = validateForm(email, pwd, cpwd, phone);
        const verdict = document.getElementById('verdict')
        if(verdict!==null){
            verdict.innerHTML = "";
        }

        if(validationVerdict.length>0){
            for(let i=0;i<validationVerdict.length;i++) {
                const verdictMessage = validationVerdict[i];
                let content = document.createTextNode(verdictMessage).textContent;
                let tag = document.createElement("p");
                tag.innerHTML = content?content:"";
                verdict?.appendChild(tag)
            }   
        } else{
            console.log("First Name:", fname, 
            "Last Name:", lname, 
            "Email:", email,
            "Password", pwd,
            "Gender:", gender, 
            "Phone:", phone,
            "Address:", address);

            form.reset()
        } 
    }
    else{
        console.log("Form submission cancelled")
        form.reset();
    }

    
    return false;
}

function validateForm(email:FormDataEntryValue | null, pwd:FormDataEntryValue | null, cpwd:FormDataEntryValue | null, phone:FormDataEntryValue|null):string[]{
    let validationMessages:string[] = []
    // let checksPassed:boolean = true;
    if (pwd !== null && cpwd !== null){
        const pwdStr = pwd?.toString();
        const cpwdStr = cpwd?.toString();
        if(pwdStr!== cpwdStr){
            validationMessages = validationMessages.concat(["Passwords don't match"])
        }
        // checksPassed = false;
    }else{
        validationMessages = validationMessages.concat(["Missing password"])
    }

    if(email !== null){
        const emailStr = email?.toString()
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailStr) == false){
            validationMessages = validationMessages.concat(["Invalid Email Format"])
            // checksPassed = false;  
        }
    }else{
        validationMessages = validationMessages.concat(["Missing email"])
    }

    if(phone!==null){
        const phoneStr = phone?.toString()
        if(/d+/.test(phoneStr) || phoneStr.length != 10){
            validationMessages = validationMessages.concat(["Invalid phone number format"])
            // checksPassed = false; 
        }
    }
    return validationMessages
}