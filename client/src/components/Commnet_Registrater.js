import React,{ Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
const mapStateToProps = (state) => {
    return {
        isLogin : state.isLogin,
        vId : state.vId,
        vNickname : state.vNickname
    }
}

class Commnet_Registrater extends Component {
    state = {
        comment : ''
    }

    handleForRegistSubmit = (e) => {
        e.preventDefault();
        let url = '/api/comments/register'
        if(this.state.comment === '') {
            alert("내용을 입력해주세요");
        } else {
            return axios.post(url,{
                comment : this.state.comment,
                vId : this.props.vId,
                vMovieNo : this.props.movieNo
            }).then((res) => {
                this.setState({comment : ''});
            });
        }
    }

    handleFormUpdateSubmit = (e) => {
        e.preventDefault();
        let url = '/api/comments/update'
        if(this.state.comment === '') {
            alert("내용을 입력해주세요");
        } else if(this.state.comment.length > 200) {
            alert("200자 이내로 입력해주세요");
        } else {
            return axios.post(url,{
                comment : this.state.comment,
                iNo : this.props.iNo
            }).then((res) => {
                this.props.endOfCommentUpdate()
            }).catch((err) => {
                alert(err);
            });
        }
    }

    handleValueChange = (e) => {
        this.setState({comment : e.target.value})
    }

    render(){
        const {isLogin} = this.props;
        if(this.props.updateMode){//댓글 업데이트
            return(
                <div className = "CommnetRegistrater">
                    <form onSubmit={this.handleFormUpdateSubmit} className = "CommentForm">
                        <textarea className = "comment" rows="5" name = "comment" value = {this.state.comment} onChange = {this.handleValueChange}/>
                        <p className = "CommentBtnP"><button type = "submit" onClick={this.props.commentsState}  className = "CommentBtn">등록</button></p>
                    </form>
                </div>
            )
        } else {
            return(//댓글 작성
                <div className = "CommnetRegistrater">
                    {isLogin ? <form onSubmit={this.handleForRegistSubmit} className = "CommentForm">
                        <textarea className = "comment" cols="80" rows="5" name = "comment" value = {this.state.comment} onChange = {this.handleValueChange}/>
                        <p className = "CommentBtnP"><button type = "submit" onClick={this.props.commentsState}  className = "CommentBtn">등록</button></p>
                    </form> : <p>로그인을 해야 댓글 작성이 가능합니다.</p>}
                </div>
            )
        }
      }
}

export default connect(mapStateToProps)(Commnet_Registrater);