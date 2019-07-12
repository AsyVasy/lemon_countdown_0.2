import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { UrlAPI } from '../../utils/constants';
import Header from '../../Components/Header/Header.js';
import { EditForm } from './EditForm';
// import CountdownItem from '../../Components/countdownItem/countdownItem';

class EditPage extends Component {
	_isMounted = false;
	state = {
		actualCountdown: [],
		countdown_id: null,
	};

	componentDidMount() {
		this._isMounted = true;
		this.callApi(UrlAPI + '/countdown/' + this.props.location.state.id_countdown)
			.then(res => {
				if (this._isMounted) {
					this.setState({ actualCountdown: res });
				}
			})
			.catch(err => console.log(err));
	}

	callApi = async url => {
		const response = await fetch(url);
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
	};

	render() {
		const { actualCountdown } = this.state;
		const Completionist = () => <span>You are good to go!</span>;

		return (
			<>
				<Header />
				{/* <div>Je suis la Edit Page</div> */}

				<EditForm countdown={actualCountdown}>
					<Completionist />
				</EditForm>
			</>
		);
	}
}

export default EditPage;
