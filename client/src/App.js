import React,{useState,useEffect} from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import EditProfile from './components/pages/EditProfile';

function App() {
  const [isLoggedIn, setIsLoggedIn ] = useState(false);
  console.log("isLoggedIn",isLoggedIn);

  const [user, setUser] = useState();

  useEffect(() => {
    //TODO: clear localStorage on logout
    const token = localStorage.getItem("token");
    console.log('hi');
    const foundUser = localStorage.getItem("user");
    console.log("foundUser",foundUser);
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
                  {/* <Route path='/home' component={Home}/>
                  <Route path='/edit-profile' component={EditProfile}/> */}
            
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