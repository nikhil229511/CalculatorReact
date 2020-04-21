export const calculateResult = (val2, val1, operation) => {
    val2 = parseInt(val2);
    val1 = parseInt(val1);
    switch (operation) {
      case '+':
        return val2 + val1;
      case '-':
        return val2 - val1;
      case '*':
        return val2 * val1;
      case '/':
        return val2 / val1;
      case '=':
        return val2;
      case 'square':
        return Math.pow(val2, 2);
      case 'squareRoot':
        return Math.sqrt(val2);
      case 'absolute':
        return (val2 < 0 ? Math.abs(val2): (val2 > 0 ? (Math.abs(val2) * -1): val2));
      default:
        break;
    }
  };