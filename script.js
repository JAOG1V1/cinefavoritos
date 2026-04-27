// Marca o link ativo no menu conforme a página atual
function marcarNavAtivo() {
    const pagina = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.menu a').forEach(link => {
        if (link.getAttribute('href') === pagina) {
            link.classList.add('ativo');
        }
    });
}

// Exibe saudação conforme o horário do dia
function mostrarSaudacao() {
    const elemento = document.getElementById('saudacao');
    if (!elemento) return;

    const hora = new Date().getHours();
    let mensagem;

    if (hora < 12) {
        mensagem = '🌅 Bom dia! Que tal um filme com café?';
    } else if (hora < 18) {
        mensagem = '☀️ Boa tarde! Hora perfeita pra uma sessão.';
    } else {
        mensagem = '🌙 Boa noite! A hora ideal pra um bom filme.';
    }

    elemento.textContent = mensagem;
}

// Filtro de filmes por gênero
function configurarFiltros() {
    const botoes = document.querySelectorAll('.filtro');
    const cards = document.querySelectorAll('.card');
    const contagem = document.getElementById('contagem-filmes');
    if (!botoes.length) return;

    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            botoes.forEach(b => b.classList.remove('ativo'));
            botao.classList.add('ativo');

            const filtro = botao.dataset.filtro;
            let visiveis = 0;

            cards.forEach((card, i) => {
                const visivel = filtro === 'todos' || card.dataset.genero === filtro;
                card.style.display = visivel ? '' : 'none';
                if (visivel) {
                    card.style.animationDelay = `${(visiveis % 12) * 0.05}s`;
                    card.style.animation = 'none';
                    card.offsetHeight; // força reflow para reiniciar animação
                    card.style.animation = 'fadeInUp 0.4s ease both';
                    visiveis++;
                }
            });

            if (contagem) {
                contagem.textContent = `${visiveis} ${visiveis === 1 ? 'filme' : 'filmes'}`;
            }
        });
    });
}

// Validação e envio do formulário de contato
function configurarFormulario() {
    const form = document.getElementById('formContato');
    if (!form) return;

    const textarea = document.getElementById('mensagem');
    const contador = document.getElementById('contador');

    if (textarea && contador) {
        textarea.addEventListener('input', () => {
            const total = textarea.value.length;
            contador.textContent = `${total}/500 caracteres`;
            contador.style.color = total > 450 ? '#e63946' : '#555';
        });
    }

    function mostrarErro(campo, mensagem) {
        const erro = document.getElementById(`erro-${campo}`);
        const input = document.getElementById(campo);
        if (erro) erro.textContent = mensagem;
        if (input) input.classList.add('invalido');
    }

    function limparErro(campo) {
        const erro = document.getElementById(`erro-${campo}`);
        const input = document.getElementById(campo);
        if (erro) erro.textContent = '';
        if (input) input.classList.remove('invalido');
    }

    ['nome', 'email', 'mensagem'].forEach(campo => {
        document.getElementById(campo)?.addEventListener('input', () => limparErro(campo));
    });

    form.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        const resposta = document.getElementById('resposta');
        const botao = form.querySelector('button[type="submit"]');

        let valido = true;

        if (nome.length < 2) {
            mostrarErro('nome', 'Por favor, insira seu nome completo.');
            valido = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarErro('email', 'Por favor, insira um e-mail válido.');
            valido = false;
        }

        if (mensagem.length < 10) {
            mostrarErro('mensagem', 'A mensagem deve ter pelo menos 10 caracteres.');
            valido = false;
        }

        if (!valido) return;

        botao.textContent = 'Enviando...';
        botao.disabled = true;
        resposta.textContent = '';

        setTimeout(() => {
            resposta.textContent = `✅ Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`;
            form.reset();
            if (contador) contador.textContent = '0/500 caracteres';
            botao.textContent = 'Enviar Mensagem';
            botao.disabled = false;
        }, 1000);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    marcarNavAtivo();
    mostrarSaudacao();
    configurarFiltros();
    configurarFormulario();
});
