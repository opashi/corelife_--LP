document.addEventListener("DOMContentLoaded", () => {

    /* ========================================
       MOBILE MENU
    ======================================== */

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

    });


    /* ========================================
       MOBILE MENU CLOSE
    ======================================== */

    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });


    /* ========================================
       HEADER SCROLL
    ======================================== */

    const header =
        document.querySelector(".header");

    let lastScroll = 0;

    window.addEventListener("scroll", () => {

        const currentScroll =
            window.scrollY;

        if (currentScroll > 100) {

            header.style.boxShadow =
                "0 5px 20px rgba(0,0,0,0.06)";

        } else {

            header.style.boxShadow =
                "none";

        }

        lastScroll = currentScroll;

    });


    /* ========================================
       SCROLL ANIMATION
    ======================================== */

    const targets =
        document.querySelectorAll(
            ".menu-card, .point-item, .news-item, .intro-content"
        );

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    targets.forEach(target => {

        target.classList.add("fade-up");

        observer.observe(target);

    });


    /* ========================================
       SMOOTH SCROLL
    ======================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", e => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                e.preventDefault();

                const headerHeight =
                    document.querySelector(
                        ".header"
                    ).offsetHeight;

                const position =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            });

        });

});