// ============================================================
// RIDEHUB VEHICLE DATA
// ============================================================

const RIDEHUB_VEHICLES = [
    {
        id: "apache-160-4v",
        name: "TVS Apache RTR 160 4V",
        tagline: "RACING DNA UNLEASHED",
        category: "Motorcycle",
        price: 123320,
        mainImage: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1600&q=85",
        isFeatured: true
    },

    {
        id: "raider-125",
        name: "TVS Raider 125",
        tagline: "THE WICKED RIDE",
        category: "Motorcycle",
        price: 95219,
        mainImage: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1600&q=85",
        isFeatured: true
    },

    {
        id: "ntorq-125",
        name: "TVS Ntorq 125",
        tagline: "PLAY CONNECTED",
        category: "Scooter",
        price: 87542,
        mainImage: "https://images.unsplash.com/photo-1525160354320-d8e92641c563?auto=format&fit=crop&w=1600&q=85",
        isFeatured: true
    },

    {
        id: "jupiter-125",
        name: "TVS Jupiter 125",
        tagline: "MORE OF EVERYTHING",
        category: "Scooter",
        price: 89999,
        mainImage: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1600&q=85",
        isFeatured: true
    }
];


// ============================================================
// FORMAT PRICE
// ============================================================

function formatINR(val) {
    return `₹ ${Number(val).toLocaleString("en-IN")}`;
}


// ============================================================
// HERO SLIDER
// ============================================================

let currentHeroSlide = 0;
let heroSliderTimer = null;

const HERO_CHANGE_TIME = 4000;


// ============================================================
// SHOW HERO SLIDE
// ============================================================

function showHeroSlide(index) {

    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".slider-dots .dot");

    // Make sure slides exist
    if (!slides.length) {
        return;
    }

    // Keep index inside available slides
    if (index >= slides.length) {
        index = 0;
    }

    if (index < 0) {
        index = slides.length - 1;
    }

    currentHeroSlide = index;


    // --------------------------------------------------------
    // Remove active from all slides
    // --------------------------------------------------------

    slides.forEach(function(slide) {
        slide.classList.remove("active");
    });


    // --------------------------------------------------------
    // Remove active from all dots
    // --------------------------------------------------------

    dots.forEach(function(dot) {
        dot.classList.remove("active");
    });


    // --------------------------------------------------------
    // Activate selected slide
    // --------------------------------------------------------

    slides[currentHeroSlide].classList.add("active");


    // --------------------------------------------------------
    // Activate selected dot
    // --------------------------------------------------------

    if (dots[currentHeroSlide]) {
        dots[currentHeroSlide].classList.add("active");
    }
}


// ============================================================
// START AUTOMATIC HERO SLIDER
// ============================================================

function startHeroSlider() {

    // Clear existing timer first
    stopHeroSlider();

    heroSliderTimer = setInterval(function() {

        showHeroSlide(currentHeroSlide + 1);

    }, HERO_CHANGE_TIME);
}


// ============================================================
// STOP HERO SLIDER
// ============================================================

function stopHeroSlider() {

    if (heroSliderTimer !== null) {

        clearInterval(heroSliderTimer);

        heroSliderTimer = null;
    }
}


// ============================================================
// INITIALIZE HERO SLIDER
// ============================================================

function initializeHeroSlider() {

    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".slider-dots .dot");

    // If hero doesn't exist on this page, stop here
    if (!slides.length) {
        return;
    }


    // --------------------------------------------------------
    // Make sure only the first slide is active initially
    // --------------------------------------------------------

    showHeroSlide(0);


    // --------------------------------------------------------
    // DOT CLICK EVENTS
    // --------------------------------------------------------

    dots.forEach(function(dot, index) {

        dot.addEventListener("click", function() {

            // Show clicked slide
            showHeroSlide(index);

            // Restart timer
            // This gives the user a full 4 seconds
            // after manually selecting a slide.
            startHeroSlider();

        });

    });


    // --------------------------------------------------------
    // Start automatic rotation
    // --------------------------------------------------------

    startHeroSlider();
}


// ============================================================
// ENQUIRY MODAL
// ============================================================

function openEnquiryModal(title) {

    const modal =
        document.getElementById("enquiryModal");

    if (!modal) {
        return;
    }


    if (title) {

        const titleEl =
            document.getElementById("modalTitle");

        if (titleEl) {
            titleEl.textContent = title;
        }
    }


    modal.style.display = "flex";
}


// ============================================================
// CLOSE MODAL
// ============================================================

function closeModal() {

    const modal =
        document.getElementById("enquiryModal");

    if (modal) {

        modal.style.display = "none";

    }
}


// ============================================================
// SUBMIT ENQUIRY
// ============================================================

function handleModalSubmit(e) {

    e.preventDefault();

    alert(
        "Thank you! Your enquiry has been submitted successfully."
    );

    closeModal();
}


// ============================================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ============================================================

window.addEventListener("click", function(event) {

    const modal =
        document.getElementById("enquiryModal");

    if (event.target === modal) {

        closeModal();

    }

});

// ============================================================
// LOAD FEATURED BIKE PRICES FROM DATABASE
// ============================================================

async function loadFeaturedBikePrices() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/vehicles"
        );


        if (!response.ok) {

            throw new Error(
                "Failed to load vehicle data."
            );

        }


        const vehicles =
            await response.json();


        const featuredCards =
            document.querySelectorAll(
                ".bike-card[data-name]"
            );


        featuredCards.forEach(function (card) {

            const vehicleName =
                card.dataset.name;


            const databaseVehicle =
                vehicles.find(function (vehicle) {

                    return vehicle.name === vehicleName;

                });


            if (!databaseVehicle) {

                console.warn(
                    "Vehicle not found in database:",
                    vehicleName
                );

                return;

            }


            /* UPDATE PRICE */

            const priceElement =
                card.querySelector("p");


            if (priceElement) {

                priceElement.textContent =
                    "₹ " +
                    Number(
                        databaseVehicle.price
                    ).toLocaleString(
                        "en-IN"
                    );

            }

        });


    } catch (error) {

        console.error(
            "Featured bike loading error:",
            error
        );

    }

}


// ============================================================
// PAGE LOAD
// ============================================================

document.addEventListener("DOMContentLoaded", function() {

    initializeHeroSlider();

    loadFeaturedBikePrices();


});

// ============================================================
// MOBILE HAMBURGER MENU
// ============================================================

document.addEventListener("DOMContentLoaded", function() {

    const hamburger = document.querySelector(".hamburger");
    const navbar = document.querySelector(".navbar");

    if (!hamburger || !navbar) {
        return;
    }

    hamburger.addEventListener("click", function() {

        hamburger.classList.toggle("active");
        navbar.classList.toggle("mobile-active");

    });


    // Close menu when a navigation link is clicked

    const navLinks = navbar.querySelectorAll("a");

    navLinks.forEach(function(link) {

        link.addEventListener("click", function() {

            hamburger.classList.remove("active");
            navbar.classList.remove("mobile-active");

        });

    });

});

