import React,{ Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        isLogin : state.isLogin,
        vId : state.vId
    }
}

class Comments extends Component {

    state = {
        comment : ''
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        let url = '/api/comments/register'
        return axios.post(url,{
            comment : this.state.comment,
            vId : this.props.vId
        });
    }

    handleValueChange = (e) => {
        this.setState({comment : e.target.value})
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <textarea cols="80" rows="5" name = "comment" value = {this.state.comment} onChange = {this.handleValueChange}/>
                    <button type = "submit">등록</button>
                </form>
            </div>
        )
      }
}

export default connect(mapStateToProps)(Comments);