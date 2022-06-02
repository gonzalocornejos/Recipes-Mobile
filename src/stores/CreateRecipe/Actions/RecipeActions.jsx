import { ADD_CATEGORIES, ADD_GENERAL_INFO, ADD_INGREDIENTS, ADD_PASOS } from "../Constants";

export const addGeneralInfo= (nombre, descripcion,porciones,imagen) => {    
    return {
        type: ADD_GENERAL_INFO, 
        nombre: nombre,
        descripcion: descripcion,
        porciones: porciones,
        imagen: imagen
    };
}

export const addIngredientes= (ingredientes) => {
    return {
      type: ADD_INGREDIENTS,
      ingredientes: ingredientes
    }
} 

export const addCategorias= (categorias) => {
    return {
      type: ADD_CATEGORIES,
      categorias: categorias
    }
} 

export const addPasos= (pasos) => {
    return {
      type: ADD_PASOS,
      pasos: pasos
    }
} 