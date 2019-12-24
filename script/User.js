var sKey;
var video = document.getElementById('model-video');

window.onload = () => {
    sKey = "session_details";
    let title = document.getElementsByClassName('user-name')[0];
    title.innerHTML = getUserName();
    updateVolume(video.volume);
}

getUserName = () => {
    let name = localStorage.getItem(sKey);
    return name;
}

var openNav = () => {
    let bar = document.getElementsByClassName("side-wrapper")[0];
    if (bar.style.width == "250px") {
        bar.style.width = "0";

    } else
        bar.style.width = "250px"
}

var openModal = () => {
    document.getElementsByClassName('modal')[0].style.height = "100%";
}

var closeModal = () => {
    document.getElementsByClassName('modal')[0].style.height = "0%";
}

var toggleplay = () => {
    let video = document.getElementById("model-video");
    let status = document.getElementsByClassName('show')[0].classList[0];
    let pause = document.getElementsByClassName('pause')[0];
    let play = document.getElementsByClassName('play')[0];
    console.log(status);
    if (status == 'pause') {
        video.pause();
    } else {
        video.play();
    }
    play.classList.toggle('show');
    pause.classList.toggle('show');
}

window.onclick = (event) => {
    if (event.target == document.getElementsByClassName('modal')[0])
        document.getElementsByClassName('modal')[0].style.height = "0%";

}

document.getElementById('seekbar').oninput = function () {
    let time = video.duration * (this.value/100);
    video.currentTime = time
    updateSeekbar(time);
};

document.getElementById('volumebar').oninput = function () {
    let volume = this.value;
    video.volume = volume;
    updateVolume(volume);
};

var playertoggle = () => {
    toggleplay();
}

video.onended = () => {
    document.getElementById('seekbar').value = '0';    
    toggleplay();
}

video.ontimeupdate = () => {
    let value = (100 / video.duration) * video.currentTime;
    updateSeekbar(value);
}

var updateSeekbar = (value) => {
    let seekbar = document.getElementById('seekbar');
    seekbar.style.background = 'linear-gradient(to right, #64aff5 0%, #64aff5 ' + value + '%, #bdbdbd ' + value + '%, #bdbdbd 100%)';
    seekbar.value = value;
}

var updateVolume = (value) => {
    let volume = document.getElementById('volumebar');
    volume.style.background = 'linear-gradient(to right, #64aff5 0%, #64aff5 ' + value*100 + '%, #bdbdbd ' + value*100 + '%, #bdbdbd 100%)';
}