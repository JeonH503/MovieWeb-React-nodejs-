import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../redux/reducer'

const mapStateToProps = (state) => {
    return {
        isLogin : state.isLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout : () => dispatch(logout())
    }
}

class Header extends React.Component {
    state = {
        keyword:''
    };

    handlingChange = (e)=>{
        this.setState({
            keyword:e.target.value
        })
    };

    deleteCookie = () => {
     var expireDate = new Date();
     expireDate.setDate( expireDate.getDate() - 1 );
     document.cookie = `MNID_TK=; expires=${expireDate.toGMTString()}; path=/`;
     this.props.logout()
    }
    
    render(){
        const {isLogin} = this.props;
        if(isLogin){
            return (
                <div className = "Header">
                    <img src={require('./logo.png')} height="70px" alt="로고"/>
                    <span className="search">
                        <input value={this.state.keyword} name='keyword' onChange={this.handlingChange}/>
                        <NavLink to = {`/searchresult/?movieName=${this.state.keyword}`} className = "SearchBtn" activeClassName="">검색</NavLink>
                    </span>
                    <div className="navi">
                        <NavLink exact to = "/" className="item" activeClassName="active">홈</NavLink>
                        <NavLink to = "/dailyRank" className = "item" activeClassName="active"> 박스오피스 일일 순위</NavLink>
                        <NavLink to = "/weekRank" className = "item" activeClassName="active"> 박스오피스 주간 순위</NavLink>
                        <span to = "/" className = "item user" activeClassName="" onClick = {this.deleteCookie}> 로그아웃</span>
                        <NavLink to = "/profile" className = "item user mypage" activeClassName="active"> 마이페이지</NavLink>
                    </div>
                </div>
            );
        } else {
            return (
                <div className = "Header">
                    <img src={require('./logo.png')} height="70px" alt="로고"/>
                    <span className="search">
                        <input value={this.state.keyword} name='keyword' onChange={this.handlingChange}/>
                        <NavLink to = {`/searchresult/?movieName=${this.state.keyword}`} className = "SearchBtn" activeClassName="">검색</NavLink>
                    </span>
                    <div className="navi">
                        <NavLink exact to = "/" className="item" activeClassName="active" >홈</NavLink>
                        <NavLink to = "/dailyRank" className = "item" activeClassName="active"> 박스오피스 일일 순위</NavLink>
                        <NavLink to = "/weekRank" className = "item" activeClassName="active"> 박스오피스 주간 순위</NavLink>
                        <NavLink to = "/singin" className = "item user" activeClassName="active" onClick = {this.deleteCookie}> 로그인</NavLink>
                    </div>
                </div>
            );
        }
       
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);