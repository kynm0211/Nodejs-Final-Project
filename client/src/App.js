import React,  { useEffect, useState, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { publicRouters, privateRouters} from './routes';
import axios from 'axios';
import {isAuthURL} from './middlewares/requiredLogin';

import { DefaultLayout } from "./components/Layout";
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
		<Router>
			<div className="App">
				<Routes>
					{publicRouters.map((route, index) => {

						let Layout = DefaultLayout;

						if(route.layout){
							Layout = route.layout
						}else if(route.layout === null){
							Layout = Fragment;
						}

						const Page = route.element;
						return (
							<Route 
							key={index} 
							path={route.path} 
							element={
								<Layout user={user}>
									<Page />
								</Layout>
							}
							/>
						)
					})}
				</Routes>
				{navigator && <Navigate to="/login" />}
			</div>
		</Router>
	);
}

export default App;
