const ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => {
    /** Highlight code init */
    hljs.highlightAll();

    /** Disabled scroll */
    const body = document.body;

    const disableScroll = function () {
        let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
        let pagePosition = window.scrollY;

        body.style.paddingRight = paddingOffset;
        body.classList.add('disable-scroll');
        body.dataset.position = pagePosition;
        body.style.top = -pagePosition + 'px';
    }

    const enableScroll = function () {
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

            disableScroll();
            sidebar.classList.add('show');
        });

        closeMobMenu.addEventListener('click', e => {
            e.preventDefault();

            enableScroll();
            sidebar.classList.remove('show');
        });
    }
});