import React, { useState } from 'react';

function Pokedex() {
    const [pokemonName, setPokemonName] = usestate('');
    const [pokemonData, setPokemonData] = usestate(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
}

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        setPokemonData(null);
    
        try {
            const response = await fetch(`https://127.0.0.1:5000/api/pokemon/${pokemonName}`);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Algo deu errado');
            }

            setPokemonData(data)

        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false)
        }
    };

    <div>
      <h2>Minha Pokédex</h2>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value.toLowerCase())}
        placeholder="Digite o nome do Pokémon"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>

      {/* --- Resultados --- */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {pokemonData && (
        <div>
          <h3>{pokemonData.name} (Nº {pokemonData.id})</h3>
          <img src={pokemonData.sprite} alt={`Sprite de ${pokemonData.name}`} />
          <p>Peso: {pokemonData.weight} kg</p>
          <p>Altura: {pokemonData.height} m</p>
          <p>Tipos: {pokemonData.types.join(', ')}</p>
          <p>Habilidades: {pokemonData.abilities.join(', ')}</p>
        </div>
      )}
    </div>

export default Pokedex;