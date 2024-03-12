const form = document.getElementById('formRegister');
const marcaInput = document.getElementById('marcaInput');
const serieInput = document.getElementById('serieInput');
const escuelaInput = document.getElementById('escuelaInput');
const ubicacionInput = document.getElementById('ubicacionInput');
const tableBody = document.getElementById('tableBody');

let data = JSON.parse(localStorage.getItem('formData')) || [];

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const marca = marcaInput.value;
    const serie = serieInput.value;
    const escuela = escuelaInput.value;
    const ubicacion = ubicacionInput.value;

    if(marca && serie && escuela && ubicacion) {
        const newData = {marca,serie,escuela,ubicacion};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    }else{
        alert('Todos los datos son obligatorios')
    }
    
})

function saveDataToLocalStorage() {
    localStorage.setItem('formData',JSON.stringify(data));
}

function renderTable() {
    tableBody.innerHTML = '';

    data.forEach(function (item, index){
        const row = document.createElement('tr');
        const marcaCell = document.createElement('td');
        const serieCell = document.createElement('td');
        const escuelaCell = document.createElement('td');
        const ubicacionCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        marcaCell.textContent = item.marca;
        serieCell.textContent = item.serie;
        escuelaCell.textContent = item.escuela;
        ubicacionCell.textContent = item.ubicacion;
        editButton.textContent = 'Edit';
        deleteButton.textContent = 'Delete';

        editButton.classList.add("button", 'button--secondary');
        deleteButton.classList.add("button", 'button--tertiary');

        editButton.addEventListener('click', function() {
            editData(index);
        })

        deleteButton.addEventListener('click', function() {
            deleteData(index);
        })
        
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(marcaCell);
        row.appendChild(serieCell);
        row.appendChild(escuelaCell);
        row.appendChild(ubicacionCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    })
        
}

function editData(index) {
    const item = data[index];
    marcaInput.value = item.marca;
    serieInput.value = item.serie;
    escuelaInput.value = item.escuela;
    ubicacionInput.value = item.ubicacion;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();