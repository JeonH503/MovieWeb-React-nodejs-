import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

const mapStateToProps = (state) => {
  return {
      vId : state.vId
  }
}

class Profile extends React.Component {
    state = {
        OLD_vPwd : '',
        NEW_vPwd : '',
        chk_NEW_vPwd : ''
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
        if (this.state.OLD_vPwd === '') {
            alert("현재 비밀번호를 입력해 주세요.")
        } else if (this.state.NEW_vPwd === '') {
            alert("변경할 비밀번호를 입력해 주세요.")
        } else if(this.state.NEW_vPwd.length < 3) {
            alert("비밀번호를 4자 이상 입력해주세요")
        } else if(this.state.chk_NEW_vPwd === '') {
            alert("비밀번호 확인칸을 입력해주세요.")
        }  else if(this.state.NEW_vPwd !== this.state.chk_NEW_vPwd) {
            alert("비밀번호가 같지 않습니다.")
        } else if(this.state.OLD_vPwd === this.state.NEW_vPwd) {
            alert("같은 비밀번호로 변경할수 없습니다.");
        } else {
            let url = '/api/profile/pwdChange';
            return axios.post(url,{
                vId : this.props.vId,
                OLD_vPwd : this.state.OLD_vPwd,
                NEW_vPwd : this.state.NEW_vPwd
            }).then((res) => {
                alert("비밀번호가 변경되었습니다")
                this.props.history.push("/profile");
            }).catch((err) => {
                alert("현재 비밀번호가 맞지 않습니다");
            })
        }
    }

    render() {
        return (
            <div className = "PwdChangeDiv">
                    <form onSubmit={this.handleFormSubmit} className = "PwdChangeForm">
                        <h5>비밀번호 변경</h5>
                        <h6 className="OldPwd">현재 비밀번호</h6>
                        <input type = "password" name = "OLD_vPwd" value = {this.state.OLD_vPwd} onChange = {this.handleValueChange}/><br/>
                        <h6 className="NewPwd">새 비밀번호</h6>
                        <input type = "password" name = "NEW_vPwd" value = {this.state.NEW_vPwd} onChange = {this.handleValueChange}/><br/>
                        <h6 className="NewPwdChk">새 비밀번호</h6>
                        <input type = "password" name = "chk_NEW_vPwd" value = {this.state.chk_NEW_vPwd} onChange = {this.handleValueChange}/><br/>
                        <button type = "submit" className = "PwdChangeBtn">변경</button>
                    </form>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Profile);