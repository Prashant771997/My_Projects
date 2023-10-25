const socket = io('http://localhost:8000');

//get dom elements in js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

//audio that will play on receiving messages
var audio = new Audio('ting.mp3')

//if form gets submitted, send server the message
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

//function that will append event info to the container
const append = (message, position)=> {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
    
}
//ask new user to join
const name = prompt("enter your name")
socket.emit('new-user-joined', name)

//if user has joined, receive the name from server
socket.on('user-joined', name => {
    append(`${name} has joined the chat`, 'right')

})


socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')

})

//if user leaves the chat, append info to the container
socket.on('left', name => {
    append(`${name} left the chat`, 'left')

})