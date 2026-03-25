const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const authForm = document.getElementById("authForm");
const formIntro = document.getElementById("formIntro");
const submitBtn = document.getElementById("submitBtn");
const bottomText = document.getElementById("bottomText");
const switchModeText = document.getElementById("switchModeText");
const successMessage = document.getElementById("successMessage");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const togglePassword = document.getElementById("togglePassword");
const rememberMe = document.getElementById("rememberMe");

const registerOnlyFields = document.querySelectorAll(".register-only");
const loginOnlyFields = document.querySelectorAll(".login-only");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

let isLoginMode = true;

function switchToLogin() {
  isLoginMode = true;

  loginTab.classList.add("active");
  registerTab.classList.remove("active");

  registerOnlyFields.forEach((field) => field.classList.add("hidden"));
  loginOnlyFields.forEach((field) => field.classList.remove("hidden"));

  formIntro.textContent = "Welcome back! Please log in to continue.";
  submitBtn.textContent = "Login";
  bottomText.innerHTML = `Don’t have an account? <span id="switchModeText">Register</span>`;
  attachBottomSwitch();
  clearMessages();
  clearInputs();
}

function switchToRegister() {
  isLoginMode = false;

  registerTab.classList.add("active");
  loginTab.classList.remove("active");

  registerOnlyFields.forEach((field) => field.classList.remove("hidden"));
  loginOnlyFields.forEach((field) => field.classList.add("hidden"));

  formIntro.textContent = "Create your account and begin your fitness journey.";
  submitBtn.textContent = "Register";
  bottomText.innerHTML = `Already have an account? <span id="switchModeText">Login</span>`;
  attachBottomSwitch();
  clearMessages();
  clearInputs();
}

function attachBottomSwitch() {
  const newSwitchText = document.getElementById("switchModeText");
  newSwitchText.addEventListener("click", () => {
    if (isLoginMode) {
      switchToRegister();
    } else {
      switchToLogin();
    }
  });
}

function clearMessages() {
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";
  successMessage.textContent = "";
}

function clearInputs() {
  fullName.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
}

function validateEmail(userEmail) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);
}

function validateRegisterForm() {
  let isValid = true;
  clearMessages();

  if (fullName.value.trim() === "") {
    nameError.textContent = "Full name is required.";
    isValid = false;
  }

  if (email.value.trim() === "") {
    emailError.textContent = "Email is required.";
    isValid = false;
  } else if (!validateEmail(email.value.trim())) {
    emailError.textContent = "Enter a valid email address.";
    isValid = false;
  }

  if (password.value.trim() === "") {
    passwordError.textContent = "Password is required.";
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters.";
    isValid = false;
  }

  if (confirmPassword.value.trim() === "") {
    confirmPasswordError.textContent = "Please confirm your password.";
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.textContent = "Passwords do not match.";
    isValid = false;
  }

  return isValid;
}

function validateLoginForm() {
  let isValid = true;
  clearMessages();

  if (email.value.trim() === "") {
    emailError.textContent = "Email is required.";
    isValid = false;
  } else if (!validateEmail(email.value.trim())) {
    emailError.textContent = "Enter a valid email address.";
    isValid = false;
  }

  if (password.value.trim() === "") {
    passwordError.textContent = "Password is required.";
    isValid = false;
  }

  return isValid;
}

function getUsers() {
  return JSON.parse(localStorage.getItem("fittrackUsers")) || [];
}

function saveUsers(users) {
  localStorage.setItem("fittrackUsers", JSON.stringify(users));
}

function registerUser() {
  const users = getUsers();
  const existingUser = users.find((user) => user.email === email.value.trim());

  if (existingUser) {
    emailError.textContent = "This email is already registered.";
    return;
  }

  const userData = {
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    password: password.value.trim()
  };

  users.push(userData);
  saveUsers(users);

  successMessage.textContent = "Registration successful! Please login now.";
  setTimeout(() => {
    switchToLogin();
  }, 1200);
}

function loginUser() {
  const users = getUsers();

  const matchedUser = users.find((user) => {
    return (
      user.email === email.value.trim() &&
      user.password === password.value.trim()
    );
  });

  if (!matchedUser) {
    successMessage.style.color = "#ef4444";
    successMessage.textContent = "Invalid email or password.";
    return;
  }

  const currentUser = {
    fullName: matchedUser.fullName,
    email: matchedUser.email,
    isLoggedIn: true
  };

  localStorage.setItem("fittrackCurrentUser", JSON.stringify(currentUser));

  if (rememberMe.checked) {
    localStorage.setItem("fittrackRememberedEmail", matchedUser.email);
  } else {
    localStorage.removeItem("fittrackRememberedEmail");
  }

  successMessage.style.color = "#4ade80";
  successMessage.textContent = `Welcome back, ${matchedUser.fullName}!`;

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1000);
}

loginTab.addEventListener("click", switchToLogin);
registerTab.addEventListener("click", switchToRegister);

togglePassword.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    togglePassword.textContent = "Hide";
  } else {
    password.type = "password";
    togglePassword.textContent = "Show";
  }
});

authForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (isLoginMode) {
    if (validateLoginForm()) {
      loginUser();
    }
  } else {
    if (validateRegisterForm()) {
      registerUser();
    }
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const rememberedEmail = localStorage.getItem("fittrackRememberedEmail");

  if (rememberedEmail) {
    email.value = rememberedEmail;
    rememberMe.checked = true;
  }

  attachBottomSwitch();
});