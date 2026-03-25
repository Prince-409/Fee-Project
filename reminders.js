
const user = JSON.parse(localStorage.getItem("fittrackCurrentUser"));

if (!user || !user.isLoggedIn) {
  window.location.href = "index.html";
}
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// STORAGE
let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

// DISPLAY
function displayReminders() {
  const list = document.getElementById("reminderList");
  list.innerHTML = "";

  reminders.forEach((reminder, index) => {
    list.innerHTML += `
      <li>
        ${reminder.text} (${reminder.time}s)
        <button class="delete-btn" onclick="deleteReminder(${index})">X</button>
      </li>
    `;
  });
}

// ADD REMINDER
function addReminder() {
  const text = document.getElementById("reminderText").value;

const h = parseInt(document.getElementById("hours").value) || 0;
const m = parseInt(document.getElementById("minutes").value) || 0;
const s = parseInt(document.getElementById("seconds").value) || 0;

  const totalSeconds = (h * 3600) + (m * 60) + (s * 1);

  if (text.trim() === "" || totalSeconds === 0) {
    alert("Enter valid data");
    return;
  }

  const reminder = {
    text: text,
    time: totalSeconds
  };

  reminders.push(reminder);
  localStorage.setItem("reminders", JSON.stringify(reminders));

  // RINGTONE
  const sound = document.getElementById("ringtone");

  setTimeout(() => {
    if (sound) sound.play();
    showToast("⏰ Reminder: " + text);
  }, totalSeconds * 1000);

  displayReminders();

  // CLEAR INPUTS
  document.getElementById("reminderText").value = "";
  document.getElementById("hours").value = "";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
}

// DELETE
function deleteReminder(index) {
  reminders.splice(index, 1);
  localStorage.setItem("reminders", JSON.stringify(reminders));
  displayReminders();
}

// INIT
displayReminders();
function showToast(msg) {
  const toast = document.getElementById("toast");

  toast.innerText = msg;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

function logout() {
  localStorage.removeItem("fittrackCurrentUser");
  window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}