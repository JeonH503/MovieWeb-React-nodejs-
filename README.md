프론트 엔드 React<br/>
백엔드 Node.js<br/>
배포 AWS EC2<br/>

기능<br/>
  1.박스오피스 순위<br/>
    ● 일일 순위<br/>
    ● 주간 순위<br/>
    
  2.회원<br/>
    ● 로그인<br/>
    ● 회원 가입<br/>
    ● 회원 수정<br/>
    ● 회원 가입<br/>
    
  3.영화 검색<br/>
    ● 무한 스크롤<br/>
  
  4.영화 상세 정보<br/>
  
  5.댓글<br/>
    ● 댓글 목록 표시<br/>
    ● 댓글 등록<br/>
    ● 댓글 수정<br/>
    ● 댓글 삭제<br/>

사용한 API<br/>
  1.themoviedb : www.themoviedb.org<br/>
  2.영화 진흥 위원회 : https://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do<br/>
  
사용한 DBMS : MySql<br/>

라우팅 : react-router v4<br/>

로그인 인증 : JWT+cookie<br/>

로그인 정보 전달 : REDUX<br/>

주소 : <br/>

이 사이트는 댓글,회원 정보를 API로 만들어 React에서 정보를 받는다<br/>
로그인 성공시 JWT에 정보를 담아 cookie로 만들어 다른 페이지에서도 로그인 여부의 정보를 받는다<br/>

영화 진흥 위원회에서 박스오피스 순위의 대한 정보를 받고<br/>
그 영화에 맞는 자세한 정보(포스터,개봉일,회사 등)를 theMovieDb에서 받아 사용자에게 보여준다<br/>

각 영화 상세 페이지마다 댓글 기능이 있고 해당기능은 로그인을 해야만 사용할수있다.<br/>
