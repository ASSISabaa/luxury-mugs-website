document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const email = emailInput.value.trim();
  
      if (!email) {
        alert("Please enter your email address.");
        return;
      }
  
      alert("If this email exists in our system, a reset link will be sent.");
      window.location.href = "login.html";
    });
  });
  