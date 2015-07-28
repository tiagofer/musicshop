  $(".produto").css("background-color", "lightblue");

  if (document.getElementsByClassName === undefined) {
    document.getElementsByClassName = function (className) {
      alert("Regozijai-vos, usuários do Internet Explorer");
      var todosElementos = document.getElementsByTagName("*");
      var resultados = [];

      var elemento;
      for (var i = 0; (elemento = todosElementos[i]) !== null; i++) {
        var elementoClass = elemento.className;
        if (elementoClass &&
            elementoClass.indexOf(className) != -1) {
              resultados.push(elemento);
            }
      }
      return resultados;
    }
  }

  function calculateTotalProducts() {
    var total = 0;
    var produtos = $(".produto");

    $(produtos).each(function (pos, produto) {
      var $produto = $(produto);
      var quantity = moneyTextToFloat ($produto.find(".quantity").val());
      var price = moneyTextToFloat ($produto.find(".price").text());
      total += quantity * price;
    });
    return total;
  }

  function writeTotal(value) {
    var text = floatToMoneyText(value);
    $("#total").text(text);
  }

  function moneyTextToFloat (text) {
    var cleanText = text.replace("R$ ","").replace(",",".");
    return parseFloat(cleanText);
  }

  function floatToMoneyText (value) {
    var text = (value < 1 ? "0" : "") + Math.floor(value * 100);
    text = "R$ " + text;
    return text.substr(0, text.length - 2) + "," + text.substr(-2);
  }

  function readTotal () {
    var total = $("#total").text();
    return moneyTextToFloat(total);
  }

  function onDocumentLoad () {
    var textEdits = document.getElementsByClassName("quantity");

    for (var i = 0; i < textEdits.length; i++) {
      textEdits[i].onchange = function () {
        writeTotal(calculateTotalProducts());
      };
    }

  }

  window.onload = onDocumentLoad;
