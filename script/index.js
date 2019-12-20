window.onscroll = () => {
    if (window.pageYOffset >= 150) {
        document.getElementById("wrapper").classList.add("sticky");
    } else {
        document.getElementById("wrapper").classList.remove("sticky");
    }
}



var intercom = () => {
    var intercomms = document.getElementsByClassName("intercom-button");
    var comms;
    for (let ind = 0; ind < intercomms.length; ind++)
        intercomms[ind].classList.toggle("show");
};

var openNav = () => document.getElementById("mov-sidenav").style.width = "250px";

window.onclick = (event) => {
    console.log(event.target);
    if (!event.target.matches('.hbar'))
        if (!event.target.matches('.sidenav')) {
            document.getElementById("mov-sidenav").style.width = "0";
        }
}

