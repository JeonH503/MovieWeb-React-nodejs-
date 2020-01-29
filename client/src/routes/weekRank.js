import React,{ Component } from 'react';
import Movie from '../components/movieList';
import axios from 'axios';
class weekRank extends Component {

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
    let weekDate = new Date();
    weekDate.setFullYear(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate()-7);
    weekDate = ""+weekDate.getFullYear()+ this.fn_leadingZeros(weekDate.getMonth()+1, 2)+this.fn_leadingZeros(weekDate.getDate(), 2);
    const boxOfficeResult = await axios.get(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=430156241533f1d058c603178cc3ca0e&targetDt=${weekDate}&weekGb=0`)
    this.setState({showRange:boxOfficeResult.data.boxOfficeResult.showRange});
    this.setState({movies:boxOfficeResult.data.boxOfficeResult.weeklyBoxOfficeList});
    this.setState({nowLoading:true})
  }

  

  componentDidMount(){
    this.getMovies();
  }

  render(){
    if(this.state.movies[0]){
      return (
        <div className="movies">
          <p className="showRange">조회 기준 날짜 : {this.state.showRange}</p>
          {this.state.movies.map(movie => (<Movie key={movie.rnum}
                  movieCd = {movie.movieCd}
                  serachResult = {false}
                  audiChangeMode = {"전주"}
                  name={movie.movieNm}
                  audiCnt={movie.audiCnt}
                  audiChange={movie.audiChange}
                  rankOldAndNew={movie.rankOldAndNew}
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
      )
    }
  }
  
}

export default weekRank;