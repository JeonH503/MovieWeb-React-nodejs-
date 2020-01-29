import React,{ Component } from 'react';

class Companie extends Component {  
    state={
        logoURL : ""
    }

    getLogo = async()=>{
        if(!this.props.logo){
            this.setState({logoURL : "https://semantic-ui.com/images/wireframe/white-image.png"})
        } else {
            this.setState({logoURL : `https://image.tmdb.org/t/p/w500/${this.props.logo}`})
        }
    }

    componentDidMount(){
        this.getLogo()
    }

    render(){
        return(
            <div className="companie">
                <img alt = "회사로고" className="CompanieLogo" src={this.state.logoURL}/>
                <p>{this.props.name}</p>
            </div>
        )
      }
}

export default Companie;