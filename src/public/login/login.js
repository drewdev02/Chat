const inputUsername = document.getElementById('username');
const inputPassword = document.getElementById('password');

const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('buttonpressed');
    const username = inputUsername.value.trim();
    const password = inputPassword.value.trim();
    if(username === ''|| password === ''){
      alert('Please enter all required fields');
    }else{
        //code for sending information to api
        console.log(`Username: ${username}, Password: ${password}`);
        clearInputField();
 
    }
});

 // Clears input message field
 const clearInputField = () => {
  inputUsername.value = '';
  inputPassword.value = '';
}