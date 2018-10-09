var colors = {15018: [255, 255, 255]};
var socket = io('http://localhost:3000');
socket.on('chat', data=>read(data));

var messagesArea = document.getElementById('messagesArea');
var textEdit = document.getElementById('textEdit');
messagesArea.scrollTop = messagesArea.scrollHeight;

function sendMessage() {
    let data = {
        student_id: "15018",
        text: textEdit.value,
        nick: 'Chac'
    }

    socket.emit('message', data);
    createMsg(data);
    messagesArea.scrollTop = messagesArea.scrollHeight;
    textEdit.value = "";
}


function read(data) {
    let flag = messagesArea.scrollTop + messagesArea.offsetHeight == messagesArea.scrollHeight;
    let scrollTop = messagesArea.scrollTop;

    messagesArea.innerHTML = "";

    // var ran = Math.floor(Math.random() * 100 + 1);
    for (let i = 0; i < data.length; i++) {
        if (!colors.hasOwnProperty(data[i].student_id)) {
            colors[data[i].student_id] = [
                Math.floor(Math.random() * 125 + 125),
                Math.floor(Math.random() * 215 + 40),
                Math.floor(Math.random() * 215 + 40)];
        }
        createMsg(data[i]);
    }

    messagesArea.scrollTop = flag ? messagesArea.scrollHeight : scrollTop;
}

function createMsg(msg) {
    let box = document.createElement('DIV');
    let info = document.createElement('P');
    let color = colors[msg.student_id];
    info.style.color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    box.appendChild(info);
    info.innerHTML = msg.nick + "<br>Says: " + msg.text;
    document.getElementById('messagesArea').appendChild(box);
}
