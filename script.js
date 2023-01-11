var socket = io();

// Send message
document.getElementById('send-message').addEventListener('click', function(e) {
    e.preventDefault();
    var message = document.getElementById('message').value;
    socket.emit('chat message', message);
    document.getElementById('message').value = '';
  });
  
  // Receive message
  socket.on('chat message', function(msg){
    var messages = document.getElementById('chat-messages');
    var newMessage = document.createElement('p');
    newMessage.innerText = msg;
    messages.appendChild(newMessage);
  });


  // Save message to LocalStorage
socket.on('chat message', function(msg){
    var messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(msg);
    localStorage.setItem('messages', JSON.stringify(messages));
  });
  
  // Retrieve chat history from LocalStorage
  var messages = JSON.parse(localStorage.getItem('messages')) || [];
  for (var i = 0; i < messages.length; i++) {
    var newMessage = document.createElement('p');
    newMessage.innerText = messages[i];
    document.getElementById('chat-messages').appendChild(newMessage);
  }
  
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
  });