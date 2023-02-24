function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('проверяемая строка', 20);


function checkPalindrome (string) {
  string = string.toLowerCase();
  string = string.replaceAll(' ', '');
  for(let i = 0; i <= string.length; i++) {
    if(string[i] !== string[string.length - (i + 1)]) {
      return false;
    }
  }
  return true;
}

checkPalindrome('Лёша на полке клопа нашёл ');


function extractNumberFromString (string) {
  let number = '';
  if(typeof(string) === 'number') {
    string = string.toString();
  }
  string = string.replaceAll(' ', '');
  for(let i = 0; i <= string.length; i++) {
    if (!isNaN(string[i])) {
      number += string[i];
    }
  }
  if(number === '') {
    return NaN;
  }
  return(Number(number));
}

extractNumberFromString('1 кефир, 0.5 батона');


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

getStringWithAdded('q', 4, 'we');
