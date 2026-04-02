const inputCidade = document.getElementById("input-cidade");
const btnBuscar = document.getElementById("btn-buscar");
const resultado = document.getElementById("resultado");
const btnLimpar = document.getElementById("btn-limpar");
const resultadoLocalizacao = document.getElementById("resultado-localizacao");

const KEY_API = "8639c5563f5c9b632e2336331b81df90";

async function buscarClima(cidade) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${KEY_API}&units=metric&lang=pt_br`;

  if (cidade === "") {
    resultado.style.display = "block";
    resultado.innerHTML = `<p>❌ Por favor, insira o nome de uma cidade.</p>`;
    return;
  }
  const response = await fetch(url);
  const dados = await response.json();

  if (dados.cod === 200) {
    resultado.style.display = "block";
    resultado.innerHTML = `
      <h4>🌤️ Clima Atual</h2>
      <h5>${dados.name}, ${dados.sys.country}</h2>
      <p>🌡️ Temperatura: ${dados.main.temp} °C</p>
      <p>🤔 Sensação Térmica: ${dados.main.feels_like} °C</p>
      <p>🌤️ Clima: ${dados.weather[0].description}</p>
      <p>💧 Umidade: ${dados.main.humidity}%</p>
      <p>💨 Vento: ${dados.wind.speed} m/s</p>
    `;
  } else {
    resultado.style.display = "block";
    resultado.innerHTML = `<p>❌ Cidade não encontrada. Tente novamente.</p>`;
  }
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

inputCidade.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    buscarClima(inputCidade.value);
  } else {
    null;
  }
});

navigator.geolocation.getCurrentPosition(function(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  buscarClimaPorLocalizacao(lat, lon);
})

async function buscarClimaPorLocalizacao(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY_API}&units=metric&lang=pt_br`;

  if (!lat || !lon) {
    resultadoLocalizacao.style.display = "block";
    resultadoLocalizacao.innerHTML = `<p>❌ Não foi possível obter sua localização. Por favor, permita o acesso à localização ou insira o nome de uma cidade.</p>`;
    return;
  }

  const response = await fetch(url);
  const position = await response.json();

  if (position.cod === 200) {
    resultadoLocalizacao.style.display = "block";
    resultadoLocalizacao.innerHTML = `
      <h3>🌍 Clima Atual da Sua Localização: </h3>
      <br>
      <h3>${position.name}, ${position.sys.country}</h3>
      <p>🌡️ Temperatura: ${position.main.temp}°C</p>
      <p>🤔 Sensação térmica: ${position.main.feels_like}°C</p>
      <p>💧 Umidade: ${position.main.humidity}%</p>
      <p>🌤️ ${position.weather[0].description}</p>
      <p>💨 Vento: ${position.wind.speed} m/s</p>
    `;
  }
}