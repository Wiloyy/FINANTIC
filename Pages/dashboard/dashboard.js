window.addEventListener('load', () => {
  const usuarioDados = sessionStorage.getItem("usuarioDados");
  if (usuarioDados) {
    const user = JSON.parse(usuarioDados);

    document.getElementById('salario').value = user.salario || '';
    document.getElementById('nomeEssenciais').value = user.nomeEssenciais || '';
    document.getElementById('essenciais').value = user.essenciais || '';
    document.getElementById('nomeNaoEssenciais').value = user.nomeNaoEssenciais || '';
    document.getElementById('naoEssenciais').value = user.naoEssenciais || '';
    document.getElementById('poupanca').value = user.poupanca || '';

    despesas = [];
    atualizarGrafico();
  }
});

const ctx = document.getElementById('meuGrafico').getContext('2d');
let grafico = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Despesas Essenciais', 'Despesas Não Essenciais', 'Poupança'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#0077cc', '#00bcd4', '#4caf50'],
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  },
  options: {
    plugins: {
      legend: {
        display: true
      }
    }
  }
});

let despesas = [];

function atualizarGrafico() {
  const salario = parseFloat(document.getElementById('salario').value) || 0;

  const nomeEssenciais = document.getElementById('nomeEssenciais').value;
  const essenciais = parseFloat(document.getElementById('essenciais').value) || 0;

  const nomeNaoEssenciais = document.getElementById('nomeNaoEssenciais').value;
  const naoEssenciais = parseFloat(document.getElementById('naoEssenciais').value) || 0;

  const nomePoupanca = document.getElementById('poupanca').value;

  
  if (nomeEssenciais.trim() !== "") {
    despesas.push({ nome: nomeEssenciais, valor: essenciais });
  }

  if (nomeNaoEssenciais.trim() !== "") {
    despesas.push({ nome: nomeNaoEssenciais, valor: naoEssenciais });
  }

  if (nomePoupanca.trim() !== "") {
    const valorPoupanca = parseFloat(nomePoupanca) || 0;
    despesas.push({ nome: "Poupança", valor: valorPoupanca });
  }

  grafico.data.labels = despesas.map(d => d.nome);
  grafico.data.datasets[0].data = despesas.map(d => d.valor);
  grafico.update();

  resetarCampos();
}

function resetarCampos() {
  document.getElementById('salario').value = '';
  document.getElementById('nomeEssenciais').value = '';
  document.getElementById('essenciais').value = '';
  document.getElementById('nomeNaoEssenciais').value = '';
  document.getElementById('naoEssenciais').value = '';
  document.getElementById('poupanca').value = '';
}

document.getElementById('btnAtualizar').addEventListener('click', atualizarGrafico);
document.getElementById('btnResetar').addEventListener('click', resetarCampos);
