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
            window.location.pathname = '/dashboard';
        } else {
            window.location.pathname = '/';
            userLogin();
        }
    } else {
        window.location.pathname = '/';
        noAuthRedirect(state);
    }

    window.onhashchange = async function () {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const hash = window.location.hash.toLowerCase();
        console.log(`path changes! ${hash}`);
        const authenticated = await verifyToken(token);
        if (authenticated) {
            window.location.pathname = '/dashboard';
        } else {
            window.location.pathname = '/';
            noAuthRedirect(state);
        }
    }
}

function noAuthRedirect(state = null) {
    if (state) {
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