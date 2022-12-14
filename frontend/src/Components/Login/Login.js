import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addToken, addUser } from "../../Redux/actionCreators";
import { baseUrl } from "../../Shared/baseUrl";
import axios from "axios";
import "../Login/Login.css";
import logo from "../images/transparentlogo.png"
import recipePhoto from "../images/8.png"

const mapDispatchToProps = (dispatch) => ({
  addToken: () => dispatch(addToken()),
  addUser: () => dispatch(addUser()),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleLogin = async () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    const userWithToken = await axios.post(baseUrl + "/login", data);

    await this.props.dispatch(addToken(userWithToken.data.token));
    await this.props.dispatch(addUser(userWithToken.data.user));
  };

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {

   const StyledButton = {
     backgroundColor: "#FAC668",
     width: 200,
     height: "3rem",
     border: "none",
     color: "#556b2f",
   };
    return (
    
        <div className="login-form">
          <div className="text-center pt-5">
          <img 
        className="logo"
        src={logo}
        alt="Lets Eat Logo"
        style={{
            maxWidth: 500,
            maxHeight: 300,
            marginTop: 5,
            marginBottom: -30,
            marginInlineEnd: 20
        }}/>
            <p>PLAN PREP ENJOY</p>
          </div>
          <div className="row justify-content-center align-items-center">
            <label className="sr-only">Username</label>

            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="Username"
              v-model="user.username"
              onChange={this.handleInputChange}
              required
            />

            <label className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Password"
              v-model="user.password"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="row">
            <Link
              className="register-link"
              to="/register"
              style={{ color: "#556b2f" }}
              id="register"
            >
              Need an account?
            </Link>
            {"  "}
            <button
           style={StyledButton}
              type="submit"
              onClick={this.handleLogin}
              
            >
              Sign In
            </button>
          </div>
          </div>
     
    );
  }
}

export default withRouter(connect(mapDispatchToProps)(Login));
