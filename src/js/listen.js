import {serConect,serSend} from './ser';
import {renderImg,deliteImg,imgSet} from './render';

export default () => {

    document.addEventListener("click", e => {

        if (e.target.classList.contains("knopkaAuth")) {

            var fio = document.querySelector('input[name=fio]').value;
            var nick = document.querySelector('input[name=nick]').value;

            if (fio=="") {
                document.querySelector('.errorAuth').innerHTML = "Введите ФИО";
                return;
            }else if (nick=="") {
                document.querySelector('.errorAuth').innerHTML = "Введите ваш ник";
                return;
            }

            serConect(fio)

        }

        if (e.target.classList.contains("send")) {
            senr();
        }

        if (e.target.classList.contains("imgLogo")) {
            renderImg();
        }
        if (e.target.classList.contains("imgOtmena")) {
            deliteImg();
        }
        if (e.target.classList.contains("imgSet")) {
            imgSet();
        }

    });

    document.onkeyup = function (e) {
        if (e.keyCode === 13) {
            if (e.target.classList.contains("senderInput")) {
                senr();
            }
        }
    }


}

var senr = () => {
    var input = document.querySelector('input[name=sender]')
    var text = input.value;
    if (text==="") return;
    input.value="";
    
    serSend({text,msg:1})
}


