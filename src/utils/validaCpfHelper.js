function validarCpf(cpf) {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) {
    return { ehValido: false, motivo: "CPF deve conter 11 dígitos." };
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return { ehValido: false, motivo: "CPF não pode possuir todos os dígitos iguais." };
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) {
    return { ehValido: false, motivo: "Dígito verificador (9º) inválido." };
  }

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) {
    return { ehValido: false, motivo: "Dígito verificador (10º) inválido." };
  }

  return { ehValido: true, motivo: null };
}

module.exports = validarCpf;
