const resources = [
  {
    name: 'Google Docs',
    category: 'Produção e autoria',
    description: 'Escrita colaborativa, revisão textual e produção de documentos.',
    count: 0,
    image: 'GOO.jpg',
    alt: 'Ícone do Google Docs',
    style: 'docs'
  },
  { name: 'YouTube', category: 'Vídeo e áudio', description: 'Vídeos educativos, análises e produção audiovisual.', count: 0, style: 'youtube', glyph: '' },
  { name: 'Google Slides', category: 'Produção e autoria', description: 'Apresentações interativas, aulas visuais e narrativas digitais.', count: 0, style: 'slides', glyph: '▭' },
  { name: 'Scratch', category: 'Programação', description: 'Programação em blocos, jogos e pensamento computacional.', count: 0, style: 'scratch', glyph: '🐱' },
  { name: 'Gemini', category: 'Inteligência Artificial', description: 'Planejamento, criação de conteúdos e apoio à docência.', count: 0, style: 'gemini', glyph: '✦' },
  { name: 'Kahoot!', category: 'Jogos e interatividade', description: 'Questionários, jogos e avaliações gamificadas.', count: 0, style: 'kahoot', glyph: 'K!' },
  { name: 'Google Classroom', category: 'Gestão e colaboração', description: 'Organização de turmas, atividades e devolutivas.', count: 0, style: 'classroom', glyph: '👥' },
  { name: 'Google Forms', category: 'Gestão e colaboração', description: 'Diagnósticos, pesquisas e avaliação formativa.', count: 0, style: 'forms', glyph: '☷' },
  { name: 'Google Sheets', category: 'Produção e autoria', description: 'Planilhas, dados e gráficos para a aprendizagem.', count: 0, style: 'sheets', glyph: '▦' },
  { name: 'Google Sites', category: 'Produção e autoria', description: 'Portfólios, páginas de projetos e curadoria digital.', count: 0, style: 'sites', glyph: '▧' },
  { name: 'ChatGPT', category: 'Inteligência Artificial', description: 'Criação assistida, planejamento e reflexão pedagógica.', count: 0, style: 'chatgpt', glyph: '◎' },
  { name: 'Suno', category: 'Vídeo e áudio', description: 'Exploração musical, trilhas sonoras e experiências criativas.', count: 0, style: 'suno', glyph: 'SU' },
  { name: 'p5.js', category: 'Programação', description: 'Arte generativa, visualização e projetos interativos.', count: 0, style: 'p5js', glyph: 'p5' },
  { name: 'Canva', category: 'Produção e autoria', description: 'Infográficos, apresentações e design de materiais.', count: 0, style: 'canva', glyph: 'C' },
  { name: 'Google Vids', category: 'Vídeo e áudio', description: 'Criação e edição de vídeos educacionais.', count: 0, style: 'video', glyph: '▶' },
  { name: 'CapCut', category: 'Vídeo e áudio', description: 'Edição, legendas e narrativas audiovisuais.', count: 0, style: 'capcut', glyph: '✂' },
  { name: 'Padlet', category: 'Gestão e colaboração', description: 'Murais colaborativos e registros de aprendizagem.', count: 0, style: 'padlet', glyph: '▣' },
  { name: 'HTML', category: 'Programação', description: 'Estruturação de páginas e recursos educacionais interativos.', count: 0, style: 'html', glyph: '</>' },
  { name: 'JavaScript', category: 'Programação', description: 'Lógica interativa para jogos, simuladores e páginas.', count: 0, style: 'javascript', glyph: 'JS' },
  { name: 'CSS3', category: 'Programação', description: 'Estilo, layout responsivo e identidade visual dos artefatos.', count: 0, style: 'css', glyph: '3' },
  { name: 'Mentimeter', category: 'Jogos e interatividade', description: 'Enquetes, votação e nuvens de palavras em tempo real.', count: 0, style: 'generic', glyph: 'M' },
  { name: 'Mural', category: 'Gestão e colaboração', description: 'Organização visual de ideias e mapas de colaboração.', count: 0, style: 'mural', glyph: 'Mu' },
  { name: 'Perplexity', category: 'Inteligência Artificial', description: 'Pesquisa assistida e síntese inicial de informações.', count: 0, style: 'generic', glyph: 'P' },
  { name: 'Claude', category: 'Inteligência Artificial', description: 'Produção textual, revisão e apoio à elaboração pedagógica.', count: 0, style: 'generic', glyph: 'Cl' },
  { name: 'Khan Academy', category: 'Jogos e interatividade', description: 'Trilhas, exercícios e aprendizagem personalizada.', count: 0, style: 'generic', glyph: 'KA' },
  { name: 'Wordwall', category: 'Jogos e interatividade', description: 'Atividades gamificadas e exercícios personalizados.', count: 0, style: 'generic', glyph: 'W' },
  { name: 'Google Drive', category: 'Gestão e colaboração', description: 'Armazenamento, organização e partilha de materiais.', count: 0, style: 'generic', glyph: 'D' },
  { name: 'NotebookLM', category: 'Inteligência Artificial', description: 'Estudos, resumos e organização de referências.', count: 0, style: 'generic', glyph: 'N' }
];

const grid = document.getElementById('cardsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const resultsCount = document.getElementById('resultsCount');
const chipGroup = document.getElementById('chipGroup');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const closeModal = document.getElementById('closeModal');

let activeCategory = 'Todas';

const uniqueCategories = ['Todas', ...new Set(resources.map(item => item.category))];
uniqueCategories.slice(1).forEach(category => {
  const option = document.createElement('option');
  option.value = category;
  option.textContent = category;
  categoryFilter.appendChild(option);
});

function createChips() {
  chipGroup.innerHTML = '';
  uniqueCategories.forEach(category => {
    const chip = document.createElement('button');
    chip.className = `chip ${activeCategory === category ? 'active' : ''}`;
    chip.type = 'button';
    chip.textContent = category;
    chip.addEventListener('click', () => {
      activeCategory = category;
      categoryFilter.value = category;
      render();
    });
    chipGroup.appendChild(chip);
  });
}

function normalize(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function filteredResources() {
  const query = normalize(searchInput.value.trim());
  return resources.filter(item => {
    const matchesCategory = activeCategory === 'Todas' || item.category === activeCategory;
    const searchArea = normalize(`${item.name} ${item.description} ${item.category}`);
    const matchesQuery = !query || searchArea.includes(query);
    return matchesCategory && matchesQuery;
  });
}

function makeGeneratedBadge(resource) {
  const badge = document.createElement('div');
  badge.className = `generated-badge ${resource.style || 'generic'}`;
  badge.textContent = resource.glyph || resource.name[0];
  return badge;
}

function makeCard(resource) {
  const card = document.createElement('article');
  card.className = 'card';

  const inner = document.createElement('div');
  inner.className = 'card-inner';

  const art = document.createElement('div');
  art.className = 'art-layer';

  const iconHost = document.createElement('div');
  iconHost.className = 'icon-host';

  if (resource.image) {
    const img = document.createElement('img');
    img.src = resource.image;
    img.alt = resource.alt || resource.name;
    img.onerror = () => {
      iconHost.innerHTML = '';
      iconHost.appendChild(makeGeneratedBadge(resource));
    };
    iconHost.appendChild(img);
  } else {
    iconHost.appendChild(makeGeneratedBadge(resource));
  }

  const cyanDot = document.createElement('span');
  cyanDot.className = 'glow-dot';
  const goldDot = document.createElement('span');
  goldDot.className = 'glow-dot gold';
  const orbit = document.createElement('div');
  orbit.className = 'orbit';

  art.append(iconHost, cyanDot, goldDot, orbit);

  const title = document.createElement('h2');
  title.className = 'card-title';
  title.textContent = resource.name;

  const rule = document.createElement('div');
  rule.className = 'card-rule';

  const desc = document.createElement('p');
  desc.className = 'card-desc';
  desc.textContent = resource.description;

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  meta.textContent = `${resource.count} práticas cadastradas`;

  const button = document.createElement('button');
  button.className = 'card-action';
  button.type = 'button';
  button.innerHTML = `Ver práticas <span class="arrow">→</span>`;
  button.addEventListener('click', () => openModal(resource));

  inner.append(art, title, rule, desc, meta, button);
  card.appendChild(inner);
  return card;
}

function render() {
  const data = filteredResources();
  createChips();
  grid.innerHTML = '';
  data.forEach(resource => grid.appendChild(makeCard(resource)));
  resultsCount.textContent = `${data.length} recursos encontrados`;
}

function openModal(resource) {
  modalTitle.textContent = resource.name;
  modalDesc.textContent = resource.description;
  modalOverlay.classList.add('open');
  modalOverlay.setAttribute('aria-hidden', 'false');
}

function closeModalFn() {
  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('aria-hidden', 'true');
}

searchInput.addEventListener('input', render);
categoryFilter.addEventListener('change', (event) => {
  activeCategory = event.target.value;
  render();
});
closeModal.addEventListener('click', closeModalFn);
modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) closeModalFn();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModalFn();
});

render();
