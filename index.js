const express = require("express");
const blog = express();
const bodyparser =  require("body-parser");
const Connection = require("./database/database");
const categoriaController = require("./categoria/categoriaController"); //importando o arquivo do controller para o index principal
const artigoController = require("./artigo/artigoController"); //importando o arquivo do controller para o index principal
const artigoModel = require("./artigo/artigosModel"); //importando o arquivo do Model para omindex principal
const categoriaModel = require("./categoria/categoriaModel"); //importando o arquivo do Model para omindex principal

//Banco de dados
Connection
.authenticate()
.then(() =>{
    console.log("Conexão feita com sucesso");})
.catch((msgErro)=> {
    console.log("Não Conectou");}); 
//View Engine
blog.set('view engine','ejs');
// Static
blog.use(express.static('Public'));
// body parser
blog.use(bodyparser.urlencoded({extended: false}));
blog.use(bodyparser.json());

//Carregando as rotas definidas nos contoller
blog.use("/", categoriaController); 
blog.use("/", artigoController);  

blog.get("/", (req,res) => {
    res.render("index");
});


blog.listen(8080,()=>{console.log ("Projeto Rodando");});