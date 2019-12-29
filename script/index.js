var fetchsrclocation = () => {
    let string = document.getElementById('bus-src').value;
    fetchlocation(string, null);
}

var fetchdestlocation = () => {
    let string = document.getElementById('bus-dest').value;
    fetchlocation(string, document.getElementById('bus-src').value);
}

var fetchlocation = (string, constraint) => {
    string = (string) ? string : 'All locations';
    let promise = fetch(`https://www.redbus.in/Home/SolarSearch?search=${string}`)
        .then((res) => res.json())
        .then((data) => {
            populate(data['response'].docs, constraint);
        })
}

var populate = (json, constraint) => {
    let flag = (!constraint) ? "src" : "dest";
    let div = document.getElementById(`city-list-${flag}`);
    let cnt = 0;
    div.innerHTML = "<ol>";
    json.forEach((data) => {
        if (data.Name != constraint) {
            div.innerHTML += `<li onclick="fetchId(${data.ID},'${data.Name}','${flag}')">${data.Name}</li><br/>`;
            cnt++;
        }
    })
    div.innerHTML += cnt;
}

var fetchId = (id, name, flag) => {
    document.getElementById(`bus-${flag}`).value = name;
    document.getElementById(`city-list-${flag}`).innerHTML = id;
}

var searchBuses = () => {
    let src = document.getElementById(`city-list-src`).innerHTML;
    let dest = document.getElementById(`city-list-dest`).innerHTML;
    let proxy = `https://cors-anywhere.herokuapp.com/`
    let url = `https://www.redbus.in/search/SearchResults?fromCityId=${src}&toCityId=${dest}&DOJ=29-Dec-2019&sectionId=0&groupId=0&limit=0&offset=0&sort=0&sortOrder=0&meta=true&returnSearch=0`;

    let promise = fetch(proxy+url,
        {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' }
        })
        .then((res) => {
            console.log(res);
            return res.json();
        }
        )
        .then((data) =>
            console.log(data));
}

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
    for (let ind = 0; ind < intercomms.length; ind++) {
        intercomms[ind].classList.toggle("show");
    }
    comms.classList.toggle("show");
};

var openNav = () => document.getElementById("mov-sidenav").style.width = "250px";

window.onclick = (event) => {
    if (!event.target.matches('.hbar')) {
        if (!event.target.matches('.sidenav')) {
            document.getElementById("mov-sidenav").style.width = "0";
        }
    } if (event.target.matches('#bus-search'))
        searchBuses();

}