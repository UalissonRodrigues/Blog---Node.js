// Definindo as controller do artigo (Rotas)

const express = require("express");
const router = express.Router();

router.get("/admin/artigo/new", (req,res) =>{
    res.render("admin/Viewsartigo/artigoViews");
});

module.exports = router;