/* =========================
   WEBSOLUTIONS - SCRIPT FINAL PROFISSIONAL
========================= */

const cards = document.querySelectorAll(".projeto-card");
const tipoInput = document.getElementById("tipoProjeto");
const menu = document.querySelector(".menu-mobile");
const navbar = document.querySelector(".navbar");

/* =========================
   SELEÇÃO DE PROJETO
========================= */

cards.forEach(card => {
    card.addEventListener("click", () => {

        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        const tipo = card.getAttribute("data-projeto");
        tipoInput.value = tipo;

        gerarCampos(tipo);
    });
});

/* =========================
   FORMULÁRIO INTELIGENTE
========================= */

function gerarCampos(tipo) {

    let html = "";

    switch (tipo) {

        case "Website Institucional":
            html = `
                <div class="extra-fields">
                    <input type="text" placeholder="Nome da empresa" required>
                    <input type="text" placeholder="Área de atuação" required>
                    <input type="number" placeholder="Número de páginas">
                    <select required>
                        <option value="">Objetivo do site</option>
                        <option>Apresentação</option>
                        <option>Captar clientes</option>
                        <option>Informação</option>
                    </select>
                </div>
            `;
            break;

        case "Loja Online":
            html = `
                <div class="extra-fields">
                    <input type="number" placeholder="Quantidade de produtos">
                    <input type="text" placeholder="Categoria dos produtos">
                    <select>
                        <option value="">Método de pagamento</option>
                        <option>Pagamento manual</option>
                        <option>Transferência bancária</option>
                        <option>Pagamento online</option>
                    </select>
                </div>
            `;
            break;

        case "Sistema Académico":
            html = `
                <div class="extra-fields">
                    <input type="number" placeholder="Número de alunos">
                    <input type="text" placeholder="Módulos (Notas, Pagamentos...)">
                    <select>
                        <option>Escola</option>
                        <option>Instituto</option>
                        <option>Universidade</option>
                    </select>
                </div>
            `;
            break;

        case "Sistema Empresarial":
            html = `
                <div class="extra-fields">
                    <input type="text" placeholder="Nome da empresa">
                    <input type="text" placeholder="O que quer gerir?">
                    <select>
                        <option>Financeiro</option>
                        <option>RH</option>
                        <option>Vendas</option>
                        <option>Completo</option>
                    </select>
                </div>
            `;
            break;

        case "Personalizado":
            html = `
                <div class="extra-fields">
                    <input type="text" placeholder="Descreva sua ideia">
                </div>
            `;
            break;

        default:
            html = "";
    }

    const container = document.querySelector(".form-projeto");
    const old = document.querySelector(".extra-fields");

    if (old) old.remove();

    container.insertAdjacentHTML("beforeend", html);
}

/* =========================
   WHATSAPP SEND
========================= */

function enviarWhatsApp() {

    const tipo = document.getElementById("tipoProjeto").value;
    const nome = document.getElementById("nome").value;
    const contacto = document.getElementById("contacto").value;
    const orcamento = document.getElementById("orcamento").value;
    const prazo = document.getElementById("prazo").value;
    const descricao = document.getElementById("descricao").value;

    if (!tipo || !nome || !contacto) {
        alert("Preencha Nome, Contacto e selecione o tipo de projeto!");
        return;
    }

    let extras = "";

    document.querySelectorAll(".extra-fields input, .extra-fields select").forEach(el => {
        if (el.value.trim() !== "") {
            extras += `\n• ${el.placeholder || el.tagName}: ${el.value}`;
        }
    });

    const numero = "258871545619";

    const mensagem = `
🚀 NOVO PEDIDO WEBSOLUTIONS

👤 Nome: ${nome}
📞 Contacto: ${contacto}

📌 Serviço: ${tipo}
💰 Orçamento: ${orcamento || "Não definido"}
⏱ Prazo: ${prazo || "Não definido"}

🧠 Detalhes técnicos:
${extras || "Nenhum detalhe extra"}

📝 Descrição:
${descricao || "Sem descrição"}

📍 WebSolutions System
`;

    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`, "_blank");
}

/* =========================
   MENU MOBILE
========================= */

if (menu && navbar) {
    menu.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}

function abrirTermos() {
    document.getElementById("modalTermos").style.display = "block";
}

function fecharTermos() {
    document.getElementById("modalTermos").style.display = "none";
}

// fechar ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById("modalTermos");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}