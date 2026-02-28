const converteIds = require("../utils/conversorDeStringHelper.js");

class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res, next) {
    try {
      const listaDeRegistro = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeRegistro);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async pegaUmPorId(req, res, next) {
    const { id } = req.params;
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistroPorId(Number(id));
      return res.status(200).json(umRegistro);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async pegaUm(req, res, next) {
    const { ...params } = req.params;
    console.log(params);

    const paramsTratado = converteIds(params);
    console.log(paramsTratado);
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistro(paramsTratado);
      return res.status(200).json(umRegistro);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async criaNovo(req, res, next) {
    const dadosParaCriacao = req.body;
    try {
      const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
      return res.status(200).json(novoRegistroCriado);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async atualiza(req, res, next) {
    const { ...params } = req.params;
    console.log(params);

    const paramsTratado = converteIds(params);
    console.log(paramsTratado);

    const dadosAtualizados = req.body;
    try {
      //isUpdated
      const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, paramsTratado);
      if (!foiAtualizado) {
        return res.status(400).json({ mensagem: "registro não foi atualizado" });
      }
      return res.status(200).json({ mensagem: "Atualizado com sucesso" });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async exclui(req, res, next) {
    const { ...params } = req.params;
    console.log(params);

    const paramsTratado = converteIds(params);
    console.log(paramsTratado);

    try {
      await this.entidadeService.excluiRegistro(paramsTratado);
      return res.status(200).json({ mensagem: `id ${paramsTratado.id} deletado` });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = Controller;
