// Definindo as controller do artigo (Rotas)

const express = require("express");
const router = express.Router();
const categoriaModel = require("../categoria/categoriaModel");
const artigoModel = require("./artigosModel");
const slugify = require("slugify");

router.get("/admin/artigos", (req, res) => {
    artigoModel.findAll().then(artigos => {
        res.render("admin/Viewsartigo/indexArtigo", { artigos: artigos });
    })
})

router.get("/admin/artigo/new", (req, res) => {
    categoriaModel.findAll().then(categoria => {
        res.render("admin/Viewsartigo/artigoViews", { categoria: categoria });
    })
});

router.post("/admin/artigo/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var categoria = req.body.categoria;

    artigoModel.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoriumId: categoria
    }).then(() => {
        res.redirect("/")
    })
});

module.exports = router;