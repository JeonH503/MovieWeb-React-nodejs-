import React,{ Component } from 'react';
import Movie from '../components/movieList';
import axios from 'axios';

class dailyRank extends Component {

  state = {
    movies:[],
    nowLoading:false,
    showRange:''
  };

  fn_leadingZeros = (n, digits) => {
    var zero = '';
    n = n.toString();
    if (n.length < digits) {
      for (var i = 0; i < digits - n.length; i++){ zero += '0'; }
    }
    return zero + n;
  }

  getMovies = async () => {
    let dailyDate = new Date();
    dailyDate.setFullYear(dailyDate.getFullYear(), dailyDate.getMonth(), dailyDate.getDate()-1);
    dailyDate = ""+dailyDate.getFullYear()+ this.fn_leadingZeros(dailyDate.getMonth()+1, 2)+this.fn_leadingZeros(dailyDate.getDate(), 2);
    const boxOfficeResult = await axios.get(`https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=5324ec1336b1a8a1f837f82e9aba77d3&targetDt=${dailyDate}`)
    this.setState({showRange:boxOfficeResult.data.boxOfficeResult.showRange});
    this.setState({movies:boxOfficeResult.data.boxOfficeResult.dailyBoxOfficeList});
    this.setState({nowLoading:true})
  }

  componentDidMount(){
    this.getMovies();
  }
  render(){
    if( this.state.movies[0]){
      return (
        <div className="movies">
          <p className="showRange">조회 기준 날짜 : {this.state.showRange}</p>
          {this.state.movies.map(movie =>(<Movie key={movie.rnum}
                  movieCd = {movie.movieCd}
                  serachResult = {false}
                  audiChangeMode = {"전일"}
                  audiCnt={movie.audiCnt}
                  audiChange={movie.audiChange}
                  rankOldAndNew={movie.rankOldAndNew}
                  name={movie.movieNm}
                  rank={movie.rank}
                  openDt={movie.openDt}
                  slaesAcc={movie.salesAcc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  audiAcc={movie.audiAcc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                ))}
        </div>
      );
    } else {
      return(
        <div className="loadingWrap">
          <div className="notLoading"></div><br/>
          <p className="lodingMassage">now loading...</p>
        </div>
      );
    }
  }
}

export default dailyRank;