document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const rememberMe = document.querySelector("input[type='checkbox']");
  const forgotLink = document.querySelector(".forgot-link");

  // Load saved email if Remember Me was checked
  if (localStorage.getItem("rememberedEmail")) {
    emailInput.value = localStorage.getItem("rememberedEmail");
    rememberMe.checked = true;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "admin@mugora.com" && password === "123456") {
      localStorage.setItem("loggedIn", "true");

      // Save email if Remember Me is checked
      if (rememberMe.checked) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      window.location.href = "index.html";
    } else {
      alert("Invalid email or password. Please try again.");
    }
  });

  // Handle forgot password click
  forgotLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "forgot-password.html"; // Create this page later
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const langToggle = document.getElementById("lang-toggle");
  langToggle.addEventListener("click", () => {
    const html = document.documentElement;
    const isArabic = html.getAttribute("lang") === "ar";

    html.setAttribute("lang", isArabic ? "en" : "ar");
    html.setAttribute("dir", isArabic ? "ltr" : "rtl");

    document.querySelector("h2").textContent = isArabic ? "Welcome back!" : "مرحبًا بعودتك!";
    document.querySelector(".greeting").textContent = isArabic ? "Log in to your MUGORA account" : "سجّل الدخول إلى حساب MUGORA الخاص بك";
    document.querySelector("label[for='email']").textContent = isArabic ? "Email" : "البريد الإلكتروني";
    document.querySelector("label[for='password']").innerHTML = isArabic
      ? 'Password <a href="forgot-password.html" class="forgot-link">Forgot password?</a>'
      : 'كلمة المرور <a href="forgot-password.html" class="forgot-link">نسيت كلمة المرور؟</a>';
    document.getElementById("email").placeholder = isArabic ? "you@example.com" : "أدخل بريدك الإلكتروني";
    document.getElementById("password").placeholder = isArabic ? "Enter your password" : "أدخل كلمة المرور";
    document.querySelector("label[for='remember']").innerHTML = isArabic
      ? '<input type="checkbox" id="remember" /> Remember me'
      : '<input type="checkbox" id="remember" /> تذكّرني';
    document.querySelector("button[type='submit']").textContent = isArabic ? "Login" : "تسجيل الدخول";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const rememberCheckbox = document.getElementById("remember");

  // 🟢 Load saved values if they exist
  if (localStorage.getItem("rememberMe") === "true") {
    emailInput.value = localStorage.getItem("email") || "";
    passwordInput.value = localStorage.getItem("password") || "";
    rememberCheckbox.checked = true;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // ✅ Check credentials (adjust this later)
    if (email === "admin@mugora.com" && password === "123456") {
      if (rememberCheckbox.checked) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      // ✅ Redirect
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials.");
    }
  });
});
