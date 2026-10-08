/* =========================================================
   RIDEHUB - VEHICLE DETAILS JAVASCRIPT
========================================================= */


/* =========================================================
   VEHICLE DATA
========================================================= */

const vehicles = {

    // =========================
    // MOTORCYCLES
    // =========================

    "apache-rtr-160-4v": {
        name: "TVS Apache RTR 160 4V",
        type: "Motorcycle",
        tagline: "Racing DNA Unleashed",
        price: 125890,
        images: [
            "img/bikes/apache-rtr160.png",
            "img/bikes/apache-rtr160-2.png"
        ],
        specifications: {
            engine: "159.7 cc",
            power: "16.04 PS",
            mileage: "45 km/l",
            gearbox: "5 Speed",
            fuelTank: "12 L",
            weight: "147 kg"
        },
        features: [
            "Race Tuned Fuel Injection",
            "4 Valve Oil-Cooled Engine",
            "SmartXonnect with Bluetooth",
            "Dual Channel ABS",
            "LED Headlamp",
            "Digital Instrument Cluster"
        ]
    },

    "yamaha-r15-v4": {
        name: "Yamaha R15 V4",
        type: "Motorcycle",
        tagline: "Born To Race",
        price: 179000,
        images: [
            "img/bikes/yamaha-r15.png",
            "img/bikes/yamaha-r15-2.png"
        ],
        specifications: {
            engine: "155 cc",
            power: "18.4 PS",
            mileage: "40 km/l",
            gearbox: "6 Speed",
            fuelTank: "11 L",
            weight: "141 kg"
        },
        features: [
            "Liquid-Cooled Engine",
            "Assist and Slipper Clutch",
            "Traction Control",
            "Dual Channel ABS",
            "LED Lighting",
            "Digital Instrument Cluster"
        ]
    },

    "hunter-350": {
        name: "Royal Enfield Hunter 350",
        type: "Motorcycle",
        tagline: "Pure Motorcycling",
        price: 171077,
        images: [
            "img/bikes/hunter-350.png",
            "img/bikes/hunter-350-2.png"
        ],
        specifications: {
            engine: "349 cc",
            power: "20.2 PS",
            mileage: "36 km/l",
            gearbox: "5 Speed",
            fuelTank: "13 L",
            weight: "181 kg"
        },
        features: [
            "J-Series Engine",
            "Dual Channel ABS",
            "Tripper Navigation",
            "LED Rear Light",
            "Digital-Analog Instrument Cluster",
            "Refined Engine Performance"
        ]
    },

    "apache-rtr-200-4v": {
        name: "TVS Apache RTR 200 4V",
        type: "Motorcycle",
        tagline: "Performance Redefined",
        price: 133736,
        images: [
            "img/bikes/apache-rtr200.png",
            "img/bikes/apache-rtr200-2.png"
        ],
        specifications: {
            engine: "197.75 cc",
            power: "20.8 PS",
            mileage: "38 km/l",
            gearbox: "5 Speed",
            fuelTank: "12 L",
            weight: "152 kg"
        },
        features: [
            "Race Tuned Fuel Injection",
            "Oil-Cooled Engine",
            "Dual Channel ABS",
            "SmartXonnect",
            "LED Headlamp",
            "Digital Instrument Cluster"
        ]
    },

    "pulsar-ns200": {
        name: "Bajaj Pulsar NS200",
        type: "Motorcycle",
        tagline: "Unleash The Beast",
        price: 164496,
        images: [
            "img/bikes/pulsar-ns200.png",
            "img/bikes/pulsar-ns200-2.png"
        ],
        specifications: {
            engine: "199.5 cc",
            power: "24.5 PS",
            mileage: "40 km/l",
            gearbox: "6 Speed",
            fuelTank: "12 L",
            weight: "158 kg"
        },
        features: [
            "Liquid-Cooled Engine",
            "Fuel Injection",
            "Dual Channel ABS",
            "Perimeter Frame",
            "LED Tail Lamp",
            "Digital Instrument Cluster"
        ]
    },

    "gixxer-sf": {
        name: "Suzuki Gixxer SF",
        type: "Motorcycle",
        tagline: "Ride With Attitude",
        price: 141460,
        images: [
            "img/bikes/suzuki-gixxersf.png",
            "img/bikes/suzuki-gixxersf-2.png"
        ],
        specifications: {
            engine: "155 cc",
            power: "13.6 PS",
            mileage: "45 km/l",
            gearbox: "5 Speed",
            fuelTank: "12 L",
            weight: "148 kg"
        },
        features: [
            "Fuel Injection",
            "LED Headlamp",
            "Dual Channel ABS",
            "Fully Digital Instrument Cluster",
            "Sporty Fairing",
            "Suzuki Easy Start System"
        ]
    },

    "hornet-2.0": {
        name: "Honda Hornet 2.0",
        type: "Motorcycle",
        tagline: "Rule The Streets",
        price: 149598,
        images: [
            "img/bikes/honda-hornet2.0.png",
            "img/bikes/honda-hornet2.0-2.png"
        ],
        specifications: {
            engine: "184.4 cc",
            power: "17.26 PS",
            mileage: "42 km/l",
            gearbox: "5 Speed",
            fuelTank: "12 L",
            weight: "142 kg"
        },
        features: [
            "Honda Selectable Torque Control",
            "Dual Channel ABS",
            "LED Headlamp",
            "Digital Instrument Cluster",
            "Sporty Styling",
            "Assist Slipper Clutch"
        ]
    },


    // =========================
    // SCOOTERS
    // =========================

    "ntorq-125": {
        name: "TVS Ntorq 125",
        type: "Scooter",
        tagline: "Smart. Sporty. Connected.",
        price: 97000,
        images: [
            "img/scooters/tvs-ntorq125.png",
            "img/scooters/tvs-ntorq125-2.png",
        ],
        specifications: {
            engine: "124.8 cc",
            power: "10.2 PS",
            mileage: "47 km/l",
            gearbox: "Automatic",
            fuelTank: "5.8 L",
            weight: "118 kg"
        },
        features: [
            "SmartXonnect Technology",
            "Bluetooth Connectivity",
            "Full Digital Display",
            "LED Headlamp",
            "External Fuel Fill",
            "Sporty Design"
        ]
    },

    "jupiter-125": {
        name: "TVS Jupiter 125",
        type: "Scooter",
        tagline: "More Comfort. More Convenience.",
        price: 89935,
        images: [
            "img/scooters/tvs-jupitar.png",
            "img/scooters/tvs-jupitar-2.png",
        ],
        specifications: {
            engine: "124.8 cc",
            power: "8.2 PS",
            mileage: "50 km/l",
            gearbox: "Automatic",
            fuelTank: "5.3 L",
            weight: "109 kg"
        },
        features: [
            "LED Headlamp",
            "External Fuel Fill",
            "Large Underseat Storage",
            "Digital Analog Cluster",
            "USB Charging",
            "Comfortable Seating"
        ]
    },

    "activa-6g": {
        name: "Honda Activa 6G",
        type: "Scooter",
        tagline: "India's Favourite Scooter",
        price: 88553,
        images: [
            "img/scooters/activa-6g.png",
            "img/scooters/activa-6g-2.png",
        ],
        specifications: {
            engine: "109.51 cc",
            power: "7.79 PS",
            mileage: "50 km/l",
            gearbox: "Automatic",
            fuelTank: "5.3 L",
            weight: "106 kg"
        },
        features: [
            "Silent Start System",
            "External Fuel Fill",
            "LED Headlamp",
            "Digital Analog Meter",
            "Engine Start Stop Switch",
            "Combi Brake System"
        ]
    },

    "access-125": {
        name: "Suzuki Access 125",
        type: "Scooter",
        tagline: "The Perfect Everyday Ride",
        price: 89356,
        images: [
            "img/scooters/suzuki-access125.png",
            "img/scooters/suzuki-access125-2.png",
        ],
        specifications: {
            engine: "124 cc",
            power: "8.7 PS",
            mileage: "45 km/l",
            gearbox: "Automatic",
            fuelTank: "5.3 L",
            weight: "103 kg"
        },
        features: [
            "Suzuki Easy Start System",
            "LED Headlamp",
            "USB Charging",
            "Digital Instrument Cluster",
            "Large Storage Space",
            "External Fuel Filling"
        ]
    },

    "burgman": {
        name: "Suzuki Burgman Street",
        type: "Scooter",
        tagline: "Maxi-Scooter Styling",
        price: 112333,
        images: [
            "img/scooters/suzuki-burgman.png",
            "img/scooters/suzuki-burgman-2.png",
        ],
        specifications: {
            engine: "124 cc",
            power: "8.7 PS",
            mileage: "45 km/l",
            gearbox: "Automatic",
            fuelTank: "5.6 L",
            weight: "108 kg"
        },
        features: [
            "LED Headlamp",
            "USB Charging",
            "Large Underseat Storage",
            "Digital Instrument Cluster",
            "Maxi-Scooter Design",
            "Front Disc Brake"
        ]
    },

    "aprilia-sr": {
        name: "Aprilia SR",
        type: "Scooter",
        tagline: "Born For Performance",
        price: 131436,
        images: [
            "img/scooters/aprilia-sr.png",
            "img/scooters/aprilia-sr-2.png",
        ],
        specifications: {
            engine: "174.7 cc",
            power: "17.7 PS",
            mileage: "35 km/l",
            gearbox: "Automatic",
            fuelTank: "7 L",
            weight: "122 kg"
        },
        features: [
            "Sporty Styling",
            "LED Headlamp",
            "Digital Instrument Cluster",
            "Disc Brakes",
            "Large Wheels",
            "Performance Focused Engine"
        ]
    },

    "avenis": {
        name: "Suzuki Avenis",
        type: "Scooter",
        tagline: "Sporty. Smart. Practical.",
        price: 91123,
        images: [
            "img/scooters/suzuki-avenis.png",
            "img/scooters/suzuki-avenis-2.png",
        ],
        specifications: {
            engine: "124 cc",
            power: "8.7 PS",
            mileage: "50 km/l",
            gearbox: "Automatic",
            fuelTank: "5.2 L",
            weight: "106 kg"
        },
        features: [
            "Bluetooth Connectivity",
            "LED Headlamp",
            "Digital Instrument Cluster",
            "USB Charging",
            "Sporty Styling",
            "External Fuel Filling"
        ]
    }

};

/* =========================================================
   DATABASE VEHICLE ID MAPPING
========================================================= */

const vehicleDatabaseIds = {

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

/* =========================================================
   GET VEHICLE FROM URL
========================================================= */

const urlParams = new URLSearchParams(window.location.search);

const vehicleId = urlParams.get("id") || "apache-rtr-160-4v";

const vehicle = vehicles[vehicleId] || vehicles["apache-rtr-160-4v"];


/* =========================================================
   LOAD VEHICLE INFORMATION
========================================================= */

async function loadVehicle() {

    /* -----------------------------------------
       BASIC VEHICLE INFORMATION
    ----------------------------------------- */

    const vehicleName =
        document.getElementById("vehicleName");

    const vehicleTagline =
        document.getElementById("vehicleTagline");

    const vehiclePrice =
        document.getElementById("vehicle-price");


    if (vehicleName) {
        vehicleName.textContent = vehicle.name;
    }

    if (vehicleTagline) {
        vehicleTagline.textContent = vehicle.tagline;
    }

    if (vehiclePrice) {
        vehiclePrice.textContent =
            `₹ ${vehicle.price.toLocaleString("en-IN")}`;
    }


    /* -----------------------------------------
       QUICK INFORMATION
    ----------------------------------------- */

    const quickEngine =
        document.getElementById("quick-engine");

    const quickPower =
        document.getElementById("quick-power");

    const quickMileage =
        document.getElementById("quick-mileage");


    if (quickEngine) {
        quickEngine.textContent =
            vehicle.specifications.engine;
    }

    if (quickPower) {
        quickPower.textContent =
            vehicle.specifications.power;
    }

    if (quickMileage) {
        quickMileage.textContent =
            vehicle.specifications.mileage;
    }


    /* -----------------------------------------
       SPECIFICATIONS
    ----------------------------------------- */

    const specEngine =
        document.getElementById("spec-engine");

    const specPower =
        document.getElementById("spec-power");

    const specMileage =
        document.getElementById("spec-mileage");

    const specGearbox =
        document.getElementById("spec-gearbox");

    const specFuel =
        document.getElementById("spec-fuel");

    const specWeight =
        document.getElementById("spec-weight");


    if (specEngine) {
        specEngine.textContent =
            vehicle.specifications.engine;
    }

    if (specPower) {
        specPower.textContent =
            vehicle.specifications.power;
    }

    if (specMileage) {
        specMileage.textContent =
            vehicle.specifications.mileage;
    }

    if (specGearbox) {
        specGearbox.textContent =
            vehicle.specifications.gearbox;
    }

    if (specFuel) {
        specFuel.textContent =
            vehicle.specifications.fuelTank;
    }

    if (specWeight) {
        specWeight.textContent =
            vehicle.specifications.weight;
    }


    /* -----------------------------------------
       VEHICLE IMAGE
    ----------------------------------------- */

    loadVehicleImages();


    /* -----------------------------------------
       FEATURES
    ----------------------------------------- */

    loadFeatures();


    /* -----------------------------------------
       EMI VEHICLE PRICE
    ----------------------------------------- */

    const vehicleAmount =
        document.getElementById("vehicleAmount");


    if (vehicleAmount) {

        vehicleAmount.value =
            vehicle.price;

    }

}


/* =========================================================
   LOAD VEHICLE IMAGE
========================================================= */

function loadVehicleImages() {

    const mainImage =
        document.getElementById("main-vehicle-image");

    const placeholder =
        document.getElementById("imagePlaceholder");

    const thumbnails =
        document.querySelectorAll(".thumbnail");


    if (!mainImage) {
        return;
    }


    /* -----------------------------------------
       MAIN IMAGE
    ----------------------------------------- */

    if (
        vehicle.images &&
        vehicle.images.length > 0 &&
        vehicle.images[0]
    ) {

        mainImage.src =
            vehicle.images[0];

        mainImage.alt =
            vehicle.name;

        mainImage.style.display =
            "block";


        if (placeholder) {

            placeholder.style.display =
                "none";

        }

    } else {

        mainImage.style.display =
            "none";


        if (placeholder) {

            placeholder.style.display =
                "flex";

        }

    }


    /* -----------------------------------------
       THUMBNAILS
    ----------------------------------------- */

    thumbnails.forEach((thumbnail, index) => {

        const image =
            vehicle.images[index];


        if (image) {

            thumbnail.style.backgroundImage =
                `url("${image}")`;

            thumbnail.style.backgroundSize =
                "contain";

            thumbnail.style.backgroundPosition =
                "center";

            thumbnail.style.backgroundRepeat =
                "no-repeat";


            const span =
                thumbnail.querySelector("span");


            if (span) {

                span.style.display =
                    "none";

            }

        }


        thumbnail.addEventListener(
            "click",
            function () {

                thumbnails.forEach(item => {

                    item.classList.remove("active");

                });


                thumbnail.classList.add("active");


                if (vehicle.images[index]) {

                    mainImage.src =
                        vehicle.images[index];

                    mainImage.alt =
                        vehicle.name;

                    mainImage.style.display =
                        "block";


                    if (placeholder) {

                        placeholder.style.display =
                            "none";

                    }

                }

            }
        );

    });

}


/* =========================================================
   LOAD FEATURES
========================================================= */

function loadFeatures() {

    const featuresList =
        document.getElementById("features-list");


    if (!featuresList) {
        return;
    }


    featuresList.innerHTML = "";


    vehicle.features.forEach(
        function (feature) {

            const featureItem =
                document.createElement("div");


            featureItem.className =
                "feature-item";


            featureItem.innerHTML = `
                <span class="feature-icon">✓</span>
                <span>${feature}</span>
            `;


            featuresList.appendChild(
                featureItem
            );

        }
    );

}


/* =========================================================
   SPECIFICATIONS / FEATURES TABS
========================================================= */

const detailTabs =
    document.querySelectorAll(".details-tab");

const tabContents =
    document.querySelectorAll(".tab-content");


detailTabs.forEach(
    function (tab) {

        tab.addEventListener(
            "click",
            function () {

                const target =
                    tab.dataset.tab;


                /* Remove active state */

                detailTabs.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                tabContents.forEach(
                    function (content) {

                        content.classList.remove(
                            "active"
                        );

                    }
                );


                /* Add active state */

                tab.classList.add(
                    "active"
                );


                const targetContent =
                    document.getElementById(target);


                if (targetContent) {

                    targetContent.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================================
   EMI CALCULATOR
========================================================= */

const calculateEmiButton =
    document.getElementById("calculateEmi");


if (calculateEmiButton) {

    calculateEmiButton.addEventListener(
        "click",
        calculateEMI
    );

}


function calculateEMI() {

    const price =
        Number(
            document.getElementById(
                "vehicleAmount"
            ).value
        );


    const downPayment =
        Number(
            document.getElementById(
                "downPayment"
            ).value
        );


    const months =
        Number(
            document.getElementById(
                "loanDuration"
            ).value
        );


    const annualInterest =
        Number(
            document.getElementById(
                "interestRate"
            ).value
        );


    const emiResult =
        document.getElementById(
            "emiResult"
        );


    /* -----------------------------------------
       VALIDATION
    ----------------------------------------- */

    if (
        price <= 0 ||
        downPayment < 0 ||
        downPayment >= price ||
        months <= 0 ||
        annualInterest < 0
    ) {

        emiResult.textContent =
            "Enter valid values";

        return;

    }


    /* -----------------------------------------
       LOAN AMOUNT
    ----------------------------------------- */

    const loanAmount =
        price - downPayment;


    /* -----------------------------------------
       MONTHLY INTEREST
    ----------------------------------------- */

    const monthlyRate =
        annualInterest / 12 / 100;


    let emi;


    if (monthlyRate === 0) {

        emi =
            loanAmount / months;

    } else {

        emi =
            loanAmount *
            monthlyRate *
            Math.pow(
                1 + monthlyRate,
                months
            ) /
            (
                Math.pow(
                    1 + monthlyRate,
                    months
                ) - 1
            );

    }


    /* -----------------------------------------
       DISPLAY EMI
    ----------------------------------------- */

    const formattedEMI =
        Math.round(emi)
            .toLocaleString("en-IN");


    emiResult.textContent =
        `₹ ${formattedEMI} /month`;

}

/* =========================================================
SCROLL TO EMI
========================================================= */

const scrollToEmi =
    document.getElementById("scrollToEmi");

if (scrollToEmi) {

    scrollToEmi.addEventListener(
        "click",
        function () {

            const emiCard =
                document.getElementById("emiCard");

            if (emiCard) {

                emiCard.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        }
    );

}


/* =========================================================
ENQUIRE NOW
========================================================= */

const vehicleEnquireBtn =
    document.getElementById("vehicleEnquireBtn");

if (vehicleEnquireBtn) {

    vehicleEnquireBtn.href =
        "enquiry.html?vehicle=" +
        encodeURIComponent(vehicleId);

}

/* =========================================================
   LOAD LATEST PRICE FROM DATABASE
========================================================= */

async function loadDatabaseVehicleData() {

    try {

        const databaseId =
            vehicleDatabaseIds[vehicleId];


        if (!databaseId) {

            console.error(
                "Database ID not found for:",
                vehicleId
            );

            return;

        }


        const response = await fetch(

            "http://localhost:5000/api/vehicles/" +
            databaseId

        );


        if (!response.ok) {

            throw new Error(
                "Failed to load vehicle data."
            );

        }


        const databaseVehicle =
            await response.json();


        /* -----------------------------------------
           UPDATE PRICE
        ----------------------------------------- */

        const vehiclePrice =
            document.getElementById(
                "vehicle-price"
            );


        if (vehiclePrice) {

            vehiclePrice.textContent =
                "₹ " +
                Number(
                    databaseVehicle.price
                ).toLocaleString(
                    "en-IN"
                );

        }


        /* -----------------------------------------
           UPDATE EMI VEHICLE AMOUNT
        ----------------------------------------- */

        const vehicleAmount =
            document.getElementById(
                "vehicleAmount"
            );


        if (vehicleAmount) {

            vehicleAmount.value =
                databaseVehicle.price;

        }


    } catch (error) {

        console.error(

            "Vehicle database loading error:",

            error

        );

    }

}

/* =========================================================
INITIALIZE PAGE
========================================================= */

loadVehicle();

loadDatabaseVehicleData();