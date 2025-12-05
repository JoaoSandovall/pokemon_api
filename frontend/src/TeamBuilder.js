import { useState } from 'react';
import API_URL from './api';

function TeamBuilder({ token }) {
    const [teamName, setTeamName] = useState('');
    
    const [pokemonInputs, setPokemonInputs] = useState(['', '', '', '', '', '']);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handlePokemonChange = (index, value) => {
        const newInputs = [...pokemonInputs];
        newInputs[index] = value;
        setPokemonInputs(newInputs);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const pokemon_names = pokemonInputs.filter(name => name.trim() !== '');

        if (!teamName) {
            setError('Por favor, dê um nome ao seu time.');
            return;
        }

        if (pokemon_names.length === 0) {
            setError('Você precisa adicionar pelo menos um Pokémon.');
            return;
        }
        const payload = {
            team_name: teamName,
            pokemon_names: pokemon_names 
        };

        try {
            const response = await fetch(`${API_URL}/api/teams`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Falha ao salvar o time');
            }
            
            setSuccess(data.message);
            setTeamName('');
            setPokemonInputs(['', '', '', '', '', '']);
            setTimeout(() => {
                window.location.reload();
            }, 1500);

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h3>Montar Novo Time</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome do Time: </label>
                    <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Ex: Time de Fogo"
                    />
                </div>
                <br />
                <div>
                    <label>Pokémon:</label>
                    {pokemonInputs.map((pokemon, index) => (
                        <input
                            key={index}
                            type="text"
                            value={pokemon}
                            onChange={(e) => handlePokemonChange(index, e.target.value)}
                            placeholder={`Pokémon ${index + 1}`}
                            style={{ display: 'block', margin: '5px 0' }}
                        />
                    ))}
                </div>
                <br />
                <button type="submit">Salvar Time</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}

export default TeamBuilder;