// Definindo as controller do Categoria (Rotas)

const express = require("express");
const categoriaModel = require("./categoriaModel");
const router = express.Router();
const slugify = require("slugify");

router.get("/admin/categoria/new", (req, res) => {
    res.render("admin/Viewscategoria/categoriaViews");
});

router.post("/categoria/salvar", (req, res) => {
    var forms = req.body.title; // Variavel formulario vai receber o que esta vindo no formulario categoria
    if (forms != undefined) {
        categoriaModel.create({
            title: forms,
            slug: slugify(forms)
        }).then(() => {
            res.redirect("/");
        })
    } else {
        res.redirect("/admin/categoria/new");
    }
});

router.get("/admin/categoria", (req, res) => {
    categoriaModel.findAll().then(categoria => {
        res.render("admin/Viewscategoria/indexCategoria", { categoria: categoria });
    });
});

router.post("/categoria/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            categoriaModel.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categoria");
            });

        } else { // não for um numero 
            res.redirect("/admin/categoria");
        }

    } else { // nullo
        res.redirect("/admin/categoria");
    }
});


module.exports = router;