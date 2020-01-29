import React, { Component } from 'react';
class Home extends Component {
    render() {
        return(
            <div className = "HomeDiv">
                <h2>환영합니다!</h2>
                이 사이트는 React.js 와 node.js를 독학한후 활용하기 위해 만들어진 사이트입니다<br/>
                DBMS는 MySql을 사용하였고 라우팅을 구현하기위해 React-Route 모듈을 사용하였습니다<br/>
                또한 사이트를 구현하기 위해 사용된 API로는 영화진흥원의 API, The Movie Net API 두가지를 사용하였습니다<br/>
                공부에 있어 가장 큰 도움이 되신 유튜버 Nomard Coder, 생활코딩 두분에게 정말 감사드립니다.
            </div>
        )
    }
};

export default Home;