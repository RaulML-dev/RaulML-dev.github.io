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
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled")
        } else {
            navbar.classList.remove("scrolled")
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

    // Inicializar el sistema de partículas interactivo en el hero
    initParticles()
})

// Función para copiar email al clipboard
function copyEmail() {
    const email = "raulmldev19@gmail.com"
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

// Sistema de partículas interactivo para el fondo del Hero
function initParticles() {
    const canvas = document.getElementById("hero-particles")
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const heroSection = document.querySelector(".hero")

    let particlesArray = []
    let width = canvas.width = heroSection.offsetWidth
    let height = canvas.height = heroSection.offsetHeight

    const mouse = {
        x: null,
        y: null,
        radius: 120, // Radio de interacción / repulsión
        active: false
    }

    // Rastrear posición del mouse relativa al hero
    heroSection.addEventListener("mousemove", (e) => {
        const rect = heroSection.getBoundingClientRect()
        mouse.x = e.clientX - rect.left
        mouse.y = e.clientY - rect.top
        mouse.active = true
    })

    heroSection.addEventListener("mouseleave", () => {
        mouse.x = null
        mouse.y = null
        mouse.active = false
    })

    // Escuchar redimensionamiento de la ventana
    window.addEventListener("resize", () => {
        width = canvas.width = heroSection.offsetWidth
        height = canvas.height = heroSection.offsetHeight
        initParticlesList()
    })

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x
            this.y = y
            this.directionX = directionX
            this.directionY = directionY
            this.size = size
            this.color = color
        }

        draw() {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
            ctx.fillStyle = this.color
            ctx.fill()
        }

        update() {
            // Rebotar en los bordes
            if (this.x > width || this.x < 0) {
                this.directionX = -this.directionX
            }
            if (this.y > height || this.y < 0) {
                this.directionY = -this.directionY
            }

            // Física de repulsión interactiva con el mouse
            if (mouse.active && mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x
                let dy = mouse.y - this.y
                let distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouse.radius) {
                    let forceDirectionX = dx / distance
                    let forceDirectionY = dy / distance

                    // Fuerza proporcional a la cercanía (más cerca = más empuje)
                    let force = (mouse.radius - distance) / mouse.radius
                    let directionX = forceDirectionX * force * 2.5
                    let directionY = forceDirectionY * force * 2.5

                    this.x -= directionX
                    this.y -= directionY
                }
            }

            // Mover partícula
            this.x += this.directionX
            this.y += this.directionY

            // Dibujar partícula
            this.draw()
        }
    }

    // Inicializar lista de partículas
    function initParticlesList() {
        particlesArray = []
        // Densidad de partículas adaptativa según tamaño de pantalla
        let numberOfParticles = Math.floor((width * height) / 13000)
        if (numberOfParticles > 85) numberOfParticles = 85
        if (numberOfParticles < 25) numberOfParticles = 25

        const colors = [
            "rgba(59, 130, 246, 0.35)",  // Azul
            "rgba(139, 92, 246, 0.35)",  // Violeta
            "rgba(6, 182, 212, 0.35)"    // Turquesa
        ]

        for (let i = 0; i < numberOfParticles; i++) {
            let size = Math.random() * 3.5 + 1.2 // Tamaño aleatorio
            let x = Math.random() * (width - size * 2) + size
            let y = Math.random() * (height - size * 2) + size
            let directionX = (Math.random() * 0.7) - 0.35
            let directionY = (Math.random() * 0.7) - 0.35
            let color = colors[Math.floor(Math.random() * colors.length)]

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color))
        }
    }

    // Conectar partículas cercanas con líneas
    function connect() {
        let opacityValue = 1
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x
                let dy = particlesArray[a].y - particlesArray[b].y
                let distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < 110) {
                    opacityValue = 1 - (distance / 110)
                    ctx.strokeStyle = `rgba(139, 92, 246, ${opacityValue * 0.15})`
                    ctx.lineWidth = 0.8
                    ctx.beginPath()
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
                    ctx.stroke()
                }
            }

            // Dibujar línea fina del mouse a las partículas cercanas
            if (mouse.active && mouse.x !== null && mouse.y !== null) {
                let dx = particlesArray[a].x - mouse.x
                let dy = particlesArray[a].y - mouse.y
                let distance = Math.sqrt(dx * dx + dy * dy)
                if (distance < mouse.radius) {
                    opacityValue = 1 - (distance / mouse.radius)
                    ctx.strokeStyle = `rgba(59, 130, 246, ${opacityValue * 0.22})`
                    ctx.lineWidth = 1
                    ctx.beginPath()
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
                    ctx.lineTo(mouse.x, mouse.y)
                    ctx.stroke()
                }
            }
        }
    }

    // Bucle de animación principal
    function animate() {
        ctx.clearRect(0, 0, width, height)
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update()
        }
        connect()
        requestAnimationFrame(animate)
    }

    initParticlesList()
    animate()
}
