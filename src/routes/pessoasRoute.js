const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController.js");
const MatriculaController = require("../controllers/MatriculaController.js");

const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();

const router = Router();

router.get("/pessoas", (req, res, next) => pessoaController.pegaTodos(req, res, next));
router.get("/pessoas/all", (req, res, next) => pessoaController.pegaTodasAsPessoas(req, res, next));
router.get("/pessoas/:id", (req, res, next) => pessoaController.pegaUmPorId(req, res, next));
router.post("/pessoas", (req, res, next) => pessoaController.criaNovo(req, res, next));
router.put("/pessoas/:id", (req, res, next) => pessoaController.atualiza(req, res, next));
router.delete("/pessoas/:id", (req, res, next) => pessoaController.exclui(req, res, next));

router.get("/pessoas/:estudante_id/matriculas", (req, res, next) =>
  pessoaController.pegaMatriculasAtivas(req, res, next),
);
router.get("/pessoas/:estudante_id/matriculas/todas", (req, res, next) =>
  pessoaController.pegaTodasAsMatriculas(req, res, next),
);
router.get("/pessoas/:estudante_id/matriculas/ativas", (req, res, next) =>
  matriculaController.pegaMatriculasPorEstudante(req, res, next),
);
router.get("/pessoas/:estudante_id/matriculas/:id", (req, res, next) => matriculaController.pegaUm(req, res, next));
router.post("/pessoas/:estudante_id/matriculas", (req, res, next) => matriculaController.criaNovo(req, res, next));
router.put("/pessoas/:estudante_id/matriculas/:id", (req, res, next) => matriculaController.atualiza(req, res, next));
router.delete("/pessoas/:estudante_id/matriculas/:id", (req, res, next) => matriculaController.exclui(req, res, next));

module.exports = router;
