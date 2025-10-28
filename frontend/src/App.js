// frontend/src/App.js
import React from 'react';
import Login from './Login';
import Register from './Register';
import MyTeams from './MyTeams'; 
import Pokedex from './Pokedex'; 
import TeamBuilder from './TeamBuilder'; // <-- 1. IMPORTE O NOVO COMPONENTE

function App() {
    const token = localStorage.getItem('pokemonToken');

    const handleLogout = () => {
        localStorage.removeItem('pokemonToken');
        window.location.reload();
    };

    if (!token) {
        return (
            <div className="App">
                <h1>Bem-vindo ao Pokémon Team Builder</h1>
                <p>Por favor, faça login ou registre-se.</p>
                <hr />
                <Login />
                <hr />
                <Register />
            </div>
        );
    }

    // Se TIVER token, mostre o app principal
    return (
        <div className="App">
            <h1>Pokémon Team Builder</h1>
            <button onClick={handleLogout}>Sair (Logout)</button>
            <hr />

            {/* 2. ADICIONE O COMPONENTE AQUI */}
            <TeamBuilder token={token} />
            <hr />

            {/* Componente para ver os times salvos */}
            <MyTeams token={token} />
            <hr />

            {/* Seu componente original para buscar Pokémon */}
            <h2>Buscar Pokémon</h2>
            <Pokedex />
            
        </div>
    );
}

export default App;