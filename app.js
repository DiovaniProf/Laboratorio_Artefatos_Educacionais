'use strict';
(() => {
  const recursos = Array.isArray(window.OBS_RECURSOS) ? window.OBS_RECURSOS : [];
  const publicadas = Array.isArray(window.OBS_PRATICAS) ? window.OBS_PRATICAS : [];
  const STORAGE_KEY='observatorio-praticas-ia-locais-v1';
  const el = id => document.getElementById(id);
  const norm = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const safe = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = str => {try {const u=new URL(str);return ['https:','http:'].includes(u.protocol)?u.href:null} catch {return null}};
  let locais = [];
  let selectedId=null;
  let activeCat='todas';
  let query='';
  try {const cached=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]'); if(Array.isArray(cached)) locais=cached.filter(validPractice);} catch(err) {console.warn('Armazenamento local indisponível',err)}
  const allPraticas=()=>{const seen=new Set();return [...publicadas.filter(validPractice),...locais].filter(p=>{const key=[p.recurso, p.titulo.trim().toLowerCase(), p.url].join('|');if(seen.has(key))return false;seen.add(key);return true})};
  const resourceById=id=>recursos.find(x=>x.id===id);
  const pracsOf=id=>allPraticas().filter(p=>p.recurso===id);
  const categories=['todas', ...new Set(recursos.map(x=>x.categoria))];
  const categoryTotals=cat=>cat==='todas'?recursos.length:recursos.filter(x=>x.categoria===cat).length;
  function validPractice(p){return !!(p && typeof p==='object' && typeof p.recurso==='string' && typeof p.titulo==='string' && safeUrl(p.url))}
  function saveLocal(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(locais))}catch(err){alert('Não foi possível salvar no navegador. Exporte os dados para não perder os registros.')}}
  function chips(){
    el('categoriaFiltro').innerHTML=categories.map((cat,i)=>`<option value="${safe(cat)}">${i===0?'Todas as categorias':safe(cat)}</option>`).join('');
    el('chips').innerHTML=categories.map(cat=>`<button type="button" class="chip${cat===activeCat?' active':''}" data-cat="${safe(cat)}" aria-pressed="${cat===activeCat}">${cat==='todas'?'Todos':safe(cat)} · ${categoryTotals(cat)}</button>`).join('');
    el('chips').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>setCat(b.dataset.cat)));
    el('categoriaFiltro').value=activeCat;
  }
  function setCat(c){activeCat=c;chips();render();}
  function render(){
    const filtered=recursos.filter(r => (activeCat==='todas'||r.categoria===activeCat) && norm([r.nome,r.descricao,r.categoria].join(' ')).includes(norm(query)));
    el('resourceCount').textContent=recursos.length;
    el('resultStatus').textContent=`${filtered.length} ${filtered.length===1?'recurso encontrado':'recursos encontrados'}${activeCat==='todas'?'':` em ${activeCat}`}`;
    el('noResults').hidden=filtered.length!==0;
    el('resourceGrid').innerHTML=filtered.map(r=>{
      const num=pracsOf(r.id).length;
      return `<article class="resource-card"><div class="logo-area"><img loading="lazy" decoding="async" src="${safe(r.icone)}" alt="Ícone ilustrativo de ${safe(r.nome)}"><i class="tiny-star"></i><i class="tiny-star"></i></div><h3>${safe(r.nome)}</h3><div class="mini-rule" aria-hidden="true"></div><p class="resource-description">${safe(r.descricao)}</p><div class="card-bottom"><span class="card-meta">${num} ${num===1?'prática cadastrada':'práticas cadastradas'}</span><button type="button" class="card-cta" data-open="${safe(r.id)}" aria-label="Ver práticas de ${safe(r.nome)}">Ver práticas <span aria-hidden="true">→</span></button></div>${r.revisarNome?'<span class="review-dot" title="Nome provisório: confirme a identificação no arquivo recursos.js" aria-label="Nome a confirmar">✧</span>':''}</article>`;
    }).join('');
    el('resourceGrid').querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>openResource(b.dataset.open)));
  }
  function updateLocation(id){
    const u=new URL(location.href);
    if(id) u.hash='recurso='+encodeURIComponent(id);
    else u.hash='recursos';
    history.pushState({},'',u);
  }
  function openResource(id, updateHash=true){
    const r=resourceById(id);if(!r) return;
    selectedId=id;
    el('detailImage').src=r.icone;el('detailImage').alt=`Ícone de ${r.nome}`;
    el('detailTitle').textContent=r.nome;el('detailGroup').textContent=r.categoria;
    el('detailDesc').textContent=r.descricao;
    const ps=pracsOf(id);
    el('detailNum').textContent=`(${ps.length})`;
    el('emptyPractices').hidden=ps.length!==0;
    el('localDisclaimer').hidden=!ps.some(p=>p.__local);
    el('practiceList').innerHTML=ps.map(p=>{
      const url=safeUrl(p.url);
      return `<article class="practice-item"><span class="practice-area">${safe(p.area||'Interdisciplinar')}${p.__local?' · PRÉVIA LOCAL':''}</span><h4>${safe(p.titulo)}</h4><p>${safe(p.descricao||'')}</p>${p.ia?`<p class="practice-extra"><b>Uso da IA:</b> ${safe(p.ia)}</p>`:''}${p.autor?`<p class="practice-extra"><b>Autoria:</b> ${safe(p.autor)}</p>`:''}<a class="practice-link" href="${safe(url)}" target="_blank" rel="noopener noreferrer">Acessar prática <span aria-hidden="true">↗</span></a></article>`;
    }).join('');
    if(!el('resourceDialog').open) el('resourceDialog').showModal();
    if(updateHash) updateLocation(id);
  }
  function closeResource(updateHash=true){
    if(el('resourceDialog').open)el('resourceDialog').close();
    selectedId=null;
    if(updateHash && location.hash.startsWith('#recurso='))updateLocation(null);
  }
  function openEditor(forId){
    if(el('resourceDialog').open) closeResource();
    if(forId)el('editorResource').value=forId;
    updateLocals();
    el('editorDialog').showModal();
  }
  function closeEditor(){if(el('editorDialog').open)el('editorDialog').close()}
  function updateLocals(){
    el('editCount').textContent=`(${locais.length})`;
    el('editItems').innerHTML=locais.length ? locais.map((p,i)=>`<div class="saved-entry"><span>${safe(p.titulo)} · ${safe(resourceById(p.recurso)?.nome||p.recurso)}</span><button type="button" data-remove="${i}">Excluir</button></div>`).join('') : '<p class="empty-local">Nenhuma prática cadastrada nesta prévia.</p>';
    el('editItems').querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click',()=>{
      if(!confirm('Excluir esta prática cadastrada localmente?'))return;
      locais.splice(Number(b.dataset.remove),1);saveLocal();updateLocals();render();
    }));
  }
  function download(name,textContent,type='text/plain;charset=utf-8'){
    const blob=new Blob([textContent],{type});const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
  }
  function exportRecords(kind){
    const combined=allPraticas().map(({__local,...p})=>p);
    const json=JSON.stringify(combined,null,2);
    if(kind==='js')download('praticas.js','/* Arquivo público de práticas — Observatório de Práticas IA */\nwindow.OBS_PRATICAS = '+json+';\n','text/javascript;charset=utf-8');
    else download('praticas.json',json,'application/json;charset=utf-8');
    el('editorFeedback').textContent=`Arquivo exportado com ${combined.length} prática(s). Substitua praticas.js no GitHub para publicar.`;
  }
  function configureEditor(){
    el('editorResource').innerHTML=recursos.map(r=>`<option value="${safe(r.id)}">${safe(r.nome)}</option>`).join('');
    el('abrirEditor').addEventListener('click',()=>openEditor());
    el('detalheAdicionar').addEventListener('click',()=>openEditor(selectedId));
    el('fecharEditor').addEventListener('click',closeEditor);
    el('practiceForm').addEventListener('submit',event=>{
      event.preventDefault();const data=Object.fromEntries(new FormData(event.currentTarget).entries());
      if(!safeUrl(data.url)){el('editorFeedback').textContent='Informe um endereço válido iniciado por http:// ou https://';return;}
      if(!resourceById(data.recurso)){el('editorFeedback').textContent='Selecione um recurso válido.';return;}
      const entry={recurso:data.recurso,titulo:data.titulo.trim(),area:data.area,autor:data.autor.trim(),descricao:data.descricao.trim(),url:safeUrl(data.url),ia:data.ia.trim(),__local:true};
      if(!entry.titulo || !entry.descricao){el('editorFeedback').textContent='Preencha o título e o resumo pedagógico.';return;}
      locais.push(entry);saveLocal();render();updateLocals();
      const resourceId=data.recurso;
      event.currentTarget.reset();el('editorResource').value=resourceId;
      el('editorFeedback').textContent='Prática salva neste navegador. Para publicar para todos, exporte praticas.js.';
    });
    el('exportarJS').addEventListener('click',()=>exportRecords('js'));
    el('exportarJSON').addEventListener('click',()=>exportRecords('json'));
    el('importarJSON').addEventListener('change',async event=>{
      const f=event.currentTarget.files?.[0];if(!f)return;
      try {const entries=JSON.parse(await f.text());if(!Array.isArray(entries))throw new Error('O arquivo precisa conter uma lista JSON.');
        const clean=entries.filter(p=>validPractice(p)&&resourceById(p.recurso)).map(p=>({...p,__local:true}));
        if(!clean.length)throw new Error('Nenhuma prática válida para os recursos cadastrados.');
        locais=[...locais,...clean];saveLocal();updateLocals();render();el('editorFeedback').textContent=`${clean.length} prática(s) importada(s) para este navegador.`;
      } catch(e) {el('editorFeedback').textContent='Não foi possível importar: '+e.message} finally {event.currentTarget.value=''}
    });
  }
  function navigateFromHash(){
    if(location.hash.startsWith('#recurso=')){
      const id=decodeURIComponent(location.hash.slice(9));if(resourceById(id))openResource(id,false);return;
    }
    if(el('resourceDialog').open)closeResource(false);
  }
  function start(){
    if(!recursos.length){el('resultStatus').textContent='Catálogo não encontrado: verifique recursos.js';return;}
    chips();render();configureEditor();
    el('pesquisa').addEventListener('input',e=>{query=e.target.value;render()});
    el('categoriaFiltro').addEventListener('change',e=>setCat(e.target.value));
    el('limparFiltros').addEventListener('click',()=>{el('pesquisa').value='';query='';setCat('todas')});
    el('fecharDetalhe').addEventListener('click',()=>closeResource());
    el('resourceDialog').addEventListener('close',()=>{selectedId=null;if(location.hash.startsWith('#recurso='))updateLocation(null)});
    el('resourceDialog').addEventListener('click',e=>{if(e.target===el('resourceDialog'))closeResource()});
    el('editorDialog').addEventListener('click',e=>{if(e.target===el('editorDialog'))closeEditor()});
    document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!el('resourceDialog').open&&!el('editorDialog').open){e.preventDefault();el('pesquisa').focus()}});
    addEventListener('popstate',navigateFromHash);addEventListener('hashchange',navigateFromHash);navigateFromHash();
  }
  start();
})();
