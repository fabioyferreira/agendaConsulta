# agendaConsulta

# 1- BACKENDEND:
1.1 - Instalação do MariaDB
    Atualizar o sistema:
        -> sudo apt update && sudo apt upgrade -y
    Instalar o MariaDB Server:    
        -> sudo apt install mariadb-server -y
    Verifique se o MariaDB foi iniciado corretamente:
        -> sudo systemctl status mariadb
        Digite q para sair
    Criar Senha do Banco:
        ->sudo mariadb-secure-installation
    Acessar o MariaDB para criar o banco e as tabelas:
    -> sudo mariadb -u root -p
    Criar o banco com o segunt comando no MariaDB:
        show databases;
        create database agendamento;
        use agendamento;
        create table consultas (
            id int auto_increment primary key,
            nome varchar(100) not null,
            email varchar(100) not null,
            telefone varchar(20),
            especialidade varchar(100),
            data date not null,
            hora time not null
        );
        show tables;
        select * from consultas;
    Executar servidor
        -> node server.js
# 2 - FRONTEND
2.1 - Visualização do FrontEnd:
    Instalar a biblioteca LiveServer no VSCode
    Abrir o arquivo <telaAgendamento.html> com o Open With Live Server
    Abrir o arquivo <consulta.html> com o Open With Live Server
    Realizar o cadastro de agendamento e visualizar as consultas marcadas.

 
    




    



