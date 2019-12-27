const app = "myapp";

let routes = {};

let route = (name, template) => {
    routes[name] = template;
}

let resolverouter = (route) => {
    try {
        return routes[route];
    } catch(e) {
        throw new Error(e);
    }
}

let router = () => {
    let url =  "/" + window.location.hash.slice(1);
    const resolvedrouter = resolverouter(url);
    resolvedrouter.call(this);
}

route('/', () => {
    document.getElementById(app).innerHTML = document.getElementById('mainDiv').innerHTML;
});


route('/Sign', () => {
    document.getElementById(app).innerHTML = document.getElementById('signDiv').innerHTML;
    signLoad();
});


route('/Programs', () => {
    document.getElementById(app).innerHTML = "<h3>Programs</h3>";
});

route('/Enterprise', () => {
    document.getElementById(app).innerHTML = "<h3>Enterprise</h3>";
});

route('/Start', () => {
    document.getElementById(app).innerHTML = "<h3>Start</h3>";
});

route('/Career', () => {
    document.getElementById(app).innerHTML = "<h3>Career</h3>";
});

window.onhashchange = () => {
    router();
};
window.onload = router();