document.addEventListener('DOMContentLoaded', function () {
    const pusher = new Pusher('d47efbe53b824c457959', {
      cluster: 'eu',
      encrypted: true
    });

    Pusher.logToConsole = true;
  
    const channel = pusher.subscribe('chat');
  
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messagesList = document.getElementById('messages');
  
    sendButton.addEventListener('click', function () {
      const message = messageInput.value.trim();
      if (message !== '') {
        sendMessage(message);
        messageInput.value = '';
      }
    });
  
    const accessToken = document.cookie
      .split(';')
      .find((cookie) => cookie.includes('accessToken'))
      .split('=')[1];

    if (!accessToken) {
      window.location.href = '/page/login';
    }

    function sendMessage(message) {
      const li = document.createElement('li');
      li.textContent = message;
      //messagesList.appendChild(li);
      scrollToBottom();
      fetch('/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken
        },
        body: JSON.stringify({ message: message })
      });
    }
  
    channel.bind('message', function (data) {
      const li = document.createElement('li');
      li.textContent = `${data.user}: ${data.message}`;
      messagesList.appendChild(li);
      scrollToBottom();
    });
  
    function scrollToBottom() {
      messagesList.scrollTop = messagesList.scrollHeight;
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const message = messageInput.value.trim();
        if (message !== '') {
          sendMessage(message);
          messageInput.value = '';
        }
      }
    });
  });
  