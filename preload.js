gsap.registerPlugin(ScrollTrigger);

// Function to preload images
function preloadImages(urls, callback) {
    let loadedImages = 0;
    let totalImages = urls.length;

    // Callback function to check if all images are loaded
    function imageLoaded() {
        loadedImages++;

        if (loadedImages === totalImages) {
            callback();
        }
    }

    // Loop through each image URL and preload
    for (let i = 0; i < totalImages; i++) {
        let img = new Image();
        img.src = urls[i];
        img.onload = imageLoaded;
        img.onerror = imageLoaded; // Handle error (if any)
    }
}

// Specify the image filenames in the "./assets/img/" directory
let imageFilenames = [
    'white.webp',
    'blush.webp',
    'tiffany.webp',
    'hero-1.webp',
    'hero-2.webp',
    'hero-3.webp',
    'hero-blush.webp',
    'hero-full.webp',
    'hero-tiffany.webp',
    'tech-eco.webp',
    'tech-hydro.webp',
    'tech-photon.webp',
    'innovation.webp',
    'expression.webp',
    'sustainability.webp'
];

// Create an array of complete image URLs
let imageUrls = imageFilenames.map(function (filename) {
    return './assets/img/shoes/' + filename;
});

// Use window.onload to ensure the code runs after all resources are loaded
window.onload = function () {
    // Call the preloadImages function with your imageUrls
    preloadImages(imageUrls, function () {
        // All images are preloaded, hide the loading div and show the wrapper div
        document.getElementById('loading').style.display = 'none';
        document.querySelector('.wrapper').style.display = 'block';

        // Site load hero animation
        let heroTL = gsap.timeline();

        heroTL.from("body", {
            opacity: 0,
            duration: 2
        });

        heroTL.from("nav", {
            opacity: 0,
            duration: 1
        });

        // Rotate hero image
        const hero = document.getElementById("hero");

        const imagesSetSmallScreen = [
            "./assets/img/shoes/white.webp",
            "./assets/img/shoes/blush.webp",
            "./assets/img/shoes/tiffany.webp"
        ];

        const imagesSetLargeScreen1 = [
            "./assets/img/shoes/white.webp",
            "./assets/img/shoes/hero-1.webp",
            "./assets/img/shoes/hero-2.webp",
            "./assets/img/shoes/hero-3.webp"
        ];

        const imagesSetLargeScreen2 = [
            "./assets/img/shoes/hero-3.webp",
            "./assets/img/shoes/hero-tiffany.webp",
            "./assets/img/shoes/hero-blush.webp"
        ];

        let currentIndex = 0;
        let isInitialRotation = true;

        function changeBackground() {
            let currentImagesSet;

            // Check screen width
            const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

            if (screenWidth < 821) {
                currentImagesSet = imagesSetSmallScreen;
            } else {
                currentImagesSet = isInitialRotation ? imagesSetLargeScreen1 : imagesSetLargeScreen2;
            }

            hero.style.backgroundImage = `url('${currentImagesSet[currentIndex % currentImagesSet.length]}')`;
            currentIndex++;

            // Reset to the start of the set after reaching the last image in the set
            if (currentIndex === currentImagesSet.length) {
                currentIndex = 0; // Reset to the start of the set

                // Switch to continuous rotation after the initial rotation
                isInitialRotation = false;
            }
        }

        const intervalId = setInterval(changeBackground, 2000);

        // Back to top arrow animation
        gsap.to("#toTop", {
            opacity: 1,
            scrollTrigger: {
                trigger: "#toTop",
                start: "top 80%",
                end: "bottom 20%",
                scrub: true
            }
        });
    });
};
