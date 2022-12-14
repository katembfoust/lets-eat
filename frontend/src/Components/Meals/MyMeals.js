import { withRouter, Link } from "react-router-dom";
import {
  fetchMeals
} from "../../Redux/actionCreators";
import {

  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  CardSubtitle,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { connect } from "react-redux";
import { Component } from "react";
import RecipeList from "../Recipes/RecipeList";
import axios from "axios";
import { baseUrl } from "../../Shared/baseUrl";
import "../Meals/MyMeals.css"
import MealList from "./MealList";
import meals from "../images/meals.jpg"
import list from "../images/List1.png"

const mapDispatchToProps = (dispatch) => ({
  fetchMeals: () => dispatch(fetchMeals()),
});

class MyMeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal_id: "", // changed from "meals_id"
      user_id: this.props.user,
      meal_name: "",
      recipes: [],
      meals: [],
      newMeals: [],
      counter: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleCallback = (childData) => {
    this.setState({mealRecipes: childData})
  }

  handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
  };

  onCounter = () => {
    this.setState({counter: this.state.counter + 1})
  }

  handleCreateMeal = async (e) => {
    e.preventDefault();
    const data = {
      meal_id: 0,
      user_id: this.state.user_id,
      meal_name: this.state.meal_name,
      recipes: this.state.mealRecipes,
    } 

    await axios.post(
      baseUrl + "/mymeal/create",
      data
    ).then(() => {this.onCounter()});
    this.setState({
      ...this.state,
      newMeals: this.state.newMeals + data,
    })
  };


  handleInputChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  removeRecipeFromMeal(recipe) {
    var recipeList = this.state.mealRecipes;
    const index = recipeList.findIndex((recip) => recip === recipe);
    recipeList.splice(index,1);
    this.setState({
      mealRecipes: recipeList
    })
  }

  render() {

    const footerStyle = {
      backgroundColor: "#f0eae1",
      borderTop: "1px solid #E7E7E7",
      textAlign: "center",
      padding: "20px",
      position: "fixed",
      left: "0",
      bottom: "0",
      height: "60px",
      width: "100%"
    };
    const StyledButton = {
      backgroundColor: "#FAC668",
      width: 300,
      height: "3rem",
      border: "none",
      color: "#556b2f",
    };
    return (
      <div className="row">
        <h1 className="text-center mt-5">Curate Meals</h1>
        <h2 className="text-center mb-5 mt-5">
          ???? Organize your recipes into meals you enjoy ????
        </h2>
        <div className="container border">
          <div className="new-meal mt-5">
            <Card
              body
              className="text-start "
              id="newRec"
              style={{
                backgroundColor: "#F6F2F0",
                border: "none",
                marginRight: 100,
                maxWidth: "50%",
              }}
            >
              <CardTitle tag="h5">Create Your Meal</CardTitle>
              <CardSubtitle className="">What's This Meal Called?</CardSubtitle>
              <Form onSubmit={this.handleCreateMeal}>
                <FormGroup style={{ maxWidth: 400, color: "#92ab75" }}>
                  <Label for="meal_name"></Label>
                  <Input
                    style={{ marginLeft: 0 }}
                    name="meal_name"
                    placeholder="Meal Name"
                    onChange={this.handleInputChange}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <CardTitle tag="h5">Add Recipes</CardTitle>
                  <CardSubtitle className="">
                    Click ??? to add recipes to your meals ??????
                  </CardSubtitle>
                  <Label for="recipes"></Label>
                  <ListGroup>
                    {this.state.mealRecipes &&
                      this.state.mealRecipes.map((recipe) => {
                        return (
                          <ListGroupItem>
                            {recipe.recipe_name}
                            <Button
                              style={{
                                backgroundColor: "#FFFFFF",
                                width: 40,
                                height: 30,
                                border: "none",
                              }}
                              onClick={() => {
                                this.removeRecipeFromMeal(recipe);
                              }}
                            >
                              ??????
                            </Button>
                          </ListGroupItem>
                        );
                      })}
                  </ListGroup>
                </FormGroup>
                <Button className="mt-5" style={StyledButton}>
                  Save This Meal
                </Button>
              </Form>
            </Card>
          </div>

          <div style={{ width: "20rem" }}>
            <Card
              className=" align-items-center"
              style={{
                backgroundColor: "#F6F2F0",
                backgroundImage: `url(${list})`,
              }}
            >
              <RecipeList
                plusButton={true}
                parentCallback={this.handleCallback}
                loggedIn={true}
              />
            </Card>
          </div>
        </div>
        <div className="meal-list align-items-center mb-5">
          <Card
            className="align-items-center mt-5 mb-5"
            style={{
              backgroundImage: `url(${meals})`,
              width: "35rem",
            }}
          >
            <MealList
              plusButton={false}
              key={this.state.counter}
              parentMeals={this.state.meals}
              user={this.props.user}
              parentCallback={this.handleCallback}
              newMeals={this.state.newMeals}
            />
            <Link to="/mymealplans" className="mt-5 mb-5">
              <Button type="submit" style={StyledButton}>
                Start A Meal Plan
              </Button>
            </Link>
          </Card>
        </div>

        <footer className="text-center pt-5" style={footerStyle}>
          <Link to="/home" style={{ color: "#556b2f" }}>
            Home |{" "}
          </Link>
          <Link
            to="/login"
            onClick={this.handleLogout}
            style={{ color: "#556b2f" }}
          >
            Logout
          </Link>
        </footer>
      </div>
    );
  }
}
export default withRouter(connect(mapDispatchToProps)(MyMeals));
