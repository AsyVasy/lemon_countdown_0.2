import React from "react";
import  logo  from "../../assets/lemoncd.png";
import LemonCD from './Countdown'
import "./newcountdown.scss";

class NewCountdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      time: "",
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
    const { name, time, password } = this.state;
    console.log("name :", name);
    console.log("time :", time);
    console.log("password :", password);
    this.setState(
      {submitted : true}
    )
  }

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
    console.log(this.state.pause);
    this.setState(
      {pause : 1}
    )

    
  }



  render() {

    return (
      <React.Fragment>
        <section className="create">
          <figure className="logo">
            <img src={logo} alt="logo"/>
          </figure>
      
        
          <form name="form" onSubmit={this.handleSubmit}>
            <label htmlFor="namee">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              // value={username}
              onChange={this.handleChange}
            />
            <br/>
            <label htmlFor="boolpswd" onClick={this.handleClick} className="pswd">Password ?</label>
            <br/>
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
            <input
              type="text"
              className="form-control"
              name="time"
              // value={password}
              onChange={this.handleChange}
            />

            <div className="form-group">
            
              <button className="btn btn-primary">GO</button>
            </div>
          </form>

        { this.state.submitted ? (<p>
          <span>{this.state.name}</span>
          <br/>
          <span>{this.state.password}</span>
          <br/>
          <LemonCD time={parseInt(this.state.time, 10)} onClick={this.handlePause} pause={this.state.pause} className="pause"></LemonCD>
          </p>) : <p></p>}
        {/* <LemonCD/> */}
        </section>
      </React.Fragment>
    );
  }
}

export { NewCountdown };
