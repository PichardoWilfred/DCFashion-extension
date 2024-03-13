let row_state = [];
let new_rows = [];
let sold_items = [];

let currentDate = "";
let currentHour = "";

let location_detector_listener = 0;
let content_javascript = 0;
let select_bill_type = 0;

let billCSS = `
.bill-container {
    display: none;
}
.bill-container header {
    display: flex; 
    flex-direction: column; 
    align-items: center;
}
.bill-container .sub-header {
    display: flex; 
    justify-content: space-between;
    flex-wrap: wrap;
}
.bill-container .sub-header :is(.bill-type, .date-hour ) {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    
}
.bill-container .sub-header .bill-type {
    margin-right: 120px;
}
.bill-container .sub-header .date-hour {
    margin-left: auto;
}

.bill-container .sub-header .date-hour p {
    align-content: center;
    margin-left: auto;
    margin-bottom: 1rem;
}
.bill-container table tr:nth-last-child(2n) td {
    padding-bottom: 12px;
}
td.product-name {
    padding-right: 12px;
}
.bill-container header h1 {
    margin-bottom: 8px;
    margin-top: 28px;
}

.bill-container header .address {
    margin-top: 6px;
    margin-bottom: 0px;
    text-align: center;
}

.bill-container header .phone {
    margin-block: 8px;
}


.bill-container .sub-header #type-document {
    margin-left: 8px;
}

.bill-container .sub-header #bill-hour {
    /* margin-left: 8px; */
}

/* Styles for table */
.bill-container #bill {
    width: 100%;
    border-collapse: collapse;
}

.bill-container #bill thead th.product-name {
    text-align: start;
    padding-right: 18px;
}

.bill-container #bill thead th,
.bill-container #bill tbody td {
    text-align: start;
    padding-right: 10px;
}

.bill-container #bill tbody td.total {
    text-align: start;
}

.bill-container #bill tbody tr.total-row {
    border-top: 1px solid black;
}

.bill-container #bill tbody tr.total-row td.product-name {
    padding-top: 12px;
}

.bill-container #bill tbody tr.total-row td {
    padding-top: 12px;
}
@media print {
    @page {
        margin: 0;
    }
    .bill-container {
        display: block;
    }
}
`;

// bill structure
const bill_structure = `
<div class="bill-container" id="printable-bill">
<header>
    <h1>DC Fashion</h1>
    <p class="address">G6V7+8CJ, Av Manuelico Gonzalez, Villa González 51000</p>
    <p class="phone">+1 (829) 297-0170</p>
</header>
<div class="sub-header">
    <div class="bill-type">
        <p>Tipo de Documento:</p>
        <p id="type-document"></p>
    </div>
    <div class="date-hour">
        <p id="bill-date"></p> <span style="margin-inline: 8px">|</span> <p id="bill-hour"></p>
    </div>
</div>
<table class="table table-sm table-striped" id="bill">
    <thead>
        <tr>
            <th class="product-name">Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th class="total">Total</th>
        </tr>
    </thead>
    <tbody>
        <tr class="total-row">
            <td class="product-name">
                <b>MONTO TOTAL</b>
            </td>
            <td></td>
            <td></td>
            <td class="total" id="total-amount"></td>
        </tr>
    </tbody>
</table>
</div>
`;

function getCurrentTime() {
    const currentDate = new Date();

    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

    return formattedTime;
}

function getCurrentDate() {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    const currentDate = new Date();

    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    const formattedDate = `${dayOfWeek}, ${dayOfMonth} de ${month} ${year}`;

    return formattedDate;
}

const tag_finder = (text, tagType = 'span') => {
    let res = [];
    let elems = [...document.getElementsByTagName(tagType)];
    elems.forEach((elem) => {
        if(elem.innerHTML.includes(text)) {
            res.push(elem)
        }
    });
    return res;
}

function addRow() {
    // Get the reference to the table body
    const tableBody = document.getElementById('tableBody');
    // Create a new row
    const newRow = tableBody.insertRow();
    // Add cells to the new row
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    // Set content for the cells (you can replace these with your data)
    cell1.innerHTML = 'John Doe';
    cell2.innerHTML = '30';
}

const add_printing_function = () => {
    // getting the existing page_source
    const sale_button = document.querySelector("button.btn.btn-success.btn-block");
    const button_container = sale_button.parentElement;
    
    // inserting the print button
    const printing_button = document.createElement("button");
    printing_button.className += " btn-block btn btn-primary";
    printing_button.style.marginTop = "20px";
    printing_button.textContent = " Imprimir Factura";
    
    const icon = document.createElement("i");
    icon.className += " fas fa-print";
    
    printing_button.prepend(icon);
    button_container.appendChild(printing_button);

    // fill products
    // fill_tables();

    // Setting the default object as 'factura'
    // const option = document.querySelector('option[value="Factura"]');
    // const select = option.parentElement;
    // select.value = "Factura";

    // building the bill structure 
    const detail_container = document.querySelector(".col-sm-4");
    const card_body = detail_container.querySelectorAll(".card-body")[1];
    const btn = card_body.querySelector(".btn-block.btn.btn-primary");
    
    // billing event-listener
    printing_button.addEventListener("click", print_table); 

    const container_fluid = document.querySelector(".container-fluid"); 
    const invisible_row = document.createElement("div");
    invisible_row.className += " row";

    container_fluid.appendChild(invisible_row);
    // add the bill structure to the print desired element
    invisible_row.innerHTML = bill_structure;

    // SELECT THE better bill type
}
const print_table = () => {
    const table = document.querySelector("table");
    const rows = [];
    
    for (let i = 1; i < table.rows.length; i++) { // Loop through each row in the table
        const columns = table.rows[i].cells; // Get the columns of the current row
        const item_information = { // Create an object to store the row data 
            name: columns[1].innerText,
            quantity: parseInt(columns[2].innerText),
            price: parseInt(columns[3].innerText),
            amount: parseInt(columns[4].innerText),
        };
        rows.push(item_information); // Push the row data to the array
    }
    sold_items = JSON.parse(JSON.stringify( rows ));
    new_rows = [...table.rows].splice(1, table.rows.length);

    // getting necessary data out of the rows.
    new_rows.map((row, index) => {
        row.removeChild(row.firstElementChild);
    });

    // row container
    const row_container = document.querySelector(".col-sm-4");
    const bill_table = document.querySelector("table#bill");
    
    const tbody = bill_table.querySelector("tbody");
    
    new_rows.map((table_row, index) => {
        // tbody.appendChild(table_row);
        tbody.insertBefore(table_row, tbody.firstChild);
    });
    

    const table_total_amount = tag_finder('Total:', 'span')[1].nextSibling.value;
    const table_type = tag_finder('Tipo:', 'span')[0].nextSibling.value;

    const total_amount = document.querySelector("td#total-amount");
    total_amount.innerHTML = table_total_amount;

    const bill_type = document.querySelector("p#type-document");
    bill_type.innerHTML = table_type;


    const bill_date = document.querySelector("p#bill-date");
    const bill_hour = document.querySelector("p#bill-hour");
    // 
    bill_date.innerHTML = getCurrentTime();
    bill_hour.innerHTML = getCurrentDate();

    content_javascript = setTimeout(() => {
        printJS({ 
            printable: 'printable-bill', 
            type: 'html', 
            style: billCSS, 
            maxWidth: 500, 
            repeatTableHeader: false, 
            scanStyles: false, 
            header: ''
        });
    }, 0);
}

const fill_tables = () => {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = `
    <tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Blanco con Negro, Size 9, 7</td><td>2</td><td>4375</td><td>8750</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Caqui</td><td>1</td><td>1790</td><td>1790</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Lentes</td><td>1</td><td>100</td><td>100</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Blanco con Negro, Size 9, 7</td><td>2</td><td>4375</td><td>8750</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>BMW Motorsport Blanca, Size 10</td><td>1</td><td>2390</td><td>2390</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Blanco, Negro 5 (1/2), 6 (1/2)</td><td>1</td><td>3950</td><td>3950</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Negra con Blanco, size 6 </td><td>1</td><td>2350</td><td>2350</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Negra con Blanco, size 6 </td><td>1</td><td>2350</td><td>2350</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Blanco con Negro, Size 9, 7</td><td>1</td><td>4375</td><td>4375</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Blanco, Blanco y Negro, Size 9.5, 9</td><td>1</td><td>3790</td><td>3790</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Blanco y Azul con Crema 12 (1/2) C,</td><td>1</td><td>4500</td><td>4500</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Blanco con Negro, Size 9, 7</td><td>1</td><td>4375</td><td>4375</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Caqui</td><td>1</td><td>1790</td><td>1790</td></tr>
    `;
}

const removeListeners = function() {
}

//message listener for background
// detect in which rout we are to made the corresponding changess
const detect_location = (pathname) => {
    let url = new URL(window.location.href);

    if (url.pathname.endsWith(pathname)) {
        add_printing_function();
    }
} 
window.onload = function() {
    detect_location("/venta");
}

window.navigation.addEventListener("navigate", (event) => { 
    location_detector_listener = setTimeout(() => {
        detect_location("/venta"); 
    }, 0);
}); 

//on init perform based on chrome storage value
// window.addEventListener("DOMContentLoaded", );