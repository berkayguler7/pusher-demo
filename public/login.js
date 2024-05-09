const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const response = await fetch('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  console.log(data);
  if (response.ok) {
    document.cookie = `accessToken=${data.accessToken}`;
    document.cookie = `refreshToken=${data.refreshToken}`;
    window.location.href = '/page/chat';
  } else {
    alert(data.error);
  }
});