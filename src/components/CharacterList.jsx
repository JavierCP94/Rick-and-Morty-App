import { useState } from 'react';
import { useCharacters } from '../hooks/useCharacters';
import { CharacterCard } from './CharacterCard';
import { CharacterDetail } from './CharacterDetail';
import { SearchBar } from './SearchBar';


 /* 
 Componente principal que:
 - Obtiene personajes del hook
 - Muestra lista de tarjetas
 - Maneja búsqueda avanzada (nombre, especie, ubicación)
 - Muestra detalle del personaje
 - Gestiona sistema de favoritos
 */

export const CharacterList = () => {
  const [page, setPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    // Carga favoritos desde localStorage al iniciar
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Filtros de búsqueda
  const [filterName, setFilterName] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  const { characters, loading, error, pagination } = useCharacters(page);

  // Verifica si un personaje está en favoritos
  const isFavorite = (characterId) => favorites.includes(characterId);

  // Filtra personajes por nombre, especie y ubicación
  const filteredCharacters = characters.filter(character => {
    const matchName = character.name.toLowerCase().includes(filterName.toLowerCase());
    const matchSpecies = character.species.toLowerCase().includes(filterSpecies.toLowerCase());
    const matchLocation = character.location?.name.toLowerCase().includes(filterLocation.toLowerCase());
    
    return matchName && matchSpecies && matchLocation;
  });

  // Ordena personajes: fijados primero, luego el resto
  const sortedCharacters = [...filteredCharacters].sort((a, b) => {
    const aIsPinned = isFavorite(a.id);
    const bIsPinned = isFavorite(b.id);
    
    if (aIsPinned && !bIsPinned) return -1;
    if (!aIsPinned && bIsPinned) return 1;
    return 0;
  });

  // Maneja agregar/quitar de favoritos
  const handleToggleFavorite = (characterId) => {
    setFavorites(prevFavorites => {
      const isFav = prevFavorites.includes(characterId);
      let newFavorites;
      
      if (isFav) {
        newFavorites = prevFavorites.filter(id => id !== characterId);
      } else {
        newFavorites = [...prevFavorites, characterId];
      }
      
      // Guarda favoritos en localStorage
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className="character-list-container">
      <h1>Rick and Morty - Characters</h1>
      
      <SearchBar 
        nameValue={filterName}
        onNameChange={setFilterName}
        speciesValue={filterSpecies}
        onSpeciesChange={setFilterSpecies}
        locationValue={filterLocation}
        onLocationChange={setFilterLocation}
      />

      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}

      {loading && (
        <div className="loading-message">
          Cargando personajes...
        </div>
      )}

      {filteredCharacters.length === 0 && !loading && characters.length > 0 && (
        <div className="no-results">
          No characters found with those filters.
        </div>
      )}

      <div className="characters-grid">
        {sortedCharacters.map(character => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={() => setSelectedCharacter(character)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => {
            setPage(prev => prev - 1);
            setFilterName('');
            setFilterSpecies('');
            setFilterLocation('');
          }}
          disabled={!pagination.prev}
          className="pagination-button"
        >
          ← Previous
        </button>
        
        <span className="pagination-info">
          Page {page} of {pagination.pages}
        </span>
        
        <button
          onClick={() => {
            setPage(prev => prev + 1);
            setFilterName('');
            setFilterSpecies('');
            setFilterLocation('');
          }}
          disabled={!pagination.next}
          className="pagination-button"
        >
          Next →
        </button>
      </div>

      {/* Modal de detalles */}
      {selectedCharacter && (
        <CharacterDetail
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
          onAddFavorite={() => handleToggleFavorite(selectedCharacter.id)}
          isFavorite={isFavorite(selectedCharacter.id)}
        />
      )}
    </div>
  );
};
