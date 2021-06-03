// 1.	Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements.
//  a.	Use at least one array.
//  b.	Use at least two classes.
//  c.	Your menu should have the options to create, view, and delete elements.

// Define Vehicle class
class Vehicle {
    constructor(id, make, model, year) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.year = year;
        this.maintenanceItems = [];
    }
    // addVehicle(id, make, model, year){
    //     this.vehicles.push(new Vehicle(make, model, year));
    // }
    // deleteVehicle(index) {
    //     this.vehicles.split(index, 1);
    // }
}

// Define Maintenance Items class
class MaintItem {
    constructor(maintenance,mileage,datePerformed) {
        this.maintenance = maintenance;
        this.mileage = mileage;
        this.datePerformed = datePerformed;
    }
}

let vehicles = [];
let vehicleId = 0;

onClick('new-vehicle', () => {
    vehicles.push(new Vehicle(vehicleId++,
        getValue('new-vehicle-make'),
        getValue('new-vehicle-model'),
        getValue('new-vehicle-year')
    ));
    clearValue('new-vehicle-make');
    clearValue('new-vehicle-model');
    clearValue('new-vehicle-year');

    displayVehicles();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function clearValue(id) {
    document.getElementById(id).value = "";
}

function displayVehicles() {
    let vehicleDiv = document.getElementById('vehicles');
    clearElement(vehicleDiv);
    for (vehicle of vehicles) {
        let table = createVehicleTable(vehicle);
        let title = document.createElement('h2');
        title.innerHTML = `${vehicle.year} ${vehicle.make} ${vehicle.model}  `;
        title.appendChild(createDeleteVehicleButton(vehicle));
        vehicleDiv.appendChild(title);
        vehicleDiv.appendChild(table);
        for (maintenanceItem of vehicle.maintenanceItems) {
            createMaintenanceItemRow(vehicle, table, maintenanceItem);
        }
    }
}

function createDeleteVehicleButton(vehicle){
    let btn = document.createElement('button');
    btn.className = 'btn btn-secondary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = vehicles.indexOf(vehicle);
        vehicles.splice(index, 1);
        displayVehicles();
    };
    return btn;
}

function createDeleteMaintenanceItemRow(vehicle, maintenanceItem){
    let btn = document.createElement('button');
    btn.className = 'btn btn-secondary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = vehicle.maintenanceItems.indexOf(maintenanceItem);
        vehicle.maintenanceItems.splice(index, 1);
        displayVehicles();
    };
    return btn;
}

function createMaintenanceItemRow(vehicle, table, maintenanceItem){
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = maintenanceItem.maintenance;
    row.insertCell(1).innerHTML = maintenanceItem.mileage;
    row.insertCell(2).innerHTML = maintenanceItem.datePerformed;
    let delBtn = row.insertCell(3);
    delBtn.appendChild(createDeleteMaintenanceItemRow(vehicle, maintenanceItem));
}

// we were at 17:38 in Team App video

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function createNewMaintenanceButton(vehicle) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-secondary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        vehicle.maintenanceItems.push(new MaintItem(getValue(`maintenance-input-${vehicle.id}`),
        getValue(`mileage-input-${vehicle.id}`),
        getValue(`datePerformed-input-${vehicle.id}`)))
        displayVehicles();
    };
    return btn;
}

function createVehicleTable(vehicle) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-light table-striped');
    let row = table.insertRow(0);

    let maitenanceColumn = document.createElement('th');
    let mileageColumn = document.createElement('th');
    let datePerformedColumn = document.createElement('th');
    let maintenanceInputColumn = document.createElement('th');
    maitenanceColumn.innerHTML = "Maintenance";
    mileageColumn.innerHTML = "Mileage";
    datePerformedColumn.innerHTML = "Date Performed";

    row.appendChild(maitenanceColumn);
    row.appendChild(mileageColumn);
    row.appendChild(datePerformedColumn);
    row.appendChild(maintenanceInputColumn);

    let formRow = table.insertRow(1);

    let maintenanceTh = document.createElement('th');
    let mileageTh = document.createElement('th');
    let datePerformedTh = document.createElement('th');
    let maintenanceInputTh = document.createElement('th');

    let maintenanceInput = document.createElement('input');
    maintenanceInput.setAttribute('id', `maintenance-input-${vehicle.id}`);
    maintenanceInput.setAttribute('type', 'text');
    maintenanceInput.setAttribute('class', 'form-control');

    let mileageInput = document.createElement('input');
    mileageInput.setAttribute('id', `mileage-input-${vehicle.id}`);
    mileageInput.setAttribute('type', 'text');
    mileageInput.setAttribute('class', 'form-control');

    let datePerformedInput = document.createElement('input');
    datePerformedInput.setAttribute('id', `datePerformed-input-${vehicle.id}`);
    datePerformedInput.setAttribute('type', 'date');
    datePerformedInput.setAttribute('class', 'form-control');

    let newMaintenanceButton = createNewMaintenanceButton(vehicle);

    maintenanceTh.appendChild(maintenanceInput);
    mileageTh.appendChild(mileageInput);
    datePerformedTh.appendChild(datePerformedInput);
    maintenanceInputTh.appendChild(newMaintenanceButton);

    formRow.appendChild(maintenanceTh);
    formRow.appendChild(mileageTh);
    formRow.appendChild(datePerformedTh);
    formRow.appendChild(maintenanceInputTh);

    return table;
}