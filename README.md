프론트 엔드 React
백엔드 Node.js
배포 AWS EC2

기능
  1.박스오피스 순위
    ● 일일 순위
    ● 주간 순위
    
  2.회원
    ● 로그인
    ● 회원 가입
    ● 회원 수정
    ● 회원 가입
    
  3.영화 검색
    ● 무한 스크롤
  
  4.영화 상세 정보
  
  5.댓글
    ● 댓글 목록 표시
    ● 댓글 등록
    ● 댓글 수정
    ● 댓글 삭제

사용한 API
  1.themoviedb : www.themoviedb.org
  2.영화 진흥 위원회 : https://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do
  
사용한 DBMS : MySql

라우팅 : react-router v4

로그인 인증 : JWT+cookie

로그인 정보 전달 : REDUX

주소 : 

이 사이트는 댓글,회원 정보를 API로 만들어 React에서 정보를 받는다
로그인 성공시 JWT에 정보를 담아 cookie로 만들어 다른 페이지에서도 로그인 여부의 정보를 받는다

영화 진흥 위원회에서 박스오피스 순위의 대한 정보를 받고
그 영화에 맞는 자세한 정보(포스터,개봉일,회사 등)를 theMovieDb에서 받아 사용자에게 보여준다

각 영화 상세 페이지마다 댓글 기능이 있고 해당기능은 로그인을 해야만 사용할수있다.
