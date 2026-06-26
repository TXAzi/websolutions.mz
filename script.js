// ==================== CONTROLO DO MENU RESPONSIVO (MOBILE) ====================
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    if (hamburger && navbar) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navbar.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            }
        });
    }

    // ==================== SELEÇÃO DINÂMICA DE PROJETOS ====================
    const cardsProjeto = document.querySelectorAll('.projeto-premium-card-btn');
    const inputTipoProjeto = document.getElementById('tipoProjeto');
    const containerExtra = document.querySelector('.form-extra-premium');

    cardsProjeto.forEach(card => {
        card.addEventListener('click', () => {
            cardsProjeto.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            const tipoSelecionado = card.getAttribute('data-projeto');
            inputTipoProjeto.value = tipoSelecionado;

            gerarCamposExtras(tipoSelecionado, containerExtra);
        });
    });
});

function gerarCamposExtras(tipo, container) {
    container.innerHTML = ""; 
    let htmlCampos = "";

    switch (tipo) {
        case "Website Institucional":
            htmlCampos = `
                <div class="input-group full-width">
                    <label>A sua empresa já possui identidade visual (Logótipo, Cores)?</label>
                    <select id="extra_design">
                        <option>Sim, já temos tudo definido</option>
                        <option>Não, precisamos que a WebSolutions crie</option>
                    </select>
                </div>`;
            break;
        case "Loja Online":
            htmlCampos = `
                <div class="input-group">
                    <label>Quantidade estimada de produtos</label>
                    <input type="text" id="extra_produtos" placeholder="Ex: Até 50 produtos">
                </div>
                <div class="input-group">
                    <label>Métodos de pagamento pretendidos</label>
                    <select id="extra_pagamento">
                        <option>M-Pesa e e-Mola (Carteiras Móveis)</option>
                        <option>Cartões de Crédito / SIMO</option>
                        <option>Todos os acima integrados</option>
                    </select>
                </div>`;
            break;
        case "Sistema Académico":
            htmlCampos = `
                <div class="input-group">
                    <label>Número estimado de estudantes</label>
                    <input type="number" id="extra_estudantes" placeholder="Ex: 500">
                </div>
                <div class="input-group">
                    <label>Funcionalidade Crítica</label>
                    <select id="extra_academico">
                        <option>Controlo Financeiro de Propinas</option>
                        <option>Matrículas Online e Pautas</option>
                        <option>Ambos os módulos integrados</option>
                    </select>
                </div>`;
            break;
        case "Sistema Empresarial":
        case "Aplicação Web":
            htmlCampos = `
                <div class="input-group full-width">
                    <label>Qual o principal problema ou processo que o software deve automatizar?</label>
                    <input type="text" id="extra_foco" placeholder="Ex: Gestão de stock e faturação automatizada">
                </div>`;
            break;
        default:
            htmlCampos = "";
    }

    container.innerHTML = htmlCampos;
    container.style.display = htmlCampos ? "grid" : "none";
}

// ==================== DISPARO PARA O WHATSAPP E GRAVAÇÃO NO ADMIN ====================
function enviarWhatsApp() {
    const tipoProjeto = document.getElementById('tipoProjeto').value;
    const nome = document.getElementById('nome').value.trim();
    const contacto = document.getElementById('contacto_val').value.trim();
    const orcamento = document.getElementById('orcamento').value;
    const prazo = document.getElementById('prazo').value;
    const descricao = document.getElementById('descricao').value.trim();

    if (!tipoProjeto) {
        alert("Por favor, selecione o tipo de solução clicando num dos ícones (Website, Loja, etc.).");
        return;
    }
    if (!nome || !contacto) {
        alert("Por favor, preencha o seu Nome e Contacto para podermos responder.");
        return;
    }

    // ===================================================
    // GRAVAÇÃO INTERNA REAL PARA CONEXÃO COM O ADMIN.HTML
    // ===================================================
    const novoPedido = {
        dataHora: new Date().toLocaleString('pt-MZ', { timeZone: 'Africa/Maputo' }).slice(0, -3),
        cliente: nome,
        contacto: contacto,
        tipo: tipoProjeto,
        orcamento: orcamento || "A analisar",
        estado: "Encaminhado p/ WhatsApp"
    };

    let listaPedidos = JSON.parse(localStorage.getItem('pedidosWebSolutions')) || [];
    listaPedidos.unshift(novoPedido); // Insere no topo da lista
    localStorage.setItem('pedidosWebSolutions', JSON.stringify(listaPedidos));

    // Atualiza o contador de cliques no painel
    let cliquesWhats = parseInt(localStorage.getItem('cliquesWhats')) || 28;
    localStorage.setItem('cliquesWhats', cliquesWhats + 1);
    // ===================================================

    let textoMensagem = `Olá WebSolutions! Gostaria de solicitar um orçamento para engenharia de software:\n\n`;
    textoMensagem += `⚙️ *Tipo de Projeto:* ${tipoProjeto}\n`;
    textoMensagem += `👤 *Cliente:* ${nome}\n`;
    textoMensagem += `📞 *Contacto:* ${contacto}\n`;
    textoMensagem += `💰 *Orçamento Previsto:* ${orcamento || "Não informado"}\n`;
    textoMensagem += `⏳ *Prazo:* ${prazo || "Não informado"}\n`;
    
    if (descricao) {
        textoMensagem += `\n📝 *Descrição Geral:*\n${descricao}`;
    }

    const numeroWhats = "258871545619";
    const urlFinal = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(textoMensagem)}`;

    window.open(urlFinal, '_blank');
}

function abrirTermos() {
    const modal = document.getElementById("modalTermos");
    if (modal) modal.style.display = "block";
}

function fecharTermos() {
    const modal = document.getElementById("modalTermos");
    if (modal) modal.style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("modalTermos");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
