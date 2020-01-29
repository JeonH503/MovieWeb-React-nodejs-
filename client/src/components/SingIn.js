import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {logout,loginsucess,loginfailed} from '../redux/reducer'
import {NavLink} from 'react-router-dom';
import jwt from 'jsonwebtoken';
const mapStateToProps = (state) => {
  return {
      isLogin : state.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      logout : () => dispatch(logout()),
      loginsucess : (vId,vNickname) => dispatch(loginsucess(vId,vNickname)),
      loginfailed : () => dispatch(loginfailed())
  }
}

class SingIn extends React.Component {
  state = {
    vId : '',
    vPwd : ''
  }

  handleValueChange = (e) => {
    let nextState = {}
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  
  handleFormSubmit = (e) => {
    e.preventDefault();
    
    const url = "/api/singin";
      return axios.post(url, {
        vId : this.state.vId,
        vPwd : this.state.vPwd
      })
      .then((res) => {
        alert("로그인 성공");
        let token = document.cookie.match('MNID_TK').input;
        token = token.replace('MNID_TK=','');
        var decoded_data = jwt.verify(token, 'jeon');
        this.props.loginsucess(this.state.vId,decoded_data.vNickname);
        this.props.history.push("/");
      })
      .catch((err) => {
        alert("로그인 실패");
        this.props.loginfailed();
      })
  }
  
  render(){
    return (
      <div className="singInDiv">
          <form onSubmit={this.handleFormSubmit}>
            <h5>Login</h5>
            <h6 className="id">ID</h6>
            <input type = "text" name = "vId" value = {this.state.vId} onChange = {this.handleValueChange}/>
            <h6 className ="pwd">PASSWORD</h6>
            <input type = "password" name = "vPwd" value = {this.state.vPwd} onChange = {this.handleValueChange}/><br/>
            <button type = "submit" className="LoginBtn">Login</button>
            <NavLink to='/singup' className="SingUpBtn">SingUp</NavLink>
          </form>
      </div>
    );
  }
  
}

export default connect(mapStateToProps,mapDispatchToProps)(SingIn);