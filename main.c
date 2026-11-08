/*
 * ============================================================================
 * Project: Basic Calculator Program
 * Organization: CodeAlpha Internship
 * Domain: C Programming
 * Task: Task 1 - Basic Calculator
 * 
 * Description:
 * A menu-driven console calculator developed in C. It performs standard
 * arithmetic operations (Addition, Subtraction, Multiplication, Division,
 * and Modulus) using switch-case for operation selection, along with robust
 * input validation and division-by-zero protection.
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// Function prototypes
void printHeader(void);
void showMenu(void);
void clearInputBuffer(void);
double add(double a, double b);
double subtract(double a, double b);
double multiply(double a, double b);
int divide(double a, double b, double *result);
int calculateModulus(int a, int b, int *result);

int main(void) {
    int choice;
    double num1, num2, result;
    int intNum1, intNum2, modResult;
    char continueCalc = 'y';

    printHeader();

    do {
        showMenu();
        printf("Enter your choice (1-6): ");

        // Validate user menu selection
        if (scanf("%d", &choice) != 1) {
            printf("\n[!] Invalid input! Please enter a number between 1 and 6.\n");
            clearInputBuffer();
            printf("\n--------------------------------------------------\n");
            continue;
        }

        // Exit option
        if (choice == 6) {
            printf("\nThank you for using the Basic Calculator. Goodbye!\n\n");
            break;
        }

        // Check if choice is out of valid range
        if (choice < 1 || choice > 6) {
            printf("\n[!] Invalid option! Please select a valid operation (1-6).\n");
            printf("\n--------------------------------------------------\n");
            continue;
        }

        // Handle operations using switch-case as required by Task 1
        switch (choice) {
            case 1: // Addition
                printf("\n--- Addition (+) ---\n");
                printf("Enter first number: ");
                if (scanf("%lf", &num1) != 1) {
                    printf("\n[!] Invalid input! Please enter a valid number.\n");
                    clearInputBuffer();
                    break;
                }
                printf("Enter second number: ");
                if (scanf("%lf", &num2) != 1) {
                    printf("\n[!] Invalid input! Please enter a valid number.\n");
                    clearInputBuffer();
                    break;
                }
                result = add(num1, num2);
                printf("\n>>> Result: %.4lf + %.4lf = %.4lf\n", num1, num2, result);
                break;

            case 2: // Subtraction
                printf("\n--- Subtraction (-) ---\n");
                printf("Enter first number: ");
                if (scanf("%lf", &num1) != 1) {
                    printf("\n[!] Invalid input! Please enter a valid number.\n");
                    clearInputBuffer();
                    break;
                }
                printf("Enter second number: ");
                if (scanf("%lf", &num2) != 1) {
                    printf("\n[!] Invalid input! Please enter a valid number.\n");
                    clearInputBuffer();
                    break;
                }
                result = subtract(num1, num2);
                printf("\n>>> Result: %.4lf - %.4lf = %.4lf\n", num1, num2, result);
                break;

            case 3: // Multiplication
                printf("\n--- Multiplication (*) ---\n");
                printf("Enter first number: ");
                if (scanf("%lf", &num1) != 1) {
                    printf("\n[!] Invalid input! Please enter a valid number.\n");
                    clearInputBuffer();
                    break;
                }
                printf("Enter second number: ");
                if (scanf("%lf", &num2) != 1) {
                    printf("\n[!] Invalid input! Please enter a valid number.\n");
                    clearInputBuffer();
                    break;
                }
                result = multiply(num1, num2);
                printf("\n>>> Result: %.4lf * %.4lf = %.4lf\n", num1, num2, result);
                break;

            case 4: // Division
                printf("\n--- Division (/) ---\n");
                printf("Enter dividend (numerator): ");
                if (scanf("%lf", &num1) != 1) {
                    printf("\n[!] Invalid input! Please enter a valid number.\n");
                    clearInputBuffer();
                    break;
                }
                printf("Enter divisor (denominator): ");
                if (scanf("%lf", &num2) != 1) {
                    printf("\n[!] Invalid input! Please enter a valid number.\n");
                    clearInputBuffer();
                    break;
                }

                if (divide(num1, num2, &result)) {
                    printf("\n>>> Result: %.4lf / %.4lf = %.4lf\n", num1, num2, result);
                } else {
                    printf("\n[!] Error: Division by zero is undefined in mathematics.\n");
                }
                break;

            case 5: // Modulus (Remainder)
                printf("\n--- Modulus / Remainder (%%) ---\n");
                printf("Enter first integer: ");
                if (scanf("%d", &intNum1) != 1) {
                    printf("\n[!] Error: Modulus operation requires integer values.\n");
                    clearInputBuffer();
                    break;
                }
                printf("Enter second integer: ");
                if (scanf("%d", &intNum2) != 1) {
                    printf("\n[!] Error: Modulus operation requires integer values.\n");
                    clearInputBuffer();
                    break;
                }

                if (calculateModulus(intNum1, intNum2, &modResult)) {
                    printf("\n>>> Result: %d %% %d = %d\n", intNum1, intNum2, modResult);
                } else {
                    printf("\n[!] Error: Modulo by zero is not allowed.\n");
                }
                break;

            default:
                printf("\n[!] Unexpected error occurred. Please try again.\n");
                break;
        }

        clearInputBuffer();
        printf("\n--------------------------------------------------\n");
        printf("Do you want to perform another calculation? (y/n): ");
        scanf(" %c", &continueCalc);
        printf("--------------------------------------------------\n\n");

    } while (continueCalc == 'y' || continueCalc == 'Y');

    if (continueCalc != 'y' && continueCalc != 'Y' && choice != 6) {
        printf("\nThank you for using the Basic Calculator. Have a great day!\n\n");
    }

    return 0;
}

// Display welcome banner
void printHeader(void) {
    printf("====================================================\n");
    printf("          CODEALPHA - C PROGRAMMING INTERNSHIP      \n");
    printf("                 TASK 1: BASIC CALCULATOR           \n");
    printf("====================================================\n");
}

// Display available menu options
void showMenu(void) {
    printf("\nPlease select an arithmetic operation:\n");
    printf("  [1] Addition (+)\n");
    printf("  [2] Subtraction (-)\n");
    printf("  [3] Multiplication (*)\n");
    printf("  [4] Division (/)\n");
    printf("  [5] Modulus (%%)\n");
    printf("  [6] Exit Program\n");
    printf("----------------------------------------------------\n");
}

// Clears leftover characters from the standard input buffer
void clearInputBuffer(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF) {
        // discard characters
    }
}

// Performs addition of two numbers
double add(double a, double b) {
    return a + b;
}

// Performs subtraction of two numbers
double subtract(double a, double b) {
    return a - b;
}

// Performs multiplication of two numbers
double multiply(double a, double b) {
    return a * b;
}

// Performs division with zero divisor check (returns 0 on error, 1 on success)
int divide(double a, double b, double *result) {
    if (b == 0.0) {
        return 0; // Division by zero error
    }
    *result = a / b;
    return 1; // Success
}

// Performs modulus for integer values (returns 0 on error, 1 on success)
int calculateModulus(int a, int b, int *result) {
    if (b == 0) {
        return 0; // Modulo by zero error
    }
    *result = a % b;
    return 1; // Success
}
