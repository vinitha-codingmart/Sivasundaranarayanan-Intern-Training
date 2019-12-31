

var srcId, destId, src, dest, date;

google.charts.load("current", { packages: ["bar",'corechart'] });
//google.charts.setOnLoadCallback(drawChart);

var clearsrclocation = () => {
    document.getElementById(`city-list-src`).innerHTML = "";
}

var cleardestlocation = () => {
    document.getElementById(`city-list-dest`).innerHTML = "";
}

var fetchsrclocation = () => {
    let string = document.getElementById('bus-src').value;
    fetchlocation(string, null);
}

var fetchdestlocation = () => {
    let string = document.getElementById('bus-dest').value;
    fetchlocation(string, (document.getElementById('bus-src').value) ? document.getElementById('bus-src').value : " ");
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
    div.innerHTML = "";
    json.forEach((data) => {
        if (data.Name != constraint) {
            div.innerHTML += `<li onclick="fetchId(${data.ID},'${data.Name}','${flag}')">${data.Name}</li>`;
        }
    })

}

var fetchId = (id, name, flag) => {
    document.getElementById(`bus-${flag}`).value = name;
    document.getElementById(`city-list-${flag}`).innerHTML = "";
    document.getElementById(`bus-${flag}-id`).innerHTML = id;
    (flag == "dest") ? cleardestlocation() : clearsrclocation();
}

var searchBuses = () => {
    srcId = document.getElementById(`bus-src-id`).innerHTML;
    destId = document.getElementById(`bus-dest-id`).innerHTML;
    src = document.getElementById(`bus-src`).value;
    dest = document.getElementById(`bus-dest`).value;
    date = document.getElementById('bus-jdate').value;

    let promise = callApi(0, 10);
    promise.then((res) => {
        return res.json();
    }).then((data) => {
        createPagination(data.metaData.totalCount);
        populateBuses(data);
        drawChart(data);
    });
}

callApi = (off, lim) => {
    document.getElementById('bus-list-content').innerHTML = " ";
    document.getElementById('L4').style.display = "block";

    let proxy = `https://cors-anywhere.herokuapp.com/`
    let url = `https://www.redbus.in/search/SearchResults?fromCity=${srcId}&toCity=${destId}&src=${src}&dst=${dest}&DOJ=${date}&sectionId=0&groupId=0&limit=${lim}&offset=${off}&sort=0&sortOrder=0&meta=true&returnSearch=0`;

    let ret = fetch(proxy + url, {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' }
    });
    return ret;
}


function drawChart(data) {
    var chartData = [];
    let cnt = data.inv.length;
    for (itr = 0; itr < cnt; itr++) {
        chartData[itr] = [`${data.inv[itr].Tvs}`, getTime(data.inv[itr].at)];
    }

    var view = new google.visualization.DataTable({
        cols: [
            { label: 'Travels', type: 'string' },
            { label: 'Time of Depature', type: 'timeofday' }
        ]
    });
    view.addRows(chartData);

    var options = {
        hAxis: {
            slantedText:true,
            slantedTextAngle: 90
        },
        width: 800,
        height: 600
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("barchart_values"));
    chart.draw(view, options);
}

getTime = (time) => {
    let date = new Date(time);
    let ret = [date.getHours(), date.getMinutes(), 0];
    return ret;
}

var createPagination = (count) => {
    console.log(count);
    let nos = (Math.floor(count / 10)) + ((count % 10) ? 1 : 0);
    let pages = document.getElementById("bus-list-pages");
    pages.innerHTML = "";
    let page;
    for (itr = 1; itr <= nos; itr++) {
        page = document.createElement('a');
        page.setAttribute('class', 'bus-page-item')
        page.setAttribute('id', `bus-page-item${itr}`);
        page.setAttribute('onclick', `refreshPage(${itr - 1},${(itr < nos) ? 10 : count % 10})`);
        page.innerHTML = itr;
        pages.appendChild(page);
    }
    document.getElementById("bus-page-item1").classList.add('activated');
}

var refreshPage = (offset, count) => {
    let promise = callApi(offset, count);
    promise.then((res) => {
        return res.json();
    }).then((data) => {
        drawChart(data);
        populateBuses(data);
    });

    document.getElementsByClassName('activated')[0].classList.remove('activated');
    document.getElementById(`bus-page-item${offset + 1}`).classList.add('activated');
}

populateBuses = (data) => {
    let container = document.getElementById('bus-list-content'), list_item;
    for (buses of data.inv) {
        let dept = new Date(buses.dt);
        let dt = `${(dept.getHours() < 10 ? '0' : '') + dept.getHours()}:${(dept.getMinutes() < 10 ? '0' : '') + dept.getMinutes()}`;
        let arvl = new Date(buses.at);
        let at = `${(arvl.getHours() < 10 ? '0' : '') + arvl.getHours()}:${(arvl.getMinutes() < 10 ? '0' : '') + arvl.getMinutes()}`;
        let dur = `${Math.floor(buses.dur / 60)}h ${buses.dur % 60}m`;

        let details = [
            {
                "T1": buses.Tvs,
                "T2": buses.bt
            }, {
                "T1": dt,
                "T2": buses.StdBp
            }, {
                "T1": dur
            }, {
                "T1": at,
                "T2": buses.StdDp
            }, {
                "T1": buses.rt.totRt,
                "T2": buses.rt.ct
            }, {
                "T1": 'Starts from',
                "T2": `INR ${buses.frLst[0]}`
            }, {
                "T1": `${buses.nsa} Seats available`,
                "T2": `${buses.WnSt} Window`
            }
        ]
        list_item = getBusCard(details);
        document.getElementById('L4').style.display = "none";
        container.appendChild(list_item);
    };
}

getBusCard = (bus) => {
    let bottom = getDiv('bus-bottom', null);
    let card = getDiv('bus-card', null);
    let top = getDiv('bus-top', null), child;

    for (let itr = 1; itr <= 7; itr++) {
        child = createColumn(itr, bus[itr - 1]);
        top.appendChild(child);
    }
    card.appendChild(top);

    child = getDiv('bus-features', null);
    child.appendChild(createList());
    bottom.appendChild(child);
    child = getDiv('bus-view-seats', "View Seats");
    bottom.appendChild(child);
    card.appendChild(bottom);

    return card;
}

createList = () => {
    let values = ["Amenities", "Bus Photos", "Boarding & Dropping Points", "Reviews", "Cancellation Policy", "Rest Stop(2)"];
    let parent = document.createElement('ul'), child;
    for (value of values) {
        child = document.createElement('li');
        child.innerHTML = value;
        parent.appendChild(child);
    }
    return parent;
}

createColumn = (ind, data) => {
    let parent = getDiv('bus-column', null);
    parent.classList.add(`col-${ind}`);
    let child = document.createElement('div');
    child.innerHTML = data.T1;
    parent.appendChild(child);
    if (data.T2) {
        child = document.createElement('div');
        child.innerHTML = data.T2;
        parent.appendChild(child);
    }
    return parent;
}

getDiv = (cls, value) => {
    let div = document.createElement('div');
    div.classList.add(cls);
    div.innerHTML = value;
    return div;
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
    }
    if (event.target.matches('#bus-search')) {
        document.getElementById('L4').style.display = "block";
        searchBuses();
    }
    if (!event.target.matches('.done')) {
        clearsrclocation();
        cleardestlocation();
    }
}

load = (event) => {
    let date = new Date();
    let jd = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    document.getElementById('bus-jdate').min = jd;
    document.getElementById('bus-jdate').value = jd;

    date.setDate(date.getDate() + 1);
    jd = `${date.getFullYear()}-${((date.getMonth() < 9) ? '0' : '') + (date.getMonth() + 1)}-${((date.getDate() < 10) ? '0' : '') + date.getDate()}`;
    document.getElementById('bus-rdate').min = jd;
    document.getElementById('bus-rdate').value = jd;
}