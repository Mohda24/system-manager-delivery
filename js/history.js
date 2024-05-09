window.onload = function() {
    displaydata();

};
function displaydata(){
    xml = new XMLHttpRequest();
    xml.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data=JSON.parse(this.responseText)
            let mydata=""
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
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0">${element["prix"]} Dh</span></td>
                        <td><span class=" border border-1 border-primary border-start-0 border-end-0 last">${element["seller"]}</span></td>
                        
                </tr>`
            });
            tbody.innerHTML=mydata


            

        }

    };
    xml.open("GET",`./config/history.php`);
    xml.send();
    
}

function mohda(){
    let date= document.querySelector(".date").value
    console.log(date);
}
document.querySelector(".date").addEventListener("change", mohda);