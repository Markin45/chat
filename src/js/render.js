import HbsIndex from '../hbs/index.hbs';
import HbsAuth from '../hbs/auth.hbs';
import HbsUser from '../hbs/user.hbs';
import HbsSender from '../hbs/sender.hbs';
import HbsMsg from '../hbs/msg.hbs';
import HbsImg from '../hbs/img.hbs';

import {idUser,serSendAllNewInfo} from './ser';

export var myFoto = "";

var arrAllUsers = [];

var app = document.getElementById("app");

export var renderBegin = () => {  // начало
    let context = {h1:"Добро пожаловать"};
    app.innerHTML = HbsIndex(context);
}

export var renderShowAuth = () => { // Auth
    let context = {};
    app.innerHTML = app.innerHTML + HbsAuth(context);
}
export var renderHideAuth = () => { // Auth - Hide
    let auth = document.querySelector('.auth');
    auth.remove()
}

export var renderUpdateUser = (fio, idUser,myFoto) => { // обновим список users

    if (!arrAllUsers.includes(idUser)) { // у нас нет такого idUser
        arrAllUsers.push(idUser);

        let countUser = document.getElementById('countUser');
        countUser.innerHTML = arrAllUsers.length

        let menu = document.querySelector('.menu');
        let context = {fio,idUser};
        menu.innerHTML = menu.innerHTML + HbsUser(context);
    }else{
        if (myFoto!=""){
            obnovAllFoto(idUser,myFoto);
        }
    }

}

export var renderShowSender = () => { // Sender
    let context = {};
    app.innerHTML = app.innerHTML + HbsSender(context);
}

export var renderNewMsg = (fio, text,idUser,myFoto) => { // Msg

    let Data = new Date();
    let Hour = Data.getHours();
    let Minutes = Data.getMinutes();

    let msg = document.querySelector('.msg');
    let context = {fio,text,time:Hour+":"+Minutes,idUser,myFoto};
    msg.innerHTML = msg.innerHTML + HbsMsg(context);

    msg.scrollTop = 9999;

}

export var renderImg = () => {
    let context = {};
    app.innerHTML = app.innerHTML + HbsImg(context);

    let dropArea = document.getElementById('dropArea');
    dropArea.addEventListener("dragover", e => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });
    dropArea.addEventListener("drop", e => {
        e.stopPropagation();
        e.preventDefault();

        let files = e.dataTransfer.files;
        if (files.length != 1) {
            alert('Перенесите один фаил')
            return;
        }

        let file = files[0];

        if (file.size>524288) {
            alert('Размер не должен привышать 512 кб.')
            return;
        }
        if (file.type != "image/jpeg") {
            alert('Загрузить можно только JPG фаил')
            return;
        }

        let fileReader = new FileReader();

        fileReader.readAsDataURL(file); 

        fileReader.onload = function(progressEvent) {
            let foto = document.getElementById('foto');
            dropArea.style.display = "none";
            foto.style.display = "block";
            foto.src = fileReader.result;
            myFoto = fileReader.result;
        }


    
    });

}

export var deliteImg = () => { // img - Hide
    let img = document.querySelector('.img');
    img.remove()
}

export var imgSet = () => {
    deliteImg();

    if (myFoto!="") {
        let oneImg = document.querySelector('.imgLogo');
        oneImg.src = myFoto;
        obnovAllFoto(idUser,myFoto);
        serSendAllNewInfo();
    }
}


var obnovAllFoto = (idUser,myFoto) => {

    let allImg = document.querySelectorAll('img');
    for (let oneImg of allImg) {
        if (oneImg.dataset.iduser == idUser) {
            oneImg.src = myFoto;
        };
    };

}



