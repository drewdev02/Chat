const inputUsername = document.getElementById('user');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputPasswordConfirmation = document.getElementById('confirmPassword');
const inputRole = document.getElementById('role');

//SIGN UP BUTTON
const inputSignUpButton = document.getElementById('signUpButton');

//sign up button event
inputSignUpButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('buttonpressed');
    const username = inputUsername.value.trim();
    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();
    const passwordConfirmation = inputPasswordConfirmation.value.trim();
    const role = inputRole.ariaChecked;
    if(username === '' || email === '' || password === '' || passwordConfirmation === '' ){
      alert('Please enter all required fields');
    }else if(validatePasswords(password, passwordConfirmation)==false){
      alert('Passwords must match');
    }else{
        //code for sending information to api
        console.log(`Username: ${username}, Email: ${email}, Password: ${password}, Confirm Password: ${passwordConfirmation}, Role: ${role}`);
        clearInputField();
    }
});

const validatePasswords = (password1, password2) => {
    if( password1 === password2){
      return true;
}else return false;
};

 // Clears input message field
 const clearInputField = () => {
  inputUsername.value = '';
  inputEmail.value = '';
  inputPassword.value = '';
  inputPasswordConfirmation.value = '';
}