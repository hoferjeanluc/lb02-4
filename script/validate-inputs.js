/* Aufgabe:

  Fügen Sie die notwendigen Selektoren für

  firstname, lastname, mobile, password2

*/



//read form elements

const form = document.getElementById('form');

const username = document.getElementById('username');

const email = document.getElementById('email');

const password = document.getElementById('password');

const firstname = document.getElementById('firstname');

const lastname = document.getElementById('lastname');

const mobile = document.getElementById('mobile');

const password2 = document.getElementById('password2');



// Show input error message

function showError(input, message) {

  const formControl = input.parentElement;

  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');

  small.innerText = message;

}



// Show success outline

function showSuccess(input) {

  const formControl = input.parentElement;

  formControl.className = 'form-control success';

}



// Check email is valid

function checkEmail(input) {

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {

    showSuccess(input);

  } else {

    showError(input, 'Email is not valid');

  }

}



/* Aufgabe:

    Validieren Sie die Mobile-Nummer ähnlich wie bei der Email mit einer

    Regular expression (regex). Für eine geeignete regex suchen Sie

    im Internet nach "javascript regular expression for mobile number".

*/



// Check mobile is valid

function checkMobile(input) {

  const re = /^(0|0041|\+41)?[1-9\s][0-9\s]{1,12}$/;

  if (re.test(input.value.trim())) {

    showSuccess(input);

  } else {

    showError(input, 'Mobile Number is not valid');

  }

}



// Check required fields

function checkRequired(inputArr) {

  let isRequired = false;

  inputArr.forEach(function(input) {

    if (input.value.trim() === '') {

      showError(input, `${getFieldName(input)} is required`);

      isRequired = true;

    } else {

      //showSuccess(input);

    }

  });

  return isRequired;

}



// Check input length

function checkLength(input, min, max) {

  if (input.value.length < min) {

    showError(

        input,

        `${getFieldName(input)} must be at least ${min} characters!`

    );

  } else if (input.value.length > max) {

    showError(

        input,

        `${getFieldName(input)} must be less than ${max} characters!`

    );

  } else {

    showSuccess(input);

  }

}



/* Aufgabe:

    Validieren Sie, ob die beiden Passwörter übereinstimmen.

    Falls sie nicht übereinstimmen, geben Sie (ähnlich wie in den anderen Beispielen)

    eine Fehlermeldung dem Formular aus.

*/



// Check passwords match

function checkPasswords (input, input2) {

  if (input.value != input2.value){

    showError(

        input,

        `${getFieldName(input)} did not match. Try again!`

    );

    showError(

        input2,

        `${getFieldName(input2)} did not match. Try again!`

    );

  } else {

    //showSuccess(input);

    checkLength(input, 6, 25);

    checkLength(input2, 6, 25);

  }

}



// Get fieldname

function getFieldName(input) {

  return input.id.charAt(0).toUpperCase() + input.id.slice(1);

}



// Validate form input elements

function validateForm(){

  //check required inputs

  if(!checkRequired([firstname, lastname, username, email, mobile, password, password2])){

    //Aufgabe: Validierung der Länge für Vorname (2 bis 20) und Nachname (2 bis 50)

    checkLength(username, 3, 15);

    //checkLength(password, 6, 25);

    //checkLength(password2, 6, 25);

    checkLength(firstname, 2, 20);

    checkLength(lastname, 2, 50);

    /* Aufgabe:

      Validierung der Telefonnumer ähnlich wie bei der Email mit einer

      Regular expression (regex). Für eine geeignete regex suchen Sie

      im Internet nach "javascript regular expression for mobile number"

    * */

    checkEmail(email);

    checkMobile(mobile);

    /* Aufgabe:

      Validierung Sie die beiden Passwörter, damit password

      mit password2 übereinstimmt.

    * */



  }

  checkPasswords(password, password2);

}



// Event listeners

form.addEventListener('submit', function(e) {

  //https://www.w3schools.com/jsref/event_preventdefault.asp

  e.preventDefault();

  //First validate form

  validateForm();

});

