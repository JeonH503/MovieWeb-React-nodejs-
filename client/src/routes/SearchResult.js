import React,{useState,useEffect} from 'react';
import Movie from '../components/movieList';
import axios from 'axios';

const SearchResult = ({location}) => {
    const [pageNo , setPageNo] = useState(1);
    const [movieList,setMovieList]=useState([]);
    const movieName = new URLSearchParams(location.search).get('movieName');
   
    let handleScroll = async () => {
        const clientHeight = document.documentElement.clientHeight
        const scrollTop = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
        const scrollHeight = Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);

        if(scrollTop+clientHeight >= scrollHeight-1){
            setPageNo(pageNo => pageNo + 1);
        }
      };

    useEffect(()=>{
        let getMovies = async (location) => {
            const movies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d76027c2ab3c12f516a4d39994719834&language=ko-kr&page=1&include_adult=false&query=${movieName}`)
            setMovieList(movies.data.results)
        }
        getMovies(location);
        window.addEventListener("scroll", handleScroll);
    },[movieName,location]);

    useEffect(()=>{
        let extendPage = async (page) => {
            const movies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d76027c2ab3c12f516a4d39994719834&language=ko-kr&page=${page}&include_adult=false&query=${movieName}`)
            if(movies.data.results[0]) {
                for(let i=0; i<20; i++){
                    setMovieList(movieList => [...movieList, movies.data.results[i]])
                }
            } else {
                return;
            }
        }
        if(pageNo !== 1){
            extendPage(pageNo);
        }
    },[pageNo,movieName]);
        return (
        <div>
            {movieList.length ? <h2 className="SearchTitle">검색결과</h2> : <h4 className="SearchTitle">검색결과가 없습니다!</h4>}
            {movieList.map(movie => (
            <Movie key={movie.id}
                    movieId = {movie.id}
                    serachResult = {true}
                    name={movie.title}
                    rank={movie.title}
                    openDt={movie.release_date}
                    slaesAcc={movie.title}
                    audiAcc={movie.title}
                    posterURL={movie.poster_path} />
                ))}
      </div>
    );
}

export default SearchResult;