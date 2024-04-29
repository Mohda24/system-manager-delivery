// dsiplay data
window.onload = function() {
    displaydata();
};
// menu
// Menu Toggle
let menu = document.querySelector(".tagle");
let aside = document.querySelector("aside");
let main = document.querySelector("main");

menu.onclick = function () {
  aside.classList.toggle("active");
  main.classList.toggle("active");
};
// get total
function totalAmont(){
    xml = new XMLHttpRequest();
    xml.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data=JSON.parse(this.response)
            total=document.querySelector(".total")
            total_r=document.querySelector(".total_r")
            total_l=document.querySelector(".total_l")
            if (data.total==null){
                data.total=0}
            if(data.total_r==null){
                data.total_r=0
            }
            if(data.total_l==null){
                data.total_l=0
            }
            total.innerHTML=data.total+" Dh";
            total_r.innerHTML=data.total_r
            total_l.innerHTML=data.total_l
        }

    };
    xml.open("POST","./config/total.php");
xml.setRequestHeader("Content-Type","application/json");
    xml.send();
    
}

function displaydata(){
    xml = new XMLHttpRequest();
    xml.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data=JSON.parse(this.responseText)
            let mydata=`<tr class="form">
            <form action="" method="POST">
                <td>
                    <input type="text" name="name" class="name" placeholder="name" required>
                </td>
                <td>
                    <input type="text" name="tel" class="tel" placeholder="tel" required>
                </td>
                <td>
                    <input type="text" name="adresse" class="adresse" placeholder="adresse" required>
                </td>
                <td>
                    <input type="number" name="qnt" class="qnt" placeholder="Qnt" required>
                </td>
                <td>
                    <select name="statu" class="statu">
                        <option selected value="en coeur">en coeur</option>
                        <option value="Livré">Livré</option>
                        <option value="retourné">retourné</option>
                    </select>
                </td>
                <td>
                    <input type="number" name="prix" class="prix" placeholder="Qnt" required>
                </td>
                <td>
                <select name="seller" class="seller">
                        <option selected value="Unkonu">Unkonu</option>
                    </select>
                </td>
                <td>
                    <button name="submit" onclick="insert()" type="button" class="submit"><i class="fa-solid fa-plus"></i></button>
                </td>
            </form>
        </tr>`
            const tbody=document.querySelector("table tbody")
            data.forEach(element => {
                if(element["statu"]=="en coeur"){
                    type="text-black-50"
                }else if(element["statu"]=="Livré"){
                    type="text-success"
                }else{
                    type="text-danger"
                }
                mydata+=`
                <tr class="data">
                        <td><span class="first border border-1 border-primary border-end-0">${element["nom_client"]}</span></td>
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0">${element["tel_client"]}</span></td>
                        <td><span class="border border-1 border-primary border-start-0 border-end-0">${element["adres_client"]}</span></td>
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0">${element["Qnt"]}</span></td>
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0 fw-bold ${type}">${element["statu"]}</span></td>
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0">${element["prix"]}</span></td>
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0">${element["seller"]}</span></td>
                    </tr>`
            });
            tbody.innerHTML=mydata
            totalAmont();
            

        }

    };
    xml.open("POST","./config/display.php");
xml.setRequestHeader("Content-Type","application/json");
    xml.send();
    
}
// Insert Php
function insert(){
    let name=document.querySelector(".form .name").value;
    let tel=document.querySelector(".form .tel").value;
    let adresse=document.querySelector(".form .adresse").value;
    let qnt=document.querySelector(".form .qnt").value;
    let statu=document.querySelector(".form .statu").value;
    let prix=document.querySelector(".form .prix").value;
    let seller=document.querySelector(".form .seller").value;
    if(!name || !tel || !adresse || ! qnt || ! statu || ! prix || ! seller){
        return;
    }
    var mydata = {
        name:name,
        tel:tel,
        adresse:adresse,
        qnt:qnt,
        statu:statu,
        prix:prix,
        seller:seller
        };
        let data=JSON.stringify(mydata)
    xml = new XMLHttpRequest();
    xml.open("POST","./config/insert.php");
    xml.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            displaydata();
        }}
xml.setRequestHeader("Content-Type","application/json");
xml.send(data);
}
// logout function
function logout(){
     xml=new XMLHttpRequest();
    xml.onload=function(){
        if(this.status===200){
            window.location.href ="login.php";
        }else{
            alert("please Again")
        }
    }
    xml.open("GET","./config/logout.php")
    xml.send()

}

