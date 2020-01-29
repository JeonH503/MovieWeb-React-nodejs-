import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
const mapStateToProps = (state) => {
  return {
      vId : state.vId
  }
}

class AcctChange extends React.Component {
    state = {
        vNickname : '',
        vEmail : ''
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
        let url = '/api/profile/acctChange';
        if(this.state.vNickname === '' && this.state.vEmail === '') {
            alert("변경 완료");
            this.props.history.push("/profile");
        } else {
            return axios.post(url,{
                vId : this.props.vId,
                vNickname : this.state.vNickname,
                vEmail : this.state.vEmail
            }).then((res) => {
                alert("프로필이 변경 되었습니다.");
                this.props.history.push("/profile");
            })
        }
        
    }

    render() {
        return (
            <div className = "AcctChangeDiv">
                    <form onSubmit={this.handleFormSubmit} className = "AcctChangeForm">
                        <h5>프로필 수정</h5>
                        <h6 className="NewNickName">닉네임</h6>
                        <input type = "text" className = "vNickname" name = "vNickname" value = {this.state.vNickname} onChange = {this.handleValueChange}/><br/>
                        <h6 className="NewEmail">이메일</h6>
                        <input type = "text" className = "vEmail" name = "vEmail" value = {this.state.vEmail} onChange = {this.handleValueChange}/><br/>
                        <button type = "submit" className = "AcctChangeBtn">변경</button>
                    </form>
            </div>
        )
    }
}

export default connect(mapStateToProps)(AcctChange);