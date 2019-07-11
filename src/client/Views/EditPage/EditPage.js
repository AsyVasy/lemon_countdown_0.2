import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UrlAPI } from '../../utils/constants';
import Header from '../../Components/Header/Header.js';
// import CountdownItem from '../../Components/countdownItem/countdownItem';

class EditPage extends Component {
	state = {
		actualCountdown: [],
		id_countdown: 1,
	};

	componentDidMount() {
		this.callApi(UrlAPI + '/countdown/' + this.state.id_countdown)
			.then(res => {
				console.log(res);
				this.setState({ actualCountdown: res });
			})
			.catch(err => console.log(err));
	}

	callApi = async url => {
		const response = await fetch(url);
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		console.log(body);
		return body;
	};

	displayCountdowns = () => {
		const { theCountdown } = this.state;
		// return theCountdown.map(e => <CountdownItem name={e.name} id={e.id} />);
	};

	render() {
		console.log('const url -->', UrlAPI);

		return (
			<>
				<div>Je suis la EditPage</div>
				<Header />
				<Link to="/new-countdown">Créer un nouveau compte à rebours</Link>{' '}
			</>
		);
	}
}

export default EditPage;
