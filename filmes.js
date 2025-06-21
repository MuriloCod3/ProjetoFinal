
document.addEventListener('DOMContentLoaded', function() {
    const formularioFilme = document.getElementById('formulario-filme');
    const modalFilme = document.getElementById('modal-filme');
    const botaoAdicionarFilme = document.getElementById('botao-adicionar-filme');
    const listaFilmes = document.getElementById('lista-filmes');
    const buscaFilme = document.getElementById('busca-filme');
    const botaoBuscarFilme = document.getElementById('botao-buscar-filme');
    const tituloModalFilme = document.getElementById('titulo-modal-filme');

    function carregarFilmes() {
        const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
        return filmes;
    }

    function salvarFilmes(filmes) {
        localStorage.setItem('filmes', JSON.stringify(filmes));
    }

    function exibirFilmes(filmes) {
        listaFilmes.innerHTML = '';
        
        if (filmes.length === 0) {
            listaFilmes.innerHTML = '<tr><td colspan="6" style="text-align: center;">Nenhum filme cadastrado ainda.</td></tr>';
            return;
        }

        filmes.forEach(filme => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${filme.titulo}</td>
                <td>${filme.diretor}</td>
                <td>${filme.ano}</td>
                <td>${filme.genero}</td>
                <td>${filme.notaUsuario}</td>
                <td>
                    <button class="botao-acao botao-editar" data-id="${filme.id}">Editar</button>
                    <button class="botao-acao botao-excluir-filme" data-id="${filme.id}">Excluir</button>
                </td>
            `;
            listaFilmes.appendChild(linha);
        });

        document.querySelectorAll('.botao-editar').forEach(botao => {
            botao.addEventListener('click', editarFilme);
        });

        document.querySelectorAll('.botao-excluir-filme').forEach(botao => {
            botao.addEventListener('click', excluirFilme);
        });
    }

    botaoAdicionarFilme.addEventListener('click', function() {
        tituloModalFilme.textContent = 'Adicionar Novo Filme';
        formularioFilme.reset();
        document.getElementById('id-filme').value = '';
        document.getElementById('data-adicao-filme').valueAsDate = new Date();
        modalFilme.style.display = 'block';
    });

    function editarFilme(e) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const filmes = carregarFilmes();
        const filme = filmes.find(f => f.id === id);

        if (filme) {
            tituloModalFilme.textContent = 'Editar Filme';
            document.getElementById('id-filme').value = filme.id;
            document.getElementById('titulo-filme').value = filme.titulo;
            document.getElementById('diretor-filme').value = filme.diretor;
            document.getElementById('ano-filme').value = filme.ano;
            document.getElementById('genero-filme').value = filme.genero;
            document.getElementById('duracao-filme').value = filme.duracao;
            document.getElementById('elenco-filme').value = filme.elenco;
            document.getElementById('classificacao-filme').value = filme.classificacao;
            document.getElementById('sinopse-filme').value = filme.sinopse;
            document.getElementById('nota-filme').value = filme.notaUsuario;
            document.getElementById('data-adicao-filme').value = filme.dataAdicao;
            
            modalFilme.style.display = 'block';
        }
    }

    function excluirFilme(e) {
        if (confirm('Tem certeza que deseja excluir este filme?')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            let filmes = carregarFilmes();
            filmes = filmes.filter(f => f.id !== id);
            salvarFilmes(filmes);
            exibirFilmes(filmes);
        }
    }

    formularioFilme.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const id = document.getElementById('id-filme').value;
        const filmes = carregarFilmes();
        const dadosFilme = {
            id: id ? parseInt(id) : Date.now(),
            titulo: document.getElementById('titulo-filme').value,
            diretor: document.getElementById('diretor-filme').value,
            ano: parseInt(document.getElementById('ano-filme').value),
            genero: document.getElementById('genero-filme').value,
            duracao: parseInt(document.getElementById('duracao-filme').value),
            elenco: document.getElementById('elenco-filme').value,
            classificacao: document.getElementById('classificacao-filme').value,
            sinopse: document.getElementById('sinopse-filme').value,
            notaUsuario: parseFloat(document.getElementById('nota-filme').value),
            dataAdicao: document.getElementById('data-adicao-filme').value
        };

        if (id) {
            const indice = filmes.findIndex(f => f.id === parseInt(id));
            if (indice !== -1) {
                filmes[indice] = dadosFilme;
            }
        } else {
            filmes.push(dadosFilme);
        }

        salvarFilmes(filmes);
        exibirFilmes(filmes);
        modalFilme.style.display = 'none';
    });

    function pesquisarFilmes() {
        const termo = buscaFilme.value.toLowerCase();
        const filmes = carregarFilmes();
        
        if (termo) {
            const filtrados = filmes.filter(filme => 
                filme.titulo.toLowerCase().includes(termo)
            );
            exibirFilmes(filtrados);
        } else {
            exibirFilmes(filmes);
        }
    }

    botaoBuscarFilme.addEventListener('click', pesquisarFilmes);
    buscaFilme.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            pesquisarFilmes();
        }
    });

    exibirFilmes(carregarFilmes());
});