import { useState } from 'react';
import API_URL from './api';     

function Pokedex() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setPokemonData(null);

    try {
      const response = await fetch(`${API_URL}/api/pokemon/${pokemonName.toLowerCase()}`);
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Algo deu errado');
      }

      setPokemonData(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Digite o nome do Pokémon"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {pokemonData && (
        <div>
          <h3>{pokemonData.name} (Nº {pokemonData.id})</h3>
          <img src={pokemonData.sprite} alt={`Sprite de ${pokemonData.name}`} />
          <p>Peso: {pokemonData.weight} kg | Altura: {pokemonData.height} m</p>
          <p>Tipos: {pokemonData.types.join(', ')}</p>
          <p>Habilidades: {pokemonData.abilities.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default Pokedex;