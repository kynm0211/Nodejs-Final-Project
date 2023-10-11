import axios from 'axios';
export function isAuthURL() {
const exceptPaths = ['/login', '/forget', '/register'];
const currentPath = window.location.pathname;

    for (const path of exceptPaths) {
        if (path === currentPath) return true;
    }

    return false;
}

export const handleLogin = async () => {
    try {
      // Send a GET request to /api/session
      const res = await axios.get('/api/session');
      const data = res.data.data;

      if (data) {
        return data;
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
};


