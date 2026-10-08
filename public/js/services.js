/* =====================================================
   RIDEHUB SERVICES PAGE
===================================================== */

const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

if (mobileMenu && navLinks) {

    mobileMenu.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("show");

        mobileMenu.classList.toggle("active", isOpen);

        mobileMenu.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /* ---------------------------------------------
       CLOSE MENU AFTER CLICKING A LINK
    --------------------------------------------- */

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            mobileMenu.classList.remove("active");

            mobileMenu.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}