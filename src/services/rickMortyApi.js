/*
 Este archivo es responsable de todas las llamadas HTTP a la API.
 Así mantenemos la lógica de API separada de los componentes.
 */

const BASE_URL = 'https://rickandmortyapi.com/api';

/**
Obtiene un listado de personajes con paginación opcional
@param {number} page - Número de página (por defecto 1)
@returns {Promise<Object>} Datos de personajes e información de paginación
*/
export const getCharacters = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/character?page=${page}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo personajes:', error);
    throw error;
  }
};

/**
Obtiene un personaje específico por su ID
@param {number} id - ID del personaje
@returns {Promise<Object>} Datos del personaje
*/
export const getCharacterById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error obteniendo personaje ${id}:`, error);
    throw error;
  }
};

/**
Busca personajes por nombre y/o filtros
@param {string} name - Nombre a buscar
@param {string} species - Especie a filtrar
@param {string} status - Estado a filtrar (alive, dead, unknown)
@returns {Promise<Object>} Resultados de búsqueda
*/
export const searchCharacters = async (name = '', species = '', status = '') => {
  try {
    let query = `${BASE_URL}/character/?`;
    const params = [];
    
    if (name) params.push(`name=${name}`);
    if (species) params.push(`species=${species}`);
    if (status) params.push(`status=${status}`);
    
    query += params.join('&');
    
    const response = await fetch(query);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error buscando personajes:', error);
    throw error;
  }
};
