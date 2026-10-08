document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const messageError = document.getElementById("messageError");

    const successMessage = document.getElementById("successMessage");


    /* =================================================
       CLEAR ERRORS
    ================================================= */

    function clearErrors() {

        nameError.textContent = "";
        emailError.textContent = "";
        phoneError.textContent = "";
        messageError.textContent = "";

        nameInput.style.borderColor = "";
        emailInput.style.borderColor = "";
        phoneInput.style.borderColor = "";
        messageInput.style.borderColor = "";
    }


    /* =================================================
       EMAIL VALIDATION
    ================================================= */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);
    }


    /* =================================================
       FORM SUBMIT
    ================================================= */

    form.addEventListener("submit", async function (event) {

    event.preventDefault();

    clearErrors();

    successMessage.classList.remove("show");

    let isValid = true;


    /* =================================================
       NAME
    ================================================= */

    if (nameInput.value.trim() === "") {

        nameError.textContent =
            "Please enter your name.";

        nameInput.style.borderColor =
            "#b33a3a";

        isValid = false;

    }


    /* =================================================
       EMAIL
    ================================================= */

    if (emailInput.value.trim() === "") {

        emailError.textContent =
            "Please enter your email address.";

        emailInput.style.borderColor =
            "#b33a3a";

        isValid = false;

    } else if (!isValidEmail(emailInput.value.trim())) {

        emailError.textContent =
            "Please enter a valid email address.";

        emailInput.style.borderColor =
            "#b33a3a";

        isValid = false;

    }


    /* =================================================
       PHONE
    ================================================= */

    const phoneValue = phoneInput.value.trim();

    const phonePattern = /^[6-9][0-9]{9}$/;

    if (phoneValue === "") {

        phoneError.textContent =
            "Please enter your phone number.";

        phoneInput.style.borderColor =
            "#b33a3a";

        isValid = false;

    }
    else if (!phonePattern.test(phoneValue)) {

        phoneError.textContent =
            "Please enter a valid 10-digit phone number.";

        phoneInput.style.borderColor =
            "#b33a3a";

        isValid = false;

    }


    /* =================================================
       MESSAGE
    ================================================= */

    if (messageInput.value.trim() === "") {

        messageError.textContent =
            "Please enter your message.";

        messageInput.style.borderColor =
            "#b33a3a";

        isValid = false;

    }


    /* =================================================
       STOP IF INVALID
    ================================================= */

    if (!isValid) {

        return;

    }


    /* =================================================
       SEND DATA TO BACKEND
    ================================================= */

    try {

        const response = await fetch(
            "http://localhost:5000/api/contact",
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    name:
                        nameInput.value.trim(),

                    email:
                        emailInput.value.trim(),

                    phone:
                        phoneInput.value.trim(),

                    message:
                        messageInput.value.trim()

                })

            }
        );


        const data =
            await response.json();


        /* =============================================
           BACKEND ERROR
        ============================================= */

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to send message."
            );

        }


        /* =============================================
           SUCCESS
        ============================================= */

        successMessage.textContent =
            data.message;

        successMessage.classList.add("show");


        form.reset();


        window.setTimeout(function () {

            successMessage.classList.remove("show");

        }, 5000);


    } catch (error) {

        console.error(
            "Error:",
            error
        );


        successMessage.textContent =
            error.message ||
            "Something went wrong. Please try again.";


        successMessage.classList.add("show");

    }

})
});