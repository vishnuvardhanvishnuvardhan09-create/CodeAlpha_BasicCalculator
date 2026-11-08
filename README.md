# CodeAlpha Basic Calculator — Task 1

[![Language](https://img.shields.io/badge/Language-C%20%2F%20HTML5%20%2F%20CSS3%20%2F%20JavaScript-blue.svg)](#)
[![Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](#)
[![Internship](https://img.shields.io/badge/Internship-CodeAlpha-orange.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#)

---

## 📌 Project Overview
This repository contains the solution for **Task 1: Basic Calculator Program** as part of the **CodeAlpha C Programming Internship**.

The project fulfills all internship requirements:
1. **C Implementation (`main.c`)**: A robust, menu-driven command-line calculator utilizing **`switch-case`** for operation selection, modular functions, input validation, and division-by-zero protection.
2. **Interactive Web Calculator (`index.html`, `style.css`, `script.js`)**: A Google-inspired dark mode scientific/basic web calculator ready for instant deployment on **Vercel** and live demonstration.

---

## 🚀 Live Demo on Vercel
> 🔗 **Live Web App:** `https://your-calculator-name.vercel.app` *(Deploy via GitHub or Vercel CLI)*

---

## ✨ Features

### 💻 1. C Console Program (`main.c`)
- **Arithmetic Operations Supported**:
  - Addition (`+`)
  - Subtraction (`-`)
  - Multiplication (`*`)
  - Division (`/`) with division-by-zero validation
  - Modulus / Remainder (`%`) with integer validation
- **Core Architecture**:
  - Structured `switch-case` control flow as mandated by the task specification.
  - Dedicated modular functions (`add`, `subtract`, `multiply`, `divide`, `calculateModulus`).
  - Interactive loop enabling continuous calculations without restarting.
  - Defensive input buffer clearing to avoid infinite loops on invalid keystrokes.

### 🌐 2. Web Application (Google Dark Theme Recreation)
- **Pixel-Accurate UI**: Recreates the dark theme interface of Google Calculator.
- **7-Column Keypad Layout**:
  - Scientific functions: `sin`, `cos`, `tan`, `ln`, `log`, `√`, `x!`, `π`, `e`, `xʸ`, `EXP`, `Ans`.
  - Angle unit switching between **Degrees (`Deg`)** and **Radians (`Rad`)**.
  - All Clear (`AC`), Parentheses `( )`, and Percentage (`%`).
- **Calculation History**: Stores recent computations locally in `localStorage` with a persistent drawer modal.
- **Full Keyboard Support**: Seamlessly type numbers, operators, Enter (`=`), Escape (`AC`), and Backspace (`DEL`).
- **Zero Dependencies**: Pure HTML5, CSS3, and modern Vanilla JavaScript.

---

## 📁 Repository Structure

```text
CodeAlpha_BasicCalculator/
├── main.c           # C Programming solution with switch-case logic
├── index.html       # Web calculator user interface
├── style.css        # Responsive Google dark theme styling
├── script.js        # Mathematical parser and calculation engine
├── vercel.json      # Vercel zero-config static deployment settings
└── README.md        # Documentation, compile guide & submission details
```

---

## 🛠️ How to Compile & Run the C Program

### Option A: Using GCC (MinGW / Linux / macOS)
```bash
# 1. Compile the source file
gcc main.c -o calculator -lm

# 2. Run the executable
# On Windows:
calculator.exe

# On Linux / macOS:
./calculator
```

### Option B: Using Online GDB (No Installation Needed)
1. Open [OnlineGDB C Compiler](https://www.onlinegdb.com/online_c_compiler).
2. Copy and paste the contents of [`main.c`](main.c).
3. Click **Run**.

---

## 🌐 How to Deploy the Web Version to Vercel

### Method 1: Via GitHub (Recommended)
1. Push this repository to GitHub as `CodeAlpha_BasicCalculator`.
2. Go to [Vercel](https://vercel.com) and log in.
3. Click **Add New Project** → Select your `CodeAlpha_BasicCalculator` repository.
4. Keep the default settings and click **Deploy**.
5. Your live calculator URL will be generated instantly!

### Method 2: Via Vercel CLI
```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Deploy directly from this directory
vercel --prod
```

---

## ⌨️ Keyboard Shortcuts (Web Calculator)

| Key | Action |
| :--- | :--- |
| `0` - `9` | Enter digits |
| `.` | Enter decimal point |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `%` | Percentage |
| `^` | Exponentiation ($x^y$) |
| `(` and `)` | Parentheses |
| `Enter` or `=` | Calculate result |
| `Backspace` | Delete last character |
| `Escape` | All Clear (AC) |

---

## 📝 LinkedIn Post Template (For CodeAlpha Submission)

Copy and adapt this text when posting your project video on LinkedIn:

```markdown
🚀 Excited to share my completion of Task 1: Basic Calculator for the CodeAlpha C Programming Internship!

📌 Task Details:
Develop a C program to perform basic arithmetic operations (Addition, Subtraction, Multiplication & Division) using switch-case for operation selection.

✨ Highlights:
• Clean, modular C implementation using switch-case logic and division-by-zero protection.
• Built an interactive Google Dark Theme Web Calculator deployed live on Vercel.
• Responsive design with keyboard shortcuts, scientific functions, and persistent calculation history.

🔗 GitHub Repository: https://github.com/vishnuvardhanvishnuvardhan09-create/CodeAlpha_BasicCalculator
🌐 Live Vercel Demo: https://codealpha-basic-calculator-vishnuvardhan.vercel.app

Thank you @CodeAlpha for this valuable learning opportunity!

#CodeAlpha #Internship #CProgramming #WebDevelopment #SoftwareEngineering #OpenSource #StudentDeveloper
```

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
