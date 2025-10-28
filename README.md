#  Pokémon Team Builder (Full-Stack)

Este é um aplicativo web full-stack que permite aos usuários pesquisar informações de Pokémon, criar uma conta, e construir e salvar seus próprios times de Pokémon.

O projeto é construído com um front-end em **React** que consome uma API back-end customizada feita em **Flask (Python)**. A API Flask, por sua vez, busca dados da [PokéAPI](https://pokeapi.co/) pública e gerencia os dados de usuários e times em um banco de dados **PostgreSQL**.

## 📸 Screenshots

* *(Screenshot da página de Login/Registro)*
* *(Screenshot do app após o login, mostrando o Construtor de Times e a Pokédex)*
* *(Screenshot da lista de "Meus Times Salvos")*

---

## ✨ Features Principais

* **Autenticação de Usuário:** Sistema completo de registro (`/register`) e login (`/login`) usando **JWT (JSON Web Tokens)**.
* **Segurança:** Senhas de usuário são hasheadas usando **Bcrypt** antes de serem salvas no banco.
* **Rotas Protegidas:** Rotas de criação e visualização de times (`/api/teams`) são protegidas e só podem ser acessadas por usuários autenticados.
* **Banco de Dados Relacional:** Utiliza **PostgreSQL** com **SQLAlchemy** (ORM) para persistir dados de usuários e times.
* **Migrações de Banco:** Usa **Flask-Migrate** para gerenciar mudanças no schema do banco de dados.
* **Front-end Reativo:** Interface construída em **React** que gerencia o estado de autenticação (via `localStorage`) e consome a API Flask de forma assíncrona.

---

## 🛠️ Tech Stack

* **Back-end:**
    * Python 3
    * Flask (Servidor da API)
    * Flask-SQLAlchemy (ORM)
    * Flask-Migrate (Migrações de DB)
    * Flask-JWT-Extended (Autenticação JWT)
    * Flask-Bcrypt (Hashing de Senhas)
    * Flask-CORS (Permite comunicação com o front-end)
    * Psycopg2-binary (Driver do Postgres)
    * Requests (Para consumir a PokéAPI)

* **Front-end:**
    * React (via `create-react-app`)
    * JavaScript (ES6+)
    * HTML5 / CSS3 (para estilização)
    * `fetch` API (para chamadas à API)

* **Banco de Dados:**
    * PostgreSQL

---

## 🏗️ Estrutura do Projeto

Este projeto utiliza uma estrutura "monorepo" com duas pastas principais:

* `/backend`: Contém a aplicação Flask (servidor da API, models do banco, e lógica de autenticação).
* `/frontend`: Contém a aplicação React (componentes de UI, gerenciamento de estado e chamadas de API).

pokemon-api/ ├── backend/ │ ├── migrations/ │ ├── venv/ │ ├── api.py (App principal do Flask) │ └── requirements.txt │ └── frontend/ ├── node_modules/ ├── public/ ├── src/ │ ├── App.js (Gerenciador principal) │ ├── Login.js │ ├── Register.js │ ├── Pokedex.js (Busca de Pokémon) │ ├── TeamBuilder.js (Formulário de criação) │ └── MyTeams.js (Lista de times salvos) │ └── package.json


---

## 🚀 Como Rodar o Projeto

Você precisará de **dois terminais** rodando simultaneamente para executar o back-end e o front-end.

### Pré-requisitos

* Python 3.x
* Node.js (v16 ou superior) e npm
* Um servidor PostgreSQL rodando

### 1. Configuração do Back-end (Terminal 1)

1.  **Navegue até a pasta `backend`:**
    ```bash
    cd backend
    ```
2.  **Crie e ative um ambiente virtual (venv):**
    ```bash
    # (Se ainda não foi criado)
    python -m venv venv
    
    # Ativar (Windows)
    .\venv\Scripts\Activate.ps1
    # Ativar (Mac/Linux)
    source venv/bin/activate
    ```
3.  **Instale as dependências do Python:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Configure o Banco de Dados:**
    * Certifique-se de que seu servidor Postgres está rodando.
    * Crie um banco de dados (ex: `CREATE DATABASE pokedex_db;`).
    * **Edite o arquivo `api.py`** e atualize a linha `app.config['SQLALCHEMY_DATABASE_URI']` com seu usuário, senha e nome do banco de dados.
    * **Edite o arquivo `api.py`** e mude a `app.config["JWT_SECRET_KEY"]` para uma string aleatória e secreta.

5.  **Execute as Migrações do Banco:**
    ```bash
    # (Windows PowerShell)
    $env:FLASK_APP = "api.py"
    # (Mac/Linux)
    export FLASK_APP=api.py

    # (Execute apenas na primeira vez)
    flask db init
    
    flask db migrate -m "Initial database setup"
    flask db upgrade
    ```
6.  **Inicie o servidor Flask:**
    ```bash
    python api.py
    ```
    *O servidor estará rodando em `http://127.0.0.1:5000`*

### 2. Configuração do Front-end (Terminal 2)

1.  **Navegue até a pasta `frontend`:**
    ```bash
    cd frontend
    ```
2.  **Instale as dependências do Node.js:**
    ```bash
    npm install
    ```
3.  **Inicie o servidor de desenvolvimento do React:**
    ```bash
    npm start
    ```
    *O aplicativo abrirá automaticamente no seu navegador em `http://localhost:3000`*

### 3. Use o App!

Agora você pode acessar `http://localhost:3000` no seu navegador, criar uma conta e começar a montar seus times!

---

## 📖 Endpoints da API (Flask)

Todos os endpoints são prefixados por `http://127.0.0.1:5000`.

| Método | Rota | Descrição | Autenticação |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Registra um novo usuário. | Nenhuma |
| `POST` | `/login` | Autentica um usuário e retorna um JWT. | Nenhuma |
| `GET` | `/api/pokemon/<name>` | Busca dados de um Pokémon (da PokéAPI). | Nenhuma |
| `POST` | `/api/teams` | Cria um novo time para o usuário logado. | **Requer Token** |
| `GET` | `/api/teams` | Lista todos os times do usuário logado. | **Requer Token** |
