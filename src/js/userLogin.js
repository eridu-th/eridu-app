import { loginProcess } from './checkToken.js';
const container = document.querySelector('.container');

export function userLogin() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.hash = '';
    container.innerHTML = `
        <div id="login_form">
            <div id="makesend_logo">
                <img src="https://static.wixstatic.com/media/9b8311_7e3822433af34553bc9afd08e9c5f56e~mv2.png/v1/fill/w_220,h_80,al_c,q_85,usm_0.66_1.00_0.01/logo_edited.webp" alt="eridu_logo">
            </div>
            <form action="" autocomplete="off">
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" class="form-control" id="email" aria-describedby="emailHelp"
                        autocomplete="off">
                    <div class="invalid-feedback">Your email is not correct</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password">
                    <div class="invalid-feedback">Your password is not correct</div>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="remember_me" checked>
                    <label class="form-check-label" for="remember_me">Remember me</label>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
                <div>
                    <a href="#forgetpassword">Forget Password?</a>
                </div>
            </form>
        </div>
    `;

    const loginForm = document.querySelector('#login_form');
    const usernameInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const rememberMeInput = document.querySelector('#remember_me');
    usernameInput.addEventListener('input', removeInvalidClass);
    passwordInput.addEventListener('input', removeInvalidClass);
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        const inputs = {
            username,
            password
        }
        if (!username || !password) {
            usernameInput.classList.add('is-invalid');
            passwordInput.classList.add('is-invalid');
        } else {
            if (username && password) {
                const result = await loginProcess(username, password, rememberMeInput.checked);
                if (result) {
                    return;
                }
            }
            usernameInput.classList.add('is-invalid');
            passwordInput.classList.add('is-invalid');
        }
    });

    function removeInvalidClass() {
        passwordInput.classList.remove('is-invalid');
        usernameInput.classList.remove('is-invalid');
    }
}