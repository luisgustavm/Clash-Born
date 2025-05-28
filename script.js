document.addEventListener("DOMContentLoaded", () => {
  function sanitizarUsuario(usuario) {
    return usuario.replace(/[^\w@.-]/g, '');
  }

  function salvarUsuario(usuario, senha) {
    const usuarioLimpo = sanitizarUsuario(usuario);
    const hash = btoa(senha); // Exemplo - use hash real em produção
    const dados = JSON.parse(localStorage.getItem("usuarios")) || {};
    dados[usuarioLimpo] = hash;
    localStorage.setItem("usuarios", JSON.stringify(dados));
  }

  // Cadastro
  const cadastroForm = document.getElementById("cadastro-form");
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const usuario = document.getElementById("novo-usuario").value;
      const senha = document.getElementById("nova-senha").value;
      salvarUsuario(usuario, senha);
      alert("Cadastro realizado com sucesso!");
      window.location.href = "index.html";
    });
  }

  // Login
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const usuario = document.getElementById("login-usuario").value;
      const senha = document.getElementById("login-senha").value;
      const dados = JSON.parse(localStorage.getItem("usuarios")) || {};
      const senhaSalva = dados[sanitizarUsuario(usuario)];
      if (senhaSalva && senhaSalva === btoa(senha)) {
        alert("Login bem-sucedido!");
        localStorage.setItem("usuarioLogado", sanitizarUsuario(usuario));
        window.location.href = "menu.html";
      } else {
        alert("Usuário ou senha inválidos.");
      }
    });
  }

  // Perfil com Canvas
  const avatarCircle = document.getElementById('avatarCircle');
  const canvas = document.getElementById('perfilCanvas');

  if (avatarCircle && canvas) {
    const ctx = canvas.getContext('2d');
    const usuarioLogado = localStorage.getItem('usuarioLogado') || 'Jogador';

    const btnX = canvas.width / 2 - 50;
    const btnY = 70;
    const btnWidth = 100;
    const btnHeight = 30;

    function desenharPerfil() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Texto "Usuário:"
  ctx.font = '10px "Press Start 2P", cursive';
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText("Usuário:", canvas.width / 2, 30);

  // Nome do usuário
  ctx.font = '12px "Press Start 2P", cursive';
  ctx.fillStyle = "#ffffff";
  ctx.fillText(usuarioLogado, canvas.width / 2, 55);

  // Botão "SAIR" com cantos arredondados
  const radius = 10;

  // Função para desenhar retângulo arredondado
  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // Fundo do botão (transparente)
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  roundRect(ctx, btnX, btnY, btnWidth, btnHeight, radius);
  ctx.fill();

  // Borda do botão (semi-transparente)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
  ctx.lineWidth = 2;
  roundRect(ctx, btnX, btnY, btnWidth, btnHeight, radius);
  ctx.stroke();

  // Texto do botão
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.font = 'bold 14px "Press Start 2P", cursive';
  ctx.textBaseline = "middle";
  ctx.fillText("SAIR", btnX + btnWidth / 2, btnY + btnHeight / 2);
}


    avatarCircle.addEventListener('click', () => {
      const visivel = canvas.style.display === 'block';
      canvas.style.display = visivel ? 'none' : 'block';
      if (!visivel) desenharPerfil();
    });

    canvas.addEventListener("click", function (event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Clique no botão "SAIR"
      if (x >= btnX && x <= btnX + btnWidth && y >= btnY && y <= btnY + btnHeight) {
        // Remove o usuário logado e recarrega página ou redireciona para login
        localStorage.removeItem('usuarioLogado');
        alert("Você saiu da conta.");
        window.location.href = "index.html"; // ou sua página de login
      }
    });
  }
});

