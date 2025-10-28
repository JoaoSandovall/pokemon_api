#  Pokédex e Construtor de Times (Projeto Full-Stack)

Bem-vindo a este projeto full-stack! Esta é uma aplicação web completa que permite aos usuários pesquisar informações de Pokémon, criar uma conta pessoal, e construir e salvar seus próprios times de Pokémon.

O projeto foi construído do zero, evoluindo de um simples script Python para uma aplicação robusta com um front-end em **React** que consome uma API back-end customizada feita em **Flask (Python)**. Todos os dados de usuários e times são persistidos em um banco de dados **PostgreSQL**.

## 🛠️ Tecnologias Utilizadas

Este projeto é dividido em dois "mini-projetos" (`backend` e `frontend`) e utiliza as seguintes tecnologias:

### Back-end (API em Flask)
* **Python 3**
* **Flask:** Servidor da API.
* **PostgreSQL:** Banco de dados relacional.
* **Flask-SQLAlchemy:** ORM para interagir com o Postgres usando Python.
* **Flask-Migrate:** Para gerenciar as "migrações" (alterações) do banco de dados.
* **Flask-Bcrypt:** Para criptografar (hashear) as senhas dos usuários.
* **Flask-JWT-Extended:** Para implementar a autenticação via JSON Web Tokens (JWT).
* **Flask-CORS:** Para permitir que o front-end (em `localhost:3000`) se comunique com o back-end (em `localhost:5000`).
* **requests:** Para buscar dados da PokéAPI externa.

### Front-end (App em React)
* **React** (criado com `create-react-app`)
* **React Hooks (`useState`, `useEffect`):** Para gerenciar o estado dos componentes.
* **JavaScript (ES6+):** Para a lógica do front-end.
* **Fetch API:** Para fazer chamadas assíncronas ao back-end.
* **CSS:** Estilização básica (`index.css` e `App.css`) para uma interface limpa.
* **npm:** Gerenciador de pacotes do Node.js.

### Ferramentas de Teste e Depuração
* **Thunder Client (VS Code):** Utilizado para testar todos os endpoints da API (`/register`, `/login`, `/api/teams`) e depurar erros de autenticação.
* **pgAdmin / DBeaver:** Utilizado para visualizar e verificar os dados diretamente no banco de dados PostgreSQL, confirmando que os usuários e times estavam sendo salvos corretamente.

---

## ✨ Funcionalidades Principais

* **Autenticação de Usuário:** Sistema completo de **Registro** e **Login**. Senhas são hasheadas com Bcrypt e a sessão é gerenciada por um Token JWT salvo no `localStorage` do navegador.
* **Gerenciamento de Estado (Front-end):** O `App.js` atua como um controlador central. Ele verifica se o token existe e renderiza condicionalmente as páginas de login/registro ou o aplicativo principal.
* **Rotas Protegidas:** Os componentes `TeamBuilder` e `MyTeams` (que chamam as rotas `/api/teams`) só são acessíveis por usuários logados e enviam o Token JWT no *Header* de autorização.
* **Pokédex (Intermediada):** O front-end chama o endpoint `/api/pokemon/<name>` do nosso back-end, que por sua vez busca os dados da PokéAPI.
* **Criação de Times:** Usuários logados podem usar o formulário `TeamBuilder` para nomear um time, adicionar até 6 Pokémon e salvá-lo.
* **Visualização de Times:** O componente `MyTeams` busca e exibe uma lista de times que pertencem *apenas* ao usuário logado.

---

## 📂 Estrutura de Pastas

O projeto usa uma estrutura "monorepo" padrão, separando o back-end do front-end.

pokemon-api/ ├── backend/ │ ├── migrations/ │ ├── venv/ │ ├── api.py (O único arquivo! Contém toda a API Flask) │ └── requirements.txt │ └── frontend/ ├── node_modules/ ├── public/ ├── src/ │ ├── App.js (Gerenciador de rotas/autenticação) │ ├── index.js (Ponto de entrada do React) │ ├── Login.js (Componente de formulário de login) │ ├── Register.js (Componente de formulário de registro) │ ├── Pokedex.js (Componente de busca) │ ├── TeamBuilder.js (Componente de criação de time) │ ├── MyTeams.js (Componente de listagem de times) │ ├── App.css (Estilos dos componentes) │ └── index.css (Estilos globais) │ └── package.json


---

## 🚀 Como Executar o Projeto

Para rodar este projeto localmente, você precisará ter o **Python**, **Node.js (LTS)** e **PostgreSQL** instalados.

Você precisará de **dois terminais** abertos simultaneamente.

### Terminal 1: Back-end (Flask)

1.  **Navegue até a pasta `backend`:**
    ```bash
    cd backend
    ```
2.  **Ative o Ambiente Virtual (Venv):**
    * *(Se estiver usando PowerShell):*
        ```powershell
        .\venv\Scripts\Activate.ps1
        ```
    * *(Se estiver usando CMD):*
        ```cmd
        .\venv\Scripts\activate.bat
        ```
3.  **(Primeira vez) Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Configure o Banco de Dados:**
    * No seu Postgres, crie um banco de dados (ex: `pokedex_db`).
    * Abra o `api.py` e edite a linha `app.config['SQLALCHEMY_DATABASE_URI']` com seu usuário (`postgres`), senha (`1234`) e nome do banco.
    * No `api.py`, mude a `app.config["JWT_SECRET_KEY"]` para qualquer string secreta.
5.  **(Primeira vez) Execute as Migrações:**
    * *(Defina o app Flask - PowerShell):*
        ```powershell
        $env:FLASK_APP = "api.py"
        ```
    * *(Defina o app Flask - CMD):*
        ```cmd
        set FLASK_APP=api.py
        ```
    * *(Aplique as tabelas `user` e `team` no banco):*
        ```bash
        flask db upgrade
        ```
6.  **Inicie o servidor back-end:**
    ```bash
    python api.py
    ```
    *O servidor estará rodando em `http://127.0.0.1:5000`*

### Terminal 2: Front-end (React)

1.  **Abra um NOVO terminal.**
2.  **Navegue até a pasta `frontend`:**
    ```bash
    cd frontend
    ```
3.  **(Primeira vez) Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Inicie o servidor front-end:**
    ```bash
    npm start
    ```
    *O aplicativo React abrirá automaticamente no seu navegador em `http://localhost:3000`*

Agora você pode usar o aplicativo!
