import * as ActionTypes from "./actionTypes";

export const Recipe = (
  state = {
    id: null,
    recipe_name: "",
    instructions_list: "",
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CREATE_RECIPE:
      return {
        ...state,
        recipe_name: action.payload.recipe_name,
        instructions_list: action.payload.instructions_list,
      };
      // NEED TO FINISH- UNSURE OF OBJECT FORMAT
      case ActionTypes.ADD_INGREDIENT_TO_RECIPE:
      return {
        ...state,
      };

      // UNSURE OF COMBINING INGREDIENTS IN OBJECT
      case ActionTypes.EDIT_MY_RECIPE:
        return {
          ...state,
          recipe_name: action.payload.recipe_name,
        instructions_list: action.payload.instructions_list,
      };
      
      case ActionTypes.DELETE_RECIPE:
        return {
          ...state,
          recipe_name: "",
          instructions_list: "",
        }

    default:
      return state;
  }
}
