
import React, { Component } from "react";
import { UrlAPI } from "../../utils/constants";

class Theme extends Component {
    constructor(props) {
        super(props);
        this.state = {
         allTheme:[],
         theme:""
        };

        this.handleChange = this.handleChange.bind(this);
    
      }

    handleChange(e) {
      const { name, value } = e.target;
      this.setState({[name] : value });
      console.log(name, value);
      
      const selectTheme = document.getElementById("selectTheme");
      const idselectedTheme = selectTheme.options[selectTheme.selectedIndex].value;
      console.log('theme selected', idselectedTheme);
      localStorage.setItem('idTheme', idselectedTheme);
    };

  componentDidMount() {
    this.callApi(UrlAPI + "/theme")
      .then(res => {
        console.log(res[1]);
        const results = res[1];
        this.setState({ allTheme: results });
      })
      .catch(err => console.log(err));
  }

  callApi = async url => {
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log(body);
    return body;
  };

  render() {
    console.log("const url -->", UrlAPI);
    const listCountdowns = this.state.allTheme.map((number) =>
        <option key={number.id_theme} value={number.id_theme}>{number.name_theme}</option>
    );
    return (

        <React.Fragment>
            <select
                className="form-control"
                name="theme"
                // value={username}
                onChange={this.handleChange} 
                id = "selectTheme"
            >
            {listCountdowns}
            </select>
        
        </React.Fragment>

    );
  }
}

export default Theme;
