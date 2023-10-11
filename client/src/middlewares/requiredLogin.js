export default function exceptedURL() {
const exceptPaths = ['/login', '/forget'];
const currentPath = window.location.pathname;

    for (const path of exceptPaths) {
        if (path === currentPath) return true;
    }

    return false;
}