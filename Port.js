// Theme Toggle with Local Storage
const themeToggle = document.getElementById("themeToggle");
const icon = themeToggle.querySelector("i");

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme") || "dark";
document.body.dataset.theme = savedTheme;
icon.className = savedTheme === "light" ? "fas fa-moon" : "fas fa-sun";

themeToggle.addEventListener("click", () => {
  const newTheme = document.body.dataset.theme === "light" ? "dark" : "light";
  document.body.dataset.theme = newTheme;
  icon.className = newTheme === "light" ? "fas fa-moon" : "fas fa-sun";
  localStorage.setItem("theme", newTheme);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Header Scroll Effect
const header = document.querySelector("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
    header.classList.remove("scroll-up");
    header.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    header.classList.contains("scroll-down")
  ) {
    header.classList.remove("scroll-down");
    header.classList.add("scroll-up");
  }
  lastScroll = currentScroll;
});

// Typing Animation for Hero Section
const heroText = document.querySelector(".hero h1");
const text = heroText.textContent;
heroText.textContent = "";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    heroText.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}

// Start typing animation when page loads
window.addEventListener("load", typeWriter);

// Scroll Progress Indicator
const scrollProgress = document.createElement("div");
scrollProgress.className = "scroll-progress";
document.body.appendChild(scrollProgress);

window.addEventListener("scroll", () => {
  const windowHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgress.style.width = `${scrolled}%`;
});

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document
  .querySelectorAll(".skill-card, .project-card, .blog-card")
  .forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.5s ease";
    observer.observe(card);
  });

// Interactive Skill Cards
const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.05)";
    card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
    card.style.boxShadow = "none";
  });
});

// Project Modal
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const projectInfo = card.querySelector(".project-info").innerHTML;
    const modal = document.createElement("div");
    modal.className = "project-modal";
    modal.innerHTML = `
            <div class="modal-content">
              <span class="close-modal">&times;</span>
              ${projectInfo}
            </div>
          `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector(".close-modal");
    closeBtn.addEventListener("click", () => {
      modal.remove();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  });
});

// Form Validation and Enhanced Submission
const contactForm = document.getElementById("contactForm");
const formInputs = contactForm.querySelectorAll("input, textarea");

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.style.borderColor = "var(--primary-color)";
    input.style.transform = "translateY(-2px)";
  });

  input.addEventListener("blur", () => {
    input.style.borderColor = "var(--text-color)";
    input.style.transform = "translateY(0)";
  });
});

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitBtn = contactForm.querySelector("button");
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent = "Message sent successfully!";
    contactForm.appendChild(successMessage);

    setTimeout(() => {
      successMessage.remove();
      contactForm.reset();
    }, 3000);
  } catch (error) {
    alert("Error sending message. Please try again.");
  } finally {
    submitBtn.innerHTML = "Send Message";
    submitBtn.disabled = false;
  }
});

// Mobile Navigation Toggle
const mobileNavToggle = document.createElement("button");
mobileNavToggle.className = "mobile-nav-toggle";
mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector("header").appendChild(mobileNavToggle);

mobileNavToggle.addEventListener("click", () => {
  const nav = document.querySelector("nav");
  nav.classList.toggle("active");
  mobileNavToggle.innerHTML = nav.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Scroll to Top Button
const scrollTopBtn = document.createElement("button");
scrollTopBtn.className = "scroll-top-btn";
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
