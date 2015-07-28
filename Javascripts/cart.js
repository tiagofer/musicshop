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

  var produtos = document.getElementsByClassName("produto");

  function calculateTotalProducts() {
    var totalProdutos = 0;
    for (var pos = 0; pos < produtos.length; pos++) {
      var priceElements = produtos[pos].getElementsByClassName("price");
      var priceText = priceElements[0].innerHTML;
      var price = moneyTextToFloat(priceText);

      var qtyElements = produtos[pos].getElementsByClassName("quantity");
      var qtyText = qtyElements[0].value;
      var quantity = moneyTextToFloat(qtyText);

      var subtotal = quantity * price;
      totalProdutos += subtotal;
    }
    return totalProdutos;
  }

  function writeTotal(value) {
    var total = document.getElementById("total");
    total.innerHTML = floatToMoneyText(value);
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
    var total = document.getElementById("total");
    return moneyTextToFloat(total.innerHTML);
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
