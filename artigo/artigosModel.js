// criando o model de artigos(Criando tabelas campos no banco de dados)
const sequelize = require("sequelize");
const connection = require("../database/database");
const categoriaModel =  require("../categoria/categoriaModel"); // Importando a Categoria

const artigoModel = connection.define('artigo',{
    title:{
        type: sequelize.STRING,
        allowNull: false 
    },
    slug:{
        type: sequelize.STRING,
        allowNull: false 
    },
    body:{
        type: sequelize.TEXT,
        allowNull: false
    }    
});

categoriaModel.hasMany(artigoModel);//  hasMany = Relacionamento de 1 para muito
artigoModel.belongsTo(categoriaModel); // belongsTo = Relacionamento de 1 para 1

module.exports = artigoModel;