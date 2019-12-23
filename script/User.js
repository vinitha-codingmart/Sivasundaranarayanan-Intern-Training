var sKey;

window.onload = () => {
    sKey = "session_details";
    let title = document.getElementsByClassName('body-title')[0];
    title.innerHTML = title.innerHTML + ' ' + getUserName();
}

getUserName = () => {
    let name = localStorage.getItem(sKey);
    return name;
}

var openNav = () => { 
    let bar = document.getElementsByClassName("side-wrapper")[0];
    if(bar.style.width == "250px") {
        bar.style.width = "0";

    }else
        bar.style.width = "250px"
 }
