
 // Muestra información básica del personaje en una tarjeta.


export const CharacterCard = ({ character, onClick }) => {
  return (
    <div 
      className="character-card"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <img 
        src={character.image} 
        alt={character.name}
        className="character-image"
      />
      <div className="character-info">
        <h3>{character.name}</h3>
        <p><strong>Ubicación:</strong> {character.location?.name || 'Desconocida'}</p>
        <p><strong>Estado:</strong> {character.status}</p>
      </div>
    </div>
  );
};
