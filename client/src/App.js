import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Navbar from './components/Navbar';
import  HeroPage  from './components/HeroPage';
import { Fragment , useEffect } from 'react';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import {Provider} from 'react-redux';
import store from './store';
import Alert from './components/Alert';
import setAuthToken from './utils/setAuthToken';
import {loadUser} from './actions/auth'
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/CreateProfile';
import AddExperience from './components/AddExperience';
import AddEducation from './components/AddEducation';
import Profiles from './components/dashboard/Profiles';
import Profile from './components/Profile/Profile';
import jobs from './jobs/Jobs';
import JobForm from './jobs/JobForm';
import Job from './jobs/Job';


if(localStorage.token){
    setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() =>{
    store.dispatch(loadUser())
  }, []);
  return (
    <Provider store={store}>
    <Router>
    <Fragment>
        <Navbar/>
        <Route exact path='/' component={HeroPage} />
        <Alert/>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/> 
          <PrivateRoute exact path='/dashboard' component={Dashboard}/> 
          <PrivateRoute exact path='/profile' component={CreateProfile}/>
          <Route exact path="/profiles" component={Profiles}/> 
           <Route exact path="/profile/:id" component={Profile}/> 
          <PrivateRoute exact path="/addexperience" component={AddExperience}/>
          <PrivateRoute exact path="/addeducation" component={AddEducation}/>
          <PrivateRoute exact path="/jobs" component={jobs}/>
          <PrivateRoute exact path="/createjob" component={JobForm}/>
          <PrivateRoute exact path="/jobs/:id" component={Job}/>
        </Switch>
    </Fragment> 
    </Router>
    </Provider>
  );
}

export default App;
