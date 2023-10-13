
import React,  { useEffect, useState, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { publicRouters, privateRouters} from './routes';
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
		  setNavigator(true);
        });
    } else {
      setLoading(false);
	  setNavigator(true);
    }
  }, [navigator]);

  if (loading) {
    return <LoadingScreen />;
  }
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
