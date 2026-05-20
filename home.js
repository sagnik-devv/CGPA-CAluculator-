document.addEventListener("DOMContentLoaded", () => {
    // Current Year
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    const isDark = localStorage.getItem("theme") === "dark";

    if (isDark) {
        body.classList.replace("light-mode", "dark-mode");
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggleBtn.addEventListener("click", () => {
        if (body.classList.contains("light-mode")) {
            body.classList.replace("light-mode", "dark-mode");
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.replace("dark-mode", "light-mode");
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem("theme", "light");
        }
    });
});
