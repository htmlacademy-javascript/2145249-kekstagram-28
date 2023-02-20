function getStringLength (string, maxLength) {
  return string.length <= maxLength;
}

let result = getStringLength('проверяемая строка', 20);
console.log(result);


function getPalindrome (string) {
  string = string.toLowerCase();
  string = string.replaceAll(' ', '');
  for(let i = 0; i <= string.length; i++) {
    if(string[i] !== string[string.length - (i + 1)]) {
      return false;
    }
  }
  return true;
}

result = getPalindrome('Лёша на полке клопа нашёл ');
console.log(result);


function getNumberFromString (string) {
  let number = '';
  if(typeof(string) === 'number') {
    string = string.toString();
  }
  string = string.replaceAll(' ', '');
  for(let i = 0; i <= string.length; i++) {
    if (Number(string[i]) === Number(string[i])) {
      number += string[i];
    }
  }
  if(number === '') {
    return NaN;
  }
  return(Number(number));
}

result = getNumberFromString('1 кефир, 0.5 батона');
console.log(result);


function getStringWithAdded(string, minLength, addedSymbol) {
  let i = 0;
  let newString = '';
  if (string.length + addedSymbol.length <= minLength) {
    string = addedSymbol + string;
  }
  while (string.length + newString.length < minLength) {
    if(i > addedSymbol.length - 1) {
      i = 0;
    }
    newString = newString + addedSymbol[i];
    i++;
  }
  string = newString + string;
  return string;
}

result = getStringWithAdded('q', 4, 'we');
console.log(result);
