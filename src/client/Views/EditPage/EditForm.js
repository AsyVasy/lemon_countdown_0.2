import React from 'react';
// import  logo  from "../../assets/lemoncd.png";
import LemonCD from './EditPage';
import Theme from '../../Components/Theme/Theme';
import { UrlAPI } from '../../utils/constants';
import './editcountdown.scss';
import { Link } from 'react-router-dom';
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
	}

	handleSubmit(e) {
		e.preventDefault();
		let time;
		let { name, hour, min, sec, boolpswd } = this.state;
		if (name === '') {
			name = this.props.countdown.name;
		} else {
		}
		if (((hour === min) === sec) === null) {
			time = this.props.countdown.time;
		} else {
			time = parseInt(hour * 3600000 + min * 60000 + sec * 1000, 10);
		}
		this.setState({ submitted: true });
		const notheme = null;
		if (localStorage.getItem('idTheme')) {
			const themeStorage = localStorage.getItem('idTheme');
			this.editCountdown(name, boolpswd, time, themeStorage);
		} else if (localStorage.getItem('idTheme') === 'Choose') {
			this.editCountdown(name, boolpswd, time, notheme);
		} else this.editCountdown(name, boolpswd, time, notheme);
	}

	//boolean password
	handleClick(e) {
		e.preventDefault();
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

		if (name === '') {
			name = this.props.countdown.name;
		}
		if (time === 0) {
			time = this.props.countdown.time;
		}
		if (password === '') {
			password = this.props.countdown.password;
		}
		const requestOptions = {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, password, time, theme, id }),
		};

		return (
			fetch(UrlAPI + '/countdown', requestOptions)
				//.then(handleResponse)
				.then(EditForm => {
					if (EditForm) {
						window.location.href = '/home';
						localStorage.clear('idTheme');
					}
					return EditForm;
				})
		);
	}

	render() {
		return (
			<React.Fragment>
				<section className="create">
					{/* <figure className="logo">
            <img src={logo} alt="logo"/>
          </figure> */}
					<h1>Modifier le compte à rebours</h1>
					<form name="form" onSubmit={this.handleSubmit}>
						<label htmlFor="name">Nom du compte à rebours</label>
						<input
							type="text"
							// className="form-control"
							name="name"
							placeholder={this.props.countdown.name}
							// value={this.props.countdown.name}
							onChange={this.handleChange}
						/>
						<label htmlFor="boolpswd" onClick={this.handleClick} className="pswd">
							Mot de passe{' '}
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
						<label htmlFor="time">Durée du compte à rebours</label>
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
						<label htmlFor="name">Thème</label>
						<Theme onChange={this.handleChange} />
						<div className="form-group">
							<button className="btn btn-primary">MODIFIER</button>
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
								renderer={props => 'stop'}
								className="pause"
							/>
						</p>
					) : (
						<p />
					)}
					{/* <LemonCD/> */}

					<div className="link12">
						<Link to="/home">Accueil</Link>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export { EditForm };
