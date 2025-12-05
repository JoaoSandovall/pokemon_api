import { useState, useEffect } from 'react';
import API_URL from './api';

function MyTeams({ token }) {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(`${API_URL}/api/teams`, {
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

    const handleDelete = async (teamId) => {
        if (!window.confirm("Tem certeza que quer deletar este time?")) {
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/teams/${teamId}`, { // <--- O ERRO ESTAVA AQUI (${teamid})
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Falha ao deletar time');
            }

            // Sucesso!
            alert(data.message);
            window.location.reload(); // Recarrega a página

        } catch (err) {
            alert(err.message);
        }
    };

    // 3. O Render (HTML/JSX)
    if (loading) return <p>Carregando seus times...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="form-section team-list">
            <h2>Meus Times Salvos</h2>
            {teams.length === 0 ? (
                <p>Você ainda não salvou nenhum time.</p>
            ) : (
                <ul>
                    {teams.map(team => (
                        <li key={team.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <strong>{team.team_name}</strong>
                                
                                {/* Botão de Deletar */}
                                <button 
                                    onClick={() => handleDelete(team.id)} 
                                    style={{ backgroundColor: '#ff4d4d', marginLeft: '10px', padding: '5px 10px' }}
                                >
                                    X
                                </button>
                            </div>
                            <ul>
                                {team.pokemon_names.map((name, index) => (
                                    <li key={index} style={{ border: 'none', padding: '2px 0' }}>
                                        {name}
                                    </li>
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