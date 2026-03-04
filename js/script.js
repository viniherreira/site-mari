// Menu hambúrguer
(function () {
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  if (!navToggle || !mainNav) return;

  navToggle.addEventListener("click", function () {
    var isOpen = navToggle.classList.toggle("is-open");
    mainNav.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mainNav.addEventListener("click", function (event) {
    if (event.target.tagName === "A" && navToggle.offsetParent !== null) {
      navToggle.classList.remove("is-open");
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
})();

// Ano no footer
(function () {
  var yearSpan = document.getElementById("footer-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();

// Animações de fade-in com IntersectionObserver
(function () {
  var items = document.querySelectorAll(".fade-in");
  if (!("IntersectionObserver" in window) || items.length === 0) {
    items.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  items.forEach(function (el) {
    observer.observe(el);
  });
})();

// Lightbox simples em JavaScript puro
(function () {
  var lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  var lightboxImage = lightbox.querySelector(".lightbox-image");
  var closeButton = lightbox.querySelector(".lightbox-close");

  function openLightbox(src, alt) {
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxImage.src = "";
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (target.matches("img[data-lightbox]")) {
      event.preventDefault();
      openLightbox(target.src, target.alt);
    }
  });

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      closeLightbox();
    });
  }

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();

// Validação simples do formulário de contato
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var successMessage = document.getElementById("form-success");

  function setError(fieldName, message) {
    var errorSpan = form.querySelector('.form-error[data-for="' + fieldName + '"]');
    if (errorSpan) {
      errorSpan.textContent = message || "";
    }
  }

  function validateEmail(value) {
    if (!value) return false;
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var nome = form.nome.value.trim();
    var email = form.email.value.trim();
    var telefone = form["telefone"].value.trim();
    var tipoEnsaio = form["tipo-ensaio"].value;
    var dataPrevista = form["data-prevista"].value;
    var mensagem = form.mensagem.value.trim();

    setError("nome");
    setError("email");
    setError("telefone");
    setError("tipo-ensaio");
    setError("data-prevista");
    setError("mensagem");
    if (successMessage) successMessage.textContent = "";

    var hasError = false;

    if (!nome) {
      setError("nome", "Por favor, preencha seu nome.");
      hasError = true;
    }

    if (!validateEmail(email)) {
      setError("email", "Informe um e-mail válido.");
      hasError = true;
    }

    if (telefone && telefone.replace(/\D/g, "").length < 10) {
      setError("telefone", "Informe um telefone válido (com DDD).");
      hasError = true;
    }

    if (!tipoEnsaio) {
      setError("tipo-ensaio", "Selecione o tipo de ensaio.");
      hasError = true;
    }

    if (!mensagem) {
      setError("mensagem", "Conte um pouco sobre o que você imagina.");
      hasError = true;
    }

    if (hasError) return;

    if (successMessage) {
      successMessage.textContent = "Mensagem enviada com sucesso. Em breve entrarei em contato.";
    }

    form.reset();
  });
})();

