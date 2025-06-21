document.addEventListener('DOMContentLoaded', function() {
    const tituloPrincipal = document.getElementById('titulo-principal');
    const botoesAbas = document.querySelectorAll('.botao-aba');
    const conteudosAbas = document.querySelectorAll('.conteudo-aba');

    botoesAbas.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesAbas.forEach(btn => btn.classList.remove('ativo'));
            conteudosAbas.forEach(conteudo => conteudo.classList.remove('ativo'));

            botao.classList.add('ativo');
            const abaId = botao.getAttribute('data-aba');
            document.getElementById(abaId).classList.add('ativo');

            const novoTitulo = botao.getAttribute('data-titulo');
            tituloPrincipal.textContent = novoTitulo;
        });
    });

    const botoesFechar = document.querySelectorAll('.botao-fechar');
    botoesFechar.forEach(botao => {
        botao.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

});