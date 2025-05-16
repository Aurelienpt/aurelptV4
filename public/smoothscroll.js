document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const OFFSET = 100; // Ajustez cette valeur selon votre mise en page
    const DURATION = 300; // Durée du smooth scroll en ms

    // Cache les sections au chargement
    document.querySelectorAll('section:not(.hero-section)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all ${DURATION}ms ease`;
    });

    // Gestion du scroll
    function handleScroll() {
        const scrollPosition = window.scrollY + window.innerHeight - OFFSET;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Animation d'apparition
            if(scrollPosition > sectionTop) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }

            // Highlight de la navigation
            const id = section.getAttribute('id');
            if(id && scrollPosition > sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href').includes(id)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Écouteurs d'événements
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Déclenche au chargement

    // Smooth scroll pour la navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if(targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - OFFSET,
                    behavior: 'smooth'
                });
            }
        });
    });
});