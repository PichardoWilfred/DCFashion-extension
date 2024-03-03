let row_state = [];
let print_table_timeout = 0;
let sold_items = [];

const add_printing_function = () => {
    // getting the existing page_source
    const sale_button = document.querySelector("button.btn.btn-success.btn-block");
    const button_container = sale_button.parentElement;
    
    const printing_button = document.createElement("button");
    printing_button.className += " btn-block btn btn-primary";
    printing_button.style.marginTop = "20px";
    printing_button.textContent = " Imprimir Factura";
    
    const icon = document.createElement("i");
    icon.className += " fas fa-print";
    
    printing_button.prepend(icon);
    button_container.appendChild(printing_button);

    // fill products
    fill_tables();

    printing_button.addEventListener("click", print_table); // billing event-listener
    // print_table_timeout = setTimeout(() => { }, 100);
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
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
//     // console.log(request.command);
// });
window.onload = function() {
    // console.log();
    window.navigation.addEventListener("navigate", (event) => {
        console.log('location changed!');
    });
    add_printing_function();
}
//on init perform based on chrome storage value
// window.addEventListener("DOMContentLoaded", );