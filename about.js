const user = JSON.parse(localStorage.getItem("fittrackCurrentUser"));

if (!user || !user.isLoggedIn) {
  window.location.href = "index.html";
}

const toggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// INTERACTIVE RESUME TOGGLE
const princeCard = document.getElementById("prince-card");
const priyankaCard = document.getElementById("priyanka-card");
const resumeBoxPrince = document.getElementById("resume-box-prince");
const resumeBoxPriyanka = document.getElementById("resume-box-priyanka");
const closeBtns = document.querySelectorAll(".close-resume");

function toggleResume(targetBox, otherBox, scrollTarget) {
    // Close other box if open
    if (otherBox) otherBox.classList.remove("active");
    
    // Toggle target
    targetBox.classList.toggle("active");
    
    if (targetBox.classList.contains("active")) {
        targetBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

if (princeCard && resumeBoxPrince) {
    princeCard.addEventListener("click", () => {
        toggleResume(resumeBoxPrince, resumeBoxPriyanka, princeCard);
    });
}

if (priyankaCard && resumeBoxPriyanka) {
    priyankaCard.addEventListener("click", () => {
        toggleResume(resumeBoxPriyanka, resumeBoxPrince, priyankaCard);
    });
}

closeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const targetId = e.target.getAttribute("data-target");
        const box = document.getElementById(targetId);
        if (box) {
            box.classList.remove("active");
            const cardId = targetId.includes("prince") ? "prince-card" : "priyanka-card";
            document.getElementById(cardId).scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});

function logout() {
  localStorage.removeItem("fittrackCurrentUser");
  window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}