const USER_URL = "http://localhost:3000/users"
const table =document.querySelector("#utilisateurs");
const form = document.querySelector("form");


//utilisation de regex101
const user_checker = {
    first: /^[A-Za-z-]+$/, //prénom
    last:/^[A-Za-z-]+$/, //nom
    email:/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,4}$/, //email
    company:/^[A-Za-z- ]+$/, //entreprise
    country:/^[A-Za-z- ]+$/ //pays
};


/**
 * fetch and refresh users 
 * 
 */
const get_users = () => fetch("USER_URL")
    .then(res => res.json())
    .then(json => {
        refreshTable();
    });

const refreshTable= users => {
    table.innerHTML = "";
    for(let user of users)
    {
       let row = document.createElement("tr");
       row.innerHTML = `
        <td>${user.first}</td>
        <td>${user.last}</td>
        <td>${user.email}</td>
        <td>${user.company}</td>
        <td>${user.country}</td>
        <td>${user.created_at}</td>
       `;
       table.appendChild(row);
    }
    
};


form.addEventListener("submit", event =>{
    let rawdata = new FormData(form);
    let data = {};
    rawdata.forEach((value, key) => {
        //error on given info
        if(value.match(user_checker[key]) == null){
            document.getElementById("error").innerHTML = "verif infos";
            event.preventDefault;
            return;
        }

        data[key] = value;
    

    });

    event.preventDefault();

    return add_user(data);

});


const add_user = user => fetch(USER_URL, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
}).then(get_users);