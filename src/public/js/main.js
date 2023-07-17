
$(function () {
    
    const socket = io();
// obteniendo los elementos del DOM desde la interfaz
const $messageForm = $('#message-form');
const $messageBox = $('#message');
const $chat = $('#chat');

// obteniendo los elementos del DOM desde el NicknameForm 
const $nickForm = $("#nickForm");
const $nickError = $("#nickError");
const $nickname = $("#nickname");

// obtaining the usernames container DOM
const $users = $('#usernames');

$nickForm.submit(e => {
    e.preventDefault();
    socket.emit('new user', $nickname.val(), data => {
        if (data) {
            $('#nickWrap').hide();
             $('#contentWrap').show();
            } else {
                $nickError.html(`
                    <div class="alert alert-danger">
                      That username already exits.
                    </div>
                  `);
            }
            $nickname.val('');
    });
});
        // Eventos
$messageForm.submit( e => {
e.preventDefault();
socket.emit('send message', $messageBox.val());
$messageBox.val('');
return false;
});

socket.on('new message', function (data) {
    
  $chat.append('<b>' + data.nick + '</b>: ' + data.msg + '  ' + data.timestamp + '<br/>');  
    });
    socket.on('usernames', data => {
        let html = '';
    for (let i = 0; i < data.length; i++) {
        html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`
    }
    $users.html(html);
    });





    //Evento para el envío de imágenes
    const $imageBox = $('#image');

$messageForm.submit(e => {
  e.preventDefault();
  if ($imageBox[0].files.length > 0) {
    const reader = new FileReader();
    reader.onloadend = () => {
      socket.emit('send image', reader.result);
    };
    reader.readAsDataURL($imageBox[0].files[0]);
  } 
  $messageBox.val('');
  $imageBox.val('');
});

socket.on('new image', function (data) {
  $chat.append('<p><b>' + data.nick + '</b>:</p>');
  $chat.append('<img src="' + data.image + '" />');
});
socket.on('load old msgs', function (msgs) { 
  for (let i = msgs.length - 1; i >= 0; i--) { 
      $chat.append('<b>' + msgs[i].nick + '</b>: ' + msgs[i].msg + '  ' + msgs[i].timestamp + '<br/>'); 
  } 
}); 
});
