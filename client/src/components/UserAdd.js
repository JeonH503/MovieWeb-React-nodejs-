import React from 'react';
import axios from 'axios';
class UserAdd extends React.Component {
    state = {
        vId : '',
        vPwd : '',
        chkPwd : '',
        vNickname : '',
        vEmail : '',
        isDuplicate : 'false'
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        if(this.state.vId === ''){
            alert("아이디를 입력 하십시오.")
        } else if(this.state.vPwd === ''){
            alert("비밀번호를 입력 하십시오.")
        } else if(this.state.vPwd.length < 4) {
            alert("비밀번호를 4자 이상 입력해주세요.")
        } else if(this.state.chkPwd === ''){
            alert("비밀번호 확인을 입력 하십시오.")
        } else if(this.state.vPwd !== this.state.chkPwd) {
            alert("비밀번호가 동일하지 않습니다.")
        } else if(this.state.vNickname === ''){
            alert("닉네임을 입력 하십시오.")
        } else if(this.state.vPwd.length < 2) {
            alert("닉네임을 2자 이상 입력 하십시오.")
        } else if(this.state.vEmail === ''){
            alert("이메일을 입력 하십시오.")
        } else if(this.state.isDuplicate){
            alert('중복된 아이디 입니다');
        } else {
            this.addUser()
            this.props.history.push("/singin");
        }
    }

    handleValueChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let nextState = {};
        nextState[name] = value;
        this.setState(nextState);
        if(name === 'vId') {
            axios.get('/api/users').then((res) => {
                const users = res.data;
                const isUserFound = users.filter(user => user[name].toLowerCase() === value.toLowerCase()).length;
                isUserFound ? this.setState({isDuplicate : true}) : this.setState({isDuplicate : false});
            })
        }
        
    }

    renderFeedbackMessage() {
        if(this.state.vId === ''){
            return;
        }
        else{
            if(this.state.isDuplicate){
                return(<div className="invalid-feedback">사용 불가능한 ID 입니다.</div>);
            } else {
                return(<div className="valid-feedback">사용 가능한 ID 입니다.</div>);
            }
        }
    }

    addUser = () => {
        const url = '/api/singup';
        return axios.post(url, {
            vId : this.state.vId,
            vPwd : this.state.vPwd,
            vNickname : this.state.vNickname,
            vEmail : this.state.vEmail
        });
    }

    render() {
        return (
            <div className="SingUpDiv">
                <form className="SingUpForm" onSubmit={this.handleFormSubmit}>
                    <h5>Sing Up</h5>
                    <h6>ID</h6>
                    <input type = "text" name = "vId" value = {this.state.vId} onChange = {this.handleValueChange}/><br/>
                    {this.renderFeedbackMessage()}
                    <h6>PASSWORD</h6>
                    <input type = "password" name = "vPwd" value = {this.state.vPwd} onChange = {this.handleValueChange}/><br/>
                    <h6>PASSWORD CHECK</h6>
                    <input type = "password" name = "chkPwd" value = {this.state.chkPwd} onChange = {this.handleValueChange}/><br/>
                    <h6>NICKNAME</h6>
                    <input type = "text" name = "vNickname" value = {this.state.vNickname} onChange = {this.handleValueChange}/><br/>
                    <h6>EMAIL</h6>
                    <input type = "email" name = "vEmail" value = {this.state.vEmail} onChange = {this.handleValueChange}/><br/>
                    <button type = "submit" className="SingUpBtn">가입</button>
                </form>
            </div>
        );
    }
}

export default UserAdd;