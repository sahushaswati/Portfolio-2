// Shaswati Sahu portfolio interactions
const $ = (selector) => document.querySelector(selector);

// Current year
$("#year").textContent = new Date().getFullYear();

// Mobile navigation
const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Light/dark theme. Dark is the default.
const themeToggle = $("#themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeToggle.textContent = isLight ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
});

// Typing effect
const typingText = $("#typingText");
const roles = ["Computer Science Graduate", "Aspiring IT Professional", "Web Technology Enthusiast"];
let roleIndex = 0, charIndex = 0, deleting = false;
function typeRole() {
  const current = roles[roleIndex];
  typingText.textContent = current.substring(0, charIndex);
  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(typeRole, 75);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeRole, 38);
  } else {
    deleting = !deleting;
    if (!deleting) roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, deleting ? 1450 : 250);
  }
}
typeRole();

// Reveal elements as they enter the viewport
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Active navigation link
const sections = document.querySelectorAll("main section[id]");
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => navObserver.observe(section));

// Scroll progress and back-to-top button
const progress = $("#scrollProgress");
const backTop = $("#backTop");
function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percent}%`;
  backTop.classList.toggle("show", window.scrollY > 450);
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Project details dialog
const projectDialog = $("#projectDialog");
$("#projectDetailsBtn").addEventListener("click", () => {
  if (typeof projectDialog.showModal === "function") projectDialog.showModal();
  else projectDialog.setAttribute("open", "");
});
$("#dialogClose").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", event => {
  if (event.target === projectDialog) projectDialog.close();
});

// Email copy button. Replace this placeholder with your real email first.
const emailAddress = "YOUR-EMAIL@example.com";
$("#copyEmailBtn").addEventListener("click", async () => {
  const status = $("#copyStatus");
  if (emailAddress.includes("YOUR-EMAIL")) {
    status.textContent = "Please add your real email address in index.html and script.js.";
    return;
  }
  try {
    await navigator.clipboard.writeText(emailAddress);
    status.textContent = "Email address copied!";
  } catch {
    status.textContent = `Email: ${emailAddress}`;
  }
});
