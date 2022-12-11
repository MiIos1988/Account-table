// // VIEWS
// let accountsView = document.querySelector('#accounts-view');
// let addAccountsView = document.querySelector('#add-accounts-view');
// let editDeleteView = document.querySelector('#edit-delete-view');
// let editAccountView = document.querySelector('#edit-account-view');
// let allViews = [accountsView,addAccountsView,editDeleteView,editAccountView];

// // INPUTS
// let idInput = addAccountsView.querySelector('input[name="id"]');
// let fullNameInput = addAccountsView.querySelector('input[name="fullName"]');
// let emailInput = addAccountsView.querySelector('input[name="email"]');
// let phoneInput = addAccountsView.querySelector('input[name="phone"]');
// let cityInput = addAccountsView.querySelector('input[name="city"]');
// // INPUT from edit-account-view
// let eidInput = editAccountView.querySelector('input[name="id"]');
// let efullNameInput = editAccountView.querySelector('input[name="fullName"]');
// let eemailInput = editAccountView.querySelector('input[name="email"]');
// let ephoneInput = editAccountView.querySelector('input[name="phone"]');
// let ecityInput = editAccountView.querySelector('input[name="city"]');

// let accountsTbody = accountsView.querySelector('tbody');
// let editDeleteTbody = editDeleteView.querySelector('tbody');
// // BTNS
// let saveBtn = document.querySelector('#saveBtn');
// let editBtn = document.querySelector('#editBtn');
// // / LINKS
// let links = document.querySelectorAll('.links');
// // LISTENERS

// links.forEach(link => link.addEventListener('click',displayView));
// saveBtn.addEventListener('click',saveNewAccount);
// editBtn.addEventListener('click',editAccount);

// function editAccount(){
//   let newValues = {
//         id: eidInput.value,
//         fullName : efullNameInput.value,
//         email : eemailInput.value,
//         phone : ephoneInput.value,
//         city : ecityInput.value
//   }
//   // ???
//   let index = database.findIndex(e => e.id === editBtn.getAttribute('data-id'));
//   database[index] = newValues;
//   createTable();
//   displayView('accounts-view');
// }

// function displayView(e){
//   let view = e; // "account-view" edit-delete-view - edit-account-view
//   if(e.type === "click"){
//     e.preventDefault();
//     view = this.getAttribute('href');
//   }

//   allViews.forEach(v => v.style.display = "none");
//   links.forEach(link => link.classList.remove('active'));
//   try {
//     document.querySelector(`a[href="${view}"]`).classList.add('active');
//   }catch (e){
//      document.querySelector(`a[href="edit-delete-view"]`).classList.add('active');
//   }

//   document.querySelector(`#${view}`).style.display = "block";
//   if(view === 'edit-delete-view'){
//     createTable(editDeleteTbody)
//   }
// }

// function saveNewAccount(){
//   let userData = {
//     id: idInput.value,
//     fullName : fullNameInput.value,
//     email : emailInput.value,
//     phone : phoneInput.value,
//     city : cityInput.value
//   }
//   database.push(userData);
//   createTable()
//   clearInputs(idInput,fullNameInput,emailInput,phoneInput,cityInput);
//   displayView('accounts-view');
// }

// function clearInputs(){
//   for (let i = 0; i < arguments.length; i++) {
//     const input = arguments[i];
//     input.value = "";
//   }
// }

// //createTable
// createTable(); // main table

// function createTable(body){
//   let addon  = ``;
//   if(body){
//     addon += `
//     <td>
//       <button class="btn btn-sm btn-warning editBtn" data-id="{{id}}">Edit</button>
//       <button class="btn btn-sm btn-danger deleteBtn" data-id="{{id}}">Delete</button>
//     </td>
//     `.trim()
//   }
//     let text = ``;
//     database.forEach((user,index) => {
//         text += `
//           <tr>
//             <td>${user.id}</td>
//             <td>${user.fullName}</td>
//             <td>${user.email}</td>
//             <td>${user.phone}</td>
//             <td>${user.city}</td>
//             ${(addon) ? addon.replace('{{id}}',user.id).replace('{{id}}',user.id) : ""  }
//         </tr>
//        `.trim()
//     });
//     (addon) ? editDeleteTbody.innerHTML = text : accountsTbody.innerHTML = text;
//     if(addon){
//       let allDeleteBtns = document.querySelectorAll('.deleteBtn');
//       let allEditBtns = document.querySelectorAll('.editBtn');
//       allDeleteBtns.forEach((btn,index) => {
//         btn.addEventListener('click',deleteAccount);
//         allEditBtns[index].addEventListener('click',showEditForm);
//       })
//     }
// }

// function showEditForm(){

//   // popunimo ???
//   let id = this.getAttribute('data-id');
//   editBtn.setAttribute('data-id',id);
//   let currentUser = database.find(e => e.id === id);
//   eidInput.value = currentUser.id;
//   efullNameInput.value = currentUser.fullName;
//   eemailInput.value = currentUser.email;
//   ephoneInput.value = currentUser.phone;
//   ecityInput.value = currentUser.city;

//   displayView('edit-account-view');
// }

// function deleteAccount(){
//   let id = this.getAttribute('data-id')
//   database = database.filter(el => el.id !== id)
//   createTable()
//   displayView('accounts-view')
// }

// *****************************************************************//
let navbarLinks = document.querySelectorAll(".navbarLink a");
let accountsView = document.getElementById("accounts-view");
let accountsViewTBody = accountsView.querySelector("tbody");
let addAccountsView = document.getElementById("add-accounts-view");
let editDeleteView = document.getElementById("edit-delete-view");
let editDeleteViewTBody = editDeleteView.querySelector("tbody");
let addAccountsViewInputs = addAccountsView.querySelectorAll(
  ".addAccountsViewInputs input"
);
let editAccountsViewInputs = document.querySelectorAll(
  ".editAccountsViewInputs input"
);
// const form = document.querySelector("#form")
let id;

const saveAddAccount = document.getElementById("saveBtn");
const editAccountBtn = document.getElementById("editBtn");

const allView = [accountsView, addAccountsView, editDeleteView];

// listener
navbarLinks.forEach((link) => {
  link.addEventListener("click", displayView);
});
saveAddAccount.addEventListener("click", addAccount);
editAccountBtn.addEventListener("click", editAccount);

function addAccount() {
  let newUser = {};
  addAccountsViewInputs.forEach((input) => {
    newUser[input.name] = input.value;
  });
  database.push(newUser);
  createTable();
  clearInputs();
  displayView("accounts-view");
}
function editAccount() {
  let editUser = {};
  editAccountsViewInputs.forEach((input) => {
    editUser[input.name] = input.value;
  });
  database.splice(id, 1, editUser);
  createTable();
  displayView("accounts-view");
}

function clearInputs() {
  addAccountsViewInputs.forEach((input) => {
    input.value = "";
  });
}

function displayView(e) {
  let view = e;
  if (e.type === "click") {
    e.preventDefault();
    // this.classList.add("active");
    view = this.getAttribute("href");
  }
  navbarLinks.forEach((link) => link.classList.remove("active"));
  try {
    document.querySelector(`a[href="${view}"]`).classList.add("active");
  } catch {
    document
      .querySelector(`a[href="edit-delete-view"]`)
      .classList.add("active");
  }

  allView.forEach((v) => {
    v.style.display = "none";
  });

  document.querySelector(`#${view}`).style.display = "block";

  if (view === "edit-delete-view") {
    createTable(editDeleteViewTBody);
  }
}
createTable();

function createTable(body) {
  let text = ``;
  //  else {
  //   addBtn = ``;
  // }
  database.forEach((data) => {
    let addBtn = ``;
    if (body) {
      addBtn += `
      <button id="${data.id}" class="btn btn-warning btnEdit " >Edit</button>
      <button id="${data.id}" class="btn btn-danger btnDelete">Delete</button>
      `.trim();
    }
    text += `
                    <tr>
                      <td>${data.id}</td>
                      <td>${data.fullName}</td>
                      <td>${data.email}</td>
                      <td>${data.phone}</td>
                      <td>${data.city}</td>
                      <td> ${addBtn}</td>
                    </tr>
      `.trim();
  });
  if (!body) {
    accountsViewTBody.innerHTML = text;
  } else {
    body.innerHTML = text;
    body.querySelectorAll(".btnDelete").forEach((btn) => {
      btn.addEventListener("click", () => deleteAccount(btn.id));
    });
    body.querySelectorAll(".btnEdit").forEach((btn) => {
      btn.addEventListener("click", () => editAccountField(btn.id));
    });
  }
}

function deleteAccount(id) {
  // let id = this.id;
  const index = database.findIndex((e) => e.id === id);
  database.splice(index, 1);
  createTable();
  displayView("accounts-view");
}
function editAccountField(id) {
  // id = this.id;
  console.log(database);
  let currentUser = database.find((e) => e.id === id);
  const fields = Object.keys(currentUser);
  // editAccountsViewInputs[0].value = currentUser.id;
  // editAccountsViewInputs[1].value = currentUser.fullName;
  // editAccountsViewInputs[2].value = currentUser.email;
  // editAccountsViewInputs[3].value = currentUser.phone;
  // editAccountsViewInputs[4].value = currentUser.city;
  // editAccountsViewInputs.forEach((input) => {
  //   input.value = currentUser.city;
  // });
  for (const field of fields) {
    const inputField = document.getElementsByName(field)[1];
    inputField.value = currentUser[field];
    console.log(inputField);
  }
  displayView("edit-account-view");
}
