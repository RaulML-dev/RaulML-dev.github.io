// Navegación suave y efectos
document.addEventListener("DOMContentLoaded", () => {
    // Variables
    const hamburger = document.getElementById("hamburger")
    const navMenu = document.getElementById("nav-menu")
    const navLinks = document.querySelectorAll(".nav-link")
    const sections = document.querySelectorAll("section")

    // Toggle menu móvil
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active")

        // Animación hamburger
        const spans = hamburger.querySelectorAll("span")
        spans.forEach((span, index) => {
            if (navMenu.classList.contains("active")) {
                if (index === 0) span.style.transform = "rotate(45deg) translate(5px, 5px)"
                if (index === 1) span.style.opacity = "0"
                if (index === 2) span.style.transform = "rotate(-45deg) translate(7px, -6px)"
            } else {
                span.style.transform = "none"
                span.style.opacity = "1"
            }
        })
    })

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active")
            const spans = hamburger.querySelectorAll("span")
            spans.forEach((span) => {
                span.style.transform = "none"
                span.style.opacity = "1"
            })
        })
    })

    // Scroll suave
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault()
            const targetId = this.getAttribute("href")
            const targetSection = document.querySelector(targetId)

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                })
            }
        })
    })

    // Destacar enlace activo en navegación
    function highlightActiveLink() {
        let current = ""
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100
            const sectionHeight = section.offsetHeight

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id")
            }
        })

        navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active")
            }
        })
    }

    // Efecto navbar al hacer scroll
    function handleNavbarScroll() {
        const navbar = document.getElementById("navbar")
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(255, 255, 255, 0.98)"
            navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
        } else {
            navbar.style.background = "rgba(255, 255, 255, 0.95)"
            navbar.style.boxShadow = "none"
        }
    }

    // Animación de barras de habilidades
    function animateSkillBars() {
        const skillBars = document.querySelectorAll(".skill-progress")
        const skillsSection = document.getElementById("skills")
        const skillsSectionTop = skillsSection.offsetTop - window.innerHeight / 2

        if (window.scrollY > skillsSectionTop) {
            skillBars.forEach((bar) => {
                const width = bar.getAttribute("data-width")
                bar.style.width = width + "%"
            })
        }
    }

    // Animaciones de entrada
    function handleScrollAnimations() {
        const elements = document.querySelectorAll(".skill-card, .project-card, .about-card, .contact-card")

        elements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top
            const elementVisible = 150

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add("fade-in", "visible")
            }
        })
    }

    // Event listeners para scroll
    window.addEventListener("scroll", () => {
        highlightActiveLink()
        handleNavbarScroll()
        animateSkillBars()
        handleScrollAnimations()
    })

    // Inicializar animaciones
    handleNavbarScroll()
    highlightActiveLink()

    // Añadir clase fade-in a elementos
    const animatedElements = document.querySelectorAll(".skill-card, .project-card, .about-card, .contact-card")
    animatedElements.forEach((element) => {
        element.classList.add("fade-in")
    })

    // Efecto de escritura en el título (opcional)
    function typeWriter() {
        const text = "Hola, soy Raúl"
        const titleElement = document.querySelector(".hero-title .gradient-text")
        let i = 0

        titleElement.textContent = ""

        function type() {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i)
                i++
                setTimeout(type, 100)
            }
        }

        // Comentar la siguiente línea si no quieres el efecto de escritura
        // type();
    }

    // Inicializar efecto de escritura después de un pequeño delay
    setTimeout(typeWriter, 500)

    // Parallax suave en el hero
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset
        const hero = document.querySelector(".hero")
        const rate = scrolled * -0.5

        if (hero) {
            hero.style.transform = `translateY(${rate}px)`
        }
    })

    // Efecto hover en las tarjetas de proyecto
    const projectCards = document.querySelectorAll(".project-card")
    projectCards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-15px) scale(1.02)"
        })

        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)"
        })
    })

    // Smooth reveal para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1"
                entry.target.style.transform = "translateY(0)"
            }
        })
    }, observerOptions)

    // Observar elementos para animaciones
    document.querySelectorAll(".fade-in").forEach((el) => {
        observer.observe(el)
    })
})

// Función para copiar email al clipboard
function copyEmail() {
    const email = "raul@ejemplo.com"
    navigator.clipboard.writeText(email).then(() => {
        // Mostrar notificación de copiado
        const notification = document.createElement("div")
        notification.textContent = "¡Email copiado al portapapeles!"
        notification.style.cssText = `
              position: fixed;
              top: 20px;
              right: 20px;
              background: #10b981;
              color: white;
              padding: 1rem 2rem;
              border-radius: 10px;
              z-index: 9999;
              animation: slideIn 0.3s ease;
          `

        document.body.appendChild(notification)

        setTimeout(() => {
            notification.remove()
        }, 3000)
    })
}

// Añadir estilos para la animación de notificación
const style = document.createElement("style")
style.textContent = `
      @keyframes slideIn {
          from {
              transform: translateX(100%);
              opacity: 0;
          }
          to {
              transform: translateX(0);
              opacity: 1;
          }
      }
  `
document.head.appendChild(style)
