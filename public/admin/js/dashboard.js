/* =========================================================
   RIDEHUB ADMIN DASHBOARD
========================================================= */


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


        /* -----------------------------------------
           NOT LOGGED IN
        ----------------------------------------- */

        if (!response.ok || !data.success) {

            window.location.href = "../html/login.html";

            return;

        }


        console.log(
            "Admin authenticated:",
            data.adminId
        );


    } catch (error) {

        console.error(
            "Authentication check failed:",
            error
        );

        window.location.href = "../html/login.html";

    }

}


/* =========================================================
   LOGOUT
========================================================= */

const logoutButton =
    document.getElementById("logoutButton");


logoutButton.addEventListener("click", async () => {

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/admin/logout",
            {
                method: "POST",
                credentials: "include"
            }
        );


        const data = await response.json();


        if (data.success) {

            window.location.href = "../html/login.html";

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

});


/* =========================================================
   START AUTHENTICATION CHECK
========================================================= */

checkAdminAuthentication();

/* =========================================================
   LOAD DASHBOARD STATISTICS
========================================================= */

async function loadDashboardStatistics() {

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/admin/dashboard",
            {
                method: "GET",
                credentials: "include"
            }
        );


        const data = await response.json();


        if (!response.ok || !data.success) {

            console.error(
                "Unable to load dashboard statistics:",
                data.message
            );

            return;

        }


        const stats = data.data;


        /* -----------------------------------------
           UPDATE DASHBOARD CARDS
        ----------------------------------------- */

        document.getElementById("totalVehicles").textContent =
            stats.totalVehicles;

        document.getElementById("inStockVehicles").textContent =
            stats.inStockVehicles;

        document.getElementById("outOfStockVehicles").textContent =
            stats.outOfStockVehicles;

        document.getElementById("activeOffers").textContent =
            stats.activeOffers;

        document.getElementById("pendingEnquiries").textContent =
            stats.pendingEnquiries;

        document.getElementById("pendingContacts").textContent =
            stats.pendingContacts;


    } catch (error) {

        console.error(
            "Dashboard statistics error:",
            error
        );

    }

}

checkAdminAuthentication()
    .then(() => {
        loadDashboardStatistics();
    });