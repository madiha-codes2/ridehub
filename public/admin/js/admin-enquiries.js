/* =====================================================
   RIDEHUB ADMIN - ENQUIRIES
===================================================== */

const tableContainer =
    document.getElementById("tableContainer");

const tableBody =
    document.getElementById("enquiriesTableBody");

const loadingMessage =
    document.getElementById("loadingMessage");

const errorMessage =
    document.getElementById("errorMessage");

const logoutButton =
    document.getElementById("logoutButton");


/* =====================================================
   CHECK ADMIN AUTHENTICATION
===================================================== */

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


/* =====================================================
   LOAD ENQUIRIES
===================================================== */

async function loadEnquiries() {

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/enquiries",
            {
                method: "GET",
                credentials: "include"
            }
        );


        const data = await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to load enquiries."
            );
        }


        displayEnquiries(data.data);


    } catch (error) {

        console.error(
            "Enquiry loading error:",
            error
        );


        loadingMessage.style.display = "none";

        tableContainer.style.display = "none";

        errorMessage.style.display = "block";

        errorMessage.textContent =
            "Unable to load enquiries. Please try again.";
    }
}


/* =====================================================
   DISPLAY ENQUIRIES
===================================================== */

function displayEnquiries(enquiries) {

    tableBody.innerHTML = "";


    loadingMessage.style.display = "none";

    errorMessage.style.display = "none";


    /* =================================================
       NO ENQUIRIES
    ================================================= */

    if (enquiries.length === 0) {

        tableContainer.style.display = "block";

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="9"
                    class="empty-message"
                >
                    No enquiries found.
                </td>
            </tr>
        `;

        return;
    }


    /* =================================================
       ADD ENQUIRIES TO TABLE
    ================================================= */

    enquiries.forEach(enquiry => {

        const row =
            document.createElement("tr");


        const statusClass =
            enquiry.status === "Pending"
                ? "pending"
                : "completed";


        const nextStatus =
            enquiry.status === "Pending"
                ? "Completed"
                : "Pending";


        const formattedDate =
            formatDate(enquiry.created_at);


        row.innerHTML = `

            <!-- ID -->

            <td>
                <span class="enquiry-id">
                    #${enquiry.id}
                </span>
            </td>


            <!-- CUSTOMER -->

            <td>

                <div class="customer-name">
                    ${escapeHTML(enquiry.name)}
                </div>

                <div class="customer-email">
                    ${escapeHTML(enquiry.email)}
                </div>

            </td>


            <!-- CONTACT -->

            <td>

                <div class="contact-phone">
                    ${escapeHTML(enquiry.phone)}
                </div>

            </td>


            <!-- VEHICLE -->

            <td>

                <div class="vehicle-name">
                    ${escapeHTML(enquiry.vehicle_name)}
                </div>

            </td>


            <!-- TYPE -->

            <td>

                <span class="enquiry-type">
                    ${escapeHTML(enquiry.type)}
                </span>

            </td>


            <!-- MESSAGE -->

            <td>

                <div class="enquiry-message">
                    ${escapeHTML(enquiry.message)}
                </div>

            </td>


            <!-- STATUS -->

            <td>

                <span class="enquiry-status ${statusClass}">
                    ${escapeHTML(enquiry.status)}
                </span>

            </td>


            <!-- DATE -->

            <td>

                <span class="enquiry-date">
                    ${formattedDate}
                </span>

            </td>


            <!-- ACTION -->

            <td>

                <button
                    type="button"
                    class="status-button"
                    data-enquiry-id="${enquiry.id}"
                    data-status="${enquiry.status}"
                >
                    Mark as ${nextStatus}
                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });


    tableContainer.style.display = "block";
}


/* =====================================================
   UPDATE ENQUIRY STATUS
===================================================== */

async function updateEnquiryStatus(
    enquiryId,
    currentStatus,
    button
) {

    const newStatus =
        currentStatus === "Pending"
            ? "Completed"
            : "Pending";


    button.disabled = true;

    button.textContent = "Updating...";


    try {

        const response = await fetch(
            `http://127.0.0.1:5000/api/enquiries/${enquiryId}/status`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    status: newStatus
                })
            }
        );


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            alert(
                data.message ||
                "Unable to update enquiry status."
            );

            button.disabled = false;

            button.textContent =
                `Mark as ${
                    currentStatus === "Pending"
                        ? "Completed"
                        : "Pending"
                }`;

            return;
        }


        /* Reload table so the new status appears */

        await loadEnquiries();


    } catch (error) {

        console.error(
            "Enquiry status update error:",
            error
        );


        alert(
            "Unable to connect to the server."
        );


        button.disabled = false;

        button.textContent =
            `Mark as ${
                currentStatus === "Pending"
                    ? "Completed"
                    : "Pending"
            }`;
    }
}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(dateValue) {

    if (!dateValue) {
        return "-";
    }


    const date =
        new Date(dateValue);


    if (Number.isNaN(date.getTime())) {
        return "-";
    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =====================================================
   STATUS BUTTON CLICK
===================================================== */

tableBody.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".status-button"
            );


        if (!button) {
            return;
        }


        const enquiryId =
            Number(
                button.dataset.enquiryId
            );


        const currentStatus =
            button.dataset.status;


        updateEnquiryStatus(
            enquiryId,
            currentStatus,
            button
        );

    }
);


/* =====================================================
   LOGOUT
===================================================== */

logoutButton.addEventListener(
    "click",
    async () => {

        try {

            const response =
                await fetch(
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


/* =====================================================
   START ENQUIRIES PAGE
===================================================== */

async function startEnquiriesPage() {

    const authenticated =
        await checkAdminAuthentication();


    if (!authenticated) {
        return;
    }


    await loadEnquiries();
}


startEnquiriesPage();