document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('#navbar ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navUl.classList.contains('active'));
            if (navUl.classList.contains('active')) {
                menuToggle.textContent = '✕'; // Ícone de fechar
            } else {
                menuToggle.textContent = '☰'; // Ícone de menu
            }
        });
    }

    // Smooth Scroll para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Verifica se é um link para uma âncora na mesma página
            if (href.startsWith('#') && href.length > 1) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Fecha o menu mobile após clicar em um link (se estiver aberto)
                    if (navUl && navUl.classList.contains('active')) {
                        navUl.classList.remove('active');
                        menuToggle.textContent = '☰';
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });

    // Destacar link ativo na navbar ao rolar (opcional, mais avançado)
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('#navbar ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Subtrai um pouco para ativar o link antes de chegar exatamente no topo da seção
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current) {
                link.classList.add('active');
            }
        });
        // Caso especial para o link "Home" ou o primeiro link se nenhum outro estiver ativo
        if (!current && navLinks.length > 0 && navLinks[0].getAttribute('href') === '#hero') {
             navLinks[0].classList.add('active');
        }
    });


    // Exemplo: Adicionar imagens à galeria da Era de Ouro dinamicamente
    const goldenAgeGallery = document.getElementById('gallery-golden-age');
    if (goldenAgeGallery) {
        const goldenAgeArtists = [
            { name: 'Run-DMC', img: 'assets/images/run_dmc.jpg' },
            { name: 'Public Enemy', img: 'assets/images/public_enemy.jpg' },
            { name: 'N.W.A.', img: 'assets/images/nwa.jpg' },
            // Adicione mais artistas
        ];

        goldenAgeArtists.forEach(artist => {
            const imgElement = document.createElement('img');
            imgElement.src = artist.img;
            imgElement.alt = `Foto de ${artist.name}`;
            imgElement.title = artist.name; // Mostra o nome ao passar o mouse
            goldenAgeGallery.appendChild(imgElement);
        });
    }

    // Outras interatividades que você pode adicionar:
    // - Um carrossel de imagens para o graffiti ou breakdance.
    // - "Leia mais" para parágrafos longos.
    // - Um pequeno quiz sobre a história do hip-hop.
    // - Players de áudio embutidos para exemplos de músicas.
});