import { useState, useEffect } from 'react';
import { searchCharacters } from '../services/rickMortyApi';

/*
 Hook para búsqueda avanzada de personajes
 Permite filtrar por nombre, especie y estado
 */
export const useSearchCharacters = (name = '', species = '', status = '') => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });

  useEffect(() => {
    if (!name && !species && !status) {
      // Si no hay filtros, no realizamos búsqueda
      setResults([]);
      return;
    }

    const performSearch = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await searchCharacters(name, species, status);
        setResults(data.results);
        setPagination({
          count: data.info.count,
          pages: data.info.pages,
          next: data.info.next,
          prev: data.info.prev,
        });
      } catch (err) {
        setError(err.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [name, species, status]);

  return { results, loading, error, pagination };
};
