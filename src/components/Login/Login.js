import React, { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
    createUserWithEmailAndPassword,
    handleFbSignIn,
    handleGoogleSignIn,
    handleSignOut,
    initializeLoginFramework,
    signInWithEmailAndPassword,
} from "./LoginManager";

initializeLoginFramework();

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        photoURL: "",
        error: "",
        success: false,
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    };

    
    const googleSignIn = () => {
        handleGoogleSignIn().then((res) => {
           handleResponse(res, true);
        });
    };

    const signOut = () => {
        handleSignOut().then((res) => {
           handleResponse(res, false);
        });
    };

    const fbSignIn = () => {
        handleFbSignIn().then((res) => {
            handleResponse(res, true);
        });
    };

    let { from } = location.state || { from: { pathname: "/" } };
    const handleSubmit = (e) => {
        if (!newUser && user.email && user.password) {
            createUserWithEmailAndPassword(
                user.name,
                user.email,
                user.password
            ).then((res) => {
                setUser(res);
                setLoggedInUser(res);
            });
        }

        if (newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password).then(
                (res) => {
                    setUser(res);
                    setLoggedInUser(res);
                }
            );
        }

        e.preventDefault();
    };

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            {user.isSignedIn ? (
                <button onClick={signOut}>Sign out</button>
            ) : (
                <button onClick={googleSignIn}>Sign in</button>
            )}
            {user.isSignedIn && (
                <div>
                    <p>Welcome, {user.name}</p>
                    <p>Your email: {user.email}</p>
                    <img src={user.photoURL} alt="profile-pic" />
                </div>
            )}

            <br />
            <button onClick={fbSignIn}>Sign in Using Facebook</button>
            <h1>Our own authentication system</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="checkbox"
                    name="newUser"
                    id=""
                    onChange={() => {
                        setNewUser(!newUser);
                    }}
                />
                <label htmlFor="newUser">New user sign up</label>
                <br />
                {newUser && (
                    <input
                        type="text"
                        name="name"
                        onBlur={handleBlur}
                        id=""
                        placeholder="Your name"
                    />
                )}
                <br />
                <input
                    type="email"
                    onBlur={handleBlur}
                    name="email"
                    id=""
                    placeholder="Your email address"
                    required
                />
                <br />
                <input
                    type="password"
                    onBlur={handleBlur}
                    name="password"
                    id=""
                    placeholder="Your password"
                    required
                />
                <br />
                <input
                    type="submit"
                    value={newUser ? "Sign Up" : "Sign In"}
                    onClick={handleSubmit}
                />
            </form>
            <p style={{ color: "red" }}>{user.error}</p>
            {user.success && (
                <p style={{ color: "green" }}>
                    User {newUser ? "created" : "Logged in"} successfully
                </p>
            )}
        </div>
    );
}

export default Login;
