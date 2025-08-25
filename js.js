document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const numbers = document.querySelectorAll(".btn");
  const historial = [];
  let index = 0;

  let primerNumero = null;
  let operador = null;
  let esperandoSegundoNumero = false;
  let guardar = true;

  for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function () {
      const value = this.dataset.value;

      if (!isNaN(value)) {
        if (display.innerText === "0" || esperandoSegundoNumero) {
          display.innerText = value;
          esperandoSegundoNumero = false;
        } else {
          display.innerText += value;
        }
      } else {
        switch (value) {
          case "+":
          case "-":
          case "*":
          case "/":
            primerNumero = Number(display.innerText);
            operador = value;
            esperandoSegundoNumero = true;
            display.innerText = "0";
            break;

          case "=":
            if (operador && primerNumero !== null) {
              const segundoNumero = Number(display.innerText);
              let resultado;
              if (operador === "+") resultado = primerNumero + segundoNumero;
              if (operador === "-") resultado = primerNumero - segundoNumero;
              if (operador === "*") resultado = primerNumero * segundoNumero;
              if (operador === "/") resultado = primerNumero / segundoNumero;

              display.innerText = resultado;
              primerNumero = null;
              operador = null;
              esperandoSegundoNumero = false;
            }
            break;

          case "clear":
            display.innerText = "0";
            primerNumero = null;
            operador = null;
            esperandoSegundoNumero = false;
            break;

          case "delete":
            if (guardar) {
              historial.push(display.innerText);
              guardar = false;
              console.log(historial);
            } else {
              display.innerText = historial[index];
              index++;
            }

            break;
        }
      }
    });
  }
  console.log(historial);
});
