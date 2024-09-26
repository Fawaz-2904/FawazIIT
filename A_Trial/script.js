// Initial data for table
let data = [
    { id: 1, chemical_name: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 60.63, packaging: "Bag", pack_size: 100, unit: "kg", quantity: 6495.18 },
    { id: 2, chemical_name: "Caustic Potash", vendor: "Formosa", density: 3172.15, viscosity: 48.22, packaging: "Bag", pack_size: 100, unit: "kg", quantity: 8751.90 },
    { id: 3, chemical_name: "Dimethylaminopropylamino", vendor: "LG Chem", density: 8435.37, viscosity: 12.62, packaging: "Barrel", pack_size: 75, unit: "L", quantity: 5964.61 },
    { id: 4, chemical_name: "Mono Ammonium Phosphate", vendor: "Sinopec", density: 1597.65, viscosity: 76.51, packaging: "Bag", pack_size: 105, unit: "kg", quantity: 8183.73 },
    { id: 5, chemical_name: "Ferric Nitrate", vendor: "DowDuPont", density: 364.04, viscosity: 14.90, packaging: "Bag", pack_size: 105, unit: "kg", quantity: 4154.33 }
];

let selectedRowIndex = null; // Holds the index of the selected row

// Function to load the table data
function loadTableData(data) {
    const tableBody = document.getElementById('chemicalTable');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.dataset.index = index;
        tr.onclick = () => selectRow(index);
        tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.chemical_name}</td>
            <td>${row.vendor}</td>
            <td>${row.density}</td>
            <td>${row.viscosity}</td>
            <td>${row.packaging}</td>
            <td>${row.pack_size}</td>
            <td>${row.unit}</td>
            <td>${row.quantity}</td>
            <td><button class="btn btn-sm btn-primary" onclick="editRow(${index})">Edit</button></td>
        `;
        tableBody.appendChild(tr);
    });
}

// Function to select a row
function selectRow(index) {
    const rows = document.querySelectorAll('#chemicalTable tr');
    rows.forEach(row => row.classList.remove('table-active'));
    rows[index].classList.add('table-active');
    selectedRowIndex = index;
}

// Function to add a new row
function addRow() {
    const newRow = {
        id: data.length + 1,
        chemical_name: "New Chemical",
        vendor: "New Vendor",
        density: 0.00,
        viscosity: 0.00,
        packaging: "NA",
        pack_size: 0,
        unit: "NA",
        quantity: 0
    };
    data.push(newRow);
    loadTableData(data);
}

// Function to delete the selected row
function deleteRow() {
    if (selectedRowIndex !== null) {
        data.splice(selectedRowIndex, 1);
        loadTableData(data);
        selectedRowIndex = null; // Reset selection
    } else {
        alert("Please select a row to delete.");
    }
}

// Function to move the selected row up
function moveRowUp() {
    if (selectedRowIndex !== null && selectedRowIndex > 0) {
        [data[selectedRowIndex - 1], data[selectedRowIndex]] = [data[selectedRowIndex], data[selectedRowIndex - 1]];
        loadTableData(data);
        selectRow(selectedRowIndex - 1); // Update the selection
    }
}

// Function to move the selected row down
function moveRowDown() {
    if (selectedRowIndex !== null && selectedRowIndex < data.length - 1) {
        [data[selectedRowIndex + 1], data[selectedRowIndex]] = [data[selectedRowIndex], data[selectedRowIndex + 1]];
        loadTableData(data);
        selectRow(selectedRowIndex + 1); // Update the selection
    }
}

// Function to refresh the data
function refreshData() {
    // Reset data to the initial state
    data = [...initialData];
    loadTableData(data);
}

// Function to save data (dummy function)
function saveData() {
    alert("Data saved!");
}

// Function to edit a row
function editRow(index) {
    const row = data[index];
    // Prompt for each field
    const newChemicalName = prompt("Edit Chemical Name", row.chemical_name);
    const newVendor = prompt("Edit Vendor", row.vendor);
    const newDensity = prompt("Edit Density", row.density);
    const newViscosity = prompt("Edit Viscosity", row.viscosity);
    const newPackaging = prompt("Edit Packaging", row.packaging);
    const newPackSize = prompt("Edit Pack Size", row.pack_size);
    const newUnit = prompt("Edit Unit", row.unit);
    const newQuantity = prompt("Edit Quantity", row.quantity);
    // Update row data if user does not cancel any prompts
    if (newChemicalName !== null) row.chemical_name = newChemicalName;
    if (newVendor !== null) row.vendor = newVendor;
    if (newDensity !== null) row.density = parseFloat(newDensity); // Convert to float
    if (newViscosity !== null) row.viscosity = parseFloat(newViscosity); // Convert to float
    if (newPackaging !== null) row.packaging = newPackaging;
    if (newPackSize !== null) row.pack_size = parseInt(newPackSize); // Convert to int
    if (newUnit !== null) row.unit = newUnit;
    if (newQuantity !== null) row.quantity = parseFloat(newQuantity); // Convert to float
    loadTableData(data);
}

// Function to sort the table by column
function sortTable(columnIndex) {
    data.sort((a, b) => {
        const keyA = Object.values(a)[columnIndex];
        const keyB = Object.values(b)[columnIndex];
        return keyA > keyB ? 1 : -1;
    });
    loadTableData(data);
}

// Load table initially
document.addEventListener('DOMContentLoaded', () => loadTableData(data));
