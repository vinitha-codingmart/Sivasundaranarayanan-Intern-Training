var mKey;

var mailError = false, passError = false, cpassError = false;
var error = false;

window.onload = initiate = () => {
    mKey = "log_details";
    console.log(mKey);
    let json = JSON.parse(localStorage.getItem(mKey));
    if (!json) {
        json = new Object();
        json.users = new Object();
        localStorage.setItem(mKey, JSON.stringify(json));
    }
};

var openTab = (from, to) => {
    let btns = document.getElementsByTagName("button");
    if (to) {
        document.getElementById('Signup').classList.add('show');
        document.getElementById('Signin').classList.remove('show');
    } else {
        document.getElementById('Signup').classList.remove('show');
        document.getElementById('Signin').classList.add('show');
    }
    btns[to].classList.add('active');
    btns[from].classList.remove('active');

}

var signup = () => {
    validate();
    if (!(mailError || passError || cpassError || error)) {
        createAcc();
        openTab(1,0);
    }
}

let validate = () => {
    let mail, pass, fname, lname, cpass;
    let current = document.getElementsByClassName("show");
    if (current[0].id == "Signin") {
        mail = document.getElementById('in_mail');
        pass = document.getElementById('in_pass');

        if (mail.value == "" || pass.value == "") {
            document.getElementById("in_error").innerHTML = "Enter Email ID and Password"
            document.getElementById("in_error").classList.add("show");
            error = true;
        } else {
            document.getElementById("in_error").classList.remove("show");
            error = false;;
        }

    } else {
        mail = document.getElementById('up_mail');
        fname = document.getElementById('up_fname');
        lname = document.getElementById('up_lname');
        pass = document.getElementById('up_pass');
        cpass = document.getElementById('up_cpass');

        if (mail.value == "" || fname.value == "" || lname.value == "" || pass.value == "" || cpass.value == "") {
            document.getElementById("up_error").innerHTML = "Enter all the details"
            document.getElementById("up_error").classList.add("show");
            error = true;
        } else {
            document.getElementById("up_error").classList.remove("show");
            error = false;
        }
    }
}

let createAcc = () => {
    let store = localStorage;
    let json = JSON.parse(store.getItem(mKey));
    let data = new Object();
    data.name = document.getElementById("up_fname").value + ' ' + document.getElementById("up_lname").value;
    data.pass = document.getElementById("up_pass").value;
    let mail = document.getElementById("up_mail").value;
    if (json) {
        if (isIdPresent(mail, json.users)) {
            alert("You're already our student");
            return;
        }
    }
    addUser(json, data, mail);
    clear();
}

var clear = () => {
    document.getElementById("up_fname").value = document.getElementById("up_lname").value = document.getElementById("up_mail").value = document.getElementById("up_pass").value = document.getElementById("up_cpass").value = "";
}

var signin = () => {
    validate();
    if (!error)
        login();
}

var login = () => {
    let store = localStorage;
    let json = JSON.parse(store.getItem(mKey));
    let mail = document.getElementById("in_mail").value;
    let pass = document.getElementById("in_pass").value;
    if (json) {
        if (isIdPresent(mail, json.users)) {
            if (json.users[mail].pass == pass) {
                alert("Hi " + json.users[mail].name);
            }
        }
    }

}

let isIdPresent = (mail, data) => {
    let cmd = false;
    if (data)
        Object.keys(data).forEach((key) => {
            if (key == mail) {
                cmd = true;
                return;
            }
        })
    return cmd;
}

var addUser = (json, data, key) => {
    json.users[key] = data;
    json = JSON.stringify(json);
    localStorage.setItem(mKey, json);
}

var validateMail = () => {
    let mail = document.getElementById("up_mail").value;
    if (!mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        document.getElementById("up_mail_error").classList.add("show");
        mailError = true;
    }
    else {
        document.getElementById("up_mail_error").classList.remove("show");
        mailError = false;
    }
}

var validatePass = () => {
    let pass = document.getElementById("up_pass").value;
    if (!pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&/])(?=.{8,})/)) {
        document.getElementById("up_pass_error").classList.add("show");
        passError = true;
    } else {
        document.getElementById("up_pass_error").classList.remove("show");
        passError = false;
    }
    validateCPass();
}

var validateCPass = () => {
    if (document.getElementById("up_cpass").value != "") {
        if (document.getElementById("up_pass").value != document.getElementById("up_cpass").value) {
            document.getElementById("up_cpass_error").classList.add("show");
            cpassError = true;
            return;
        }
    }
    document.getElementById("up_cpass_error").classList.remove("show");
    cpassError = false;
}