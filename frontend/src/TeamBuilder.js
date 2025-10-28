// frontend/src/TeamBuilder.js
import React, { useState } from 'react';

// Este componente recebe o token como "prop"
function TeamBuilder({ token }) {
    // Estado para o nome do time
    const [teamName, setTeamName] = useState('');
    
    // Estado para os 6 Pokémon
    // (Vamos usar um array de 6 strings vazias)
    const [pokemonInputs, setPokemonInputs] = useState(['', '', '', '', '', '']);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Função para atualizar um Pokémon específico no array
    const handlePokemonChange = (index, value) => {
        const newInputs = [...pokemonInputs];
        newInputs[index] = value;
        setPokemonInputs(newInputs);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // 1. Filtra apenas os campos que foram preenchidos
        const pokemon_names = pokemonInputs.filter(name => name.trim() !== '');

        if (!teamName) {
            setError('Por favor, dê um nome ao seu time.');
            return;
        }

        if (pokemon_names.length === 0) {
            setError('Você precisa adicionar pelo menos um Pokémon.');
            return;
        }

        // 2. Prepara o JSON para enviar à API
        const payload = {
            team_name: teamName,
            pokemon_names: pokemon_names // Envia a lista de nomes
        };

        try {
            // 3. Faz a chamada POST para /api/teams (igual ao Thunder Client)
            const response = await fetch('http://127.0.0.1:5000/api/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Usa o token!
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Falha ao salvar o time');
            }

            // 4. Sucesso!
            setSuccess(data.message); // "Time salvo com sucesso!"
            
            // Limpa o formulário
            setTeamName('');
            setPokemonInputs(['', '', '', '', '', '']);

            // Recarrega a página para o componente MyTeams atualizar
            // (Esta é a forma mais simples de atualizar a lista)
            setTimeout(() => {
                window.location.reload();
            }, 1500); // Espera 1.5s antes de recarregar

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
                    {/* Cria 6 campos de input */}
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