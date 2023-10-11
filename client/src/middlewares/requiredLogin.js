import axios from 'axios';

export const isAuthURL = () => 
	['/login', '/forget', '/register']
	.includes(window.location.pathname);

export const handleLogin = async () => {
	try {
		const { data } = await axios.get('/api/session');
		return data || null;
	} catch (err) {
		return null;
	}
};
