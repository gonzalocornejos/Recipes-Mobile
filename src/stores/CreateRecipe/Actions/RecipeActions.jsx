import { ADD_CATEGORIES, ADD_GENERAL_INFO, ADD_INGREDIENTS, ADD_PASOS, ADD_EVERYTHING, EMPTY, CREAR, EDITAR, SOBREESCRIBIR, CAMBIAR_CREAR,CAMBIAR_SOBREESCRIBIR,CAMBIAR_EDITAR  } from "../Constants";

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

export const addEverything = (nombre, descripcion,porciones,imagen,ingredientes,categorias,pasos) => {
  return {
    type: ADD_EVERYTHING,
    nombre: nombre,
    descripcion: descripcion,
    porciones: porciones,
    imagen: imagen,
    ingredientes: ingredientes,
    categorias: categorias,
    pasos: pasos
  }
}

export const empty = () => {
  return {
    type: EMPTY,
    nombre: undefined,
    descripcion: undefined,
    porciones:  undefined,
    imagen: undefined,
    ingredientes: [],
    categorias: [],
    pasos: [],
  }
}

export const cambiarCrear = (estado) => {
  return {
    type: CAMBIAR_CREAR,
    estado: estado
  }
}

export const cambiarEditar = (estado) => {
  return {
    type: CAMBIAR_EDITAR,
    estado: estado
  }
}

export const cambiarSobreescribir = (estado) => {
  return {
    type: CAMBIAR_SOBREESCRIBIR,
    estado: estado
  }
}