var $ = function(obj){ return document.querySelector(obj); };
var itms = function(obj){ return document.querySelectorAll(obj); };
var iface = {
    ready: function(){
        document.addEventListener("deviceready",iface.init, false);
    },
    init: function(){
        //localStorage.clear();
        login.init();
        var cats = itms('section#summary article .main-menu li.active');
        for(i=0;i<cats.length;i++)
            cats[i].addEventListener('click',iface.showList,false);
        var backs = itms('.page header button');
        for(i=0;i<backs.length;i++)
            backs[i].addEventListener("click",iface.hideList,false);
    },
    showList: function(e){
        var selector = e.currentTarget.getAttribute('rel');
        $(selector).classList.remove('back');
        $(selector).classList.add('enter');
    },
    hideList: function(e){
        var sel = e.currentTarget.getAttribute('rel');
        $(sel).classList.add('back');
        $(sel).classList.remove('enter');
    }
};
var login = {
    init: function(){
        $('#sendLogin').addEventListener('click',login.sendLogIn);
        if(login.isLogged())
            login.leaveLogin('section#login');
    },
    sendLogIn: function(e){
        var usr = $('#user').value;
        var pss = $('#pass').value;
        if(usr != '' && pss != '')
            login.loginSent(1);
        
        return false;
    },
    loginSent: function(msg){
        if(msg == 1){
            localStorage.setItem("usr", $('#user').value);
            localStorage.setItem("pss", $('#pass').value);
            
            login.leaveLogin('section#login');
        }else{
            alert("Error en los datos. ¡Varifique sus datos!");
        }
    },
    isLogged: function(){
        if(localStorage.getItem("usr") != undefined && localStorage.getItem("pss") != undefined) return true;
        else return false;
    },
    leaveLogin: function(obj){
        $(obj).classList.remove('enter');
        $(obj).classList.add('leave');
    }
};
window.addEventListener("load",iface.init,false);