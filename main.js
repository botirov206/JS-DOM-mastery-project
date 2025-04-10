const heading = document.createElement("h2"); // Creates a H2 element
heading.textContent = "Sign up" || "Login"; // kind of giving text content of the heading wether it is sign up or login
heading.style.textAlign = "center"; // styles the text to the center 

// creates arrays for labels and types of inputs
const labels = ["Username", "Email", "Password"];
const types = ["text", "email", "password"];

// styles for the input fields
const inputStyle = {
  padding: "5px",
  border: "1px solid grey",
  borderRadius: "5px",
  marginBottom: "8px",
};

// form
const form = document.createElement("form"); // creates
form.appendChild(heading);
form.classList.add("form");
form.addEventListener("submit", handleSbmit);

// function to give quick styles
function style(el, styles) {
  Object.assign(el.style, styles);
}

// function to create input fields and labels
function createInput(index) {
  const input = document.createElement("input");
  input.type = types[index];
  input.name = labels[index].toLowerCase();
  input.placeholder = `Enter your ${labels[index].toLowerCase()}...` ;
  style(input, inputStyle);
  return input;
}

// function to create labels
function createLabel(index) {
  const label = document.createElement("label");
  label.textContent = labels[index];
  label.style.marginBottom = "5px";
  return label;
}

// loop to create labels and inputs
for (let i = 0; i < labels.length; i++) {
  form.appendChild(createLabel(i));
  form.appendChild(createInput(i));
}

// array to store user data
const users = [];
let obj = {};

// function to handle form submission
function handleSbmit(event) {
  event.preventDefault();
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    obj[input.name] = input.value;
  });

  users.push({ ...obj });
  console.log(users);
}

// submit button
const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Submit";
submitButton.classList.add("button");

// appending the submit button to the form and the form to the body
form.appendChild(submitButton);
document.body.appendChild(form);



const table = document.createElement("table"); 
const tableHeader = document.createElement("thead"); 
const tableBody = document.createElement("tbody");
const tableFooter = document.createElement("tfoot"); 
const headerRow = document.createElement("tr");
const tableH = document.createElement("th");
const tableD = document.createElement("td");
// Create table headers using labels array
labels.forEach(label => {
    const th = document.createElement("th");
    th.textContent = label;
    headerRow.appendChild(th);
});

tableHeader.appendChild(headerRow);
table.appendChild(tableHeader);
document.body.appendChild(table);



function updateTable() {
    const row = document.createElement("tr");
    labels.forEach(label => {
        const td = document.createElement("td");
        td.textContent = obj[label.toLowerCase()];
        row.appendChild(td);
    });
    tableBody.appendChild(row);
    table.appendChild(tableBody);
}

form.addEventListener("submit", () => {
    updateTable();
});

// Modify your handleSubmit function:
function handleSbmit(event) {
    event.preventDefault();
    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
        obj[input.name] = input.value;
    });

    users.push({ ...obj });
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(users));
    console.log(users);
}

// Add this function to load data from localStorage and populate the table
function loadSavedData() {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        users.push(...parsedData); // Update users array with saved data
        
        // Populate table with saved data
        parsedData.forEach(userData => {
            const row = document.createElement("tr");
            labels.forEach(label => {
                const td = document.createElement("td");
                td.textContent = userData[label.toLowerCase()];
                row.appendChild(td);
            });
            tableBody.appendChild(row);
        });
        table.appendChild(tableBody);
    }
}

// Call loadSavedData when the page loads
document.addEventListener('DOMContentLoaded', loadSavedData);
