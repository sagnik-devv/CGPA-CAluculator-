document.addEventListener("DOMContentLoaded", () => {
    // Current Year
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Loading Page Logic
    const sem2Link = document.getElementById("sem2-link");
    const pageLoader = document.getElementById("page-loader");

    if (sem2Link && pageLoader) {
        sem2Link.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent immediate navigation
            
            // Show loader
            pageLoader.classList.remove("hidden");
            
            // Wait 1.2 seconds before navigating
            setTimeout(() => {
                window.location.href = sem2Link.href;
            }, 1200);
        });
    }
});
