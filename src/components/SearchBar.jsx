/*
 Barra de búsqueda avanzada con filtros para:
 - Nombre
 - Especie
 - Ubicación
 */

export const SearchBar = ({ 
  nameValue, 
  onNameChange,
  speciesValue,
  onSpeciesChange,
  locationValue,
  onLocationChange
}) => {
  return (
    <div className="filters-container">
      <div className="filter-group">
        <label>Name:</label>
        <input
          type="text"
          placeholder="ej: Rick, Morty..."
          value={nameValue}
          onChange={(e) => onNameChange(e.target.value)}
          className="filter-input"
        />
      </div>
      
        <div className="filter-group">
          <label>Species:</label>
          <input
            type="text"
            placeholder="ej: Humano, Alien..."
            value={speciesValue}
            onChange={(e) => onSpeciesChange(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label>Location:</label>
          <input
            type="text"
            placeholder="ej: Tierra, Planeta..."
            value={locationValue}
            onChange={(e) => onLocationChange(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>
  );
};
