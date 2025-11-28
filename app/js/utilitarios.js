// Funções utilitárias
function selecionar(seletor, raiz = document) {
  return raiz.querySelector(seletor);
}

function selecionarTodos(seletor, raiz = document) {
  return Array.from(raiz.querySelectorAll(seletor));
}

function mostrarNotificacao(mensagem) {
  const toast = selecionar('#toast');
  toast.textContent = mensagem;
  toast.classList.remove('escondido');
  setTimeout(() => toast.classList.add('escondido'), 2200);
}

function gerarId() {
  return Math.random().toString(36).slice(2, 9);
}

function carregarTemplate(idTemplate) {
  const template = document.getElementById(idTemplate);
  selecionar('#app').innerHTML = template.innerHTML;
}

function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}