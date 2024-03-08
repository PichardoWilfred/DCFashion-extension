let row_state = [];
let location_detector_listener = 0;
let sold_items = [];

// bill structure
const bill_structure = `
<div class="bill-container"><h1>DC Fashion</h1><p class="address">G6V7+8CJ, Av Manuelico Gonzalez, Villa González 51000</p><p class="phone">+1 (829) 297-0170</p><div class="date-hour"><p>Tipo</p><p id="type-document">Factura</p></div><div class="date-hour"><p id="bill-date">3 de Marzo 2023</p><p id="bill-hour">3:20 PM</p></div><table class="table table-sm table-striped" id="bill"><thead><tr><th class="product-name">Producto</th><th>Cantidad</th><th>Precio</th><th class="total">Total</th></tr></thead><tbody><tr><td class="product-name">Lentes</td><td>1</td><td>100</td><td class="total">100</td></tr><tr><td class="product-name">Blanco, Negro 5 (1/2), 6 (1/2)</td><td>1</td><td>3950</td><td class="total">3950</td></tr><tr><td class="product-name">RSX, Running System, Multicolor Size 8 (1/2)</td><td>4</td><td>5550</td><td class="total">22200</td></tr><hr><tr class="total-row"><td class="product-name"><b>TOTAL</b></td><td></td><td></td><td class="total">26250.00</td></tr></tbody></table></div>
`;

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

    // Setting the default object as 'factura'
    const option = document.querySelector('option[value="Factura"]');
    const select = option.parentElement;
    select.value = "Factura";

    // building the bill structure 
    const detail_container = document.querySelector(".col-sm-4");
    const card_body = detail_container.querySelectorAll(".card-body")[1];
    const btn = card_body.querySelector(".btn-block.btn.btn-primary");
    
    // billing event-listener
    printing_button.addEventListener("click", print_table); 

    const container_fluid = document.querySelector(".container-fluid");
    // 
    const invisible_row = document.createElement("div");
    invisible_row.className += "row";

    container_fluid.appendChild(invisible_row);
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

}

const fill_tables = () => {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = `
    <tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Blanco con Negro, Size 9, 7</td><td>2</td><td>4375</td><td>8750</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Caqui</td><td>1</td><td>1790</td><td>1790</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Lentes</td><td>1</td><td>100</td><td>100</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Blanco con Negro, Size 9, 7</td><td>2</td><td>4375</td><td>8750</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>BMW Motorsport Blanca, Size 10</td><td>1</td><td>2390</td><td>2390</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Blanco, Negro 5 (1/2), 6 (1/2)</td><td>1</td><td>3950</td><td>3950</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Negra con Blanco, size 6 </td><td>1</td><td>2350</td><td>2350</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Negra con Blanco, size 6 </td><td>1</td><td>2350</td><td>2350</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Blanco con Negro, Size 9, 7</td><td>1</td><td>4375</td><td>4375</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Blanco, Blanco y Negro, Size 9.5, 9</td><td>1</td><td>3790</td><td>3790</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Blanco y Azul con Crema 12 (1/2) C,</td><td>1</td><td>4500</td><td>4500</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Blanco con Negro, Size 9, 7</td><td>1</td><td>4375</td><td>4375</td></tr><tr><td><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td><td>Caqui</td><td>1</td><td>1790</td><td>1790</td></tr>
    `;
}

const removeListeners = function() {
    console.log("papo out");
}

//message listener for background
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { });
// detect in which rout we are to made the corresponding changess
const detect_location = (pathname) => {
    let url = new URL(window.location.href);
    // console.log(url.pathname);
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