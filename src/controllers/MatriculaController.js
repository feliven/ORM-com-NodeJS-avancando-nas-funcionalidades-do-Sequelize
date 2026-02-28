const Controller = require("./Controller.js");
const MatriculaServices = require("../services/MatriculaServices.js");

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }

  async pegaMatriculasPorEstudante(req, res, next) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculasPorEstudante = await matriculaServices.pegaEContaRegistros({
        estudante_id: Number(estudante_id),
        status: "matriculado",
      });
      return res.status(200).json(listaMatriculasPorEstudante);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = MatriculaController;
