/* =====================================================
   RIDEHUB ADMIN - CONTACT MESSAGES
===================================================== */

const tableContainer =
    document.getElementById("tableContainer");

const tableBody =
    document.getElementById("contactTableBody");

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
   LOAD CONTACT MESSAGES
===================================================== */

async function loadContactMessages() {

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/contact",
            {
                method: "GET",
                credentials: "include"
            }
        );


        const data = await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to load contact messages."
            );

        }


        displayContactMessages(data.data);


    } catch (error) {

        console.error(
            "Contact message loading error:",
            error
        );


        loadingMessage.style.display = "none";

        tableContainer.style.display = "none";

        errorMessage.style.display = "block";

        errorMessage.textContent =
            "Unable to load contact messages. Please try again.";

    }

}


/* =====================================================
   DISPLAY CONTACT MESSAGES
===================================================== */

function displayContactMessages(contacts) {

    tableBody.innerHTML = "";

    loadingMessage.style.display = "none";

    errorMessage.style.display = "none";


    /* ===============================
       NO MESSAGES
    =============================== */

    if (contacts.length === 0) {

        tableContainer.style.display = "block";


        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-message">
                    No contact messages found.
                </td>
            </tr>
        `;


        return;

    }


    /* ===============================
       DISPLAY MESSAGES
    =============================== */

    contacts.forEach(contact => {

        const row =
            document.createElement("tr");


        const statusClass =
            contact.status === "Pending"
                ? "pending"
                : "completed";


        const nextStatus =
            contact.status === "Pending"
                ? "Completed"
                : "Pending";


        const formattedDate =
            formatDate(contact.created_at);


        row.innerHTML = `

            <td>
                <span class="contact-id">
                    #${contact.id}
                </span>
            </td>


            <td>

                <div class="customer-name">
                    ${escapeHTML(contact.name)}
                </div>

                <div class="customer-email">
                    ${escapeHTML(contact.email)}
                </div>

            </td>


            <td>

                <div class="contact-phone">
                    ${escapeHTML(contact.phone)}
                </div>

            </td>


            <td>

                <div class="contact-message">
                    ${escapeHTML(contact.message)}
                </div>

            </td>


            <td>

                <span
                    class="contact-status ${statusClass}"
                >
                    ${escapeHTML(contact.status)}
                </span>

            </td>


            <td>

                <span class="contact-date">
                    ${formattedDate}
                </span>

            </td>


            <td>

                <button
                    type="button"
                    class="status-button"
                    data-contact-id="${contact.id}"
                    data-status="${contact.status}"
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
   UPDATE CONTACT MESSAGE STATUS
===================================================== */

async function updateContactStatus(
    contactId,
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
            `http://127.0.0.1:5000/api/contact/${contactId}/status`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
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
                "Unable to update contact message status."
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


        await loadContactMessages();


    } catch (error) {

        console.error(
            "Contact status update error:",
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

    if (
        value === null ||
        value === undefined
    ) {

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


        const contactId =
            Number(
                button.dataset.contactId
            );


        const currentStatus =
            button.dataset.status;


        updateContactStatus(
            contactId,
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
   START CONTACT ADMIN PAGE
===================================================== */

async function startContactPage() {

    const authenticated =
        await checkAdminAuthentication();


    if (!authenticated) {
        return;
    }


    await loadContactMessages();

}


startContactPage();