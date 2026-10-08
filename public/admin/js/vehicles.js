/* =========================================================
   RIDEHUB ADMIN VEHICLES
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const vehiclesTableBody =
    document.getElementById("vehiclesTableBody");

const vehiclesTableContainer =
    document.getElementById("vehiclesTableContainer");

const loadingMessage =
    document.getElementById("loadingMessage");

const errorMessage =
    document.getElementById("errorMessage");

const logoutButton =
    document.getElementById("logoutButton");


/* =========================================================
   EDIT MODAL ELEMENTS
========================================================= */

const editModal =
    document.getElementById("editModal");

const editVehicleForm =
    document.getElementById("editVehicleForm");

const editVehicleName =
    document.getElementById("editVehicleName");

const editPrice =
    document.getElementById("editPrice");

const editStockStatus =
    document.getElementById("editStockStatus");

const editMessage =
    document.getElementById("editMessage");

const closeModalButton =
    document.getElementById("closeModalButton");

const cancelEditButton =
    document.getElementById("cancelEditButton");

const saveVehicleButton =
    document.getElementById("saveVehicleButton");


/* =========================================================
   CURRENT VEHICLE ID
========================================================= */

let currentVehicleId = null;


/* =========================================================
   CHECK ADMIN AUTHENTICATION
========================================================= */

async function checkAdminAuthentication() {

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/admin/check",
            {
                method: "GET",
                credentials: "include"
            }
        );


        const data = await response.json();


        if (!response.ok || !data.success) {

            window.location.href = "../html/login.html";

            return false;

        }


        return true;


    } catch (error) {

        console.error(
            "Authentication check failed:",
            error
        );

        window.location.href = "../html/login.html";

        return false;

    }

}


/* =========================================================
   LOAD VEHICLES
========================================================= */

async function loadVehicles() {
    try {
        const response = await fetch(
            "http://127.0.0.1:5000/api/vehicles"
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                "Unable to load vehicles."
            );
        }

        displayVehicles(data);

    } catch (error) {
        console.error("Vehicle loading error:", error);

        loadingMessage.style.display = "none";
        errorMessage.style.display = "block";
        errorMessage.textContent =
            "Unable to load vehicles. Please try again.";
    }
}


/* =========================================================
   DISPLAY VEHICLES
========================================================= */

function displayVehicles(vehicles) {

    vehiclesTableBody.innerHTML = "";


    if (vehicles.length === 0) {

        loadingMessage.style.display = "none";

        vehiclesTableContainer.style.display = "none";

        errorMessage.style.display = "block";

        errorMessage.textContent =
            "No vehicles found.";

        return;

    }


    vehicles.forEach(vehicle => {

        const row =
            document.createElement("tr");


        const stockClass =
            vehicle.stock_status === "In Stock"
                ? "in-stock"
                : "out-of-stock";


        row.innerHTML = `

            <td>
                ${vehicle.id}
            </td>

            <td>
                <span class="vehicle-name">
                    ${vehicle.name}
                </span>
            </td>

            <td>
                <span class="vehicle-category">
                    ${vehicle.category}
                </span>
            </td>

            <td>
                <span class="vehicle-price">
                    ₹${Number(vehicle.price).toLocaleString("en-IN")}
                </span>
            </td>

            <td>
                <span class="stock-badge ${stockClass}">
                    ${vehicle.stock_status}
                </span>
            </td>

            <td>

                <button
                    type="button"
                    class="edit-button"
                    data-id="${vehicle.id}"
                >
                    Edit
                </button>

            </td>

        `;


        vehiclesTableBody.appendChild(row);

    });


    loadingMessage.style.display = "none";

    errorMessage.style.display = "none";

    vehiclesTableContainer.style.display = "block";

}


/* =========================================================
   OPEN EDIT MODAL
========================================================= */

async function openEditModal(vehicleId) {
    try {
        const response = await fetch(
            `http://127.0.0.1:5000/api/vehicles/${vehicleId}`
        );

        const vehicle = await response.json();

        if (!response.ok) {
            alert("Unable to load vehicle.");
            return;
        }

        currentVehicleId = vehicle.id;

        editVehicleName.textContent = vehicle.name;
        editPrice.value = vehicle.price;
        editStockStatus.value = vehicle.stock_status;

        editMessage.textContent = "";

        editModal.style.display = "flex";

    } catch (error) {
        console.error("Vehicle details error:", error);
        alert("Unable to load vehicle.");
    }
}


/* =========================================================
   CLOSE EDIT MODAL
========================================================= */

function closeEditModal() {
    editModal.style.display = "none";

    currentVehicleId = null;

    editMessage.textContent = "";

    editVehicleForm.reset();
}


/* =========================================================
   EDIT BUTTON CLICK
========================================================= */

vehiclesTableBody.addEventListener(
    "click",
    (event) => {

        const editButton =
            event.target.closest(
                ".edit-button"
            );


        if (!editButton) {
            return;
        }


        const vehicleId =
            editButton.dataset.id;


        openEditModal(vehicleId);

    }
);


/* =========================================================
   SAVE VEHICLE
========================================================= */

editVehicleForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        if (!currentVehicleId) {
            return;
        }

        const price =
            Number(editPrice.value);

        const stockStatus =
            editStockStatus.value;


        /* -----------------------------------------
           VALIDATION
        ----------------------------------------- */

        if (!price || price <= 0) {

            editMessage.textContent =
                "Please enter a valid price.";

            editMessage.style.color = "#a34f3d";

            return;
        }


        /* -----------------------------------------
           DISABLE BUTTON
        ----------------------------------------- */

        saveVehicleButton.disabled = true;

        saveVehicleButton.textContent =
            "Saving...";

        editMessage.textContent = "";


        try {

            const response = await fetch(
                `http://127.0.0.1:5000/api/vehicles/${currentVehicleId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        price: price,
                        stock_status: stockStatus
                    })
                }
            );


            const data =
                await response.json();


            /* -----------------------------------------
               ERROR
            ----------------------------------------- */

            if (!response.ok || !data.success) {

                editMessage.textContent =
                    data.message ||
                    "Unable to update vehicle.";

                editMessage.style.color =
                    "#a34f3d";

                saveVehicleButton.disabled = false;

                saveVehicleButton.textContent =
                    "Save Changes";

                return;
            }


            /* -----------------------------------------
               SUCCESS
            ----------------------------------------- */

            editMessage.textContent =
                "Vehicle changes saved successfully.";

            editMessage.style.color =
                "#617408";

            saveVehicleButton.textContent =
                "Saved!";


            /* -----------------------------------------
               REFRESH TABLE
            ----------------------------------------- */

            await loadVehicles();


            /* -----------------------------------------
               CLOSE MODAL AFTER 3 SECONDS
            ----------------------------------------- */

            setTimeout(() => {

                closeEditModal();

            }, 3000);


        } catch (error) {

            console.error(
                "Vehicle update error:",
                error
            );

            editMessage.textContent =
                "Unable to connect to the server.";

            editMessage.style.color =
                "#a34f3d";

            saveVehicleButton.disabled = false;

            saveVehicleButton.textContent =
                "Save Changes";
        }

    }
);


/* =========================================================
   CLOSE BUTTONS
========================================================= */

closeModalButton.addEventListener(
    "click",
    closeEditModal
);


cancelEditButton.addEventListener(
    "click",
    closeEditModal
);


/* =========================================================
   CLOSE WHEN CLICKING OUTSIDE MODAL
========================================================= */

editModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === editModal
        ) {

            closeEditModal();

        }

    }
);


/* =========================================================
   LOGOUT
========================================================= */

logoutButton.addEventListener(
    "click",
    async () => {

        try {

            const response = await fetch(
                "http://127.0.0.1:5000/api/admin/logout",
                {
                    method: "POST",
                    credentials: "include"
                }
            );


            const data =
                await response.json();


            if (data.success) {

                window.location.href =
                    "../html/login.html";

            } else {

                alert(
                    data.message ||
                    "Logout failed."
                );

            }

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

            alert(
                "Unable to connect to the server."
            );

        }

    }
);


/* =========================================================
   START PAGE
========================================================= */

async function startVehiclesPage() {

    const authenticated =
        await checkAdminAuthentication();


    if (!authenticated) {
        return;
    }


    await loadVehicles();

}


startVehiclesPage();