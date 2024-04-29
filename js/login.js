function login(){
    User=document.querySelector(".User").value;
    Password=document.querySelector(".Password").value;
    var data = {
        user: User,
        password: Password
        };
        let mydata=JSON.stringify(data)
    xml = new XMLHttpRequest();
    xml.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
        // data=JSON.parse(this.responseText)
        if(this.responseText=="correct data"){
            window.location.href ="Home.php"

        }
        else{
            error=document.querySelector(".error")
            error.innerHTML=this.responseText
            error.classList.add("alert");
            error.classList.add("alert-danger");
        }

    }
    
};
xml.open("POST","./config/login_config.php");
xml.setRequestHeader("Content-Type","application/json");
xml.send(mydata);

}
