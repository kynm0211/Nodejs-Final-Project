import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import LoginRegister from './pages/login/LoginRegister';
import ForgetPassword from "./pages/login/ForgetPassword";
import Upload from "./pages/upload/Upload";
import Sidebar from "./components/Sidebar";
import Logout from "./pages/logout";
import axios from 'axios';
import {isAuthURL} from './middlewares/requiredLogin';
function App() {

	// Initial Authentication State
	const [user, setUser] = useState(null);
	const [navigator, setNavigator] = useState(false);


	function fetchUserData(token) {
		axios.get('/api/current_user', {headers: {'Authorization': `${token}`}})
			.then(response => {setUser({...response.data});})
			.catch(error => {console.error('Error fetching user data', error);
		});
	}
  	useEffect(() => {
		// Check if a token exists in local storage
		const token = localStorage.getItem('token');
		
		if (token) {
			fetchUserData(token);
		} else {
			// If no token is found, set the navigator to true
			setNavigator(true);
		}

		// Check if the current URL is not authenticated and there is no token
		setNavigator(isAuthURL() === false && !token? true : false);
	}, []);
	return (
		<div className="App">
		<Router>
			<Routes>
				
				<Route path="/*" element={<Sidebar user={user}/>} />
				<Route path="/login" element={<LoginRegister/>} />
				<Route path="/forget" element={<ForgetPassword />} />
				<Route path="/upload" element={<Upload />} />
				<Route path="/logout" element={<Logout />} />
			</Routes>
			{navigator ? <Navigate to="/login" /> : null}
		</Router>
		</div>
	);
}

export default App;
