document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const hamburger = document.querySelector(".mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {

        hamburger.addEventListener("click", () => {

            hamburger.classList.toggle("active");

            navLinks.classList.toggle("show");

        });



        navLinks.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                hamburger.classList.remove("active");

                navLinks.classList.remove("show");

            });

        });

    }


    
    const instagramLink = document.querySelector(".instagram-link");

    if (instagramLink) {

        instagramLink.addEventListener("click", (event) => {

            event.preventDefault();

            console.log("RideHub Instagram link");

        });

    }


    
    const sections = document.querySelectorAll(
        ".about-intro, .mission-section, .why-section, .stats-section"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    sections.forEach((section) => {

        observer.observe(section);

    });

});