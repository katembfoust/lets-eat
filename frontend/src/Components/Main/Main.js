import { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Home from "../Home/Home";
import { addToken, deleteUser } from "../../Redux/actionCreators";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
} from "reactstrap";
import "../Main/Main.css";
import MyRecipes from "../Recipes/MyRecipes";
import MyMealPlans from "../MealPlans/MyMealPlan";
import MyMeals from "../Meals/MyMeals";
import logo from "../images/DummyLogo 2.png";

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addToken: () => {
    dispatch(addToken());
  },
  deleteUser: () => {
    dispatch(deleteUser());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div>
        <Navbar xs={12} sm={3} md={2} lg={1}>
          <NavbarBrand>
            <img className="logo" src={logo} alt="logo"></img>
          </NavbarBrand>
          {this.props.token.token !== undefined ? (
            <div className="top-section">
              <Col className=" bg-light border">
                <UncontrolledDropdown>
                  <DropdownToggle nav caret className="menu">
                    Recipes
                  </DropdownToggle>
                  <DropdownMenu right className="sub-menu">
                    <DropdownItem className="sub-item">
                      <NavItem className="links">
                        <NavLink className="links" tag={Link} to="/myrecipes">
                          My Saved Recipes
                        </NavLink>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem className="sub-item">
                      <NavItem>
                        <NavLink className="links" tag={Link} to="/myrecipes">
                          Create New Recipe
                        </NavLink>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Reset</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Col>
              <Col className="tabs bg-light border">
                <UncontrolledDropdown>
                  <DropdownToggle nav caret className="menu">
                    Meals
                  </DropdownToggle>
                  <DropdownMenu right className="sub-menu">
                    <DropdownItem className="sub-item">
                      <NavItem>
                        <NavItem>
                          <NavLink className="links" tag={Link} to="/mymeals">
                            My Saved Meals
                          </NavLink>
                        </NavItem>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem className="sub-item">
                      <NavItem>
                        <NavLink className="links" tag={Link} to="/mymeals">
                          Create New Meals
                        </NavLink>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Reset</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Col>
              <Col className="tabs bg-light border">
                <UncontrolledDropdown>
                  <DropdownToggle nav caret className="menu">
                    Meal Plans
                  </DropdownToggle>
                  <DropdownMenu right className="sub-menu">
                    <DropdownItem className="sub-item">
                      <NavItem>
                        <NavItem>
                          <NavLink
                            className="links"
                            tag={Link}
                            to="/mymealplans"
                          >
                            Saved Meal Plans
                          </NavLink>
                        </NavItem>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem className="sub-item">
                      <NavItem className="links">
                        <NavLink className="links" tag={Link} to="/mymealplans">
                          Create New Meal Plan
                        </NavLink>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Reset</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Col>
              <Redirect to="/home" />
            </div>
          ) : (
            <Link to="/login">Home | </Link>
          )}
        </Navbar>

        <Switch>
          <Route path="/login" component={() => <Login />} />
          <Route path="/register" component={() => <Register />} />
          <Route
            path="/home"
            component={
              this.props.token.token !== undefined ? () => <Home /> : null
            }
          />
          <Route
            path="/myrecipes"
            component={
              this.props.token.token !== undefined ? () => <MyRecipes /> : null
            }
          />
          <Route
            path="/mymealplans"
            component={
              this.props.token.token !== undefined
                ? () => <MyMealPlans />
                : null
            }
          />
          <Route
            path="/mymeals"
            component={
              this.props.token.token !== undefined ? () => <MyMeals /> : null
            }
          />
          <Redirect to="/login" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
