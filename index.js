// index.js - Script para customização extra da apresentação Reveal.js estilo Prezi

document.addEventListener('DOMContentLoaded', () => {
    if (typeof Reveal !== "undefined") {
        Reveal.configure({
            transition: 'zoom', // inicial para efeito Prezi
            backgroundTransition: 'convex',
            slideNumber: true,
            controls: true,
            progress: true,
            center: true,
            hash: true
        });

        // Botão para voltar ao início
        const footer = document.querySelector('.footer');
        if (footer) {
            const btn = document.createElement('button');
            btn.textContent = 'Voltar ao Início';
            btn.title = 'Clique para ir ao primeiro slide';
            btn.style.marginLeft = '20px';
            btn.className = 'modern-btn';
            btn.onclick = () => {
                btn.classList.add('btn-click');
                setTimeout(() => btn.classList.remove('btn-click'), 300);
                Reveal.slide(0);
            };
            footer.appendChild(btn);
        }

        // Alterna transições Prezi-like a cada slide
        const transitions = ['zoom', 'convex', 'concave', 'slide', 'fade'];
        Reveal.on('slidechanged', event => {
            const idx = event.indexh % transitions.length;
            Reveal.configure({ transition: transitions[idx] });

            // Animação moderna no slide
            const currentSlide = event.currentSlide;
            currentSlide.classList.add('prezi-animate');
            setTimeout(() => {
                currentSlide.classList.remove('prezi-animate');
            }, 900);

            // Efeito fade nos fragments
            const fragments = currentSlide.querySelectorAll('.fragment');
            fragments.forEach(frag => {
                frag.classList.add('fragment-fade');
            });

            // Interação no último slide
            if (event.indexh === Reveal.getTotalSlides() - 1) {
                setTimeout(() => {
                    alert('Obrigado por assistir à apresentação sobre a NR29!');
                }, 400);
            }
        });

        // Animação inicial no primeiro slide
        const firstSlide = document.querySelector('.slides section');
        if (firstSlide) {
            firstSlide.classList.add('prezi-animate');
            setTimeout(() => {
                firstSlide.classList.remove('prezi-animate');
            }, 900);
        }
    }
});

// Estilo para animação estilo Prezi (adicione ao seu style.css)
/*
.prezi-animate {
    animation: zoomIn 0.9s cubic-bezier(.68,-0.55,.27,1.55);
}
@keyframes zoomIn {
    0% { transform: scale(0.7) rotate(10deg); opacity: 0; }
    50% { transform: scale(1.05) rotate(-5deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
.fragment-fade {
    opacity: 0.2;
    transition: opacity 0.7s;
}
.fragment.visible.fragment-fade {
    opacity: 1;
}
.modern-btn {
    background: linear-gradient(90deg, #1fa2ff 0%, #005fa3 100%);
    color: #fff;
    border: none;
    padding: 8px 18px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    box-shadow: 0 2px 8px #0003;
    transition: background 0.3s, transform 0.2s;
}
.modern-btn:hover {
    background: linear-gradient(90deg, #005fa3 0%, #1fa2ff 100%);
    transform: scale(1.07);
}
.modern-btn.btn-click {
    animation: btnPop 0.3s;
}
@keyframes btnPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.13); }
    100% { transform: scale(1); }
}
*/