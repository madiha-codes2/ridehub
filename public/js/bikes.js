/* =====================================================
   BIKES & SCOOTERS PAGE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /*
     * Only run this code on the Bikes & Scooters page.
     */

    const vehicleTabs =
        document.querySelectorAll(".vehicle-tab");

    const motorcycleSection =
        document.getElementById("motorcycles");

    const scooterSection =
        document.getElementById("scooters");


    /* =================================================
       MOTORCYCLE / SCOOTER TABS
    ================================================= */

    if (
        vehicleTabs.length &&
        motorcycleSection &&
        scooterSection
    ) {

        vehicleTabs.forEach(function (tab) {

            tab.addEventListener("click", function () {

                const target =
                    tab.getAttribute("data-target");


                /* Active tab */

                vehicleTabs.forEach(function (item) {

                    item.classList.remove("active");

                });

                tab.classList.add("active");


                /* Smooth scroll */

                if (target === "motorcycles") {

                    motorcycleSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }


                if (target === "scooters") {

                    scooterSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        });

    }


    /* =================================================
       FILTER ELEMENTS
    ================================================= */

    const minPrice =
        document.getElementById("min-price");

    const maxPrice =
        document.getElementById("max-price");

    const sortVehicles =
        document.getElementById("sort-vehicles");

    const applyFilters =
        document.getElementById("apply-filters");

    const clearFilters =
        document.getElementById("clear-filters");


    const allVehicleCards =
        document.querySelectorAll(".vehicle-card");

    const originalOrders = new Map();
        document.querySelectorAll(".vehicle-grid").forEach(function (grid) {

            originalOrders.set(
                grid,
                Array.from(grid.querySelectorAll(".vehicle-card"))
            );

        });


    /* =================================================
       APPLY FILTERS
    ================================================= */

    if (applyFilters) {

        applyFilters.addEventListener("click", function () {

            const minimum =
                Number(minPrice.value) || 0;

            const maximum =
                Number(maxPrice.value) || Infinity;


            allVehicleCards.forEach(function (card) {

                const price =
                    Number(card.dataset.price);


                if (
                    price >= minimum &&
                    price <= maximum
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });


            sortCards();

        });

    }

    function sortCards() {

        const sortValue =
            sortVehicles.value;


        const grids =
            document.querySelectorAll(".vehicle-grid");


        grids.forEach(function (grid) {

            const cards =
                Array.from(
                    grid.querySelectorAll(".vehicle-card")
                );


            if (sortValue === "az") {

                cards.sort(function (a, b) {

                    return a.dataset.name.localeCompare(
                        b.dataset.name
                    );

                });

            }


            else if (sortValue === "za") {

                cards.sort(function (a, b) {

                    return b.dataset.name.localeCompare(
                        a.dataset.name
                    );

                });

            }


            else if (sortValue === "default") {

                const originalCards =
                    originalOrders.get(grid);

                originalCards.forEach(function (card) {

                    grid.appendChild(card);

                });

                return;

            }


            cards.forEach(function (card) {

                grid.appendChild(card);

            });

        });

    }


    /* =================================================
       CLEAR FILTERS
    ================================================= */

        if (clearFilters) {

        clearFilters.addEventListener("click", function () {

            minPrice.value = "";

            maxPrice.value = "";

            sortVehicles.value = "default";


            allVehicleCards.forEach(function (card) {

                card.style.display = "";

            });


            location.reload();

        });

    }


    /* =================================================
       LOAD VEHICLE PRICE AND STOCK FROM DATABASE
    ================================================= */

    async function loadVehicleData() {

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


            allVehicleCards.forEach(function (card) {

                const vehicleName =
                    card.dataset.name;


                const databaseVehicle =
                    vehicles.find(function (vehicle) {

                        return vehicle.name === vehicleName;

                    });


                if (!databaseVehicle) {

                    return;

                }


                /* UPDATE PRICE */

                const price =
                    databaseVehicle.price;


                card.dataset.price =
                    price;


                const priceElement =
                    card.querySelector(
                        ".vehicle-info p"
                    );


                if (priceElement) {

                    priceElement.textContent =
                        "₹ " +
                        Number(price).toLocaleString(
                            "en-IN"
                        );

                }


                /* UPDATE STOCK STATUS */

                const vehicleInfo =
                    card.querySelector(
                        ".vehicle-info"
                    );


                let stockElement =
                    card.querySelector(
                        ".stock-status"
                    );


                if (!stockElement) {

                    stockElement =
                        document.createElement("span");

                    stockElement.classList.add(
                        "stock-status"
                    );

                    vehicleInfo.appendChild(
                        stockElement
                    );

                }


                stockElement.textContent =
                    databaseVehicle.stock_status;


                stockElement.classList.remove(
                    "in-stock",
                    "out-of-stock"
                );


                if (
                    databaseVehicle.stock_status ===
                    "In Stock"
                ) {

                    stockElement.classList.add(
                        "in-stock"
                    );

                } else {

                    stockElement.classList.add(
                        "out-of-stock"
                    );

                }

            });


        } catch (error) {

            console.error(
                "Vehicle loading error:",
                error
            );

        }

    }


    loadVehicleData();

});