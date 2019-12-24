var sKey;

window.onload = () => {
    sKey = "session_details";
    let title = document.getElementsByClassName('user-name')[0];
    title.innerHTML = getUserName();
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

var openModal = ()  => {
    document.getElementsByClassName('modal')[0].style.height = "100%";
}

var closeModal = () => {
    document.getElementsByClassName('modal')[0].style.height = "0%";
}

window.onclick = (event) => {
    if(event.target == document.getElementsByClassName('modal')[0])
        document.getElementsByClassName('modal')[0].style.height = "0%";

}
