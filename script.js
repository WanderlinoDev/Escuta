document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const links = document.querySelectorAll('a.load-page');

    // 1. SALVA O CONTEÚDO ORIGINAL do index.html (com o logo)
    const originalContent = mainContent.innerHTML;

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            const page = link.getAttribute('data-page');

            // LÓGICA DE RECARGA: Se o link for 'reload-home', restaura o HTML salvo
            if (page === 'reload-home') {
                mainContent.innerHTML = originalContent;
                // O CSS cuidará do efeito fade-in da imagem
                return; 
            }

            // LÓGICA DE CARREGAMENTO: Para todas as outras páginas (.html)
            fetch(page)
                .then(response => {
                    if (!response.ok) {
                        // Isso garante que links quebrados, como 'home.html', mostrem um erro claro
                        throw new Error('Erro ao carregar a página: ' + response.statusText);
                    }
                    return response.text();
                })
                .then(html => {
                    // Carrega o novo HTML e reinicia a animação de fade-in da caixa principal
                    mainContent.innerHTML = html;
                    mainContent.style.animation = 'none'; 
                    void mainContent.offsetWidth; 
                    mainContent.style.animation = null; 
                })
                .catch(error => {
                    console.error('Houve um problema com a requisição fetch:', error);
                    mainContent.innerHTML = `<p class="error-message">Não foi possível carregar o conteúdo.</p>`;
                });
        });
    });
});