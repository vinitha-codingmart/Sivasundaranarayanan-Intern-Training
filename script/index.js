
window.onscroll = () => {
    if (window.pageYOffset >= 150) {
        document.getElementById("wrapper").classList.add("sticky");
    } else {
        document.getElementById("wrapper").classList.remove("sticky");
    }
}

var intercom = () => {
    var intercomms = document.getElementsByClassName("intercom-button");
    var comms = document.getElementsByClassName("intercom-chat")[0];
    for (let ind = 0; ind < intercomms.length; ind++){
        intercomms[ind].classList.toggle("show");
    }
    comms.classList.toggle("show");
};

var openNav = () => document.getElementById("mov-sidenav").style.width = "250px";

window.onclick = (event) => {
    if (!event.target.matches('.hbar'))
        if (!event.target.matches('.sidenav')) {
            document.getElementById("mov-sidenav").style.width = "0";
        }
}

