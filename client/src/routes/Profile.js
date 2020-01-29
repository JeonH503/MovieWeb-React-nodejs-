import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

const mapStateToProps = (state) => {
  return {
      isLogin : state.isLogin,
      vId : state.vId
  }
}

class Profile extends React.Component {
  state = {
    vNickname : '',
    vEmail : ''
  }

  userInfoSearch = (vId) => {
    let url = '/api/profile'
    return axios.post(url,{
      vId
    }).then((res) => {
      this.setState({
        vNickname : res.data.vNickname,
        vEmail : res.data.vEmail
      })
    })
  }

  componentDidMount() {
    if(this.props.isLogin){
      this.userInfoSearch(this.props.vId);
    }
  }

  render() {
    const {isLogin,vId} = this.props; 
      if(isLogin) {
        return(
          <div>
            <h5>PROFILE</h5>
            아이디 : {vId}<br/>
            닉네임 : {this.state.vNickname}<br/>
            이메일 : {this.state.vEmail}<br/>
            <NavLink to = "/profile/pwdChange">비밀번호 변경</NavLink><br/>
            <NavLink to = "/profile/acctChange">프로필 수정</NavLink><br/>
            <NavLink to = "/profile/acctDel">회원탈퇴</NavLink>
          </div>
        )
      } else {
        return(<Redirect to = '/singin'/>);
      }
  }
}

export default connect(mapStateToProps)(Profile);