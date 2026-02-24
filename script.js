// ============================================
// PERSEPHONE'S HOUSE - JAVASCRIPT
// ============================================

/**
 * DOM Elements
 */
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

/**
 * Sidebar Toggle for Mobile
 */
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

/**
 * Close sidebar when clicking on a nav link
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Close sidebar on mobile
        if (window.innerWidth < 768) {
            sidebar.classList.remove('active');
        }
    });
});

/**
 * Close sidebar when clicking outside
 */
document.addEventListener('click', (e) => {
    if (window.innerWidth < 768) {
        const isClickInsideSidebar = sidebar.contains(e.target);
        const isClickOnToggle = sidebarToggle && sidebarToggle.contains(e.target);

        if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    }
});

/**
 * Update active nav link on scroll
 */
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.content-section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
});

/**
 * Contact Form Submission
 * Para um site estático, você pode usar um serviço como Formspree ou EmailJS
 * Aqui está um exemplo com validação básica e mensagem de feedback
 */
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validação básica
        if (!name || !email || !subject || !message) {
            showMessage('Por favor, preencha todos os campos.', 'error');
            return;
        }

        // Validar email
        if (!isValidEmail(email)) {
            showMessage('Por favor, insira um email válido.', 'error');
            return;
        }

        // Aqui você pode integrar com um serviço de email
        // Opções: Formspree, EmailJS, Firebase, etc.
        
        // Exemplo com Formspree (descomente para usar):
        /*
        const formData = new FormData(contactForm);
        try {
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showMessage('Mensagem enviada com sucesso! Obrigado pelo contato.', 'success');
                contactForm.reset();
            } else {
                showMessage('Erro ao enviar a mensagem. Tente novamente.', 'error');
            }
        } catch (error) {
            showMessage('Erro na conexão. Tente novamente.', 'error');
        }
        */

        // Por enquanto, apenas mostrar mensagem de sucesso (para fins de demonstração)
        showMessage('Mensagem enviada com sucesso! Obrigado pelo contato.', 'success');
        contactForm.reset();
    });
}

/**
 * Mostrar mensagem de feedback no formulário
 * @param {string} message - Mensagem a exibir
 * @param {string} type - Tipo: 'success' ou 'error'
 */
function showMessage(message, type) {
    formMessage.style.display = 'block';
    formMessage.className = `alert alert-${type === 'success' ? 'success' : 'danger'}`;
    formMessage.innerHTML = message;

    // Auto-hide após 5 segundos
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

/**
 * Validar email
 * @param {string} email - Email a validar
 * @returns {boolean} - Email válido?
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Smooth scroll para links internos
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorar se o link é apenas '#'
        if (href === '#') {
            return;
        }

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * Lazy loading de imagens (opcional)
 * Se usar, adicione data-src em vez de src nas imagens
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    // Aplicar ao carregar (opcional)
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Adicionar animação aos elementos quando entram na viewport
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar ao cards e outras seções
document.querySelectorAll('.creation-card, .character-card, .stat').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

/**
 * Log inicial (opcional)
 */
console.log('🏛️ Bem-vindo ao Persephone\'s House - The Sims 4 Creations');
console.log('✨ Site desenvolvido com Bootstrap 5 e boas práticas de SEO');

/**
 * Gallery modal for folder-based galleries
 * The mapping below lists all images inside `assets/Bela Grécia`.
 */
const galleryImages = {
    'Bela Grécia': [
        'assets/Bela Grécia/15-03-25_15-29-48.png',
        'assets/Bela Grécia/15-03-25_15-30-07.png',
        'assets/Bela Grécia/15-03-25_15-29-54.png',
        'assets/Bela Grécia/15-03-25_15-30-26.png',
        'assets/Bela Grécia/15-03-25_15-29-31.png',
        'assets/Bela Grécia/15-03-25_15-29-21.png',
        'assets/Bela Grécia/15-03-25_15-29-12.png',
        'assets/Bela Grécia/15-03-25_15-29-07.png',
        'assets/Bela Grécia/15-03-25_15-28-52.png',
        'assets/Bela Grécia/15-03-25_15-28-38.png',
        'assets/Bela Grécia/15-03-25_15-28-26.png',
        'assets/Bela Grécia/15-03-25_15-28-15.png',
        'assets/Bela Grécia/15-03-25_15-28-06.png',
        'assets/Bela Grécia/15-03-25_15-27-48.png',
        'assets/Bela Grécia/15-03-25_15-27-36.png',
        'assets/Bela Grécia/15-03-25_15-27-18.png',
        'assets/Bela Grécia/15-03-25_15-27-08.png',
        'assets/Bela Grécia/15-03-25_15-26-59.png',
        'assets/Bela Grécia/15-03-25_15-26-40.png',
        'assets/Bela Grécia/15-03-25_15-26-26.png',
        'assets/Bela Grécia/15-03-25_15-26-16.png',
        'assets/Bela Grécia/15-03-25_15-25-39.png',
        'assets/Bela Grécia/15-03-25_15-34-22.png',
        'assets/Bela Grécia/15-03-25_15-34-12.png',
        'assets/Bela Grécia/15-03-25_15-33-46.png',
        'assets/Bela Grécia/15-03-25_15-33-39.png',
        'assets/Bela Grécia/15-03-25_15-33-14.png',
        'assets/Bela Grécia/15-03-25_15-32-50.png',
        'assets/Bela Grécia/15-03-25_15-32-21.png',
        'assets/Bela Grécia/15-03-25_15-32-16.png',
        'assets/Bela Grécia/15-03-25_15-32-07.png',
        'assets/Bela Grécia/15-03-25_15-31-45.png',
        'assets/Bela Grécia/15-03-25_15-31-35.png',
        'assets/Bela Grécia/15-03-25_15-31-24.png',
        'assets/Bela Grécia/15-03-25_15-31-15.png',
        'assets/Bela Grécia/15-03-25_15-31-05.png',
        'assets/Bela Grécia/15-03-25_15-30-45.png',
        'assets/Bela Grécia/15-03-25_15-30-37.png'
    ]
};

function openGallery(folder) {
    const images = galleryImages[folder] || [];
    if (!images.length) {
        alert('Nenhuma imagem encontrada para ' + folder);
        return;
    }

    const inner = document.getElementById('galleryInner');
    inner.innerHTML = images.map((src, idx) => {
        return `<div class="carousel-item ${idx === 0 ? 'active' : ''}"><img src="${src}" class="d-block w-100" alt="${folder} - ${idx + 1}"></div>`;
    }).join('');

    const carouselEl = document.getElementById('galleryCarousel');
    const carousel = bootstrap.Carousel.getOrCreateInstance(carouselEl, { interval: false });
    carousel.to(0);

    const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
    modal.show();
}

// Attach handlers to elements with data-gallery
document.querySelectorAll('[data-gallery]').forEach(el => {
    el.addEventListener('click', (e) => {
        const folder = el.dataset.gallery;
        openGallery(folder);
    });
});
