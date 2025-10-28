// frontend/src/MyTeams.js
import React, { useState, useEffect } from 'react';

// Este componente recebe o 'token' do App.js
function MyTeams({ token }) {
    const [teams, setTeams] = useState([]); // Lista de times
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect roda UMA VEZ quando o componente é carregado
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                // Chama a rota protegida GET /api/teams
                const response = await fetch('http://127.0.0.1:5000/api/teams', {
                    method: 'GET',
                    headers: {
                        // Enviamos o token no header "Authorization"
                        // Exatamente como fizemos no Thunder Client!
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Não foi possível buscar os times. Tente fazer login novamente.');
                }

                const data = await response.json();
                setTeams(data); // Salva os times no estado

            } catch (err) {
                // Se o token expirar, o usuário verá este erro
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [token]); // O [token] significa que este efeito re-rodará se o token mudar

    if (loading) return <p>Carregando seus times...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Meus Times Salvos</h2>
            {teams.length === 0 ? (
                <p>Você ainda não salvou nenhum time.</p>
            ) : (
                <ul>
                    {/* Faz um loop na lista de times e exibe cada um */}
                    {teams.map(team => (
                        <li key={team.id}>
                            <strong>{team.team_name}</strong>
                            <ul>
                                {team.pokemon_names.map(name => (
                                    <li key={name}>{name}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MyTeams;