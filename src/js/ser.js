import {renderUpdateUser,renderHideAuth,renderShowSender,renderNewMsg,myFoto} from './render';

var socket, fio;
export var idUser;

export var serConect = (thisFio) => {
    fio = thisFio;
    socket = io.connect('http://localhost:8008');
    idUser = Date.now();

    socket.on('connecting', function () {
        console.log('Соединение...');
    });

    socket.on('connect', function () {
        console.log('Соединение установленно!');

        serSend({ needUpdateAllUser:1 }) // запрос чтобы все обновили свой список юзеров

    });

    socket.on('message', function (data) {
        console.log(data);

        if (data.hasOwnProperty('needUpdateAllUser')) { // Отправляю всем свои даные
            serSendAllNewInfo();
        } else if (data.hasOwnProperty('myInfo')) { // ктото прислал свои даные - обновим их у себя
            renderUpdateUser(data.fio,data.idUser,data.myFoto)
        } else if (data.hasOwnProperty('msg')) { // ктото прислал сообщение
            renderNewMsg(data.fio,data.text,data.idUser,data.myFoto)
        }


    });

    renderHideAuth()
    renderShowSender()
}

export var serSend = (obj) => {
    obj.fio = fio;
    obj.idUser = idUser;
    obj.myFoto = myFoto;
    socket.emit("message", obj);
}

export var serSendAllNewInfo = () => {
    socket.emit("message", {
        myInfo:1,
        fio,
        idUser,
        myFoto
    });
}



