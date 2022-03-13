"use strict";
const ctx = document.getElementById("myChart").getContext("2d");
let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(58, 123, 213, 1)");
gradient.addColorStop(1, "rgba(0, 210, 255, 0.3)");
let gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
gradient1.addColorStop(0, "rgba(2, 0, 36, 1)");
gradient1.addColorStop(0.35, "rgba(61, 9, 121, 1)");
gradient1.addColorStop(1, "rgba(0, 212, 255, 1)");
function convertToCelsius(kelvin) {
  const celsius = kelvin - 273.15;
  return celsius;
}
let labels = [];
function insertData(obj) {
  labels = [
    obj.list[0].dt_txt,
    obj.list[1].dt_txt,
    obj.list[2].dt_txt,
    obj.list[3].dt_txt,
    obj.list[4].dt_txt,
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Minimum Temperature",
        borderColor: "black",
        fill: true,
        backgroundColor: gradient,
        borderWidth: 0.4,
        data: [
          convertToCelsius(obj.list[0].main.temp_min),
          convertToCelsius(obj.list[1].main.temp_min),
          convertToCelsius(obj.list[2].main.temp_min),
          convertToCelsius(obj.list[3].main.temp_min),
          convertToCelsius(obj.list[4].main.temp_min),
        ],
      },
      {
        label: "Maximum Temperature",
        backgroundColor: gradient1,
        borderWidth: 0.4,
        borderColor: "black",
        data: [
          convertToCelsius(obj.list[0].main.temp_max),
          convertToCelsius(obj.list[1].main.temp_max),
          convertToCelsius(obj.list[2].main.temp_max),
          convertToCelsius(obj.list[3].main.temp_max),
          convertToCelsius(obj.list[4].main.temp_max),
        ],
        fill: true,
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
    options: {
      tension: 0.5,
      responsive: true,
      borderJoinStyle: "round",
      scales: {
        y: {
          ticks: {
            callback: function (val) {
              return val + " ℃";
            },
          },
        },
      },
    },
  };
  const myChart = new Chart(ctx, config);
}
navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  const apiKey = "faff4bea2adc5d7f32abca251f343621";
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`;
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      insertData(data);
    });
});

// faff4bea2adc5d7f32abca251f343621
