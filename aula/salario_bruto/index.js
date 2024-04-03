let idFuncionario = 0;
let salariosLiquidos = [];
let descontosTotais = 0; 

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nomeFuncionario = document.getElementById('nome_funcionario').value;
    const beneficioSalario = parseFloat(document.getElementById('beneficio_salario').value);
    const descontosSalario = parseFloat(document.getElementById('descontos_salario').value);
    const salarioBruto = parseFloat(document.getElementById('salario_bruto').value);

    const nomeValido = /^[A-Za-z\s]+$/.test(nomeFuncionario.trim());

    if (!nomeValido) {
        alert("Por favor, digite um nome válido.");
        return;
    }

    if(isNaN(beneficioSalario) || isNaN(descontosSalario) || isNaN(salarioBruto)){
        alert("Por favor, digite valores válidos.");
        return;
    }

    const salarioLiquido = new CalculoSalarioLiquido(salarioBruto, descontosSalario, beneficioSalario);
    const salarioLiquidoCalculado = salarioLiquido.calcularSalarioLiquido();
    salariosLiquidos.push(salarioLiquidoCalculado); // Adiciona o salário líquido ao array
    descontosTotais += descontosSalario; // Atualiza a soma total dos descontos

    salarioLiquido.retorn(nomeFuncionario, salarioBruto, descontosSalario, beneficioSalario, salarioLiquidoCalculado);

    // Limpar os campos do formulário após o envio
    document.getElementById('nome_funcionario').value = '';
    document.getElementById('beneficio_salario').value = '';
    document.getElementById('descontos_salario').value = '';
    document.getElementById('salario_bruto').value = '';

    idFuncionario++;
    
    // Atualiza a segunda tabela com o maior salário líquido e a soma total dos descontos
    document.getElementById('maior_salario').textContent = CalculoSalarioLiquido.maiorSalario(salariosLiquidos).toFixed(2);
    document.getElementById('soma_descontos').textContent = CalculoSalarioLiquido.somaDescontos(descontosTotais).toFixed(2);
});

class CalculoSalarioLiquido {
    constructor(salarioBruto, descontos, beneficios) {
        this.salarioBruto = salarioBruto;
        this.descontos = descontos;
        this.beneficios = beneficios;
    }

    calcularSalarioLiquido() {
        // Lógica para calcular o salário líquido
        const salarioLiquido = this.salarioBruto + this.beneficios - this.descontos;
        return salarioLiquido;
    }

    retorn(nomeFuncionario, salarioBruto, descontos, beneficio, salarioLiquido) {
        const tabela = document.getElementById('tabela');
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${idFuncionario}</td>
            <td>${nomeFuncionario}</td>
            <td>${salarioBruto}</td>
            <td>${descontos}</td>
            <td>${beneficio}</td>
            <td style="color: greenyellow;">${salarioLiquido.toFixed(2)}</td>
        `;
        tabela.appendChild(novaLinha);
    }

    // Método para calcular o maior salário líquido
    static maiorSalario(salarios) {
        return Math.max(...salarios);
    }

    // Método para calcular a soma total dos descontos
    static somaDescontos(descontos) {
        return descontos;
    }
}