import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import dailyRank from './routes/dailyRank';
import weekRank from './routes/weekRank';
import PwdChange from './routes/PwdChange';
import AcctChange from './routes/AcctChange';
import AcctDel from './routes/AcctDel';
import Header from './components/Header';
import MovieInfo from './routes/MovieInfo';
import SearchResult from './routes/SearchResult';
import UserAdd from './components/UserAdd';
import Profile from './routes/Profile';
import Home from './routes/Home';
import NotFoundPage from './routes/NotFoundPage';
import SingIn from './components/SingIn';
import Footer from './components/Footer';
import { connect } from 'react-redux';
import {loginsucess} from './redux/reducer';
import jwt from 'jsonwebtoken';
import './App.css';
const mapStateToProps = (state) => {
  return {
      isLogin : state.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginsucess : (vId) => dispatch(loginsucess(vId))
  }
}

function App(props) {
  let decoded = null;
  try {
    let token = document.cookie.replace('MNID_TK=','');
    if(token) {
      token = document.cookie.replace('MNID_TK=','');
      decoded = jwt.verify(token, 'jeon');
    }
  } catch (e) {
    alert("잘못된 접근입니다")
  } finally {
    if(decoded) {
      props.loginsucess(decoded.id);
    }
  }
  
  
  return (
    <Router>
      <div className="wrap">
          <Header/>
          <div className="cont">
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/dailyRank' component={dailyRank}/>
              <Route exact path='/weekRank' component={weekRank}/>
              <Route exact path='/movieinfo/:movieId' component={MovieInfo}/>
              <Route exact path='/searchresult' component={SearchResult}/>
              <Route exact path='/singup' component={UserAdd}/>
              <Route exact path='/singin' component={SingIn}/>
              <Route exact path='/profile' component={Profile}/>
              <Route exact path='/profile/PwdChange' component={PwdChange}/>
              <Route exact path='/profile/AcctChange' component={AcctChange}/>
              <Route exact path='/profile/AcctDel' component={AcctDel}/>
              <Route component={NotFoundPage} />
            </Switch>
          </div>
          <Footer/>
      </div>
    </Router>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
