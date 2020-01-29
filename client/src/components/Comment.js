import React,{ Component } from 'react';
import moment from 'moment-timezone';
import {connect} from 'react-redux';
import axios from 'axios';
import CommnetRegistrater from '../components/Commnet_Registrater';
const mapStateToProps = (state) => {
    return {
        isLogin : state.isLogin,
        chkId : state.vId
    }
}

class Comment extends Component {
    state = {
        readMode : true
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const url = '/api/comments/del';
        return axios.post(url, {
            iNo : this.props.iNo
        }).then((res) => {
            alert("삭제되었습니다.");
        }).catch((err) => {
            alert(err);
        });
    }

    endOfCommentUpdate = () => {
        this.setState({
            readMode : true
        });
    }

    updateComment = (e) => {
        this.setState({
            readMode: false
          })
    }

    render(){
        const {chkId,vId} = this.props;
        let GMTtime = moment(this.props.dReg).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
        if(chkId === vId || chkId === "admin") {
            if(this.state.readMode){
                return( 
                    <div className = "CommentDiv">
                        <span className = "CommentHead">{this.props.vNickname}
                            ({this.props.vId})&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className = "time">{GMTtime}</span></span>
                        <form  onSubmit={this.handleFormSubmit} className = "delForm">
                            <button type = "submit" onClick={this.props.commentsState} className = "delBtn">삭제</button>
                        </form>
                        <button onClick={this.updateComment} className = "updateBtn">수정</button>
                        <span className = "CommentCont">{this.props.vComment.split('\n').map(line => <span>{line}<br/></span>)}</span>
                    </div>
                )
            } else {
                return(
                    <CommnetRegistrater updateMode = {true} 
                                        endOfCommentUpdate = {this.endOfCommentUpdate} 
                                        iNo = {this.props.iNo}
                                        commentsState={this.props.commentsState}/>
                )
             }
            
        } else {
            return(
                <div className = "CommentDiv">
                    <span className = "CommentHead">{this.props.vNickname}
                        ({this.props.vId})&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className = "time">{GMTtime}</span></span>
                    <span className = "CommentCont">{this.props.vComment.split('\n').map(line => <span>{line}<br/></span>)}</span>
                </div>
            )
        }
        
      }
}

export default connect(mapStateToProps)(Comment);