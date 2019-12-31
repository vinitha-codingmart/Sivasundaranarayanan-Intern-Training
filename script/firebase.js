var firebaseConfig = {
    apiKey: "AIzaSyDQRyC45kbMrMMVF02hT1nwgbjuzGTnE8w",
    authDomain: "udacity-9489b.firebaseapp.com",
    databaseURL: "https://udacity-9489b.firebaseio.com",
    projectId: "udacity-9489b",
    storageBucket: "udacity-9489b.appspot.com",
    messagingSenderId: "30882940634",
    appId: "1:30882940634:web:5f57883b9b1a95f06707e3",
    measurementId: "G-CXTD71F641"
};

firebase.initializeApp(firebaseConfig);

// firebase.auth().onAuthStateChanged( (user) => {
//     if(user) {
//         window.location.href = "./User.html";
//     } else {
//         window.location.href = "./index.html";
//     }
// })

var login = (email, pass) => {
    firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
        
        window.location.href = "./User.html";
    }).catch((error) => {
        switch (error.code) {
            case 'auth/invalid-email':
            case 'auth/wrong-password':
            case 'auth/user-not-found':
                document.getElementById('in_error').classList.add('show');
        }

    });
}

var createAcc = (email, pass, name) => {
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
        updateProfile(name);
    }).catch((error) => {
        if (error.code === 'auth/email-already-in-use')
            alert("You're already our customer");
    });
}


var updateProfile = (name) => {
    var user = firebase.auth().currentUser;
    user.updateProfile({ displayName: name }).then(() => {
        window.location.href = "./User.html";
    });
}

logoutUser = () => {
    firebase.auth().signOut()
        .then(() => {
            window.location.href = "./index.html";
        });
}

userPresent = () => {
    if (firebase.auth().currentUser) {
        console.log(firebase.auth().currentUser);
        return true;
    } else
        return false;
}

getUserName = () => {
    console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser.displayName;
}