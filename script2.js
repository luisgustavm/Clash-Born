const form = document.getElementById('inscricaoForm');
const mensagem = document.getElementById('mensagemConfirmacao');
const lista = document.getElementById('listaConfirmados');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.style.display = 'none';
  mensagem.style.display = 'block';

  // Adicionar usuário na lista ao confirmar inscrição
  const usuario = localStorage.getItem("usuarioLogado") || "Anônimo";
  const item = document.createElement("li");
  item.textContent = usuario;
  lista.appendChild(item);

  alert("Inscrição confirmada!");
});
const btnPagar = document.getElementById('btnPagar');
const numeroCartao = document.getElementById('numeroCartao');
const msgPagamento = document.getElementById('msgPagamento');

btnPagar.addEventListener('click', () => {
  if (numeroCartao.value.trim() === '') {
    alert('Por favor, digite o número do cartão.');
    return;
  }

  // Simula o pagamento
  msgPagamento.style.display = 'block';
  
  // Opcional: limpa o campo e desabilita o botão para evitar múltiplos cliques
  numeroCartao.value = '';
  btnPagar.disabled = true;
  btnPagar.textContent = 'Pagamento concluído';
});
