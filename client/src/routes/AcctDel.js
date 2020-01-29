import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {logout} from '../redux/reducer';

const mapStateToProps = (state) => {
  return {
      vId : state.vId
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout : () => dispatch(logout())
    }
}

class AcctDel extends React.Component {
    state = {
        vPwd : ''
    }

    deleteCookie = () => {
        var expireDate = new Date();
        expireDate.setDate( expireDate.getDate() - 1 );
        document.cookie = `MNID_TK=; expires=${expireDate.toGMTString()}; path=/`;
        //'MNID_TK' + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
        this.props.logout()
    }

    handleValueChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let nextState = {};
        nextState[name] = value
        this.setState(nextState);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        let url = '/api/profile/acctDel';
        if(this.state.vPwd === '') {
            alert("비밀번호를 입력해 주세요.");
        } else {
            return axios.post(url,{
                vId : this.props.vId,
                vPwd : this.state.vPwd
            }).then((res) => {
                alert("회원 탈퇴가 완료 되었습니다");
                this.deleteCookie()
                this.props.history.push("/home");
            }).catch(err=>{
                alert("암호가 틀렸습니다");
            })
        }
        
    }

    

    render() {
        return (
            <div className = "AcctDelDiv">
                    <form onSubmit={this.handleFormSubmit} className = "AcctDelForm">
                        <h5>회원 탈퇴</h5>
                        <h6 className="Pwd">비밀번호</h6>
                        <input type = "text" name = "vPwd" className = "AcctDelPwd" value = {this.state.vPwd} onChange = {this.handleValueChange}/>
                        <button type = "submit" className = "AcctDelBtn">탈퇴</button>
                    </form>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AcctDel);