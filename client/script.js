// 1. Função principal que busca dados da API
async function carregarReceitas(termo = "") {
  try {
    // Agora buscamos da sua API real
    const response = await fetch(`http://localhost:3000/api/receitas?q=${termo}`);
    const receitas = await response.json();

    renderizarReceitas(receitas);
  } catch (error) {
    console.error("Erro ao conectar com a API:", error);
  }
}

// 2. Função que cria o HTML dos cards (sem alterações na lógica visual)
function renderizarReceitas(lista) {
  const container = document.getElementById('botoes-container');
  container.innerHTML = "";

  if (lista.length === 0) {
    container.innerHTML = `<p class="text-amber-800 text-center col-span-full py-20 text-xl font-bold italic">Nenhuma receita encontrada... 🍪</p>`;
    return;
  }

  lista.forEach(receita => {
    const btn = document.createElement('button');
    btn.className = "group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl text-left flex flex-col items-stretch outline-none border border-amber-100";

    btn.innerHTML = `
      <div class="h-52 overflow-hidden bg-amber-50">
        <img src="${receita['image-path']}" alt="${receita.name}" class="w-full h-full object-cover">
      </div>
      <div class="p-6 flex-grow flex flex-col">
        <h2 class="text-2xl font-black text-amber-900 mb-3">${receita.name}</h2>
        <ul class="text-sm text-amber-950 space-y-1 mb-4 list-disc list-inside opacity-90">
          <li><strong>Preparo:</strong> ${receita['preparation-time']}</li>
          <li><strong>Ingredientes:</strong> ${receita['ingredients-count']} itens</li>
        </ul>
        <hr class="border-amber-100 mb-4">
        <p class="text-gray-700 italic text-sm leading-relaxed flex-grow">${receita.description}</p>
      </div>
    `;

    btn.onclick = () => {
      window.location.href = `receita.html?id=${receita.id}`;
    };

    container.appendChild(btn);
  });
}

// 3. Evento da Barra de Pesquisa
// Agora, em vez de filtrar no JS local, chamamos a API a cada tecla digitada
document.getElementById('campo-busca').addEventListener('input', (e) => {
  const termoBusca = e.target.value;
  carregarReceitas(termoBusca);
});

// 4. Inicialização: carrega todas as receitas ao abrir a página
document.addEventListener('DOMContentLoaded', () => carregarReceitas());