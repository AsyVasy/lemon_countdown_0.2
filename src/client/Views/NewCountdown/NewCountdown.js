import React from "react";
// import  logo  from "../../assets/lemoncd.png";
import LemonCD from '../../Components/Countdown';
import Theme from '../../Components/Theme/Theme';
import Header from '../../Components/Header/Header.js';
import { UrlAPI } from "../../utils/constants";
import "./newcountdown.scss";
class NewCountdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      hour: "",
      min:"",
      sec:"",
      boolpswd: false,
      password: "",
      error: "",
      submitted: false,
      pause : 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePause = this.handlePause.bind(this);
    
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({[name] : value });
    console.log(name, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, hour, min, sec, boolpswd} = this.state;
    const time = parseInt((hour * 3600000 + min * 60000 + sec * 1000), 10);

    this.setState(
      {submitted : true}
    )
    const notheme = null;
    if(localStorage.getItem('idTheme')){
      const themeStorage = localStorage.getItem('idTheme');
      console.log('coucou theme', themeStorage)
      this.createCountdown(name, boolpswd, time, themeStorage);
    } else if(localStorage.getItem('idTheme') === "Choose"){
      this.createCountdown(name, boolpswd, time, notheme);
    }
    else this.createCountdown(name, boolpswd, time, notheme);
    
  }

  //boolean password
  handleClick(e) {
    e.preventDefault();
    console.log(this.state.boolpswd)
    if(this.state.boolpswd){
      this.setState(
        {boolpswd : false}
      )
    } else {
      this.setState(
        {boolpswd : true}
      )
    } 
  }

  handlePause(e) {
    e.preventDefault();
    return null;
  }

  // fetch (create countdown)
  createCountdown(name, password, time, theme){
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, time, theme })
    };
    if (name === "") {
      this.setState(
        {error : "Veuillez mettre un nom"}
      )
    } else if (time === 0) {
      this.setState(
        {error : "Veuillez mettre un temps"}
      )
    } 

    else return fetch(UrlAPI + "/countdown", requestOptions)
      //.then(handleResponse)
      .then(newcountdown => {
        this.setState(
          {error : ""}
        )
        // login successful if there's a user in the response
        if (newcountdown) {
          // store user details and basic auth credentials in local storage
          // to keep user logged in between page refreshes
          // user.authdata = window.btoa(username + ":" + password);
          // localStorage.setItem("user", JSON.stringify(user));
          window.location.href='/home'; 
          localStorage.clear("idTheme")
        } 
  
        return newcountdown;
      });

  }


  render() {
    return (
      <React.Fragment>
        <Header />
        <section className="create">
          {/* <figure className="logo">
            <img src={logo} alt="logo"/>
          </figure> */}
      
        
          <form name="form" onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              // value={username}
              onChange={this.handleChange}
            />
            <label htmlFor="boolpswd" onClick={this.handleClick} className="pswd">Password ? {
                this.state.boolpswd ? (<i className="fas fa-check-square"></i>):<i className="far fa-square"></i>
            }</label>
            {
              this.state.boolpswd ? (<input
                  type="text"
                  className="form-control"
                  name="password"
                  // value={password}
                  onChange={this.handleChange}
              />):<span></span>
            }
            <br/>
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
            
              <button className="btn btn-primary">GO</button>
            </div>
          </form>
          {this.state.error ? (<p className="error">{this.state.error}</p>): <p></p>}

        { !this.state.error && this.state.submitted ? (<p>
          <span>{this.state.name}</span>
          <br/>
          <span>{this.state.password}</span>
          <br/>
          <LemonCD time={parseInt((this.state.hour * 3600000 + this.state.min * 60000 + this.state.sec * 1000), 10)} /*onClick={this.handlePause} */ renderer={props => "stop"}  className="pause"></LemonCD>
          </p>) : <p></p>}
        {/* <LemonCD/> */}
        </section>
      </React.Fragment>
    );
  }
}

export { NewCountdown };
