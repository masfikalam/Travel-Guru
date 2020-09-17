import React, { useContext, useState } from 'react';
import './Login.css'
import * as firebase from "firebase/app";
import "firebase/auth";
import { Button, Container, Form, FormControl } from 'react-bootstrap';
import firebaseConfig from './FireConfig';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import google from './google.png';
import fb from './fb.png';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [user, setUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(true);
    const [validForm, setValidForm] = useState(true);
    const history = useHistory();
    const location = useLocation();
    const {from} = location.state || {from:{pathname:"/"}};

    // google sign in
    const googleSingIn = () => {
        const providerGL = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(providerGL)
        .then(result => {
            const {displayName, email} = result.user;
            const optUser = {
                signed: true,
                name: displayName,
                email: email,
                message: 'Login Successful'
            }
            setUser(optUser);
            history.replace(from);
        })
        .catch(error => {
            const optUser = {};
            optUser.message = error.message;
            setUser(optUser);
        });
    }

    // facebook sign in
    const facebookSingIn = () => {
        const providerFB = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(providerFB)
        .then(result => {
            const {displayName, email} = result.user;
            const optUser = {
                signed: true,
                name: displayName,
                email: email,
                message: 'Login Successful'
            }
            setUser(optUser);
            history.replace(from);
        })
        .catch(error => {
            const optUser = {};
            optUser.message = error.message;
            setUser(optUser);
        });
    }

    // blur handler
    const handleBlur = (e) => {
        const optUser = {...user};
        optUser[e.target.name] = e.target.value;

        // confirming same password
        if(e.target.name === 'confirm'){
            if(e.target.value !== user.password){
                optUser.message = "Password Didn't Match";
                setValidForm(false);
            }
            else{
                optUser.message = '';
                setValidForm(true);
            }
        }
        setUser(optUser);
    }
    
    const subForm = (e) => {
        
        // email sign in
        if (newUser){
            if(validForm) {
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    const optUser = {
                        signed: true,
                        name: user.name,
                        email: user.email,
                        message: 'Login Successful'
                    }
                    setUser(optUser);
                    updateName(user.name);
                    history.replace(from);
                })
                .catch(error => {
                    const optUser = {...user};
                    optUser.message = error.message;
                    setUser(optUser);
                });
            }
        }

        // email login
        if (!newUser) {
                firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(result => {
                    const {displayName, email} = result.user;
                    const optUser = {
                        signed: true,
                        name: displayName,
                        email: email,
                        message: 'Login Successful'
                    }
                    setUser(optUser);
                    history.replace(from);
                })
                .catch(error => {
                    const optUser = {};
                    optUser.message = error.message;
                    setUser(optUser);
                });
        }
        e.preventDefault();
    }

    // update name
    const updateName = name => {
        const currentUser = firebase.auth().currentUser;
        currentUser.updateProfile({displayName: name})
        .then()
        .catch(error => {
            console.log(error);
        });
    }

    // forgot password
    const forgotPass = () => {
        const auth = firebase.auth();
        auth.sendPasswordResetEmail(user.email)
        .then(() => {
            const optUser = {...user};
            optUser.message = 'Password reset link sent to your email';
            setUser(optUser);
        })
        .catch(() => {
            const optUser = {...user};
            optUser.message = 'Email address is empty or badly formatted';
            setUser(optUser);
        });
    }

    return (
        <Container className="text-center text-white">
            <div className="mx-auto bg-dark p-3 rounded" id="login">
                <Form onSubmit={subForm}>
                    <h3 className="my-4">{newUser ? 'Create Account' : 'User Login'}</h3>
                    {
                        newUser && <FormControl onBlur={handleBlur} name="name" type="text" placeholder="Your Name" className="my-3 bg-light" required />
                    }

                    <FormControl onBlur={handleBlur} name="email" type="email" placeholder="Your Email" className="my-3 bg-light" required />

                    <FormControl onBlur={handleBlur} name="password" type="password" placeholder="Your Password" className="my-3 bg-light" required />

                    {
                        newUser && <FormControl onBlur={handleBlur}  type="password" name="confirm" placeholder="Confirm Password" className="my-3 bg-light" required />
                    }

                    <button className="btn-warning btn-sm" type="submit">{newUser ? 'Sign Up' : 'Login'}</button>

                    {
                        !newUser && <span onClick={forgotPass} className="btn text-primary">Forgot Password</span>
                    }

                    <span className="btn btn-dark my-4 text-light btn-block w-50 mx-auto" onClick={()=>{
                        setNewUser(!newUser);
                        setUser({
                            signed: false,
                            name: user.name,
                            email: user.email,
                            password: user.password,
                            message: ''
                        });
                    }}>
                        {
                            newUser ?
                            'I have an account' :
                            'I am new here'
                        }
                    </span>

                    <h6 className="text-warning text-center mt-4">{user.message}</h6>
                </Form>
                    <hr className="bg-white" />
                    
                    <Button variant="light" className="my-3 rounded-pill" onClick={googleSingIn}>
                        <img src={google} className="icon" alt=""/>
                        Sign in with Google
                    </Button>
                    <Button variant="light" className="my-3 rounded-pill" onClick={facebookSingIn}>
                        <img src={fb} className="icon" alt=""/>
                        Sign in with Facebook
                    </Button>
            </div>
        </Container>
    );
};

export default Login;