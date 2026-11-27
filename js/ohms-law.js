// Ohm's law calculator: V = I × R.
// The visitor fills in two of the three values; we work out the third.
(function () {
  var form = document.getElementById("ohm-form");
  var result = document.getElementById("result");
  var inputs = {
    voltage: document.getElementById("voltage"),
    current: document.getElementById("current"),
    resistance: document.getElementById("resistance")
  };
  var units = { voltage: "V", current: "A", resistance: "Ω" };
  var names = { voltage: "Voltage", current: "Current", resistance: "Resistance" };

  function show(message, isError) {
    result.textContent = message;
    result.classList.toggle("error", Boolean(isError));
  }

  // Round to 6 significant digits so results like 0.1 + 0.2 don't show 0.30000000000000004.
  function format(value) {
    return String(Number(value.toPrecision(6)));
  }

  function calculate() {
    var filled = [];
    var values = {};

    for (var key in inputs) {
      var field = inputs[key];
      if (field.validity.badInput) {
        show(names[key] + " is not a valid number.", true);
        return;
      }
      if (field.value.trim() !== "") {
        var number = Number(field.value);
        if (!isFinite(number)) {
          show(names[key] + " is not a valid number.", true);
          return;
        }
        if (number < 0) {
          show(names[key] + " can't be negative. Enter a positive number.", true);
          return;
        }
        values[key] = number;
        filled.push(key);
      }
    }

    if (filled.length < 2) {
      show("Enter two values and leave one empty.", true);
      return;
    }
    if (filled.length === 3) {
      show("All three are filled in. Clear the one you want to calculate.", true);
      return;
    }

    var missing = Object.keys(inputs).filter(function (key) {
      return filled.indexOf(key) === -1;
    })[0];

    var answer;
    if (missing === "voltage") {
      answer = values.current * values.resistance;
    } else if (missing === "current") {
      if (values.resistance === 0) {
        show("Resistance can't be zero when calculating current (it would divide by zero).", true);
        return;
      }
      answer = values.voltage / values.resistance;
    } else {
      if (values.current === 0) {
        show("Current can't be zero when calculating resistance (it would divide by zero).", true);
        return;
      }
      answer = values.voltage / values.current;
    }

    if (!isFinite(answer)) {
      show("The result is too large to show.", true);
      return;
    }

    show(names[missing] + " = " + format(answer) + " " + units[missing], false);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    calculate();
  });

  document.getElementById("clear").addEventListener("click", function () {
    form.reset();
    show("", false);
    inputs.voltage.focus();
  });
})();
