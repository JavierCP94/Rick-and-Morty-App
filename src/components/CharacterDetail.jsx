import { useCharactersByLocation } from '../hooks/useCharactersByLocation';

 // Muestra los detalles completos de un personaje en un modal.


export const CharacterDetail = ({ character, onClose, onAddFavorite, isFavorite }) => {
  const { characters: sameLocationCharacters, loading: loadingLocation } = 
    useCharactersByLocation(character?.location?.name, character?.id);

  if (!character) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✕</button>
        
        <div className="detail-container">
          <img 
            src={character.image} 
            alt={character.name}
            className="detail-image"
          />
          
          <div className="detail-info">
            <h2>{character.name}</h2>
            
            <div className="detail-grid">
              <div className="detail-item">
                <strong>Estado:</strong>
                <p>{character.status}</p>
              </div>
              
              <div className="detail-item">
                <strong>Especie:</strong>
                <p>{character.species}</p>
              </div>
              
              <div className="detail-item">
                <strong>Tipo:</strong>
                <p>{character.type || 'Ninguno'}</p>
              </div>
              
              <div className="detail-item">
                <strong>Género:</strong>
                <p>{character.gender}</p>
              </div>
              
              <div className="detail-item">
                <strong>Ubicación Actual:</strong>
                <p>{character.location?.name || 'Desconocida'}</p>
              </div>
              
              <div className="detail-item">
                <strong>Origen:</strong>
                <p>{character.origin?.name || 'Desconocido'}</p>
              </div>
            </div>

            <button 
              className={`pin-button ${isFavorite ? 'pinned' : ''}`}
              onClick={onAddFavorite}
              title={isFavorite ? 'Desfijar personaje' : 'Fijar personaje'}
            >
              {isFavorite ? '📌 Pinned' : '📍 Pin'}
            </button>
          </div>
        </div>

        {/* Sección de personajes de la misma ubicación */}
        {sameLocationCharacters.length > 0 && (
          <div className="same-location-section">
            <h3>Otros personajes en {character.location?.name}</h3>
            {loadingLocation && <p className="loading-text">Cargando...</p>}
            <ul className="same-location-list">
              {sameLocationCharacters.map(char => (
                <li key={char.id} className="location-character-item">
                  {char.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
