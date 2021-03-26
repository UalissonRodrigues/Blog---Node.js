// criando o model decategoria(Criando Tabela e campos no banco de dados)

const sequelize = require("sequelize");
const connection = require("../database/database");

const categoriaModel = connection.define('categoria',{
    title:{
        type: sequelize.STRING,
        allowNull: false },
    slug:{
        type: sequelize.STRING,
        allowNull: false }
});

module.exports = categoriaModel;