const HX711 = require('./hx711');

const loadCell = new HX711(6, 5);

setInterval(async () => {
  console.log(await loadCell.read());
}, 1000);
