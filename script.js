document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const scrollIndicator = document.getElementById('scroll-indicator');
    const modalBtns = document.querySelectorAll('.modal-btn');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close');

    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrolled = (scrollPos / docHeight) * 100;
        scrollIndicator.style.width = `${scrolled}%`;

        if (scrollPos > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.padding = '5px 0';
        } else {
            navbar.style.background = 'linear-gradient(to right, #2ebf91, #8360c3)';
            navbar.style.padding = '10px 0';
        }

        if (scrollPos > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 70;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === section.getAttribute('id')) {
                        link.classList.add('active');
                    }
                });
            }
        });

        sections.forEach(section => {
            const sectionTop = section.offsetTop - window.innerHeight / 1.2;
            if (scrollPos >= sectionTop) {
                section.classList.add('visible');
            }
        });
    });

    backToTop.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    modalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'block';
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});