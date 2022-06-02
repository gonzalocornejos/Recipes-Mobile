import { ADD_CATEGORIES, ADD_GENERAL_INFO, ADD_INGREDIENTS, ADD_PASOS } from "../Constants";

const INITIAL_STATE = {
    nombre: undefined,
    descripcion: undefined,
    porciones:  undefined,
    imagen: undefined,
    ingredientes: [],
    categorias: [],
    pasos: []
};

const RecipeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_GENERAL_INFO:
        return {
          ...state,
          nombre: action.nombre,
          descripcion: action.descripcion,
          porciones: action.porciones,
          imagen: action.imagen
        };
      case ADD_INGREDIENTS:
        return {
          ...state,
          ingredientes: action.ingredientes,
        };
      case ADD_CATEGORIES:
        return {
          ...state,
          categorias: action.categorias,
        };
      case ADD_PASOS:
        return {
          ...state,
          pasos: action.pasos,
        };
      default: 
        return state;
    }
};

export default RecipeReducer;