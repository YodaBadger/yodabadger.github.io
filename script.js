const Password = (length, arg) => {
  length = 15;
  
  var checkBox = document.getElementById("slider");
  
  if (checkBox.checked == true){
    arg = "~!@#$%^&*()_+-=;:.,?";
  } else {
    arg = "0";
  }
  
  
  
  const lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const uppercase = lowercase.join("").toUpperCase().split("");
  const specialChars = arg.split("").filter(item => item.trim().length);
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let hasNumber = false;
  let hasUpper = false;
  let hasLower = false;
  let hasSpecial = false;

  let password = [];
  let lastChar;
  for (let i = 0; i < length; i++) {
    let char = newChar(lowercase, uppercase, numbers, specialChars);
    if (char !== lastChar) {
      password.push(char);
      lastChar = char
      if (Number(char)) {
        hasNumber = true
      }
      if (lowercase.indexOf(char) > -1) {
        hasLower = true
      }
      if (uppercase.indexOf(char) > -1) {
        hasUpper = true
      }
      if (specialChars.indexOf(char) > -1) {
        hasSpecial = true
      }
    } else {
      i--
    }
    if (i === length - 1 && (!hasNumber || !hasUpper || !hasLower || !hasSpecial)) {
      hasNumber = false;
      hasUpper = false;
      hasLower = false;
      hasSpecial = false;
      password = [];
      i = -1;
    }
  }

  function newChar(lower, upper, nums, specials) {
    let set = [lower, upper, nums, specials];
    let pick = set[Math.floor(Math.random() * set.length)];
    return pick[Math.floor(Math.random() * pick.length)]
  }
  updateView("Value", "Value", "", "P", password.join(""));
}


const updateView = (targetId, newId, label, element, method = '') => {
  let newElement = document.createElement(element);
  newElement.id = newId;
  let content = document.createTextNode(label + method);
  newElement.appendChild(content);

  let currentElement = document.getElementById(targetId);
  let parentElement = currentElement.parentNode;
  parentElement.replaceChild(newElement, currentElement);
}


document.getElementById("Password").addEventListener("click", Password);

function Copy(){
    var dummy = document.createElement("textarea");

    document.body.appendChild(dummy);

    dummy.value = document.getElementById("Value").innerHTML;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Password Copied!";
}

function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
}