// dsiplay data
window.onload = function() {
    displaydata();
    populateSellers(".form select.seller");
    populateSellers(".offcanvas .seller select");
};
// Delete Alert
function deletealert(){
    let prob = document.querySelector(".offcanvas .prob_modify");
    prob.innerHTML = "";
    prob.classList.remove("alert", "alert-danger", "text-center", "p-2");

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
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0 last">
                        <i class="fa-solid fa-pen-to-square fs-5 text-primary" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" onclick="update(${element["id_client"]})"></i>
                        <a href="#" data-bs-toggle="modal" data-id="${element["id_client"]}"data-bs-target="#delete" onclick="AreDelete(${element["id_client"]})">
                        <i class="fa-solid fa-trash ms-2 me-1 text-danger fs-5"></i>
                        </a>
                        </span></td>
                </tr>`
            });
            tbody.innerHTML=mydata
            totalAmont();
            populateSellers()
            

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
// function of show data in off canvas
function update(elem){
    let xml = new XMLHttpRequest();
    xml.onload=function(){
        if(this.status===200){
            data=JSON.parse(this.responseText)
            console.log(data);
            document.querySelector(".offcanvas .name input").value=data.nom_client;
            document.querySelector(".offcanvas .tel input").value=data.tel_client;
            document.querySelector(".offcanvas .Adresse input").value=data.adres_client;
            document.querySelector(".offcanvas .Qnt input").value=data.Qnt;
            document.querySelector(".offcanvas .statu select").value=data.statu;
            document.querySelector(".offcanvas .Prix input").value=data.prix;
            document.querySelector(".offcanvas select.seller").value=data.seller;
            document.querySelector(".offcanvas .id_client").value=data.id_client;
            

        }
    }
    
    xml.open("GET","./config/update.php?id="+elem+"&table=clients")
    xml.send();
}
function modify(){
    let id =document.querySelector(".offcanvas .id_client").value;
    let nom_client=document.querySelector(".offcanvas .name input").value;
    let tel_client=document.querySelector(".offcanvas .tel input").value;
    let adres_client=document.querySelector(".offcanvas .Adresse input").value;
    let Qnt=document.querySelector(".offcanvas .Qnt input").value;
    let statu=document.querySelector(".offcanvas .statu select").value;
    let prix=document.querySelector(".offcanvas .Prix input").value;
    let seller=document.querySelector(".offcanvas select.seller").value;
    if(!nom_client || !tel_client || !adres_client || ! Qnt || ! statu || ! prix || ! seller){
        let prob=document.querySelector(".offcanvas .prob_modify")
        prob.innerHTML="Please fill in all required fields"
        prob.classList.add("alert")
        prob.classList.add("alert-danger")
        prob.classList.add("text-center")
        prob.classList.add("p-2")
        return;
    }
    var mydata = {
        id:id,
        nom_client:nom_client,
        tel_client:tel_client,
        adres_client:adres_client,
        Qnt:Qnt,
        statu:statu,
        prix:prix,
        seller:seller
        };
        let data=JSON.stringify(mydata)
    xml = new XMLHttpRequest();
    xml.open("POST","./config/modify.php");
    xml.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            displaydata();
            hideOffcanvas()

            
            
        }}
xml.setRequestHeader("Content-Type","application/json");
xml.send(data);

}

// function of delete
function AreDelete(arg) {
    btn = document.getElementById("confirmDeleteBtn");
    btn.addEventListener("click", function() {
        Delete(arg);
    });
}

// function of delete
function Delete(x){
    let xml = new XMLHttpRequest();
    data=JSON.stringify([x])
    xml.open("Delete","./config/delete.php")
    xml.onload=function(){
        if(this.status==200){
            displaydata();
            let modal = document.getElementById("delete");
            let modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
        }

    }
    
    xml.setRequestHeader("Content-Type","application/json");
    xml.send(data)

}
// fUNction of hide offcanvas
function hideOffcanvas() {
    var offcanvasElement = document.getElementById('staticBackdrop');
    var offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    offcanvas.hide();
}

// get sellers
// Function to fetch sellers data and populate the select element
function populateSellers(arg) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './config/get_sellers.php', true);
    xhr.onload = function() {
        if (xhr.status == 200) {
            var sellers = JSON.parse(this.responseText);
            console.log(sellers);
            var select = document.querySelector(arg)

            // Clear existing options
            select.innerHTML = '';

            // Add "Unkonu" option manually
            var unkonu = document.createElement('option');
            unkonu.value = 'Unkonu';
            unkonu.textContent = 'Unkonu';
            select.appendChild(unkonu);

            // Populate select with fetched data
            sellers.forEach(function(seller) {
                var option = document.createElement('option');
                option.value = seller. seller_nom;
                option.textContent = seller. seller_nom;
                select.appendChild(option);
            });
        }
    };
    xhr.send();
}





