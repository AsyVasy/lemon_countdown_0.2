import React from 'react';
// import  logo  from "../../assets/lemoncd.png";
import LemonCD from './EditPage';
import Theme from '../../Components/Theme/Theme';
import { UrlAPI } from '../../utils/constants';
import './editcountdown.scss';
class EditForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			hour: '',
			min: '',
			sec: '',
			boolpswd: false,
			password: '',
			error: '',
			submitted: false,
			pause: 0,
		};

		// this.state = { countdown: this.props.countdown };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handlePause = this.handlePause.bind(this);
	}

	componentDidMount() {
		if (this.props.countdown.password) {
			this.setState({ boolpswd: true });
		} else {
			this.setState({ boolpswd: false });
		}
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
		console.log(name, value);
	}

	handleSubmit(e) {
		e.preventDefault();
		let time;
		let { name, hour, min, sec, boolpswd } = this.state;
		// name === '' ? (name = this.props.countdown.name) : (name = name);
		if ((name = '')) {
			name = this.props.countdown.name;
		}
		// console.log(name, 'toutoutoutoutoutoutoutouotutou');
		if (((hour === min) === sec) === null) {
			time = this.props.countdown.time;
		} else {
			time = parseInt(hour * 3600000 + min * 60000 + sec * 1000, 10);
		}
		this.setState({ submitted: true });
		const notheme = null;
		if (localStorage.getItem('idTheme')) {
			const themeStorage = localStorage.getItem('idTheme');
			// console.log('coucou theme', themeStorage);
			this.editCountdown(name, boolpswd, time, themeStorage);
		} else if (localStorage.getItem('idTheme') === 'Choose') {
			this.editCountdown(name, boolpswd, time, notheme);
		} else this.editCountdown(name, boolpswd, time, notheme);
	}

	//boolean password
	handleClick(e) {
		e.preventDefault();
		console.log(this.state.boolpswd);
		if (this.state.boolpswd) {
			this.setState({ boolpswd: false });
		} else {
			this.setState({ boolpswd: true });
		}
	}

	handlePause(e) {
		e.preventDefault();
		return null;
	}

	editCountdown(name, password, time, theme) {
		const id = this.props.countdown.id;
		const requestOptions = {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, password, time, theme, id }),
		};
		if (name === '') {
			this.setState({ error: 'Veuillez mettre un nom' });
		} else if (time === 0) {
			this.setState({ error: 'Veuillez mettre un temps' });
		} else
			return (
				fetch(UrlAPI + '/countdown', requestOptions)
					//.then(handleResponse)
					.then(EditForm => {
						this.setState({ error: '' });
						// login successful if there's a user in the response
						if (EditForm) {
							// store user details and basic auth credentials in local storage
							// to keep user logged in between page refreshes
							// user.authdata = window.btoa(username + ":" + password);
							// localStorage.setItem("user", JSON.stringify(user));
							window.location.href = '/home';
							localStorage.clear('idTheme');
						}

						return EditForm;
					})
			);
	}

	render() {
		// console.log(this.props.countdown);

		return (
			<React.Fragment>
				<section className="create">
					{/* <figure className="logo">
            <img src={logo} alt="logo"/>
          </figure> */}

					<form name="form" onSubmit={this.handleSubmit}>
						<label htmlFor="name">Name</label>
						<input
							type="text"
							// className="form-control"
							name="name"
							placeholder={this.props.countdown.name}
							// value={this.props.countdown.name}
							onChange={this.handleChange}
						/>
						<label htmlFor="boolpswd" onClick={this.handleClick} className="pswd">
							Password ?{' '}
							{this.state.boolpswd ? (
								<i className="fas fa-check-square" />
							) : (
								<i className="far fa-square" />
							)}
						</label>
						{this.state.boolpswd ? (
							<input
								type="text"
								className="form-control"
								name="password"
								// value={password}
								onChange={this.handleChange}
							/>
						) : (
							<span />
						)}
						<br />
						<label htmlFor="time">Time</label>
						<span className="timer">
							<input
								type="text"
								className="form-control"
								name="hour"
								placeholder="hh"
								// value={password}
								onChange={this.handleChange}
								step="1"
							/>
							<span>:</span>
							<input
								type="text"
								className="form-control"
								name="min"
								placeholder="mm"
								// value={password}
								onChange={this.handleChange}
								step="1"
							/>
							<span>:</span>
							<input
								type="text"
								className="form-control"
								name="sec"
								placeholder="ss"
								// value={password}
								onChange={this.handleChange}
								step="1"
							/>
						</span>
						<label htmlFor="name">Theme</label>
						<Theme onChange={this.handleChange} />
						<div className="form-group">
							<button className="btn btn-primary">EDIT</button>
						</div>
					</form>
					{this.state.error ? <p className="error">{this.state.error}</p> : <p />}

					{!this.state.error && this.state.submitted ? (
						<p>
							<span>{this.state.name}</span>
							<br />
							<span>{this.state.password}</span>
							<br />
							<LemonCD
								time={parseInt(
									this.state.hour * 3600000 + this.state.min * 60000 + this.state.sec * 1000,
									10
								)}
								/*onClick={this.handlePause} */ renderer={props => 'stop'}
								className="pause"
							/>
						</p>
					) : (
						<p />
					)}
					{/* <LemonCD/> */}
				</section>
			</React.Fragment>
		);
	}
}

export { EditForm };
