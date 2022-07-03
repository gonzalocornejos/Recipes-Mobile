import { ADD_CATEGORIES, ADD_GENERAL_INFO, ADD_INGREDIENTS, ADD_PASOS, ADD_EVERYTHING, EMPTY, CREAR, EDITAR, SOBREESCRIBIR, CAMBIAR_CREAR,CAMBIAR_SOBREESCRIBIR,CAMBIAR_EDITAR } from "../Constants";

const INITIAL_STATE = {
    id: undefined,
    nombre: undefined,
    descripcion: undefined,
    porciones:  undefined,
    imagen: undefined,
    ingredientes: [],
    categorias: [],
    pasos: [],
    estado: CREAR
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
      case EMPTY:
        return {
          ...state,
          nombre: action.nombre,
          descripcion: action.descripcion,
          porciones: action.porciones,
          imagen: action.imagen,
          ingredientes: action.ingredientes,
          categorias: action.categorias,
          pasos: action.pasos,
        };
      case ADD_EVERYTHING:
        return {
          ...state,
          id: action.id,
          nombre: action.nombre,
          descripcion: action.descripcion,
          porciones: action.porciones,
          imagen: action.imagen,
          ingredientes: action.ingredientes,
          categorias: action.categorias,
          pasos: action.pasos,
        };
      case CAMBIAR_CREAR:
        return{
          ...state,
          estado: action.estado
        };
      case CAMBIAR_EDITAR:
        return {
          ...state,
          estado: action.estado
        };
      case CAMBIAR_SOBREESCRIBIR:
        return {
          ...state,
          estado: action.estado
        };
      default: 
        return state;
    }
};

export default RecipeReducer;