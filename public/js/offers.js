/* =========================================================
   RIDEHUB OFFERS PAGE
   ========================================================= */


/* =========================================================
   OFFER DATA
   ========================================================= */

const offers = {

    cashback: {
        title: "CASHBACK OFFER",

        description:
            "Get exciting cashback benefits on selected bikes and scooters.",

        details:
            "Save more on selected models with limited-period cashback benefits.",

        eligibility:
            "Applicable on selected bikes and scooters. Offer availability may vary by model and showroom."
    },


    emi: {
        title: "EASY EMI OFFER",

        description:
            "Make your dream bike easier to own with flexible EMI options.",

        details:
            "Choose from flexible finance options designed to make your purchase easier.",

        eligibility:
            "Finance options are available on eligible models, subject to applicable finance terms."
    },


    exchange: {
        title: "EXCHANGE BONUS",

        description:
            "Exchange your existing vehicle and get additional benefits on selected models.",

        details:
            "Get additional exchange benefits when upgrading to a selected RideHub vehicle.",

        eligibility:
            "Applicable on selected models and eligible exchange vehicles. Evaluation may be required."
    }

};


/* =========================================================
   LOAD OFFER STATUS
========================================================= */

async function loadOfferStatus() {

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/offers"
        );

        const data =
            await response.json();

        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to load offer status."
            );

        }


        data.data.forEach(offer => {

            const statusElement =
                document.getElementById(
                    `offerStatus${offer.offer_number}`
                );

            if (!statusElement) {
                return;
            }


            statusElement.textContent =
                offer.status.toUpperCase();


            statusElement.classList.remove(
                "active",
                "inactive"
            );


            if (offer.status === "Active") {

                statusElement.classList.add(
                    "active"
                );

            } else {

                statusElement.classList.add(
                    "inactive"
                );

            }

        });


    } catch (error) {

        console.error(
            "Offer status loading error:",
            error
        );

    }

}


/* =========================================================
   MODAL ELEMENTS
   ========================================================= */

const modal =
    document.getElementById("offerModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalOfferDetails =
    document.getElementById("modalOfferDetails");

const modalEligibility =
    document.getElementById("modalEligibility");

const modalClose =
    document.getElementById("modalClose");

const modalCloseBtn =
    document.getElementById("modalCloseBtn");

const modalBackdrop =
    document.querySelector(".modal-backdrop");


/* =========================================================
   OPEN MODAL
   ========================================================= */

const knowMoreButtons =
    document.querySelectorAll(".know-more");


knowMoreButtons.forEach(button => {

    button.addEventListener("click", () => {

        const offerId =
            button.getAttribute("data-offer");

        const offer =
            offers[offerId];

        if (!offer) {
            return;
        }

        modalTitle.textContent =
            offer.title;

        modalDescription.textContent =
            offer.description;

        modalOfferDetails.textContent =
            offer.details;

        modalEligibility.textContent =
            offer.eligibility;


        modal.classList.add("active");

        document.body.style.overflow =
            "hidden";

    });

});


/* =========================================================
   CLOSE MODAL FUNCTION
   ========================================================= */

function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   CLOSE BUTTONS
   ========================================================= */

modalClose.addEventListener(
    "click",
    closeModal
);

modalCloseBtn.addEventListener(
    "click",
    closeModal
);


/* =========================================================
   CLICK OUTSIDE MODAL
   ========================================================= */

modalBackdrop.addEventListener(
    "click",
    closeModal
);


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("active")
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   START OFFERS PAGE
========================================================= */

loadOfferStatus();