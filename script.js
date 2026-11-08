/* ============================================================================
 * Project: Basic Calculator
 * Organization: CodeAlpha Internship
 * Task: Task 1 - Basic Calculator Program
 * 
 * Features:
 * - Basic Arithmetic: Addition, Subtraction, Multiplication, Division
 * - Advanced & Scientific: Powers, Square Root, Factorial, Logarithms, Trig
 * - Angle Modes: Degrees and Radians
 * - Switch-case based arithmetic evaluation engine
 * - Keyboard shortcuts support & responsive Google dark theme UI
 * - Persistent calculation history
 * ============================================================================
 */

(function () {
  'use strict';

  // State Management
  let currentInput = '0';
  let expressionHistory = '';
  let lastAnswer = 0;
  let angleMode = 'deg'; // 'deg' or 'rad'
  let isInverse = false;
  let shouldResetOnNextDigit = false;
  let calculationHistory = [];

  // DOM Elements
  const displayMain = document.getElementById('displayMain');
  const displayExpression = document.getElementById('displayExpression');
  const degBtn = document.getElementById('degBtn');
  const radBtn = document.getElementById('radBtn');
  const invBtn = document.getElementById('invBtn');

  // Modals
  const historyModal = document.getElementById('historyModal');
  const historyList = document.getElementById('historyList');
  const openHistoryMini = document.getElementById('openHistoryMini');
  const historyToggleBtn = document.getElementById('historyToggleBtn');
  const closeHistoryBtn = document.getElementById('closeHistoryBtn');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');

  const codeModal = document.getElementById('codeModal');
  const viewCodeBtn = document.getElementById('viewCodeBtn');
  const closeCodeBtn = document.getElementById('closeCodeBtn');

  const infoModal = document.getElementById('infoModal');
  const openInfoBtn = document.getElementById('openInfoBtn');
  const closeInfoBtn = document.getElementById('closeInfoBtn');

  // Load history from localStorage on startup
  try {
    const saved = localStorage.getItem('codealpha_calc_history');
    if (saved) {
      calculationHistory = JSON.parse(saved);
    }
  } catch (err) {
    calculationHistory = [];
  }

  // Update UI Display
  function updateDisplay() {
    displayMain.textContent = currentInput;
    displayExpression.textContent = expressionHistory || `Ans = ${formatNumber(lastAnswer)}`;
  }

  // Format numbers to prevent IEEE-754 floating point precision glitches
  function formatNumber(num) {
    if (Number.isNaN(num) || !Number.isFinite(num)) {
      return 'Error';
    }
    // Handle very large or very small numbers
    const absVal = Math.abs(num);
    if ((absVal > 0 && absVal < 1e-6) || absVal >= 1e12) {
      return num.toExponential(6).replace(/\.?0+e/, 'e');
    }
    // Round to 10 decimal places to eliminate 0.1 + 0.2 = 0.30000000000000004
    const rounded = parseFloat(Number(num).toFixed(10));
    return rounded.toString();
  }

  // Factorial helper
  function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    if (n > 170) return Infinity; // Exceeds 64-bit float
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }

  // Switch-case based arithmetic evaluation (satisfies Task 1 requirement)
  function executeBinaryOp(a, operator, b) {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
      case '−':
        return a - b;
      case '*':
      case '×':
        return a * b;
      case '/':
      case '÷':
        if (b === 0) {
          throw new Error('Division by zero');
        }
        return a / b;
      case '%':
        return a % b;
      case '^':
        return Math.pow(a, b);
      default:
        throw new Error('Invalid operator');
    }
  }

  // Handle number input (0-9 and decimal)
  function inputChar(char) {
    if (shouldResetOnNextDigit) {
      currentInput = '';
      shouldResetOnNextDigit = false;
    }

    if (currentInput === '0' && char !== '.') {
      currentInput = char;
    } else if (char === '.') {
      // Find the last number chunk to prevent multiple decimals in one token
      const parts = currentInput.split(/[+\−\-×*÷/%\^()]/);
      const currentToken = parts[parts.length - 1];
      if (!currentToken.includes('.')) {
        currentInput += (currentToken === '' ? '0.' : '.');
      }
    } else {
      currentInput += char;
    }
    updateDisplay();
  }

  // Handle operators (+, −, ×, ÷, ^)
  function inputOperator(op) {
    shouldResetOnNextDigit = false;

    // Replace trailing operator if user changed their mind
    const lastChar = currentInput.trim().slice(-1);
    const isOp = ['+', '−', '-', '×', '*', '÷', '/', '^'].includes(lastChar);

    if (isOp && currentInput.length > 0) {
      currentInput = currentInput.slice(0, -1) + op;
    } else {
      currentInput += op;
    }
    updateDisplay();
  }

  // All Clear (AC)
  function clearAll() {
    currentInput = '0';
    expressionHistory = '';
    shouldResetOnNextDigit = false;
    updateDisplay();
  }

  // Backspace / Delete last character
  function backspace() {
    if (shouldResetOnNextDigit) {
      clearAll();
      return;
    }
    if (currentInput.length > 1) {
      currentInput = currentInput.slice(0, -1);
    } else {
      currentInput = '0';
    }
    updateDisplay();
  }

  // Scientific Functions dispatcher
  function applyFunction(fnName) {
    shouldResetOnNextDigit = false;
    switch (fnName) {
      case 'sin':
      case 'cos':
      case 'tan':
      case 'ln':
      case 'log':
      case 'sqrt':
        if (currentInput === '0') {
          currentInput = `${fnName}(`;
        } else {
          // If preceding character is a number, insert multiplication
          const last = currentInput.slice(-1);
          if (/[0-9πe)]/.test(last)) {
            currentInput += `×${fnName}(`;
          } else {
            currentInput += `${fnName}(`;
          }
        }
        break;
      default:
        break;
    }
    updateDisplay();
  }

  // Safe Tokenizer and Shunting-Yard Expression Evaluator
  function evaluateExpression(rawExp) {
    // Standardize symbols
    let sanitized = rawExp
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/π/g, `${Math.PI}`)
      .replace(/\be\b/g, `${Math.E}`);

    // Parse and evaluate with mathematical safety
    // Helper to evaluate function call
    function evaluateMathFunc(name, val) {
      const angleMultiplier = (angleMode === 'deg') ? (Math.PI / 180) : 1;
      switch (name) {
        case 'sin':
          return Math.sin(val * angleMultiplier);
        case 'cos':
          return Math.cos(val * angleMultiplier);
        case 'tan': {
          const rad = val * angleMultiplier;
          // Check for tan(90 deg) undefined
          if (angleMode === 'deg' && Math.abs(val % 180) === 90) {
            throw new Error('Undefined (tan 90°)');
          }
          return Math.tan(rad);
        }
        case 'ln':
          if (val <= 0) throw new Error('Invalid input for ln');
          return Math.log(val);
        case 'log':
          if (val <= 0) throw new Error('Invalid input for log');
          return Math.log10(val);
        case 'sqrt':
          if (val < 0) throw new Error('Cannot square root negative');
          return Math.sqrt(val);
        default:
          throw new Error('Unknown function');
      }
    }

    // Replace functions iteratively from innermost
    const funcRegex = /(sin|cos|tan|ln|log|sqrt)\(([^()]+)\)/;
    let match;
    let iterations = 0;
    while ((match = funcRegex.exec(sanitized)) !== null && iterations < 50) {
      const fnName = match[1];
      const innerVal = computeSimpleArithmetic(match[2]);
      const res = evaluateMathFunc(fnName, innerVal);
      sanitized = sanitized.replace(match[0], res.toString());
      iterations++;
    }

    // Now evaluate balanced parentheses
    const parenRegex = /\(([^()]+)\)/;
    iterations = 0;
    while ((match = parenRegex.exec(sanitized)) !== null && iterations < 50) {
      const val = computeSimpleArithmetic(match[1]);
      sanitized = sanitized.replace(match[0], val.toString());
      iterations++;
    }

    return computeSimpleArithmetic(sanitized);
  }

  // Evaluates plain arithmetic string with operator precedence (+, -, *, /, %, ^)
  function computeSimpleArithmetic(expr) {
    const tokens = [];
    let numberBuffer = '';

    for (let i = 0; i < expr.length; i++) {
      const ch = expr[i];

      // Handle unary minus: if at start or right after an operator
      if (ch === '-' && (tokens.length === 0 || ['+', '-', '*', '/', '%', '^'].includes(tokens[tokens.length - 1]))) {
        numberBuffer += ch;
        continue;
      }

      if (/[0-9.]/.test(ch)) {
        numberBuffer += ch;
      } else if (['+', '-', '*', '/', '%', '^'].includes(ch)) {
        if (numberBuffer !== '') {
          tokens.push(parseFloat(numberBuffer));
          numberBuffer = '';
        }
        tokens.push(ch);
      }
    }

    if (numberBuffer !== '') {
      tokens.push(parseFloat(numberBuffer));
    }

    if (tokens.length === 0) return 0;

    // Order 1: Exponentiation (^)
    let i = 0;
    while (i < tokens.length) {
      if (tokens[i] === '^') {
        const left = tokens[i - 1];
        const right = tokens[i + 1];
        const res = executeBinaryOp(left, '^', right);
        tokens.splice(i - 1, 3, res);
      } else {
        i++;
      }
    }

    // Order 2: Multiplication, Division, Modulus (*, /, %)
    i = 0;
    while (i < tokens.length) {
      if (tokens[i] === '*' || tokens[i] === '/' || tokens[i] === '%') {
        const left = tokens[i - 1];
        const op = tokens[i];
        const right = tokens[i + 1];
        const res = executeBinaryOp(left, op, right);
        tokens.splice(i - 1, 3, res);
      } else {
        i++;
      }
    }

    // Order 3: Addition and Subtraction (+, -)
    i = 0;
    while (i < tokens.length) {
      if (tokens[i] === '+' || tokens[i] === '-') {
        const left = tokens[i - 1];
        const op = tokens[i];
        const right = tokens[i + 1];
        const res = executeBinaryOp(left, op, right);
        tokens.splice(i - 1, 3, res);
      } else {
        i++;
      }
    }

    return tokens[0];
  }

  // Calculate final result
  function calculate() {
    if (!currentInput || currentInput === 'Error') return;

    try {
      const exp = currentInput;
      const resultValue = evaluateExpression(exp);

      if (Number.isNaN(resultValue) || !Number.isFinite(resultValue)) {
        currentInput = 'Error';
        updateDisplay();
        return;
      }

      const formatted = formatNumber(resultValue);
      expressionHistory = `${exp} =`;

      // Save to history log
      addToHistory(exp, formatted);

      lastAnswer = resultValue;
      currentInput = formatted;
      shouldResetOnNextDigit = true;
      updateDisplay();

    } catch (err) {
      currentInput = err.message.includes('Division by zero') ? 'Cannot divide by 0' : 'Error';
      shouldResetOnNextDigit = true;
      updateDisplay();
    }
  }

  // History Management
  function addToHistory(exp, res) {
    calculationHistory.unshift({ exp, res, time: new Date().toLocaleTimeString() });
    if (calculationHistory.length > 30) {
      calculationHistory.pop();
    }
    try {
      localStorage.setItem('codealpha_calc_history', JSON.stringify(calculationHistory));
    } catch (e) {
      // storage unavailable
    }
    renderHistoryModal();
  }

  function renderHistoryModal() {
    if (calculationHistory.length === 0) {
      historyList.innerHTML = '<p class="empty-notice">No calculation history yet.</p>';
      return;
    }

    historyList.innerHTML = calculationHistory.map((item, idx) => `
      <div class="history-item" data-index="${idx}">
        <div class="history-exp">${item.exp} =</div>
        <div class="history-res">${item.res}</div>
      </div>
    `).join('');

    // Attach click handlers to recall item
    const items = historyList.querySelectorAll('.history-item');
    items.forEach(el => {
      el.addEventListener('click', () => {
        const idx = el.getAttribute('data-index');
        const picked = calculationHistory[idx];
        if (picked) {
          currentInput = picked.res;
          expressionHistory = `${picked.exp} =`;
          shouldResetOnNextDigit = true;
          updateDisplay();
          closeModal(historyModal);
        }
      });
    });
  }

  // Keypad click dispatcher
  document.querySelector('.keypad-grid').addEventListener('click', (e) => {
    const target = e.target.closest('button');
    if (!target) return;

    // Mode Toggle (Deg / Rad)
    if (target.classList.contains('mode-btn')) {
      const mode = target.dataset.mode;
      if (mode) {
        angleMode = mode;
        degBtn.classList.toggle('active', mode === 'deg');
        radBtn.classList.toggle('active', mode === 'rad');
      }
      return;
    }

    // Number or Char input
    const char = target.dataset.char;
    if (char) {
      inputChar(char);
      return;
    }

    // Operator input (+, −, ×, ÷, ^)
    const op = target.dataset.op;
    if (op) {
      inputOperator(op);
      return;
    }

    // Function input (sin, cos, tan, ln, log, sqrt)
    const func = target.dataset.func;
    if (func) {
      applyFunction(func);
      return;
    }

    // Action input (clear, calculate, factorial, percent, ans, exp, inverse)
    const action = target.dataset.action;
    if (action) {
      switch (action) {
        case 'clear':
          clearAll();
          break;
        case 'calculate':
          calculate();
          break;
        case 'factorial': {
          try {
            const num = parseFloat(currentInput);
            if (!Number.isNaN(num)) {
              const res = factorial(num);
              expressionHistory = `${num}! =`;
              currentInput = formatNumber(res);
              shouldResetOnNextDigit = true;
              updateDisplay();
            }
          } catch (err) {
            currentInput = 'Error';
            updateDisplay();
          }
          break;
        }
        case 'percent': {
          try {
            const num = parseFloat(currentInput);
            if (!Number.isNaN(num)) {
              const res = num / 100;
              expressionHistory = `${num}% =`;
              currentInput = formatNumber(res);
              shouldResetOnNextDigit = true;
              updateDisplay();
            }
          } catch (err) {
            currentInput = 'Error';
            updateDisplay();
          }
          break;
        }
        case 'ans':
          inputChar(formatNumber(lastAnswer));
          break;
        case 'exp':
          inputChar('e+');
          break;
        case 'inverse':
          isInverse = !isInverse;
          invBtn.classList.toggle('active', isInverse);
          break;
        default:
          break;
      }
    }
  });

  // Keyboard Event Listener
  window.addEventListener('keydown', (e) => {
    // Ignore keys if modal is open
    if (document.querySelector('.modal-backdrop.open')) {
      if (e.key === 'Escape') {
        closeAllModals();
      }
      return;
    }

    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
      inputChar(e.key);
      e.preventDefault();
    } else if (e.key === '+') {
      inputOperator('+');
      e.preventDefault();
    } else if (e.key === '-') {
      inputOperator('−');
      e.preventDefault();
    } else if (e.key === '*') {
      inputOperator('×');
      e.preventDefault();
    } else if (e.key === '/') {
      inputOperator('÷');
      e.preventDefault();
    } else if (e.key === '^') {
      inputOperator('^');
      e.preventDefault();
    } else if (e.key === '(' || e.key === ')') {
      inputChar(e.key);
      e.preventDefault();
    } else if (e.key === '%') {
      const percentBtn = document.querySelector('[data-action="percent"]');
      if (percentBtn) percentBtn.click();
      e.preventDefault();
    } else if (e.key === 'Enter' || e.key === '=') {
      calculate();
      e.preventDefault();
    } else if (e.key === 'Backspace') {
      backspace();
      e.preventDefault();
    } else if (e.key === 'Escape') {
      clearAll();
      e.preventDefault();
    }
  });

  // Modal helpers
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
  }

  function closeAllModals() {
    [historyModal, codeModal, infoModal].forEach(m => m && m.classList.remove('open'));
  }

  // Modal Event Listeners
  if (openHistoryMini) {
    openHistoryMini.addEventListener('click', () => {
      renderHistoryModal();
      openModal(historyModal);
    });
  }

  if (historyToggleBtn) {
    historyToggleBtn.addEventListener('click', () => {
      renderHistoryModal();
      openModal(historyModal);
    });
  }

  if (closeHistoryBtn) {
    closeHistoryBtn.addEventListener('click', () => closeModal(historyModal));
  }

  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      calculationHistory = [];
      try {
        localStorage.removeItem('codealpha_calc_history');
      } catch (e) {}
      renderHistoryModal();
    });
  }

  if (viewCodeBtn) {
    viewCodeBtn.addEventListener('click', () => openModal(codeModal));
  }

  if (closeCodeBtn) {
    closeCodeBtn.addEventListener('click', () => closeModal(codeModal));
  }

  if (openInfoBtn) {
    openInfoBtn.addEventListener('click', () => openModal(infoModal));
  }

  if (closeInfoBtn) {
    closeInfoBtn.addEventListener('click', () => closeModal(infoModal));
  }

  // Click outside modal content to close
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      closeModal(e.target);
    }
  });

  // Initial render
  updateDisplay();
})();
