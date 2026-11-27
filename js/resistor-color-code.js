// Resistor color code decoder for 4-band and 5-band resistors.
// 4 bands: digit, digit, multiplier, tolerance.
// 5 bands: digit, digit, digit, multiplier, tolerance.
(function () {
  var DIGITS = [
    ["Black", 0], ["Brown", 1], ["Red", 2], ["Orange", 3], ["Yellow", 4],
    ["Green", 5], ["Blue", 6], ["Violet", 7], ["Grey", 8], ["White", 9]
  ];
  var MULTIPLIERS = [
    ["Black (×1)", 1], ["Brown (×10)", 10], ["Red (×100)", 100],
    ["Orange (×1 k)", 1e3], ["Yellow (×10 k)", 1e4], ["Green (×100 k)", 1e5],
    ["Blue (×1 M)", 1e6], ["Violet (×10 M)", 1e7], ["Grey (×100 M)", 1e8],
    ["White (×1 G)", 1e9], ["Gold (×0.1)", 0.1], ["Silver (×0.01)", 0.01]
  ];
  var TOLERANCES = [
    ["Brown (±1%)", 1], ["Red (±2%)", 2], ["Green (±0.5%)", 0.5],
    ["Blue (±0.25%)", 0.25], ["Violet (±0.1%)", 0.1], ["Grey (±0.05%)", 0.05],
    ["Gold (±5%)", 5], ["Silver (±10%)", 10]
  ];

  var selects = {
    digit1: document.getElementById("digit1"),
    digit2: document.getElementById("digit2"),
    digit3: document.getElementById("digit3"),
    multiplier: document.getElementById("multiplier"),
    tolerance: document.getElementById("tolerance")
  };
  var form = document.getElementById("color-form");
  var digit3Field = document.getElementById("field-digit3");
  var result = document.getElementById("result");

  function fill(select, list, selectedIndex) {
    list.forEach(function (item, index) {
      var option = document.createElement("option");
      option.value = String(item[1]);
      option.textContent = item[0];
      if (index === selectedIndex) {
        option.selected = true;
      }
      select.appendChild(option);
    });
  }

  // Start on brown, black, red, gold: 1 kΩ ±5%.
  fill(selects.digit1, DIGITS, 1);
  fill(selects.digit2, DIGITS, 0);
  fill(selects.digit3, DIGITS, 0);
  fill(selects.multiplier, MULTIPLIERS, 2);
  fill(selects.tolerance, TOLERANCES, 6);

  function bandCount() {
    return form.elements.bands.value === "5" ? 5 : 4;
  }

  // Round to 6 significant digits so results like 33 × 0.1 don't show 3.3000000000000003.
  function clean(value) {
    return String(Number(value.toPrecision(6)));
  }

  function formatResistance(ohms) {
    var prefixes = [[1e9, "GΩ"], [1e6, "MΩ"], [1e3, "kΩ"]];
    for (var i = 0; i < prefixes.length; i++) {
      if (ohms >= prefixes[i][0]) {
        return clean(ohms / prefixes[i][0]) + " " + prefixes[i][1] + " (" + clean(ohms) + " Ω)";
      }
    }
    return clean(ohms) + " Ω";
  }

  function setLabels() {
    var five = bandCount() === 5;
    document.getElementById("label-digit1").textContent = "Band 1 (first digit)";
    document.getElementById("label-digit2").textContent = "Band 2 (second digit)";
    document.getElementById("label-digit3").textContent = "Band 3 (third digit)";
    document.getElementById("label-multiplier").textContent = "Band " + (five ? 4 : 3) + " (multiplier)";
    document.getElementById("label-tolerance").textContent = "Band " + (five ? 5 : 4) + " (tolerance)";
    digit3Field.hidden = !five;
  }

  function update() {
    var five = bandCount() === 5;
    var digits = Number(selects.digit1.value) * 10 + Number(selects.digit2.value);
    if (five) {
      digits = digits * 10 + Number(selects.digit3.value);
    }
    var ohms = digits * Number(selects.multiplier.value);
    result.textContent =
      "Resistance: " + formatResistance(ohms) + "\n" +
      "Tolerance: ±" + clean(Number(selects.tolerance.value)) + "%";
  }

  form.addEventListener("change", function () {
    setLabels();
    update();
  });
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  setLabels();
  update();
})();
