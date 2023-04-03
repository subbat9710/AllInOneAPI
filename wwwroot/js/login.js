// login.js
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });
  const data = await response.json();
  if (response.ok) {
    // Login successful, redirect to admin page
    window.location.href = '/admin';
  } else {
    // Login failed, display error message
    const errorMessage = data.message || 'Login failed';
    alert(errorMessage);
  }
});