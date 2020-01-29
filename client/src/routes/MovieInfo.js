import React,{useState,useEffect} from 'react';
import Companie from '../components/Companie';
import CommnetRegistrater from '../components/Commnet_Registrater';
import Comment from '../components/Comment';
import axios from 'axios';

const MovieInfo = ({match}) => {
    let [movieInfo,setMovieInfo]=useState('');
    let [comments,setComments]=useState('');
    let [commentsUpdate,setCommentsUpdate]=useState(false);
    
    useEffect(()=>{
        let movieResult;
        async function getMovieInfo() {
            movieResult=await axios.get(`https://api.themoviedb.org/3/movie/${match.params.movieId}?api_key=d76027c2ab3c12f516a4d39994719834&language=kor`);
        }
        getMovieInfo().then(()=>{
            setMovieInfo(movieResult.data);
        })
    },[match.params.movieId]);
    
    const commentsStateUpdate = () => {
        setCommentsUpdate(true);
    }

    useEffect(()=>{
        let commentsReuslt;
        async function getComments() {
            commentsReuslt=await axios.get(`/api/comments?movieNo=${match.params.movieId}`);
        }
        getComments().then(()=>{
            setComments(commentsReuslt.data);
            setCommentsUpdate(false);
        })
    },[commentsUpdate, match.params.movieId]);
    if(movieInfo && comments)
    {
        return (
            <div>
                <div className="MovieInfoWrap">
                    {movieInfo.poster_path 
                    ? <img alt = "포스터" src = {`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`} className="MovieInfoPoster"/> 
                    : <img alt = "포스터" src = {`https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png`} 
                    className="MovieInfoPoster"/>}
                    
                    <div>
                        <h2 className = "title">{movieInfo.title}</h2>({movieInfo.release_date.slice(0,4)})<br/>
                        런타임  {movieInfo.runtime}분
                        <h3 className = "SummaryTitle">개요</h3>
                        {movieInfo.overview.length ? <div className = "summmary">{movieInfo.overview}</div> : <div className = "summmary">정보가 없습니다</div>}<br/>
                        제작사
                        <div className = "CompanieInfo">{movieInfo.production_companies.length ? movieInfo.production_companies.map(companie =>(
                            <Companie key={companie.id}
                                    name={companie.name}
                                    logo={companie.logo_path}></Companie>
                        )) : <div>정보가 없습니다.</div>}</div>
                    </div>
                </div>
                <CommnetRegistrater movieNo = {match.params.movieId}
                                        updateMode = {false}
                                        commentsState = {commentsStateUpdate}
                                        className = "CommnetRegistrater"/>
                    <div className = "comments">
                        {comments.length ? 
                        comments.map(comment => (
                            <Comment key = {comment.iNo}
                                    iNo = {comment.iNo}
                                    vId = {comment.vId}
                                    vNickname = {comment.vNickname}
                                    vComment = {comment.vComment}
                                    dReg = {comment.dReg}
                                    commentsState = {commentsStateUpdate}/>
                        )) : 
                        <div className = "NoComments">작성된 댓글이 없습니다.</div>}
                    </div>
            </div>
        );
    }

    //영화 정보 아직 못끌어 왔을 경우 표시
    return(
        <div className="loadingWrap">
          <div className="notLoading"></div><br/>
          <p className="lodingMassage">now loading...</p>
        </div>
    )
};

export default MovieInfo;