
import React,  { useEffect, useState, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { publicRouters, privateRouters, adminRouters, salerRouters, customerRouters} from './routes';
import axios from 'axios';
import { DefaultLayout } from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";


function App() {
  // Initial Authentication State
  const [user, setUser] = useState(null);
  const [navigator, setNavigator] = useState(false);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
	// Check if a token exists in local storage
	const token = localStorage.getItem('token');
	if (token) {
		// Fetch user data
		axios.get('/api/current_user', { headers: { 'Authorization': token } })
		  .then(response => {
			setUser(response.data);
			setLoading(false);
			setNavigator(false);
		  })
		  .catch(error => {
			console.error ('Error fetching user data', error);
			setLoading(false);

		  });
	} else {
		setLoading(false);
		setNavigator(true);

	}
  }, [navigator]);

  const handleRenderRouters = (routers) =>{
	const paths = routers.map((route, index) => {

		let Layout = DefaultLayout;

		if(route.layout){
			Layout = route.layout
		}else if(route.layout === null){
			Layout = Fragment;
		}

		const Page = route.element;
		let tempRole = <Route 
			key={index} 
			path={route.path} 
			element={
				<Layout user={user}>
					<Page />
				</Layout>
			}
		/>
		if(!user){
			tempRole = <Route 
				key={index} 
				path={route.path} 
				element={
					<Layout user={user}>
						<Page />
					</Layout>
				}
			/>
		}
		return tempRole;
	});
	return paths;
  }

  if (loading) {
    return <LoadingScreen />;
  }
	return (
		<Router>
			<div className="App">
				<Routes>
					{handleRenderRouters(publicRouters)}
					{user && user.role === 'Administrator' && handleRenderRouters(adminRouters)}
					{user && user.role === 'Sale person' && handleRenderRouters(salerRouters)}
					{user && user.role === 'Customer' && handleRenderRouters(customerRouters)}
					{user && handleRenderRouters(privateRouters)}
				</Routes>
				{user && user.status === 'InActive' && <Navigate to='/saler/renew-password' />}
				{navigator && <Navigate to="/login" />}
			</div>
		</Router>
	);
}

export default App;
