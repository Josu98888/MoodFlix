window.addEventListener('load', () => {
    const intro = document.getElementById('intro');
    const audio = document.getElementById('introSound');

    // bloquear página
    document.body.classList.add('intro-active');

    // reproducir sonido
    audio.volume = 0.7;

    audio.play().catch(() => {
        console.log('El navegador bloqueó el autoplay');
    });

    // duración intro
    setTimeout(() => {
        intro.classList.add('hidden');

        // habilitar página
        document.body.classList.remove('intro-active');
    }, 3500);
});
