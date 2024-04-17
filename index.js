let alunos = [];
let id = 0;

document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();

    // Obter os valores do formulário
    var nome = document.getElementById('nome').value;
    var nota01 = parseInt(document.getElementById('nota01').value);
    var nota02 = parseInt(document.getElementById('nota02').value);

    // Criar uma nova instância de Aluno
    const novoAluno = new Aluno(nome, nota01, nota02);

    // Adicionar o aluno ao array de alunos
    alunos.push(novoAluno);

    // Atualizar a tabela de alunos
    novoAluno.retorno_tabela();

    // Atualizar a tabela de média da turma
    atualizarMediaTurma();

    // Limpar os campos do formulário
    document.getElementById('nome').value = '';
    document.getElementById('nota01').value = '';
    document.getElementById('nota02').value = '';
});

class Aluno {
    constructor(nome, nota01, nota02) {
        this.id = ++id;
        this.nome = nome;
        this.nota01 = nota01;
        this.nota02 = nota02;
    }

    media() {
        return (this.nota01 + this.nota02) / 2;
    }

    // Método para adicionar uma nova linha na tabela de alunos
    retorno_tabela() {
        const tabelaAlunos = document.getElementById('tabelas_alunos');
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${this.id}</td>
            <td>${this.nome}</td>
            <td>${this.nota01}</td>
            <td>${this.nota02}</td>
            <td>${this.media()}</td> 
        `;
        tabelaAlunos.appendChild(novaLinha);
    }
}

function atualizarMediaTurma() {
    // Calcular a média da turma
    const mediaTurma = calcularMediaTurma();

    // Calcular a maior média da turma
    const maiorMediaTurma = calcularMaiorMediaTurma();

    // Atualizar a tabela com os valores calculados
    document.getElementById('media_da_turma').textContent = mediaTurma.toFixed(2);
    document.getElementById('maior_media_da_turma').textContent = maiorMediaTurma.toFixed(2);
}

function calcularMediaTurma() {
    const totalMedias = alunos.reduce((total, aluno) => total + aluno.media(), 0);
    return totalMedias / alunos.length;
}

function calcularMaiorMediaTurma() {
    return Math.max(...alunos.map(aluno => aluno.media()));
}