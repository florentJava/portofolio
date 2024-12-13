document.addEventListener("DOMContentLoaded", function () {
    // Configuration des animations GSAP
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(Observer)
    // Initialisation des animations
    initScrollAnimations();
    initHoverAnimations();
    initFormAnimations();
    initLogoAnimations();
    transition();
});

// Animations de préchargement

// Animations de défilement (ScrollTrigger)
function initScrollAnimations() {
    // Animations des titres
    document.querySelectorAll(".title").forEach((title) => {
        // Animation du titre
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            ease: "power3.out"
        });

        // Animation des traits
        const traits = title.querySelectorAll('.trait, .trait2');
        gsap.from(traits, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            width: 0,
            stagger: 0.2,
            ease: "power3.out"
        });
    });

    // Animations des services
    gsap.from(".myservices div:nth-child(2n+1)", {
        scrollTrigger: {
            trigger: ".myservices div:nth-child(2n+1)",
        },
        x: 500,
        scale: 0,
        y: 200,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
    });

    gsap.from(".myservices div:nth-child(2n)", {
        scrollTrigger: {
            trigger: ".myservices div:nth-child(2n+1)",
        },
        x: -500,
        y: -200,
        opacity: 0,
        stagger: 0.1,
        scale: 0,
        duration: 1,
    });

    // Animations des items
    document.querySelectorAll('.item').forEach((item) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
            },
            x: 1000,
            duration: 1,
            opacity: 0,
            stagger: 0.1,
            ease: "bounce.out",
        });
    });

    // Animation des éléments "about"
    gsap.from(".about-item", {
        scrollTrigger: {
            trigger: ".about-item",
        },
        scale: 0,
        stagger: 0.1,
    });
}

// Animations de survol
function initHoverAnimations() {
    // Survol de l'image de Dominique
    const imageDominique = document.querySelector("#dominique");



    // Survol des liens
    document.querySelectorAll(".lien").forEach((link) => {
        link.addEventListener("mouseenter", () => {
            gsap.to(link, {
                duration: 0.2,
                scale: 1.2,
                ease: "bounce.in",
            });
        });

        link.addEventListener("mouseleave", () => {
            gsap.to(link, {
                scale: 1,
            });
        });
    });
}

// Animations du formulaire
function initFormAnimations() {
    const formElements = document.querySelectorAll('.form-group, button');

    // Animation de défilement plus sophistiquée
    gsap.from(formElements, {
        scrollTrigger: {
            trigger: formElements,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 100,
        rotation: 10,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
    });

    // Effets de focus plus dynamiques
    formElements.forEach(element => {
        const input = element.querySelector('input, textarea');
        if (input) {
            input.addEventListener('focus', () => {
                gsap.to(input, {
                    borderBottomColor: '#00ffff',
                    boxShadow: '0 4px 6px rgba(0,255,255,0.3)',
                    scale: 1.02,
                    duration: 0.4,
                    ease: "elastic.out(1, 0.3)"
                });
            });

            input.addEventListener('blur', () => {
                gsap.to(input, {
                    borderBottomColor: 'rgba(255,255,255,0.2)',
                    boxShadow: 'none',
                    scale: 1,
                    duration: 0.3
                });
            });
        }
    });

    // Animation du bouton d'envoi plus interactive
    const sendButton = document.querySelector('button');
    sendButton.addEventListener('mouseenter', () => {
        gsap.timeline()
            .to(sendButton, {
                scale: 1.1,
                rotation: 3,
                borderColor: "#5A3E07",
                backgroundColor: "rgba(90, 62, 7, 0.2)",
                color: "white",
                duration: 0.3
            })
            .to(sendButton, {
                boxShadow: '0 10px 20px rgba(90, 62, 7, 0.3)',
                duration: 0.2
            });
    });

    sendButton.addEventListener('mouseleave', () => {
        gsap.timeline()
            .to(sendButton, {
                scale: 1,
                rotation: 0,
                backgroundColor: "transparent",
                color: "#111111",
                duration: 0.3
            })
            .to(sendButton, {
                boxShadow: 'none',
                duration: 0.2
            });
    });

    // Animation de validation supplémentaire
    sendButton.addEventListener('click', () => {
        gsap.to(sendButton, {
            scale: 0.9,
            duration: 0.1,
            onComplete: () => {
                gsap.to(sendButton, {
                    scale: 1,
                    duration: 0.2,
                    ease: "elastic.out(1, 0.3)"
                });
            }
        });
    });
}

// Animations du logo et des éléments principaux
function initLogoAnimations() {
    const tl = gsap.timeline();

    // Préparation des éléments à animer
    const splitter = new SplitText(".fullstack", { type: 'chars' });
    const paths = Array.from(document.querySelectorAll(".mylogo path:not(:last-of-type)")).reverse();
    const lastPath = document.querySelector(".mylogo path:last-of-type");
    const links = document.querySelectorAll(".lien");
    const paragraphs = Array.from(document.querySelectorAll("#home p")).reverse();
    const circleImage = document.querySelector(".cercle-image");
    const splitChars = document.querySelectorAll(".split-char");

    // Séquence d'animation
    tl
        .fromTo(paths, {
            scale: 0,
            y: -50
        }, {
            duration: 1,
            opacity: 1,
            scale: 1,
            stagger: { each: 0.1 },
            y: 0,
            ease: "bounce.out"
        })
        .from(lastPath, {
            duration: 0.5,
            scale: 0
        }, "-=1")
        .from(links, {
            duration: 1,
            y: -100,
            stagger: 0.1,
            ease: "bounce.out"
        }, "-=1")
        .from(paragraphs, {
            y: -200,
            stagger: 0.1,
            opacity: 0,
            ease: "bounce.out"
        }, "-=1")
        .from(circleImage, {
            duration: 2,
            opacity: 0,
            x: 700,
            rotateZ: "360deg",
            ease: "bounce.out"
        }, "-=0.5")
        .to(splitChars, {
            duration: 0.1,
            color: "#FFC03B",
            textDecoration: "underline",
            stagger: 0.1,
            scale: 1.1
        });
}

function transition() {

}
