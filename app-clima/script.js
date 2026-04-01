const inputCidade = document.getElementById("input-cidade");
const btnBuscar = document.getElementById("btn-buscar");
const resultado = document.getElementById("resultado");
const btnLimpar = document.getElementById("btn-limpar");

const KEY_API = "8639c5563f5c9b632e2336331b81df90";

async function buscarClima(cidade) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${KEY_API}&units=metric&lang=pt_br`;

  const response = await fetch(url);
  const dados = await response.json();

  console.log(dados);
}

btnBuscar.addEventListener("click", function() {
  const cidade = inputCidade.value;
  buscarClima(cidade);
});

btnLimpar.addEventListener("click", function() {
  inputCidade.value = "";
  resultado.innerHTML = "";
  inputCidade.focus();
});
