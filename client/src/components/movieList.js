import React,{ Component } from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
class movieList extends Component {
    state = {
        posterURL : "",
        movieId : '',
        genres : [],
        overview : ''
    };

    getRankMovies = async () => {
        let movieInfo = await axios.get(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=430156241533f1d058c603178cc3ca0e&movieCd=${this.props.movieCd}`);
        let URL = await "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
        let movieId = null
        let searchResult=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d76027c2ab3c12f516a4d39994719834&language=ko-kr&page=1&include_adult=false&query=${movieInfo.data.movieInfoResult.movieInfo.movieNmEn}`);
        if(searchResult.data.results[0]){
            URL = await "https://image.tmdb.org/t/p/w500/"+searchResult.data.results[0].poster_path
            movieId = searchResult.data.results[0].id
        }
        this.setState({posterURL:URL,movieId});
    }
    
    getSearchMovies = async () => {
        let URL = await "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png";
        let movieId = this.props.movieId;
        let searchResult=await axios.get(`https://api.themoviedb.org/3/movie/${this.props.movieId}?api_key=d76027c2ab3c12f516a4d39994719834&language=ko-kr`);
        let genres = [{name:"정보없음"}];
        let overview = "줄거리가 존재 하지 않습니다";
        if(searchResult.data.genres.length) {
            genres = searchResult.data.genres
        }
        if(searchResult.data.overview) {
            overview = searchResult.data.overview
        }
        if(searchResult.data.poster_path){
            URL = await "https://image.tmdb.org/t/p/w500/"+searchResult.data.poster_path
        }
        this.setState({posterURL:URL,movieId,genres,overview});
    }

    componentDidMount(){
        if(this.props.serachResult) {
            this.getSearchMovies();
        } else {
            this.getRankMovies();
        }
    }
    
    render(){
        if(this.props.serachResult){
            return(
                <div className="SearchResultWrap">
                    <NavLink to = {`/movieinfo/${this.state.movieId}`}><img alt="포스터" src={this.state.posterURL} className="SearchResultposter"></img></NavLink>
                    <NavLink to = {`/movieinfo/${this.props.movieId}`} className="SearchResultName"><h3>{this.props.name}</h3></NavLink>
                    <h5>장르 : {this.state.genres.map(genre => (
                        genre.name+' '
                    ))}</h5>
                    <h6 className="summary">{this.state.overview.slice(0,300)}...</h6>
                </div>
            )
        } else {
            return(
                <div className="movieWrap">
                    <NavLink to = {`/movieinfo/${this.state.movieId}`}><img alt="포스터" src={this.state.posterURL} className="poster"></img></NavLink>
                    <p className={`rankOldAndNew  ${this.props.rankOldAndNew}`}>{this.props.rankOldAndNew}</p>
                    <ul>
                        <li className='movieInfo'><h3><NavLink to = {`/movieinfo/${this.state.movieId}`} className="name">{this.props.name}</NavLink></h3></li><br/>
                        <li className='movieInfo rank'>예매율 {this.props.rank}위 &nbsp;</li>
                        <li className='movieInfo openDt'>&nbsp;개봉일 : {this.props.openDt}</li><br/><br/>
                        <li className='movieInfo slaesAcc'>누적 매출 : {this.props.slaesAcc}원&nbsp;</li>
                        <li className='movieInfo audiAcc'>&nbsp;누적 관객 : {this.props.audiAcc}명</li><br/><br/>
                        <li className='movieInfo audiCnt'>당일 관람객 : {this.props.audiCnt}&nbsp;</li> 
                        <li className='movieInfo audiChange'>&nbsp;{this.props.audiChangeMode} 대비 증감비율 : {this.props.audiChange}%</li>
                    </ul>
                    
                </div>
            )
        }
        
    }
}

export default movieList;