import React, { Component } from 'react';
import LemonCD from '../../Components/Countdown';
import { UrlAPI } from '../../utils/constants';
import "./playcountdown.scss";
import Matrix from "./../../assets/matrix.mp3";
import Cuisine from "./../../assets/cuisine.mp3";
import Plongee from "./../../assets/plongee.mp3";
import Escapegame from "./../../assets/escapegame.mp3";

class PlayPage extends Component {
	state = {
		playedCountdown: "",
		id_countdown: 1,
	};

	componentDidMount() {
		this.callApi(UrlAPI + '/countdown/' + this.props.location.state.id_countdown)
			.then(res => {
				// console.log(res);
				this.setState({ playedCountdown: res });
			})
			.catch(err => console.log(err));

		console.log('coucoucou');
	}

	callApi = async url => {
		const response = await fetch(url);
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		console.log(body);
		return body;
	};

	renderSound(param) {
		switch (param) {
		  case "matrix":
			return Matrix;
		  case "cuisine":
			return Cuisine;
		  case "plongee":
			return Plongee;
		  case "escapegame":
			return Escapegame;
		  default:
			return Matrix;
		}
	  }


	render() {
		console.log("const url -->", UrlAPI);
        const countdown  = this.state.playedCountdown;

		return (
			<>
                {/* <Link to="/new-countdown">Créer un nouveau compte à rebours</Link> <Link to="/home">Home</Link>{' '} */}
                <section id="sectionCD" className={'play ' + countdown.name_theme} >
                    <h1>{ countdown.name }</h1>
                    { countdown.msg ? (
                    <div className="countdown"><LemonCD time={countdown.time} /*onClick={this.handlePause} */ renderer={props => "stop"}  msg={countdown.msg} className="pause"></LemonCD></div>) :
                    <div className="countdown"><LemonCD time={countdown.time} /*onClick={this.handlePause} */ renderer={props => "stop"}  msg={'The End !'} className="pause"></LemonCD></div>
                    }   
					 <audio
						autoPlay 
						loop
						src={this.renderSound(countdown.name_theme)}>
							Your browser does not support the
							<code>audio</code> element.
					</audio>
                </section>
			</>
		);
	}
}

export default PlayPage;
