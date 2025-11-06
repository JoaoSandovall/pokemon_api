import React, { useState, useEffect } from 'react';

function MyTeams({ token }) {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/teams', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Não foi possível buscar os times. Tente fazer login novamente.');
                }

                const data = await response.json();
                setTeams(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [token]); 

    if (loading) return <p>Carregando seus times...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Meus Times Salvos</h2>
            {teams.length === 0 ? (
                <p>Você ainda não salvou nenhum time.</p>
            ) : (
                <ul>
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