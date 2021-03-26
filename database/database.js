const Sequelize  = require("sequelize");
const Connection = new Sequelize('blog','root','root'
,{host:'localhost',dialect:'mysql'});
module.exports = Connection;
