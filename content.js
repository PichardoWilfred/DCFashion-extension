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

    // billing event-listener
    printing_button.addEventListener("click", print_table);
}
const print_table = () => {
    const table_body = document.querySelector("tbody");
    const rows = table_body.childNodes;
    console.log(rows);
    rows.map((row, index) => {
        if (index > 0 ) {
            console.log(row);
        }
    });
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
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
    console.log(request.command);
});

//on init perform based on chrome stroage value
window.onload = function() {
    add_printing_function();
}