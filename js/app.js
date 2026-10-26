/* =========================
   DONNÉES DE LA GALERIE
========================= */

const apartmentImages = [
    {
        src: "assets/images/salon-01.jpg",
        category: "Salon",
        title: "Un espace de vie lumineux"
    },
    {
        src: "assets/images/salon-02.jpg",
        category: "Salon",
        title: "Le cœur de l'appartement"
    },
    {
        src: "assets/images/chambre-01.jpg",
        category: "Chambre",
        title: "Une première chambre confortable"
    },
    {
        src: "assets/images/chambre-02.jpg",
        category: "Deuxième chambre",
        title: "Un espace polyvalent"
    },
    {
        src: "assets/images/douche.jpg",
        category: "Salle d'eau",
        title: "La salle de douche"
    },
    {
        src: "assets/images/cuisine.jpg",
        category: "Cuisine",
        title: "Un espace pratique au quotidien"
    },
    {
        src: "assets/images/terrasse.jpg",
        category: "Terrasse",
        title: "1,5 m² d'espace extérieur"
    },
    {
        src: "assets/images/parking-01.jpg",
        category: "Stationnement",
        title: "Places de parking"
    },
    {
        src: "assets/images/parking-02.jpg",
        category: "Stationnement",
        title: "Hall de parking"
    },
    {
        src: "assets/images/exterieur.jpg",
        category: "Batiment",
        title: "Batiment bien entretenu"
    },
    {
        src: "assets/images/ascenseur1.jpeg",
        category: "Batiment",
        title: "Votre ascenseur"
    },
    {
        src: "assets/images/toilet.jpeg",
        category: "Batiment",
        title: "Toilet fonctionnel avec rangement"
    },
    {
        src: "assets/images/plan.png",
        category: "Batiment",
        title: "Plan de l'apart"
    }
];


/* =========================
   ÉTAT DE LA GALERIE
========================= */

let currentImageIndex = 0;
let automaticSlider = null;


/* =========================
   ÉLÉMENTS DU DOM
========================= */

const mainImage =
    document.getElementById("mainImage");

const imageCategory =
    document.getElementById("imageCategory");

const imageTitle =
    document.getElementById("imageTitle");

const galleryCounter =
    document.getElementById("galleryCounter");

const thumbnailsContainer =
    document.getElementById("galleryThumbnails");

const previousButton =
    document.getElementById("previousImage");

const nextButton =
    document.getElementById("nextImage");

const gallery =
    document.querySelector(".gallery");

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");

const currentYear =
    document.getElementById("currentYear");


/* =========================
   CRÉATION DES MINIATURES
========================= */

function createThumbnails() {

    apartmentImages.forEach((image, index) => {

        const button =
            document.createElement("button");

        button.className =
            "gallery__thumbnail";

        button.type = "button";

        button.setAttribute(
            "aria-label",
            `Afficher la photo ${index + 1}`
        );


        const thumbnail =
            document.createElement("img");

        thumbnail.src =
            image.src;

        thumbnail.alt =
            image.title;

        thumbnail.loading =
            "lazy";


        button.appendChild(
            thumbnail
        );


        button.addEventListener(
            "click",
            () => {

                displayImage(index);

                restartAutomaticSlider();

            }
        );


        thumbnailsContainer.appendChild(
            button
        );

    });

}


/* =========================
   AFFICHAGE D'UNE IMAGE
========================= */

function displayImage(index) {

    if (
        index < 0 ||
        index >= apartmentImages.length
    ) {
        return;
    }


    currentImageIndex =
        index;


    const selectedImage =
        apartmentImages[currentImageIndex];


    mainImage.classList.add(
        "fade"
    );


    setTimeout(
        () => {

            mainImage.src =
                selectedImage.src;

            mainImage.alt =
                selectedImage.title;

            imageCategory.textContent =
                selectedImage.category;

            imageTitle.textContent =
                selectedImage.title;

            galleryCounter.textContent =
                `${currentImageIndex + 1} / ${apartmentImages.length}`;


            updateActiveThumbnail();


            mainImage.classList.remove(
                "fade"
            );

        },
        180
    );

}


/* =========================
   MINIATURE ACTIVE
========================= */

function updateActiveThumbnail() {

    const thumbnails =
        document.querySelectorAll(
            ".gallery__thumbnail"
        );


    thumbnails.forEach(
        (thumbnail, index) => {

            thumbnail.classList.toggle(
                "active",
                index === currentImageIndex
            );

        }
    );


    /*
     * Important :
     * on ne fait PAS de scrollIntoView(),
     * car cela pouvait faire remonter
     * toute la page vers la galerie.
     */

    const activeThumbnail =
        thumbnails[currentImageIndex];


    if (!activeThumbnail) {
        return;
    }


    /*
     * On fait uniquement défiler
     * le conteneur des miniatures.
     */

    const container =
        thumbnailsContainer;


    const thumbnailTop =
        activeThumbnail.offsetTop;

    const thumbnailHeight =
        activeThumbnail.offsetHeight;

    const containerHeight =
        container.clientHeight;


    const targetScroll =
        thumbnailTop
        - containerHeight / 2
        + thumbnailHeight / 2;


    container.scrollTo({
        top: targetScroll,
        behavior: "smooth"
    });

}


/* =========================
   IMAGE SUIVANTE
========================= */

function showNextImage() {

    const nextIndex =
        (
            currentImageIndex + 1
        ) % apartmentImages.length;


    displayImage(
        nextIndex
    );

}


/* =========================
   IMAGE PRÉCÉDENTE
========================= */

function showPreviousImage() {

    const previousIndex =
        (
            currentImageIndex
            - 1
            + apartmentImages.length
        )
        % apartmentImages.length;


    displayImage(
        previousIndex
    );

}


/* =========================
   SLIDER AUTOMATIQUE
========================= */

function startAutomaticSlider() {

    stopAutomaticSlider();


    automaticSlider =
        setInterval(
            showNextImage,
            5000
        );

}


function stopAutomaticSlider() {

    if (automaticSlider !== null) {

        clearInterval(
            automaticSlider
        );

        automaticSlider =
            null;

    }

}


function restartAutomaticSlider() {

    stopAutomaticSlider();

    startAutomaticSlider();

}


/* =========================
   BOUTONS DE NAVIGATION
========================= */

previousButton.addEventListener(
    "click",
    () => {

        showPreviousImage();

        restartAutomaticSlider();

    }
);


nextButton.addEventListener(
    "click",
    () => {

        showNextImage();

        restartAutomaticSlider();

    }
);


/* =========================
   NAVIGATION CLAVIER
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        /*
         * Évite de changer les photos
         * quand l'utilisateur est dans
         * un champ de formulaire.
         */

        const activeElement =
            document.activeElement;


        const isTyping =
            activeElement &&
            (
                activeElement.tagName === "INPUT" ||
                activeElement.tagName === "TEXTAREA"
            );


        if (isTyping) {
            return;
        }


        if (event.key === "ArrowRight") {

            showNextImage();

            restartAutomaticSlider();

        }


        if (event.key === "ArrowLeft") {

            showPreviousImage();

            restartAutomaticSlider();

        }

    }
);


/* =========================
   PAUSE AU SURVOL
========================= */

gallery.addEventListener(
    "mouseenter",
    stopAutomaticSlider
);


gallery.addEventListener(
    "mouseleave",
    startAutomaticSlider
);


/* =========================
   PAUSE SI L'ONGLET
   N'EST PLUS ACTIF
========================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            stopAutomaticSlider();

        } else {

            startAutomaticSlider();

        }

    }
);


/* =========================
   MENU MOBILE
========================= */

menuToggle.addEventListener(
    "click",
    () => {

        mainNav.classList.toggle(
            "active"
        );

    }
);


mainNav
    .querySelectorAll("a")
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove(
                        "active"
                    );

                }
            );

        }
    );


/* =========================
   ANNÉE DU FOOTER
========================= */

currentYear.textContent =
    new Date().getFullYear();


/* =========================
   INITIALISATION
========================= */

createThumbnails();

displayImage(0);

startAutomaticSlider();