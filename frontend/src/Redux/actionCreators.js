import Ingredientlist from "../Components/Ingredients/IngredientList";
import * as ActionTypes from "./actionTypes";
import { Ingredient } from "./ingredient";

export const addToken = (token) => ({
  type: ActionTypes.ADD_TOKEN,
  payload: token,
});

export const addUser = (user) => ({
  type: ActionTypes.ADD_USER,
  payload: user,
});

export const deleteUser = () => ({
  type: ActionTypes.DELETE_USER,
});

export const addIngredient = () => ({
  type: ActionTypes.ADD_INGREDIENT,
payload: Ingredient,
});
