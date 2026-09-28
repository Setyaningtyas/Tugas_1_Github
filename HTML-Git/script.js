// ================================
// LOADING SCREEN
// ================================

window.addEventListener("load", function () {

    setTimeout(function () {

        const loadingScreen =
            document.getElementById("loading-screen");

        if (loadingScreen) {
            loadingScreen.classList.add("hide");
        }

    }, 1800);

});


// ================================
// MOBILE MENU
// ================================

const menuButton =
    document.getElementById("menuButton");

const navMenu =
    document.getElementById("navMenu");

if (menuButton && navMenu) {

    menuButton.addEventListener("click", function () {

        navMenu.classList.toggle("show");

    });

}


// ================================
// CLOSE MENU
// ================================

const navLinks =
    document.querySelectorAll("#navMenu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navMenu) {
            navMenu.classList.remove("show");
        }

    });

});


// ================================
// ACTIVE NAVBAR
// ================================

window.addEventListener("scroll", function () {

    const sections =
        document.querySelectorAll("section");

    const links =
        document.querySelectorAll("#navMenu a");

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });

    links.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});