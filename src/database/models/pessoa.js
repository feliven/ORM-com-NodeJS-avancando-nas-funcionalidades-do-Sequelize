"use strict";

const validarCpf = require("../../utils/validaCpfHelper.js");

const { Model, where } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Curso, {
        foreignKey: "docente_id",
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: "estudante_id",
        // scope: { status: 'matriculado' },
        as: "aulasMatriculadas",
      });
    }
  }
  Pessoa.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, undefined],
            msg: "Nome deve ter pelo menos 3 caracteres",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "e-mail está com formato inválido",
          },
        },
      },
      cpf: {
        type: DataTypes.STRING,
        validate: {
          cpfEhValido: (cpf) => {
            const resultadoValidacao = validarCpf(cpf);
            if (resultadoValidacao.ehValido === false) {
              throw new Error(resultadoValidacao.motivo);
            }
          },
        },
      },
      ativo: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pessoa",
      tableName: "pessoas",
      paranoid: true,
      defaultScope: {
        where: {
          ativo: true,
        },
      },
      scopes: {
        todosOsRegistros: {
          where: {},
        },
      },
    },
  );
  return Pessoa;
};
