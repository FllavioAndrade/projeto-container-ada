# Projeto: Conteinerização do "Sistema de Casa de Eventos" para Implantação Global

## Descrição
Este projeto é uma aplicação web containerizada que consiste em três serviços principais: um banco de dados MongoDB, um backend em Node.js e um frontend em Nginx.

## Contexto do Problema
Você desenvolveu um inovador "Sistema de Casa de Eventos", que facilita a gestão de reservas, eventos e vendas de ingressos. Esta aplicação se tornou extremamente popular em sua região e agora atraiu a atenção de uma grande empresa internacional de eventos. Eles desejam implementar sua solução em várias localidades ao redor do mundo. No entanto, enfrentam um desafio significativo: garantir que o sistema possa ser facilmente implantado, escalado e mantido em diferentes ambientes de computação.

## Seu Desafio
Sua tarefa é conteinerizar o Sistema de Casa de Eventos, criando um Dockerfile robusto que permita que qualquer equipe, em qualquer parte do mundo, possa implantar e executar sua aplicação com facilidade, independentemente da configuração do ambiente local deles.

## Objetivos
- **Conteinerização**: Prepare seu "Sistema de Casa de Eventos" para implantação global usando Docker.
- **Simplicidade**: Assegure que o processo de implantação seja simples, exigindo comandos mínimos para iniciar a aplicação.
- **Documentação**: Forneça documentação clara para que equipes de diferentes níveis técnicos possam compreender e executar o processo.

## Requisitos
- Acesso à Internet e um computador capaz de executar Docker.
- Conhecimento básico de Docker, incluindo construção de imagens e contêineres.
- Uma conta no Docker Hub para publicar a imagem.

## Configuração e Execução

### Pré-requisitos
- Docker
- Docker Compose

### Passos para Executar

1. Clone o repositório:
    ```sh
    git clone <URL_DO_REPOSITORIO>
    cd projeto-container-ada
    ```

2. Construa e inicie os containers:
    ```sh
    docker-compose up --build
    ```

3. Acesse os serviços:
    - Frontend: `http://localhost`
    - Backend: `http://localhost:3000`
    - Banco de Dados: `mongodb://localhost:27017`

### Endpoints do Backend
- `GET /test-connection`: Verifica a conexão com o MongoDB.
- `GET /`: Verifica se o backend está funcionando e conectado ao MongoDB.

## Estrutura dos Arquivos

### backend/
- `app.mjs`: Código principal do backend.
- `package.json`: Dependências do Node.js.
- `Dockerfile`: Configuração do Docker para o backend.

### db/
- `Dockerfile`: Configuração do Docker para o MongoDB.

### frontend/
- `index.html`: Página principal do frontend.
- `dashboard.html`: Página do dashboard.
- `css/style.css`: Estilos CSS.
- `Dockerfile`: Configuração do Docker para o frontend.

## Contribuição
Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do projeto.
2. Crie uma nova branch com a sua feature: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona minha feature'`
4. Faça o push para a branch: `git push origin minha-feature`
5. Abra um Pull Request.
