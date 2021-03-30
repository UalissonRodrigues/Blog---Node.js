// Definindo as controller do Categoria (Rotas)

const express = require("express");
const categoriaModel = require("./categoriaModel");
const router = express.Router();
const slugify = require("slugify");

router.get("/admin/categoria/new", (req, res) => {
    res.render("admin/Viewscategoria/categoriaViews");
});

// Rota Para salvar uma categoria 
router.post("/categoria/salvar", (req, res) => {
    var forms = req.body.title; // Variavel formulario vai receber o que esta vindo no formulario categoria
    if (forms != undefined) {
        categoriaModel.create({
            title: forms,
            slug: slugify(forms)
        }).then(() => {
            res.redirect("/admin/categoria");
        })
    } else {
        res.redirect("/admin/categoria/new");
    }
});

// Rota para Printar todas as Categorias na tela.
router.get("/admin/categoria", (req, res) => {
    categoriaModel.findAll().then(categoria => {
        res.render("admin/Viewscategoria/indexCategoria", { categoria: categoria });
    });
});

// Rota Para Deletar Uma Categoria ja postada
router.post("/categoria/delete", (req, res) => {
    var id = req.body.id; // Pegando o Id da Categoria Selecionada
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

router.get("/admin/categoria/editar/:id", (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.redirect("/admin/categoria");
    }
    categoriaModel.findByPk(id).then(categoria => {  // Metodo para pesquisar o Id no banco de dados
        if (categoria != undefined) {

            res.render("admin/Viewscategoria/categoriaEditar", { categoria: categoria });

        } else {
            res.redirect("/admin/categoria");
        }
    }).catch(erro => {
        res.redirect("/admin/categoria");
    })
});

router.post("/categoria/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    categoriaModel.update({ title: title , slug: slugify(title)}, {  //realizando Update  no Campo Titulo
        where: {
            id: id
        }
    }).then(() =>{
        res.redirect("/admin/categoria");;
    })
});
module.exports = router;