var mKey;

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
    if (validate())
        createAcc();
}

let validate = () => {
    let current = document.getElementsByClassName("show");
    if (current[0].id == "Signin") {
        let mail = document.getElementById('in_mail');
        let pass = document.getElementById('in_pass');
        if (mail.value != null)
            alert('Enter the mail');
    } else {

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
    if(validate()) {
        login();
    }
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