const ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => {
    /** Highlight code init */
    hljs.highlightAll();

    /** Disabled scroll */
    const body = document.body;

    const disableScroll = () => {
        let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
        let pagePosition = window.scrollY;

        body.style.paddingRight = paddingOffset;
        body.classList.add('disable-scroll');
        body.dataset.position = pagePosition;
        body.style.top = -pagePosition + 'px';
    }

    const enableScroll = () => {
        let pagePosition = parseInt(document.body.dataset.position, 10);
        body.style.top = 'auto';
        body.classList.remove('disable-scroll');

        body.style.paddingRight = '0px';
        window.scroll({
            top: pagePosition,
            left: 0
        });
        body.removeAttribute('data-position');
    }

    /** Mobile menu */
    const burger = document.getElementById('wcl-burger');
    const closeMobMenu = document.getElementById('wcl-close-mob-menu');
    const sidebar = document.getElementById('wcl-sidebar');

    if (burger && sidebar && closeMobMenu) {
        burger.addEventListener('click', e => {
            e.preventDefault();

            sidebar.classList.add('show');
        });

        closeMobMenu.addEventListener('click', e => {
            e.preventDefault();

            sidebar.classList.remove('show');
        });
    }

    /** Highlighting TOC */
    const sections = document.querySelectorAll('.wcl-tutorial');
    const navLinks = document.querySelectorAll('.wcl-nav-list-link');

    if (sections && navLinks) {
        const highlightLink = () => {
            let index = sections.length;

            while (--index && window.scrollY + 100 < sections[index].offsetTop) { }

            navLinks.forEach((link) => link.classList.remove('active'));

            navLinks[index].classList.add('active');
        }

        highlightLink(); // активація при завантаженні сторінки
        window.addEventListener('scroll', highlightLink);
    }


    /** Close mobile menu after click to link */
    if (navLinks.length > 0) {
        if (window.innerWidth < 1025) {
            const headerOffset = 70;

            navLinks.forEach(link => {
                link.addEventListener('click', e => {
                    e.preventDefault();

                    const targetId = link.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);

                    if (targetSection) {
                        const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                        const offsetPosition = elementPosition - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });

                        sidebar.classList.remove('show');
                    }
                });
            });
        }
    }
});