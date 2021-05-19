import { userLogin } from './userLogin.js';
import { forgetPassword } from './forgetPassword.js';
import { signupForm } from './userSignUp.js';
import { verifyToken } from './checkToken.js';

window.onload = async function () {
    const state = { redirected: false }
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
        const authenticated = await verifyToken(token);
        if (authenticated) {
            authedRedirect(state);
        } else {
            userLogin();
        }
    } else {
        noAuthRedirect(state);
    }

    window.onhashchange = async function () {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const hash = window.location.hash.toLowerCase();
        console.log(`path changes! ${hash}`);
        const authenticated = await verifyToken(token);
        if (authenticated) {
            authedRedirect(state);
        } else {
            noAuthRedirect(state);
        }
    }
}

function authedRedirect(state = null) {
    if (state) {
        if (window.location.path !== '/dashboard') {
            window.location.path = '/dashboard';
        }
    }
}

function noAuthRedirect(state = null) {
    if (state) {
        if (window.location.path !== '/') {
            window.location.path = '/';
        }
        const urlParams = new URLSearchParams(window.location.search);
        const jwt = urlParams.get('jwt');
        if (jwt && !state.redirected) {
            window.location.hash = 'forgetpassword/reset';
            state.redirected = true;
        }
        const hash = window.location.hash.toLowerCase();
        if (hash.includes('forgetpassword')) {
            forgetPassword();
        } else if (hash.includes('signup')) {
            signupForm();
        } else {
            userLogin();
        }
    }
}