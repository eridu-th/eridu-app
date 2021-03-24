const host = window.location.hostname === '127.0.0.1' || 'localhost' ? 'http://localhost:8080' : '';
const endpoints = {
    host,
    headerEndpoint: `${host}/header`,
    checkTokenEndpoint: `${host}/checkToken`
}

export default endpoints;