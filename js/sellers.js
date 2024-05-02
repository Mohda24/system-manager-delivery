// dsiplay data
window.onload = function() {
    displaydata();
};
// insert
function insert(){
    let name=document.querySelector(".form .name").value;
    let tel=document.querySelector(".form .tel").value;
    let adresse=document.querySelector(".form .adresse").value;
    let tarif=document.querySelector(".form .tarif").value;
    let type=document.querySelector(".form .type").value;
    if(!name || !tel || !adresse || ! tarif|| ! type ){
        return;
    }
    var mydata = {
        name:name,
        tel:tel,
        adresse:adresse,
        tarif:tarif,
        type:type,
        };
        let data=JSON.stringify(mydata)
    xml = new XMLHttpRequest();
    xml.open("POST","./config/sellers.php");
    xml.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            displaydata();
        }}
xml.setRequestHeader("Content-Type","application/json");
xml.send(data);
}

// display
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
                    <input type="number" name="tarif" min="0" class="tarif" placeholder="tarif" required>
                </td>
                <td>
                    <select name="type" class="type">
                        <option selected value="grand taille">grand taille</option>
                        <option value="medium taille">medium taille</option>
                        <option value="petit taille">petit taille</option>
                    </select>
                </td>
                <td>
                    <button name="submit" onclick="insert()" type="button" class="submit"><i class="fa-solid fa-plus"></i></button>
                </td>
            </form>
        </tr>
        `
            const tbody=document.querySelector("table tbody")
            data.forEach(element => {
                mydata+=`
                <tr class="data">
                        <td><span class="first border border-1 border-primary border-end-0">${element["seller_nom"]}</span></td>
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0">${element["seller_tell"]}</span></td>
                        <td><span class="border border-1 border-primary border-start-0 border-end-0">${element["seller_adres"]}</span></td>
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0">${element["tarif"]} Dh</span></td>
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0 fw-bold text-capitalize">${element["type_colis"]}</span></td>
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0 last">
                        <i class="fa-solid fa-pen-to-square fs-5 text-primary" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" onclick="update(${element["id_seller"]})"></i>
                        <a href="#" data-bs-toggle="modal" data-id="${element["id_seller"]}"data-bs-target="#delete" onclick="AreDelete(${element["id_seller"]})">
                        <i class="fa-solid fa-trash ms-2 me-1 text-danger fs-5"></i>
                        </a>
                        </span></td>
                </tr>`
            });
            tbody.innerHTML=mydata
            totalAmont();
            

        }

    };
    xml.open("GET","./config/sellers.php");
    xml.send();
    
}
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
// function of show data in off canvas
function update(elem){
    let xml = new XMLHttpRequest();
    xml.onload=function(){
        if(this.status===200){
            data=JSON.parse(this.responseText)
            console.log(data);
            document.querySelector(".offcanvas .name input").value=data.seller_nom;
            document.querySelector(".offcanvas .tel input").value=data.seller_tell;
            document.querySelector(".offcanvas .Adresse input").value=data.seller_adres;
            document.querySelector(".offcanvas .tarif input").value=data.tarif;
            document.querySelector(".offcanvas .type select").value=data.type_colis;
            document.querySelector(".offcanvas .id_seller").value=data.id_seller;

            

        }
    }
    
    xml.open("GET","./config/update.php?id="+elem+"&table=sellers")
    xml.send();
}
// modify 
function modify(){
    let id =document.querySelector(".offcanvas .id_seller").value;
    let seller_nom=document.querySelector(".offcanvas .name input").value;
    let seller_tell=document.querySelector(".offcanvas .tel input").value;
    let seller_adres=    document.querySelector(".offcanvas .Adresse input").value;
    let tarif=document.querySelector(".offcanvas .tarif input").value;
    let type_colis=document.querySelector(".offcanvas .type select").value;
    if(!seller_nom || !seller_tell || !seller_adres || ! tarif || ! type_colis){
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
        seller_nom:seller_nom,
        seller_tell:seller_tell,
        seller_adres:seller_adres,
        tarif:tarif,
        type_colis:type_colis,
        };
        let data=JSON.stringify(mydata)
    xml = new XMLHttpRequest();
    xml.open("PUT","./config/sellers.php");
    xml.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            displaydata();
            hideOffcanvas()

            
            
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
// Delete Alert
function deletealert(){
    let prob = document.querySelector(".offcanvas .prob_modify");
    prob.innerHTML = "";
    prob.classList.remove("alert", "alert-danger", "text-center", "p-2");

};
function hideOffcanvas() {
    var offcanvasElement = document.getElementById('staticBackdrop');
    var offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    offcanvas.hide();
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
    xml.open("DELETE","./config/sellers.php?id="+x)
    xml.onload=function(){
        if(this.status==200){
            displaydata();
            let modal = document.getElementById("delete");
            let modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
        }

    }
    

    xml.send()

}
