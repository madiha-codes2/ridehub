/* =========================================================
   RIDEHUB ADMIN LOGIN
========================================================= */


const loginForm = document.getElementById("adminLoginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const passwordToggle = document.getElementById("passwordToggle");

const loginButton = document.getElementById("loginButton");

const loginButtonText = document.getElementById("loginButtonText");

const loginMessage = document.getElementById("loginMessage");



/* =========================================================
   SHOW / HIDE PASSWORD
========================================================= */

passwordToggle.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        passwordToggle.setAttribute(
            "aria-label",
            "Hide password"
        );

    } else {

        passwordInput.type = "password";

        passwordToggle.setAttribute(
            "aria-label",
            "Show password"
        );

    }

});



/* =========================================================
   ADMIN LOGIN
========================================================= */

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;


    if (!email || !password) {

        loginMessage.textContent =
            "Please enter your email and password.";

        return;

    }

    loginMessage.textContent = "";


    loginButton.disabled = true;

    loginButtonText.textContent = "Signing In...";


    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/admin/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        const data = await response.json();


        /* -----------------------------------------
           LOGIN FAILED
        ----------------------------------------- */

        if (!response.ok) {

            loginMessage.textContent =
                data.message ||
                "Invalid email or password.";

            loginButton.disabled = false;

            loginButtonText.textContent = "Sign In";

            return;

        }


        /* -----------------------------------------
           LOGIN SUCCESSFUL
        ----------------------------------------- */

        loginButtonText.textContent = "Success!";




        window.location.href = "../html/dashboard.html";


    } catch (error) {

        console.error(
            "Admin login error:",
            error
        );


        loginMessage.textContent =
            "Unable to connect to the server.";


        loginButton.disabled = false;

        loginButtonText.textContent = "Sign In";

    }

});