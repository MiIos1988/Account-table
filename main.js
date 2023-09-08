let navbarLinks = document.querySelectorAll(".navbarLink a");
let accountsView = document.getElementById("accounts-view");
let accountsViewTBody = accountsView.querySelector("tbody");
let addAccountsView = document.getElementById("add-accounts-view");
let editDeleteView = document.getElementById("edit-delete-view");
let editAccountView = document.getElementById("edit-account-view");
let editDeleteViewTBody = editDeleteView.querySelector("tbody");
const msg = addAccountsView.querySelector(".msg")
const msgEdit = editAccountView.querySelector(".msgEdit")
let addAccountsViewInputs = addAccountsView.querySelectorAll(
  ".addAccountsViewInputs input"
);
let editAccountsViewInputs = document.querySelectorAll(
  ".editAccountsViewInputs input"
);
let idData;

const saveAddAccount = document.getElementById("saveBtn");
const editAccountBtn = document.getElementById("editBtn");
let newArrow = []
const allView = [accountsView, addAccountsView, editDeleteView, editAccountView];

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
  const find = database.findIndex(e => e.id === newUser.id)
  if (find === -1) {
    database.push(newUser);
    createTable();
    clearInputs();
    displayView("accounts-view");
    msg.innerText = ""
  } else {
    msg.innerText = "Id already exists"
  }

}
function editAccount() {
  let editUser = {};
  editAccountsViewInputs.forEach((input) => {
    editUser[input.name] = input.value;
  });

  const find = newArrow.findIndex(e => e.id === editUser.id)
  console.log(find)
  if (find === -1) {
    let index = database.findIndex(e => e.id === idData)
    database.splice(index, 1, editUser)
    createTable();
    displayView("accounts-view");
    msgEdit.innerText = ""
  } else {
    msgEdit.innerText = "Id already exists"
  }
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
  const index = database.findIndex((e) => e.id === id);
  database.splice(index, 1);
  createTable();
  displayView("accounts-view");
}
function editAccountField(id) {
  idData = id
  let currentUser = database.find((e) => e.id === id);
  const fields = Object.keys(currentUser);
  for (const field of fields) {
    const inputField = document.getElementsByName(field)[1];
    inputField.value = currentUser[field];
  }
  displayView("edit-account-view");
  newArrow = database.filter(e => {
    return e.id !== id
  })
}
