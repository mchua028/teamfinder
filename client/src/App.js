import React,{useState,useEffect} from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import EditProfile from './components/pages/EditProfile';
import MyProjectsPage from './components/pages/MyProjects/MyProjectsPage';
import Projects from './components/pages/Projects/Projects';
import AppliedProjects from './components/pages/AppliedProjects/AppliedProjects';

function App() {
  const [isLoggedIn, setIsLoggedIn ] = useState(false);

  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const foundUser = localStorage.getItem("user");
    if (token && foundUser) {
      
      setUser(foundUser);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <div style={{backgroundColor: '#031322', minHeight: '100vh', paddingLeft: '10%', paddingRight: '10%', paddingBottom: '5%'}}>
            <Navbar />
            
                <Switch>
                  <Route path='/home' component={(props) => (<Home {...props} isLoggedIn={isLoggedIn} user={user}/>)} />
                  <Route path='/edit-profile' component={(props) => (<EditProfile {...props} isLoggedIn={isLoggedIn} user={user}/>)} />
                  <Route path='/my-projects' component={(props) => (<MyProjectsPage {...props} isLoggedIn={isLoggedIn}/>)} />
                  <Route path='/projects' component={(props) => (<Projects {...props} isLoggedIn={isLoggedIn}/>)} />
                  <Route path='/applied-projects' component={(props) => (<AppliedProjects {...props} isLoggedIn={isLoggedIn}/>)} />
                  
            
                  <Route path='/signup' component={(props) =>(<Signup {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>)} />
                  <Route path='/' component={(props) => (<Login {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>)} />
                  
                  {/* <Route path='/' component={Login}/>
                  <Route path='/signup' component={Signup}/> */}
                </Switch>
            
              
          
      </div>  
      
    </>
  );
}

export default App;