import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginRegister from './pages/login/LoginRegister';
import ForgetPassword from "./pages/login/ForgetPassword";
import Logout from "./pages/logout";
import Sidebar from "./components/Sidebar";
import axios from 'axios';
import Upload from './pages/upload';
import Admin from './pages/admin/';

function App() {
  // Initial Authentication State
  const [user, setUser] = useState(null);
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
        })
        .catch(error => {
          console.error ('Error fetching user data', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">

      <Router>
        <Routes>
			<Route path="/*" element={
              <Fragment>
				{user === null && <Navigate to='/login' />}
                {user && user.role === 'Administrator' ? <Navigate to='/admin/' /> : null}
                {user && user.role === 'Saleperson' ? <Navigate to='/sale-person/' /> : null}
                {user && user.role === 'Customer' ? <Navigate to='/customer/' /> : null}
              </Fragment>
            }
          />
		  	<Route path="/admin/*" element={
				<Fragment>
					{user && user.role !== 'Administrator' ? <Navigate to='/' /> : null}
					<Admin user={user}/>
				</Fragment>
		  		}
			/>
		  <Route path="/sale-person/*" element={
		  		<Fragment>
				  {user && user.role !== 'Saleperson' ? <Navigate to='/' /> : null}
				  	<Admin user={user}/>

				</Fragment>
				}
		  />
		  <Route path="/customer/*" element={
		  		<Fragment>
				  {user && user.role !== 'Customer' ? <Navigate to='/' /> : null}
				  	<Admin user={user}/>

				</Fragment>
				}
		  />
          <Route path="/login" element={
			  <Fragment>
				{user !== null ? <Navigate to='/' /> : <Navigate to="/login" />}
				<LoginRegister /> 
			  </Fragment>}
		  />
		  
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/logout" element={<Logout />} />
		  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
