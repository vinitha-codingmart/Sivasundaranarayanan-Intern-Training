var sKey;
var video = document.getElementById('model-video');
var data;
var current;

window.onload = () => {
    // sKey = "session_details";
    // if (!localStorage.getItem('session_details')) window.location.replace = "./index.html";

    if (!userPresent())
        window.location.href = "./index.html";
    let title = document.getElementsByClassName('user-name')[0];
    title.innerHTML = getUserName();
    loadData();
    populateView();
}

initializePlayer = (index) => {
    let source = document.createElement('source');
    source.src = data[index].link;
    source.type = data[index].linkType;
    video.appendChild(source);
    video.currentTime = data[index].last;
    updateVolume(video.volume);
    updateProgress(video.currentTime);
    toggleplay(false);
}

// getUserName = () => {
//     let name = localStorage.getItem(sKey);
//     return name;
// }

var openNav = () => {
    let bar = document.getElementsByClassName("side-wrapper")[0];
    if (bar.style.width == "250px") {
        bar.style.width = "0";

    } else
        bar.style.width = "250px"
}

var logout = () => {
    logoutUser();
}

var openModal = (index) => {
    initializePlayer(index);
    current = index;
    document.getElementsByClassName('modal')[0].style.height = "100%";
}

var closeModal = () => {
    document.getElementsByClassName('modal')[0].style.height = "0%";
    data[current].last = video.currentTime;
    video.removeAttribute('src');
    video.load();
}

var toggleplay = (flag) => {
    let pause = document.getElementsByClassName('pause')[0];
    let play = document.getElementsByClassName('play')[0];
    if (flag && (video.paused || video.ended)) {
        video.play();
        play.classList.remove('show');
        pause.classList.add('show');
    } else {
        video.pause();
        play.classList.add('show');
        pause.classList.remove('show');
    }
}

window.onclick = (event) => {
    if (event.target == document.getElementsByClassName('modal')[0])
        closeModal();
}

document.getElementById('seekbar').oninput = function () {
    let time = video.duration * (this.value / 100);
    video.currentTime = time;
};

document.getElementById('volumebar').oninput = function () {
    let volume = this.value;
    video.volume = volume;
    updateVolume(volume);
};

var playertoggle = () => {
    toggleplay(true);
}

video.onended = () => {
    document.getElementById('seekbar').value = '0';
    toggleplay(false);
}

video.ontimeupdate = () => {
    let value = (100 / video.duration) * video.currentTime;
    updateProgress(value);
}

var updateProgress = (value) => {
    let seekbar = document.getElementById('seekbar');
    seekbar.style.background = 'linear-gradient(to right, #f44336 0%, #f44336 ' + value + '%, #bdbdbd ' + value + '%, #bdbdbd 100%)';
    seekbar.value = value;
}

var updateVolume = (value) => {
    let volume = document.getElementById('volumebar');
    volume.style.background = 'linear-gradient(to right, #64aff5 0%, #64aff5 ' + value * 100 + '%, #bdbdbd ' + value * 100 + '%, #bdbdbd 100%)';
    if (value < .1)         //value = 0
        showVolumeicon(2);
    else if (value > .5)    // value > .5
        showVolumeicon(0);
    else                    // .1 <= value <= .5
        showVolumeicon(1);
}

var showVolumeicon = (selector) => {
    let icon = document.getElementsByClassName('volume-icon');
    let itr, cnt = icon.length;
    for (itr = 0; itr < cnt; itr++) {
        icon[itr].style.display = 'none';
    }
    icon[selector].style.display = 'block';
}

loadData = () => {
    data = [{
        heading: "Popular Nanodegree Program",
        title: "Deep Learning Nanodegree",
        content: "Learn about foundational topics in the exciting field of deep learning, the technology behind state-of-the-art artificial intelligence.",
        link: "https://www.w3docs.com/build/videos/arcnet.io(7-sec).mp4",
        linkType: "video/mp4",
        last: ""
    }, {
        heading: "Popular Nanodegree Program",
        title: "Data Analyst Nanodegree",
        content: "Learn to clean up messy data, uncover patterns and insights, make predictions using machine learning, and clearly communicate your findings.",
        link: "https://www.w3docs.com/build/videos/arcnet.io(7-sec).mp4",
        linkType: "video/mp4",
        last: ""
    }, {
        heading: "Popular Nanodegree Program",
        title: "Self-Driving Car Nanodegree",
        content: "Work on some of the most cutting-edge technologies and help make the self-driving car revolution a reality!",
        link: "https://www.w3docs.com/build/videos/arcnet.io(7-sec).mp4",
        linkType: "video/mp4",
        last: ""
    }, {
        heading: "Data Analyst Nanodegree",
        title: "Digital Marketing Nanodegree",
        content: "Gain real-world experience running live campaigns as you learn from experts. Launch your career with a 360-degree understanding of digital marketing.",
        link: "https://www.w3docs.com/build/videos/arcnet.io(7-sec).mp4",
        linkType: "video/mp4",
        last: ""
    }, {
        heading: "Popular Nanodegree Program",
        title: "React Developer Nandogree",
        content: "React is completely transforming the Front-End Development landscape. Come master this powerful UI library from Facebook, and learn career-ready skills with Udacity and the experts from React Training",
        link: "https://www.w3docs.com/build/videos/arcnet.io(7-sec).mp4",
        linkType: "video/mp4",
        last: ""
    }, {
        heading: "Popular Nanodegree Program",
        title: "Intro to Programming Nanodegree",
        content: "Welcome to the world of programming. Learn the foundational skills that all programmers use whether they program mobile apps, create web pages, or analyze data.",
        link: "https://www.w3docs.com/build/videos/arcnet.io(7-sec).mp4",
        linkType: "video/mp4",
        last: ""
    }];

}

populateView = () => {
    let ele, htmlDoc;
    var parser = new DOMParser();
    for (let itr = 0; itr < 6; itr++) {
        ele = `
        <li>
            <div class="card-wrapper" onclick="openModal(${itr})">
                <div class="card-content">
                    <div class="card-header">
                        <h3>
                            <svg viewBox="0 0 32 32">
                                <path
                                    d="M19.566 21h5.693l-5.25-9-2.85 4.988L19.566 21zm-1.29-10h-4.553L16 14.984 18.277 11zM20 9a.99.99 0 0 1 .865.496l7 12A1 1 0 0 1 27 23h-8a1 1 0 0 1-.857-.486L16 18.944l-2.143 3.57A1 1 0 0 1 13 23H5a1 1 0 0 1-.864-1.504l7-12A.99.99 0 0 1 12.001 9h7.998zM6.741 21h5.693l2.407-4.012L11.991 12l-5.25 9z"
                                    fill-rule="nonzero"></path>
                            </svg>
                            ${data[itr].heading}
                        </h3>
                        <h4>
                        ${data[itr].title}
                        </h4>
                    </div>
                    <div class="card-summary">
                        <p>
                            ${data[itr].content}
                    </p>
                    </div>
                </div>
                <div class="card-action">
                    <button>
                        <span>Learn More</span>
                    </button>
                </div>
            </div>
        </li>`
        htmlDoc = parser.parseFromString(ele, 'text/html');
        document.getElementById('cards').appendChild(htmlDoc.documentElement)
    }
}