/* =====================================================
   RIDEHUB - ENQUIRY PAGE JAVASCRIPT
===================================================== */
/* =====================================================
   VEHICLE ID MAPPING
===================================================== */

const vehicleIdMap = {

    "apache-rtr-160-4v": 1,

    "yamaha-r15-v4": 2,

    "hunter-350": 3,

    "apache-rtr-200-4v": 4,

    "pulsar-ns200": 5,

    "gixxer-sf": 6,

    "hornet-2.0": 7,

    "ntorq-125": 8,

    "jupiter-125": 9,

    "activa-6g": 10,

    "access-125": 11,

    "burgman": 12,

    "aprilia-sr": 13,

    "avenis": 14

};

/* =====================================================
   GET URL VEHICLE
===================================================== */

const params =
    new URLSearchParams(window.location.search);

const vehicleId =
    params.get("vehicle");


/* =====================================================
   DOM ELEMENTS
===================================================== */

const enquiryForm =
    document.getElementById("enquiryForm");

const fullName =
    document.getElementById("fullName");

const phone =
    document.getElementById("phone");

const email =
    document.getElementById("email");

const vehicle =
    document.getElementById("vehicle");

const message =
    document.getElementById("message");

const successMessage =
    document.getElementById("successMessage");


/* =====================================================
   AUTOMATICALLY SELECT VEHICLE
===================================================== */

if (vehicleId) {

    const matchingOption =
        vehicle.querySelector(
            `option[value="${vehicleId}"]`
        );

    if (matchingOption) {

        vehicle.value = vehicleId;

    }

}


/* =====================================================
   CLEAR ERROR
===================================================== */

function clearError(field, errorElement) {

    field
        .closest(".form-field")
        .classList.remove("error");

    errorElement.textContent = "";

}


/* =====================================================
   SHOW ERROR
===================================================== */

function showError(field, errorElement, messageText) {

    field
        .closest(".form-field")
        .classList.add("error");

    errorElement.textContent =
        messageText;

}


/* =====================================================
   PHONE NUMBER
===================================================== */

phone.addEventListener("input", () => {

    /*
       Allow only numbers.
    */

    phone.value =
        phone.value.replace(/\D/g, "");

});


/* =====================================================
   VALIDATION
===================================================== */

function validateForm() {

    let isValid = true;


    /* Error elements */

    const nameError =
        document.getElementById("nameError");

    const phoneError =
        document.getElementById("phoneError");

    const emailError =
        document.getElementById("emailError");

    const vehicleError =
        document.getElementById("vehicleError");

    const messageError =
        document.getElementById("messageError");


    /* Clear previous errors */

    clearError(fullName, nameError);

    clearError(phone, phoneError);

    clearError(email, emailError);

    clearError(vehicle, vehicleError);

    clearError(message, messageError);


    /* =========================================
       NAME
    ========================================== */

    if (fullName.value.trim() === "") {

        showError(
            fullName,
            nameError,
            "Please enter your name."
        );

        isValid = false;

    }


    /* =========================================
       PHONE
    ========================================== */

    const phoneValue =
        phone.value.trim();


    const phonePattern =
        /^[6-9][0-9]{9}$/;


    if (phoneValue === "") {

        showError(
            phone,
            phoneError,
            "Please enter your phone number."
        );

        isValid = false;

    }
    else if (!phonePattern.test(phoneValue)) {

        showError(
            phone,
            phoneError,
            "Please enter a valid phone number."
        );

        isValid = false;

    }


    /* =========================================
        EMAIL
    ========================================== */

    const emailValue =
        email.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (emailValue === "") {

        showError(
            email,
            emailError,
            "Please enter your email address."
        );

        isValid = false;

    }
    else if (!emailPattern.test(emailValue)) {

        showError(
            email,
            emailError,
            "Please enter a valid email address."
        );

        isValid = false;

    }


    /* =========================================
       VEHICLE
    ========================================== */

    if (vehicle.value === "") {

        showError(
            vehicle,
            vehicleError,
            "Please select a vehicle."
        );

        isValid = false;

    }


    /* =========================================
       MESSAGE
    ========================================== */

    if (message.value.trim() === "") {

        showError(
            message,
            messageError,
            "Please enter your message."
        );

        isValid = false;

    }


    return isValid;

}


/* =====================================================
   FORM SUBMISSION
===================================================== */

enquiryForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        /* =========================================
           VALIDATE FORM
        ========================================== */

        const isValid =
            validateForm();


        if (!isValid) {

            return;

        }


        /* =========================================
           GET DATABASE VEHICLE ID
        ========================================== */

        const selectedVehicle =
            vehicle.value;


        const databaseVehicleId =
            vehicleIdMap[selectedVehicle];


        if (!databaseVehicleId) {

            showError(
                vehicle,
                document.getElementById(
                    "vehicleError"
                ),
                "Please select a valid vehicle."
            );

            return;

        }


        /* =========================================
           GET VEHICLE TYPE
        ========================================== */

        const selectedOption =
            vehicle.options[
                vehicle.selectedIndex
            ];


        const vehicleType =
            selectedOption.parentElement.label;


        /* =========================================
           SEND DATA TO BACKEND
        ========================================== */

        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/enquiries",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },


                        body: JSON.stringify({

                            vehicle_id:
                                databaseVehicleId,

                            name:
                                fullName.value.trim(),

                            email:
                                email.value.trim(),

                            phone:
                                phone.value.trim(),

                            message:
                                message.value.trim(),

                            type:
                                vehicleType

                        })

                    }
                );


            const data =
                await response.json();


            /* =====================================
               BACKEND ERROR
            ====================================== */

            if (!response.ok) {

                throw new Error(

                    data.message ||
                    "Failed to submit enquiry."

                );

            }


            /* =====================================
               SUCCESS
            ====================================== */

            successMessage.classList.add(
                "show"
            );


            enquiryForm.reset();


            successMessage.scrollIntoView({

                behavior: "smooth",

                block: "nearest"

            });


        } catch (error) {

            console.error(
                "Enquiry submission error:",
                error
            );


            /* Show error to user */

            successMessage.innerHTML = `
                <strong>Error!</strong>
                ${error.message ||
                "Something went wrong. Please try again."}
            `;


            successMessage.classList.add(
                "show"
            );

        }

    }
);