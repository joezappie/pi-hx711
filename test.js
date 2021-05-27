const HX711 = require('./hx711');

const loadCell = new HX711(6, 5, {
  continous: 30
});

setInterval(async () => {
  console.log(loadCell.getLast());
}, 1000);
