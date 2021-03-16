import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then((res) => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photoURL: photoURL,
                success: true
            };
            return(signedInUser);
        })
        .catch((error) => {
            console.log(error);
            console.log(error.message);
        });
};


export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            const credential = result.credential;
            const accessToken = credential.accessToken;
            const user = result.user;
            user.success = true;
            return user;           
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
};


export const handleSignOut = () => {
    return firebase
        .auth()
        .signOut()
        .then((res) => {
            const signedOutUser = {
                isSignedIn: false,
                name: "",
                email: "",
                photoURL: "",
            };
            return(signedOutUser);
        })
        .catch((err) => {});
};

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((res) => {
                    const newUserInfo = res.user;
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    updateUserName(name);
                    return newUserInfo;
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    const newUserInfo = {};
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    return newUserInfo;
                });
}


export const signInWithEmailAndPassword = (email, password) => {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
        const newUserInfo = res.user;
        newUserInfo.error = "";
        newUserInfo.success = true;
        return newUserInfo;
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}


const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
    })
        .then(function () {
            console.log("update");
        })
        .catch(function (error) {
            console.log(error);
        });
};