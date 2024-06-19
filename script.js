// Função para calcular o prazo total de entrega
function calcularPrazo() {
    // Pegar a data inicial selecionada
    let dataInicial = document.getElementById('data-inicial').value;
    if (!dataInicial) {
        alert('Por favor, selecione uma data inicial.');
        return;
    }

    // Converter a data inicial para objeto Date
    dataInicial = new Date(dataInicial);

    // Pegar os valores dos processos
    const grupoValvula = parseFloat(document.getElementById('grupo-valvula').value) || 0;
    const prazoIdeal = parseFloat(document.getElementById('prazo-ideal').value) || 0;
    const engenharia = parseFloat(document.getElementById('engenharia').value) || 0;
    const pcpPreCompra = parseFloat(document.getElementById('pcp-pre-compra').value) || 0;
    const comprasPrazo = parseFloat(document.getElementById('compras-prazo').value) || 0;
    const processamentoInterno = parseFloat(document.getElementById('processamento-interno').value) || 0;
    const montagemExpedicao = parseFloat(document.getElementById('montagem-expedicao').value) || 0;

    // Calcular o prazo total em dias
    let prazoTotalDias = engenharia +
                         pcpPreCompra +
                         comprasPrazo +
                         processamentoInterno +
                         montagemExpedicao
                         ;

    // Calcular a diferença entre o prazo ideal e o prazo total de processamento
    let diferencaPrazo = prazoIdeal - prazoTotalDias;

    // Calcular a data de entrega somando o prazo total em dias à data inicial
    let dataEntrega = new Date(dataInicial);
    dataEntrega.setDate(dataEntrega.getDate() + prazoTotalDias);

    // Formatando a data de entrega para exibição
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const dataEntregaFormatada = dataEntrega.toLocaleDateString('pt-BR', options);

    // Exibir o resultado na página
    const resultado = `
        <h3>Resultado:</h3>
        <p>Prazo Ideal: ${prazoIdeal} dias</p>
        <p>Prazo Total de Processamento: ${prazoTotalDias} dias</p>
        <p>Diferença entre Prazo Ideal e Prazo Total de Processamento: ${diferencaPrazo} dias</p>
        <p>Data de Entrega Estimada: ${dataEntregaFormatada}</p>
    `;
    document.getElementById('resultado').innerHTML = resultado;
}

// Função para atualizar o prazo ideal
function atualizarPrazoIdeal() {
    const grupoValvulaSelect = document.getElementById('grupo-valvula');
    const prazoIdealInput = document.getElementById('prazo-ideal');
    const selectedOption = grupoValvulaSelect.options[grupoValvulaSelect.selectedIndex];
    const prazoIdeal = selectedOption.getAttribute('data-prazo');
    prazoIdealInput.value = prazoIdeal;
}

// Função para limpar os campos
function limparDados() {
    document.getElementById('data-inicial').value = '';
    document.getElementById('grupo-valvula').selectedIndex = 0;
    document.getElementById('prazo-ideal').value = '';
    document.getElementById('engenharia').value = '';
    document.getElementById('pcp-pre-compra').value = '';
    document.getElementById('compras-prazo').selectedIndex = 0;
    document.getElementById('processamento-interno').value = '';
    document.getElementById('montagem-expedicao').value = '';
    document.getElementById('resultado').innerHTML = '';
}
// Adicionar evento de mudança ao selecionar um grupo de válvulas
document.getElementById('grupo-valvula').addEventListener('change', atualizarPrazoIdeal);
