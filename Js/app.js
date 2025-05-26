// Funções gerais da aplicação
document.addEventListener('DOMContentLoaded', function() {
    // Controle das abas
    const tituloPrincipal = document.getElementById('titulo-principal');
    const botoesAbas = document.querySelectorAll('.botao-aba');
    const conteudosAbas = document.querySelectorAll('.conteudo-aba');

    botoesAbas.forEach(botao => {
        botao.addEventListener('click', () => {
            // Remove a classe ativo de todos os botões e conteúdos
            botoesAbas.forEach(btn => btn.classList.remove('ativo'));
            conteudosAbas.forEach(conteudo => conteudo.classList.remove('ativo'));

            // Adiciona a classe ativo ao botão clicado e ao conteúdo correspondente
            botao.classList.add('ativo');
            const abaId = botao.getAttribute('data-aba');
            document.getElementById(abaId).classList.add('ativo');

            const novoTitulo = botao.getAttribute('data-titulo');
            tituloPrincipal.textContent = novoTitulo;
        });
    });

    // Fechar modais ao clicar no X
    const botoesFechar = document.querySelectorAll('.botao-fechar');
    botoesFechar.forEach(botao => {
        botao.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

});