import { useState, useEffect } from 'react';
import { getCharacters } from '../services/rickMortyApi';

/*
Hook personalizado para obtener personajes de la API
Maneja:
- Carga de datos
- Estados de carga y error
- Paginación
 */
export const useCharacters = (page = 1) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getCharacters(page);
        setCharacters(data.results);
        setPagination({
          count: data.info.count,
          pages: data.info.pages,
          next: data.info.next,
          prev: data.info.prev,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]); 

  return { characters, loading, error, pagination };
};
