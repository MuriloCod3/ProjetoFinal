document.addEventListener('DOMContentLoaded', function() {
    const formularioLivro = document.getElementById('formulario-livro');
    const modalLivro = document.getElementById('modal-livro');
    const botaoAdicionarLivro = document.getElementById('botao-adicionar-livro');
    const listaLivros = document.getElementById('lista-livros');
    const buscalivro = document.getElementById('busca-livro');
    const botaoBuscarlivro = document.getElementById('botao-buscar-livro');
    const tituloModallivro = document.getElementById('titulo-modal-livro');

    function carregarLivros() {
        const livros = JSON.parse(localStorage.getItem('livros')) || [];
        return livros;
    }

    function salvarLivros(livros) {
        localStorage.setItem('livros', JSON.stringify(livros));
    }

    function exibirLivros(livros) {
        listaLivros.innerHTML = '';
        
        if (livros.length === 0) {
            listaLivros.innerHTML = '<tr><td colspan="6" style="text-align: center;">Nenhum livro cadastrado ainda.</td></tr>';
            return;
        }

        livros.forEach(livro => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>${livro.anoPublicacao}</td>
                <td>${livro.genero}</td>
                <td>${livro.notaUsuario}</td>
                <td>
                    <button class="botao-acao botao-editar" data-id="${livro.id}">Editar</button>
                    <button class="botao-acao botao-excluir-livro" data-id="${livro.id}">Excluir</button>
                </td>
            `;
            listaLivros.appendChild(linha);
        });

        document.querySelectorAll('.botao-editar').forEach(botao => {
            botao.addEventListener('click', editarLivro);
        });

        document.querySelectorAll('.botao-excluir-livro').forEach(botao => {
            botao.addEventListener('click', excluirLivro);
        });
    }

    botaoAdicionarLivro.addEventListener('click', function() {
        tituloModallivro.textContent = 'Adicionar Novo Livro';
        formularioLivro.reset();
        document.getElementById('id-livro').value = '';
        document.getElementById('data-adicao-livro').valueAsDate = new Date();
        modalLivro.style.display = 'block';
    });


    function editarLivro(e) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const livros = carregarLivros();
        const livro = livros.find(l => l.id === id);

        if (livro) {
            tituloModallivro.textContent = 'Editar Livro';
            document.getElementById('id-livro').value = livro.id;
            document.getElementById('titulo-livro').value = livro.titulo;
            document.getElementById('autor-livro').value = livro.autor;
            document.getElementById('ano-livro').value = livro.anoPublicacao;
            document.getElementById('genero-livro').value = livro.genero;
            document.getElementById('isbn-livro').value = livro.isbn || '';
            document.getElementById('paginas-livro').value = livro.paginas || '';
            document.getElementById('editora-livro').value = livro.editora || '';
            document.getElementById('idioma-livro').value = livro.idiomaOriginal || '';
            document.getElementById('sinopse-livro').value = livro.sinopse || '';
            document.getElementById('nota-livro').value = livro.notaUsuario;
            document.getElementById('data-adicao-livro').value = livro.dataAdicao;
            
            modalLivro.style.display = 'block';
        }
    }

    function excluirLivro(e) {
        if (confirm('Tem certeza que deseja excluir este livro?')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            let livros = carregarLivros();
            livros = livros.filter(l => l.id !== id);
            salvarLivros(livros);
            exibirLivros(livros);
        }
    }


    formularioLivro.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const id = document.getElementById('id-livro').value;
        const livros = carregarLivros();
        const dadosLivro = {
            id: id ? parseInt(id) : Date.now(),
            titulo: document.getElementById('titulo-livro').value,
            autor: document.getElementById('autor-livro').value,
            anoPublicacao: parseInt(document.getElementById('ano-livro').value),
            genero: document.getElementById('genero-livro').value,
            isbn: document.getElementById('isbn-livro').value,
            paginas: document.getElementById('paginas-livro').value ? parseInt(document.getElementById('paginas-livro').value) : null,
            editora: document.getElementById('editora-livro').value,
            idiomaOriginal: document.getElementById('idioma-livro').value,
            sinopse: document.getElementById('sinopse-livro').value,
            notaUsuario: parseFloat(document.getElementById('nota-livro').value),
            dataAdicao: document.getElementById('data-adicao-livro').value
        };

        if (id) {
            const indice = livros.findIndex(l => l.id === parseInt(id));
            if (indice !== -1) {
                livros[indice] = dadosLivro;
            }
        } else {
            livros.push(dadosLivro);
        }

        salvarLivros(livros);
        exibirLivros(livros);
        modalLivro.style.display = 'none';
    });

    function pesquisarLivros() {
        const termo = buscalivro.value.toLowerCase();
        const livros = carregarLivros();
        
        if (termo) {
            const filtrados = livros.filter(livro => 
                livro.titulo.toLowerCase().includes(termo)
            );
            exibirLivros(filtrados);
        } else {
            exibirLivros(livros);
        }
    }

    botaoBuscarlivro.addEventListener('click', pesquisarLivros);
    buscalivro.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            pesquisarLivros();
        }
    });

    exibirLivros(carregarLivros());
});