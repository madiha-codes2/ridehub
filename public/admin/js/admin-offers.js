/* =========================================================
   RIDEHUB ADMIN OFFERS
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const offersList =
    document.getElementById("offersList");

const loadingMessage =
    document.getElementById("loadingMessage");

const errorMessage =
    document.getElementById("errorMessage");

const logoutButton =
    document.getElementById("logoutButton");


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


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            window.location.href =
                "../html/login.html";

            return false;

        }


        return true;


    } catch (error) {

        console.error(
            "Authentication check failed:",
            error
        );

        window.location.href =
            "../html/login.html";

        return false;

    }

}


/* =========================================================
   LOAD OFFER STATUSES
========================================================= */

async function loadOffers() {

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/offers"
        );


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to load offers."
            );

        }


        displayOffers(data.data);


    } catch (error) {

        console.error(
            "Offer loading error:",
            error
        );

        loadingMessage.style.display =
            "none";

        offersList.style.display =
            "none";

        errorMessage.style.display =
            "block";

        errorMessage.textContent =
            "Unable to load offers. Please try again.";

    }

}


/* =========================================================
   DISPLAY OFFERS
========================================================= */

function displayOffers(offers) {

    offersList.innerHTML = "";


    if (offers.length === 0) {

        loadingMessage.style.display =
            "none";

        offersList.style.display =
            "none";

        errorMessage.style.display =
            "block";

        errorMessage.textContent =
            "No offers found.";

        return;

    }


    offers.forEach(offer => {

        const statusClass =
            offer.status === "Active"
                ? "active"
                : "inactive";


        const card =
            document.createElement("article");


        card.className =
            "offer-card";


        card.innerHTML = `

            <div class="offer-card-top">

                <div>

                    <p class="offer-number">
                        Offer ${offer.offer_number}
                    </p>

                    <h4 class="offer-title">
                        Offer ${offer.offer_number}
                    </h4>

                </div>


                <span
                    class="offer-status ${statusClass}"
                >
                    ${offer.status.toUpperCase()}
                </span>

            </div>


            <div class="offer-card-divider"></div>


            <p class="offer-card-label">
                Current Status
            </p>

            <p class="offer-card-status-text">
                ${offer.status}
            </p>


            <button
                type="button"
                class="change-status-button"
                data-offer-number="${offer.offer_number}"
                data-status="${offer.status}"
            >
                Change Status
            </button>

        `;


        offersList.appendChild(card);

    });


    loadingMessage.style.display =
        "none";

    errorMessage.style.display =
        "none";

    offersList.style.display =
        "grid";

}


/* =========================================================
   CHANGE OFFER STATUS
========================================================= */

async function changeOfferStatus(
    offerNumber,
    currentStatus,
    button
) {

    const newStatus =
        currentStatus === "Active"
            ? "Inactive"
            : "Active";


    button.disabled = true;

    button.textContent =
        "Updating...";


    try {

        const response = await fetch(
            `http://127.0.0.1:5000/api/offers/${offerNumber}`,
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
                "Unable to update offer status."
            );

            button.disabled = false;

            button.textContent =
                "Change Status";

            return;

        }


        /* -----------------------------------------
           REFRESH OFFERS
        ----------------------------------------- */

        await loadOffers();


    } catch (error) {

        console.error(
            "Offer status update error:",
            error
        );

        alert(
            "Unable to connect to the server."
        );

        button.disabled = false;

        button.textContent =
            "Change Status";

    }

}


/* =========================================================
   CHANGE STATUS BUTTON CLICK
========================================================= */

offersList.addEventListener(
    "click",
    (event) => {

        const button =
            event.target.closest(
                ".change-status-button"
            );


        if (!button) {
            return;
        }


        const offerNumber =
            Number(
                button.dataset.offerNumber
            );


        const currentStatus =
            button.dataset.status;


        changeOfferStatus(
            offerNumber,
            currentStatus,
            button
        );

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
                    "login.html";

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

async function startOffersPage() {

    const authenticated =
        await checkAdminAuthentication();


    if (!authenticated) {
        return;
    }


    await loadOffers();

}


startOffersPage();