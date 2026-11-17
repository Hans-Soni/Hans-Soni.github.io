const canvas = document.querySelector("#matrix-canvas");

if (canvas) {
  const context = canvas.getContext("2d");
  const characters = "01アイウエオ<>/{}#$%&*SECURE";
  const colors = getComputedStyle(document.documentElement);
  const neonLime = colors.getPropertyValue("--neon-lime").trim();
  const neonPink = colors.getPropertyValue("--neon-pink").trim();
  let columns = [];
  let frame = 0;
  const pointer = { x: -999, y: -999 };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Array.from(
      { length: Math.ceil(canvas.width / 16) },
      () => Math.random() * -50,
    );
  }

  function drawRain() {
    context.fillStyle = "rgba(14,14,24,0.12)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "16px JetBrains Mono, monospace";

    columns.forEach((drop, index) => {
      const x = index * 16;
      const y = drop * 16;
      const nearPointer = Math.hypot(x - pointer.x, y - pointer.y) < 140;
      context.globalAlpha = nearPointer ? 0.9 : 0.35;
      context.fillStyle = nearPointer ? neonPink : neonLime;
      context.fillText(characters[Math.floor(Math.random() * characters.length)], x, y);
      columns[index] = y > canvas.height && Math.random() > 0.975 ? 0 : drop + 1;
    });

    context.globalAlpha = 1;
    frame = window.requestAnimationFrame(drawRain);
  }

  resizeCanvas();
  drawRain();
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }, { passive: true });
  window.addEventListener("pagehide", () => {
    window.cancelAnimationFrame(frame);
  }, { once: true });
}

const nameElement = document.querySelector("#scramble-name");
if (nameElement) {
  const name = nameElement.textContent;
  const scrambleChars = "!<>-_\\/[]{}=+*^?#01";
  let step = 0;
  nameElement.textContent = name.replace(/[^ ]/g, () => scrambleChars[Math.floor(Math.random() * scrambleChars.length)]);

  const scramble = window.setInterval(() => {
    step += 1;
    nameElement.textContent = [...name]
      .map((character, index) => character === " " || index < Math.floor(step / 2)
        ? character
        : scrambleChars[Math.floor(Math.random() * scrambleChars.length)])
      .join("");

    if (step / 2 > name.length) {
      nameElement.textContent = name;
      window.clearInterval(scramble);
    }
  }, 35);
}

const roleElement = document.querySelector("#typed-role");
if (roleElement) {
  const roles = [
    "Cybersecurity Enthusiast",
    "Software Engineer",
    "Full-Stack Developer",
    "CTF Player",
    "Team Lead",
  ];
  let roleIndex = 0;
  let roleText = "";
  let deleting = false;

  function typeRole() {
    const role = roles[roleIndex];
    if (!deleting) {
      roleText = role.slice(0, roleText.length + 1);
      roleElement.textContent = roleText;
      if (roleText === role) {
        deleting = true;
        window.setTimeout(typeRole, 1400);
        return;
      }
    } else {
      roleText = role.slice(0, Math.max(0, roleText.length - 1));
      roleElement.textContent = roleText;
      if (!roleText) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    window.setTimeout(typeRole, deleting ? 35 : 70);
  }

  typeRole();
}

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const progress = document.querySelector("#scroll-progress");
function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  if (progress) progress.style.transform = `scaleX(${Math.min(1, Math.max(0, amount))})`;
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress, { passive: true });
updateScrollProgress();

const cursor = document.querySelector("#custom-cursor");
if (cursor && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("mousemove", (event) => {
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  }, { passive: true });
}

if (window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll(
    "#about .glass.rounded-3xl, #skills .glass.neon-border, #projects .glass.neon-border, #contact form, #contact > div > .glass",
  ).forEach((card) => {
    card.classList.add("tilt-card");
    card.addEventListener("mousemove", (event) => {
      const bounds = card.getBoundingClientRect();
      const horizontal = (event.clientX - bounds.left) / bounds.width;
      const vertical = (event.clientY - bounds.top) / bounds.height;
      const rotateX = (0.5 - vertical) * 20;
      const rotateY = (horizontal - 0.5) * 20;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

const contactForm = document.querySelector("#contact-form");
contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formFields = form.querySelector(".space-y-4");
  const successPanel = form.querySelector("#contact-success");
  const rawValues = Object.fromEntries(new FormData(form));
  const values = {
    name: rawValues.name.trim(),
    email: rawValues.email.trim(),
    message: rawValues.message.trim(),
  };
  const errors = {
    name: values.name ? "" : "Please enter your name",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? "" : "Please enter a valid email",
    message: values.message.length >= 5 ? "" : "Message is too short",
  };
  let isValid = true;

  Object.entries(errors).forEach(([field, message]) => {
    const errorElement = form.querySelector(`[data-error-for="${field}"]`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.hidden = !message;
    }
    if (message) isValid = false;
  });

  if (!isValid) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const buttonLabel = submitButton.querySelector("span");
  const status = document.querySelector("#contact-status");
  const originalLabel = buttonLabel.textContent;
  submitButton.disabled = true;
  buttonLabel.textContent = "Sending…";
  status.hidden = true;

  try {
    const response = await fetch("https://formsubmit.co/ajax/hanssureshsoni@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...values,
        _subject: `Portfolio message from ${values.name}`,
        _replyto: values.email,
        _template: "table",
        _captcha: "false",
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false || result.success === "false") {
      throw new Error("Unable to send message.");
    }

    form.reset();
    formFields.hidden = true;
    successPanel.hidden = false;
  } catch {
    status.textContent = "Couldn't send right now. Please email me directly.";
    status.hidden = false;
  } finally {
    submitButton.disabled = false;
    buttonLabel.textContent = originalLabel;
  }
});

document.querySelector("#send-another")?.addEventListener("click", () => {
  const form = document.querySelector("#contact-form");
  form.querySelector("#contact-success").hidden = true;
  form.querySelector(".space-y-4").hidden = false;
  form.querySelector("#contact-status").hidden = true;
  form.querySelector("#name").focus();
});
