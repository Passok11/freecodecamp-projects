function calculator() {
  let operation = '';
  let lastInput = '';
  let operators = ['+', '-', '*', '/'];
  let haveDot = false;
  let memory = 0;
  let useMemory = false;
  $('#operation').text(0);
  $('button').each(function () {
    if ($(this).val() === "blank") {
      return 0;
    } else if (!isNaN($(this).val())) {
      $(this).click(() => numberClick(Number($(this).val())))
    } else if ($(this).val() === 'AC' || $(this).val() === 'CE') {
      $(this).click(() => clearScreen($(this).val()));

    } else {
      switch ($(this).val()) {
        case '+':
          $(this).click(add);
          break;
        case '-':
          $(this).click(subtract);
          break;
        case 'x':
          $(this).click(multiply);
          break;
        case '.':
          $(this).click(dot);
          break;
        case '/':
          $(this).click(divide);
          break;
        case '=':
          $(this).click(equal);
          break;
      }
    }
  })

  function clearScreen(clear) {

    haveDot = false;
    lastInput = '';
    operation = '';
    if(clear === 'AC'){
      memory = 0;
      useMemory = false;
      $('#memory').text('');
    }
    $('#operation').text(0);



  }

  function numberClick(num) {
    if (useMemory && operation == '') {
      useMemory = false;
      $('#memory').text('');
    }
    if (checkZero(num)) {
      operation += num;
      lastInput = num;
      appendOperation();
    }
  }

  function checkZero(num) {
    let operationArr = operation.split(/[+\-*\/]/g);
    if (num !== 0) {
      operation = operation.replace(/[+\-*\/]0+[^.]/g, (match) => {
        return match[0]
      });
      appendOperation();
      return true;
    }
    if (num === 0) {
      if (operationArr[operationArr.length - 1] === "0") {
        return false;
      }
      return true;
    }
  }

  function add() {
    lastInputIsOperator();
    operation += '+';
    lastInput = '+';
    haveDot = false;
    appendOperation();
  }

  function subtract() {
    lastInputIsOperator();
    operation += '-';
    lastInput = '-';
    haveDot = false;
    appendOperation();
  }

  function multiply() {
    lastInputIsOperator();
    operation += '*';
    lastInput = '*';
    haveDot = false;
    appendOperation();
  }

  function divide() {
    lastInputIsOperator();
    operation += '/';
    lastInput = '/';
    haveDot = false;
    appendOperation();
  }

  function dot() {
    if (!haveDot) {
      operation += '.';
      lastInput = '.';
      haveDot = true;
      appendOperation();
    }
  }

  function equal() {
    lastInputIsOperator();
    if (useMemory) {
      memory = eval(memory + operation);
    } else {
      memory = eval(operation);
    }
    $('#operation').text(memory);
    $('#memory').text(memory);
    haveDot = false;
    operation = '';
    useMemory = true;
  }

  function appendOperation() {
    $('#operation').text(operation);
  }

  function lastInputIsOperator() {
    if (lastInput === '.') {
      operation += '0';
      lastInput = 0;
      appendOperation();
    }
    if (operators.indexOf(lastInput) >= 0) {
      operation = operation.slice(0, -1);
    }
  }
}

calculator();