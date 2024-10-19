// // Rotate hero image
// const hero = document.getElementById("hero");
//
// const imagesSetSmallScreen = [
//     "./assets/img/shoes/white.webp",
//     "./assets/img/shoes/blush.webp",
//     "./assets/img/shoes/tiffany.webp"
// ];
//
// const imagesSetLargeScreen1 = [
//     "./assets/img/shoes/white.webp",
//     "./assets/img/shoes/hero-1.webp",
//     "./assets/img/shoes/hero-2.webp",
//     "./assets/img/shoes/hero-3.webp"
// ];
//
// const imagesSetLargeScreen2 = [
//     "./assets/img/shoes/hero-3.webp",
//     "./assets/img/shoes/hero-tiffany.webp",
//     "./assets/img/shoes/hero-blush.webp"
// ];
//
// let currentIndex = 0;
// let isInitialRotation = true;
//
// function changeBackground() {
//     let currentImagesSet;
//
//     // Check screen width
//     const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//
//     if (screenWidth < 821) {
//         currentImagesSet = imagesSetSmallScreen;
//     } else {
//         currentImagesSet = isInitialRotation ? imagesSetLargeScreen1 : imagesSetLargeScreen2;
//     }
//
//     hero.style.backgroundImage = `url('${currentImagesSet[currentIndex % currentImagesSet.length]}')`;
//     currentIndex++;
//
//     // Reset to the start of the set after reaching the last image in the set
//     if (currentIndex === currentImagesSet.length) {
//         currentIndex = 0; // Reset to the start of the set
//
//         // Switch to continuous rotation after the initial rotation
//         isInitialRotation = false;
//     }
// }
//
// const intervalId = setInterval(changeBackground, 2000);




// Changes the pre-order image/dot color and select
const dotWrappers = document.querySelectorAll(".dot-wrapper");
const preorderImg = document.querySelector(".preorder-img");
const preorderSelector = document.getElementById("preorderSelector");

dotWrappers.forEach((wrapper) => {
    wrapper.addEventListener("click", () => {
        dotWrappers.forEach((otherWrapper) => {
            otherWrapper.querySelector(".colorway-dot").classList.remove("dot-active", "dot-active-white");
        });

        const clickedDot = wrapper.querySelector(".colorway-dot");
        const isDotWhite = clickedDot.classList.contains("dot-white");

        clickedDot.classList.add("dot-active");

        if (isDotWhite) {
            clickedDot.classList.add("dot-active-white");
        }

        changeBackgroundImage(clickedDot);

        // Update the selected option in the dropdown
        const colorwayName = wrapper.querySelector(".colorway-name").textContent.toLowerCase();
        preorderSelector.value = colorwayName;
    });
});

preorderSelector.addEventListener("change", (event) => {
    const selectedColor = event.target.value;
    const dot = document.querySelector(`.dot-${selectedColor}`);

    dotWrappers.forEach((wrapper) => {
        wrapper.querySelector(".colorway-dot").classList.remove("dot-active", "dot-active-white");
    });

    dot.classList.add("dot-active");

    if (dot.classList.contains("dot-white")) {
        dot.classList.add("dot-active-white");
    }

    changeBackgroundImage(dot);
});

function changeBackgroundImage(clickedDot) {
    const dotClasses = clickedDot.classList;
    if (dotClasses.contains("dot-blush")) {
        preorderImg.style.backgroundImage = 'url("./assets/img/shoes/blush.webp")';
    } else if (dotClasses.contains("dot-white")) {
        preorderImg.style.backgroundImage = 'url("./assets/img/shoes/white.webp")';
    } else if (dotClasses.contains("dot-tiffany")) {
        preorderImg.style.backgroundImage = 'url("./assets/img/shoes/tiffany.webp")';
    }
}

// Form submission
const preorderForm = document.getElementById("preorderForm");
const selectInputs = preorderForm.querySelectorAll("select, input");
const submitBtn = document.getElementById("submitBtn");
const formHeading = document.querySelector('h1.formHeading');

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let inputs = document.querySelectorAll("#preorderForm input");

    inputs.forEach(function (input) {
        if (input.value.trim() === "") {
            input.classList.add("highlight");
        } else {
            input.classList.remove("highlight");
        }

        input.addEventListener("input", function () {
            input.classList.remove("highlight");
        });
    });

    let formIsIncomplete = Array.from(inputs).some(function (input) {
        return input.value.trim() === "";
    });

    if (formIsIncomplete) {
        // The inputs will turn red
    } else {
        selectInputs.forEach(function (element) {
            element.disabled = true;
        });

        submitBtn.disabled = true;

        submitBtn.innerHTML = "<i class=\"fa-solid fa-spinner\"></i>";
        submitBtn.classList.add('loading');

// Set a timeout for 2 seconds (adjust as needed)
        setTimeout(function () {
            selectInputs.forEach(function (element) {
                element.disabled = false;
            });

            submitBtn.disabled = false;

            submitBtn.innerHTML = "Submit";
            submitBtn.classList.remove('loading');

            preorderForm.style.display = "none";
            formHeading.style.display = "block";
        }, 2000);
    }
});

// Scroll to the top when the arrow is clicked
document.getElementById("toTop").onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};
