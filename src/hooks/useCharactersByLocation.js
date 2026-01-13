import { useState, useEffect } from 'react';
import { getCharacters } from '../services/rickMortyApi';

/**
Hook para obtener personajes que viven en la misma ubicación
 
 @param {string} locationName - Nombre de la ubicación
 @param {number} excludeId - ID del personaje a excluir (el personaje actual)
 */
export const useCharactersByLocation = (locationName, excludeId = null) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!locationName || locationName === 'Desconocida' || locationName === 'Desconocido') {
      setCharacters([]);
      return;
    }

    const fetchCharactersByLocation = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Obtenemos personajes de múltiples páginas
        const allCharacters = [];
        let page = 1;
        let hasMore = true;

        while (hasMore && page <= 5) { // Limite de 5 páginas
          const data = await getCharacters(page);
          
          // Filtramos por ubicación y excluimos el personaje actual
          const filtered = data.results.filter(
            character => 
              character.location?.name === locationName && 
              character.id !== excludeId
          );
          
          allCharacters.push(...filtered);
          
          hasMore = data.info.next !== null;
          page++;
        }

        setCharacters(allCharacters);
      } catch (err) {
        setError(err.message);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCharactersByLocation();
  }, [locationName, excludeId]);

  return { characters, loading, error };
};
