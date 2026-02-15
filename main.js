/* Minimal app wiring: navigation, QR generation, mock data search, changelog persistence and PDF export. */

const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

// Primary Biblioteca/Portal URL (used by top-menu's Biblioteca action)
window.BIB_URL = window.BIB_URL || 'https://fhhnsjjjfhnnmkkkkugdsfhjkkjjfdghjjhh.base44.app/Dashboard';

const screens = {
  welcome: qs('#welcome-screen'),
  courses: qs('#courses-screen'),
  app: qs('#app'),
  diseases: qs('#diseases-screen'),
  simulators: qs('#simulators-screen'),
  manuals: qs('#manuals-screen'),
  guide: qs('#guide-screen'),
  'sim-environment': qs('#sim-environment'),
  // admin panel
  admin: qs('#admin-panel')
};

function show(screenName){
  Object.values(screens).forEach(s => s && (s.style.display = 'none'));
  if(screens[screenName]) screens[screenName].style.display = '';
  window.scrollTo(0,0);
}

/* Navigation */
const safeAdd = (sel, fn) => { const el = qs(sel); if(el) el.addEventListener('click', fn); };

safeAdd('#cursos-btn', ()=> show('courses'));
/* REMOVED: Campus Virtual button handler (element removed from DOM) */
(function(){ /* placeholder to indicate removal */ })();
/* Biblioteca button: show a modern dashboard-style access card, then open the external app in a secure popup */
/* Biblioteca portal removed from the system — related popup initializer disabled */

/* Footer Biblioteca button removed — binding disabled */

// --- Top-menu popup behavior: open/close and menu actions ---
(function topMenuInit(){
  const topMenuBtn = document.getElementById('top-menu-btn');
  const topMenuPopup = document.getElementById('top-menu-popup');
  if(!topMenuBtn || !topMenuPopup) return;

  function setMenuOpen(open){
    topMenuBtn.setAttribute('aria-expanded', String(Boolean(open)));
    topMenuPopup.setAttribute('aria-hidden', String(!open));
    topMenuPopup.style.display = open ? 'block' : 'none';
    if(open){
      // focus first item
      const first = topMenuPopup.querySelector('button');
      if(first) first.focus();
    }
  }

  topMenuBtn.addEventListener('click', (ev)=>{
    ev.stopPropagation();
    const isOpen = topMenuBtn.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
  });

  // Close when clicking outside
  document.addEventListener('click', (ev)=>{
    if(topMenuPopup.style.display === 'none') return;
    if(!topMenuPopup.contains(ev.target) && ev.target !== topMenuBtn){
      setMenuOpen(false);
    }
  });
  // close on Escape
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') setMenuOpen(false);
  });

  // Menu actions wiring
  const btnBiblioteca = document.getElementById('menu-biblioteca');
  const btnAcessarBiblioteca = document.getElementById('menu-acessar-biblioteca');
  const btnRedes = document.getElementById('menu-redes');
  const btnContactos = document.getElementById('menu-contactos');
  const btnSettings = document.getElementById('menu-settings');
  const btnLogout = document.getElementById('menu-logout');

  // helper to open a centered minimal window (desktop-app like)
  function openCenteredApp(url, width = 980, height = 720, name = 'IMPCV_Biblioteca'){
    try{
      // calculate center coordinates (screen-based)
      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
      const screenWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
      const screenHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;
      const left = dualScreenLeft + Math.max(0, Math.round((screenWidth - width) / 2));
      const top = dualScreenTop + Math.max(0, Math.round((screenHeight - height) / 2));
      const features = [
        'toolbar=no',
        'location=no',
        'status=no',
        'menubar=no',
        'scrollbars=yes',
        'resizable=yes',
        `width=${width}`,
        `height=${height}`,
        `top=${top}`,
        `left=${left}`
      ].join(',');
      const win = window.open(url, name, features);
      if(win && typeof win.focus === 'function') win.focus();
      if(!win) {
        // popup blocked: fallback to opening in new tab
        const opened = window.open(url, '_blank');
        if(!opened) window.location.href = url;
      }
    }catch(err){
      // fail safe: open in new tab
      try{ window.open(url, '_blank'); }catch(e){ window.location.href = url; }
    }
  }

  // Biblioteca in-system access removed: menu-biblioteca handler intentionally omitted to prevent embedding the external portal inside the app.

  // NEW: Acessar Biblioteca — open portal as a centered minimal window (desktop-like)
  if(btnAcessarBiblioteca){
    btnAcessarBiblioteca.addEventListener('click', (e) => {
      setMenuOpen(false);
      const url = window.BIB_URL || 'https://fhhnsjjjfhnnmkkkkugdsfhjkkjjfdghjjhh.base44.app/Dashboard';
      openCenteredApp(url, 1000, 720, 'IMPCV_Biblioteca_App');
    });
  }

  if(btnRedes){
    btnRedes.addEventListener('click', (e)=>{
      setMenuOpen(false);
      // open social links area (scroll to footer or open a small popup)
      const footerRedes = document.querySelector('#contactos .redes');
      if(footerRedes){
        // open footer in view and emphasize container
        footerRedes.scrollIntoView({ behavior: 'smooth', block: 'center' });
        footerRedes.style.transition = 'box-shadow 260ms ease';
        footerRedes.style.boxShadow = '0 10px 40px rgba(10,102,255,0.18)';
        setTimeout(()=> footerRedes.style.boxShadow = '', 1200);
      } else {
        // open IMPCV social feed (generic homepage)
        window.open('https://www.facebook.com/', '_blank');
      }
    });
  }

  if(btnContactos){
    btnContactos.addEventListener('click', (e)=>{
      setMenuOpen(false);
      // open contact robot popup (clone of hidden contacts)
      const popup = document.getElementById('contact-robot-popup');
      if(popup){
        // clone contact content into popup if empty
        if(!popup.innerHTML || popup.innerHTML.trim() === ''){
          const robotContacts = document.getElementById('robot-contacts');
          if(robotContacts) {
            popup.innerHTML = robotContacts.innerHTML;
          }
        }
        popup.style.display = 'block';
        popup.setAttribute('aria-hidden', 'false');
        // focus first link inside popup
        const firstLink = popup.querySelector('a,button');
        if(firstLink) firstLink.focus();
      } else {
        // fallback: open mailto to primary institute email
        window.location.href = 'mailto:impcvelho@gmail.com';
      }
    });
  }

  if(btnSettings){
    btnSettings.addEventListener('click', (e)=>{
      setMenuOpen(false);
      // open guide/settings modal if available, else show a small settings alert
      const guide = document.getElementById('guide-screen');
      if(guide){
        // show guide modal
        guide.style.display = '';
      } else {
        alert('Definições: Nenhuma configuração avançada disponível nesta versão.');
      }
    });
  }

  if(btnLogout){
    btnLogout.addEventListener('click', (e)=>{
      setMenuOpen(false);
      // perform a simple "logout": clear session role and system unlock flag, show welcome/login
      try{
        sessionStorage.removeItem('impcv_user_role');
        sessionStorage.removeItem('impcv_system_unlocked');
      }catch(err){}
      // show login screen if present
      const login = document.getElementById('login-screen');
      if(login){
        // hide other screens and show login
        Object.values(screens).forEach(s => s && (s.style.display = 'none'));
        login.style.display = '';
      } else {
        // fallback: reload to ensure a clean state
        location.reload();
      }
    });
  }
})();

safeAdd('#back-to-welcome-btn', ()=> show('welcome'));
safeAdd('#manuals-back-to-main', ()=> show('welcome'));
safeAdd('#courses-back-to-main', ()=> show('welcome'));
safeAdd('#back-to-courses-btn', ()=> show('courses'));
safeAdd('#back-from-simulators', ()=> show('welcome'));
safeAdd('#manuals-back', ()=> show('welcome'));
safeAdd('#back-to-welcome-from-diseases-btn', ()=> show('welcome'));
// Admin panel opener — visibility controlled by user role (set at system unlock)
safeAdd('#admin-btn', ()=> {
  try{
    const role = sessionStorage.getItem('impcv_user_role') || 'user';
    if(role === 'admin'){
      show('admin');
    } else {
      alert('Acesso restrito: apenas administradores podem abrir o Painel do Administrador.');
    }
  }catch(e){
    console.error('Erro ao acessar Painel Administrador', e);
    alert('Erro ao acessar painel. Verifique a consola.');
  }
});

/* Guide modal */
/* attach guide opener only if element exists (tutorial button removed in markup) */
safeAdd('#tutorial-link', ()=> show('guide'));
safeAdd('#guide-back-btn', ()=> show('welcome'));

/* Mock data */
const MOCK_EXAMS = [
  {id:'mv1', title:'MV1 - Módulo vocacional 1', course:'CV5 em Técnicas de Laboratórios de Análises Clínicas', content:'Manual: MV1 - Módulo vocacional 1. Recursos e procedimentos essenciais; precauções e passos de rotina. (Abra o manual completo no Centro de Aprendizagem)', url: 'https://drive.google.com/file/d/1l60aCLTnDiCQ6P0bdBGh_QnMsuC2BQXi/view?usp=drive_link' },
  {id:'mv3', title:'MV3 - Módulo vocacional 3', course:'CV5 em Técnicas de Laboratórios de Análises Clínicas', content:'Manual: MV3 - Módulo vocacional 3. Conteúdos e actividades vocacionais adicionais para Técnicas de Laboratórios de Análises Clínicas.', url: 'https://drive.google.com/file/d/1B1ziTy5hpzSaKt2Dv0KsXf8qVvZg3KWY/view?usp=drive_link' }
];
const examSelect = qs('#exam-select');
// add explicit empty placeholder so nothing is auto-selected initially
const placeholderOpt = document.createElement('option');
placeholderOpt.value = '';
placeholderOpt.textContent = 'Selecionar Módulos';
examSelect.appendChild(placeholderOpt);
MOCK_EXAMS.forEach(e=>{
  const opt = document.createElement('option');
  opt.value = e.id; opt.textContent = e.title;
  examSelect.appendChild(opt);
});

/* New: sync text search with exam select so typing selects matching exam option */
qs('#search-input').addEventListener('input', (ev) => {
  const q = ev.target.value.trim().toLowerCase();
  if(!q){ examSelect.value = ''; return; }
  // find first option whose text contains the query
  const match = MOCK_EXAMS.find(e => e.title.toLowerCase().includes(q));
  examSelect.value = match ? match.id : '';
  // if exact title typed, open directly
  if(match && match.title.toLowerCase() === q) {
    showExamDetail(match);
  }
});

/* Course buttons populate app breadcrumb and results */
qsa('.course-btn').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    const course = btn.dataset.course;
    show('app');
    qs('#breadcrumb').textContent = course;
    // if Medicina Geral course, ensure breadcrumb/header text is white for visibility
    // For a set of CV courses make breadcrumb and header text white for better contrast
    if(/medicina geral|medicina preventiva|enfermagem geral|enfermagem de saúde materno infantil|farmácia|técnicas de laboratórios|gestão\b|gestão autárquica|recursos humanos|suporte informático|administraçã?o de gestão de redes|programação de aplicações de web|administração de gestão de redes/i.test(course)){
      qs('#breadcrumb').style.color = '#ffffff';
      const appTitle = qs('#app header .header-content h1');
      if(appTitle) appTitle.style.color = '#ffffff';
    } else {
      qs('#breadcrumb').style.color = '';
      const appTitle = qs('#app header .header-content h1');
      if(appTitle) appTitle.style.color = '';
    }
    // For the app's module/exam select, restrict modules for the lab course to only MV1
    if(examSelect){
      examSelect.innerHTML = '';
      if(course === 'CV5 em Técnicas de Laboratórios de Análises Clínicas'){
        // keep an initial empty placeholder so no module is auto-selected
        const ph = document.createElement('option'); ph.value = ''; ph.textContent = 'Selecionar Módulos'; examSelect.appendChild(ph);
        // show only MV1 and MV3 for the lab course
        ['mv1','mv3'].forEach(id=>{
          const e = MOCK_EXAMS.find(x=>x.id===id);
          if(e){
            const opt = document.createElement('option');
            opt.value = e.id;
            opt.textContent = e.title;
            examSelect.appendChild(opt);
          }
        });
        // show direct MV1 module quick-access button in results area
        const results = qs('#results-container');
        if(results){
          results.innerHTML = '';
          const node = document.createElement('div');
          node.className = 'results-card';
          node.innerHTML = `<h3>MV1 — Módulo VM1 (MV1)</h3>
            <p>Abra diretamente o módulo MV1 (VM1) — Recursos e procedimentos essenciais.</p>
            <div style="margin-top:10px"><a class="action-btn" id="open-mv1" href="https://drive.google.com/file/d/1l60aCLTnDiCQ6P0bdBGh_QnMsuC2BQXi/view?usp=drivesdk" target="_blank" rel="noopener">Abrir MV1 (Drive)</a></div>`;
          results.appendChild(node);
        }
      } else {
        // restore default options (all exams)
        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = 'Selecionar Módulos';
        examSelect.appendChild(defaultOpt);
        MOCK_EXAMS.forEach(e=>{ const o=document.createElement('option'); o.value=e.id; o.textContent=e.title; examSelect.appendChild(o); });
      }
    }
    // render results filtered by course initially
    // Do not show any modules automatically; wait for user to select a módulo
    renderResults([]);
  });
});

/* Quick search for Centro de Aprendizagem: filter course buttons live and open first on Enter */
(function initCoursesSearch(){
  const search = qs('#courses-search');
  if(!search) return;
  const courseBtns = qsa('.course-btn');
  // live filter
  search.addEventListener('input', (e)=>{
    const q = (e.target.value || '').trim().toLowerCase();
    courseBtns.forEach(b=>{
      const txt = (b.textContent || '').trim().toLowerCase();
      b.style.display = (!q || txt.includes(q)) ? '' : 'none';
    });
  });
  // on Enter, if exact or single match, open course
  search.addEventListener('keydown', (e)=>{
    if(e.key !== 'Enter') return;
    const q = (e.target.value || '').trim().toLowerCase();
    if(!q) return;
    // try find exact match first, else first visible match
    let match = courseBtns.find(b=> (b.textContent||'').trim().toLowerCase() === q && b.style.display !== 'none');
    if(!match) match = courseBtns.find(b=> (b.textContent||'').trim().toLowerCase().includes(q) && b.style.display !== 'none');
    if(match){
      match.click();
    }
  });
})();

function renderResults(items){
  const container = qs('#results-container');
  container.innerHTML = '';
  // remove any in-panel export button previously inserted
  const existingExport = qs('#results-container .in-panel-export');
  if(existingExport) existingExport.remove();

  if(!items.length){
    // hide any global/standing export button (moved to panel)
    const globalExport = qs('#export-pdf-btn');
    if(globalExport) globalExport.style.display = 'none';
    // show subtle centered pointer and instruction when no module selected
    container.innerHTML = `<div class="results-card empty-pointer"><div class="pointer-dot" aria-hidden="true">•</div><div class="empty-text">Selecione um módulo para ver conteúdos</div></div>`;
    return;
  }

  // when items exist, create an in-panel Exportar PDF button (inside results panel)
  const exportWrap = document.createElement('div');
  exportWrap.style.display = 'flex';
  exportWrap.style.justifyContent = 'flex-end';
  exportWrap.style.margin = '6px 0';
  const exportBtn = document.createElement('button');
  exportBtn.className = 'action-btn in-panel-export';
  exportBtn.id = 'in-panel-export-pdf';
  exportBtn.textContent = 'Exportar PDF';
  exportBtn.addEventListener('click', async ()=> {
    // export the current results container contents
    await exportNodeToPdf(container, 'impcv-modulos.pdf');
  });
  exportWrap.appendChild(exportBtn);
  container.appendChild(exportWrap);
  // also hide the original top-level export button to avoid duplication
  const globalExport = qs('#export-pdf-btn');
  if(globalExport) globalExport.style.display = 'none';

  items.forEach(it=>{
    const el = document.createElement('div');
    el.className = 'results-card';
    // if a related manual exists with a remote URL, make the "Abrir" control a direct link
    const relatedManual = MANUALS && MANUALS.find(m => m.id === `${it.id}_manual` || (m.title && m.title.toLowerCase().includes(it.title.toLowerCase())));
    const openControl = relatedManual && relatedManual.url
      ? `<a class="open-exam" data-id="${it.id}" href="${relatedManual.url}" target="_blank" rel="noopener" aria-label="Abrir manual">${'Abrir'}</a>`
      : it.url
        ? `<a class="open-exam" data-id="${it.id}" href="${it.url}" target="_blank" rel="noopener" aria-label="Abrir manual">${'Abrir'}</a>`
        : `<button class="open-exam" data-id="${it.id}">Abrir</button>`;
    el.innerHTML = `<strong>${it.title}</strong><p style="margin:6px 0">${it.content}</p>
      <div style="display:flex;gap:8px;margin-top:8px">${openControl}</div>`;
    container.appendChild(el);
  });
  container.querySelectorAll('.open-exam').forEach(b=>{
    b.addEventListener('click', e=>{
      const id = b.dataset.id;
      const exam = MOCK_EXAMS.find(x=>x.id===id);
      if(!exam) return;
      // if anchor with href (external link) default behavior will open; for button fallback open detail
      if(b.tagName.toLowerCase() === 'a') return;
      showExamDetail(exam);
    });
  });
}

function showExamDetail(exam){
  const container = qs('#results-container');
  container.innerHTML = '';
  const node = buildExamNode(exam);
  container.appendChild(node);
}
function buildExamNode(exam){
  const wrap = document.createElement('div');
  wrap.className = 'results-card';
  // If there's a manual that corresponds to this exam, surface its link here as "Abrir Manual"
  const relatedManual = MANUALS.find(m => m.id === `${exam.id}_manual` || (m.title && m.title.toLowerCase().includes(exam.title.toLowerCase())));
  wrap.innerHTML = `<h2 style="margin:0 0 8px 0">${exam.title}</h2>
    <p style="margin:0 0 10px">${exam.content}</p>
    <p style="margin:0 0 10px;color:#556">Curso: ${exam.course}</p>
    <div style="display:flex;gap:8px">
      ${ relatedManual ? `<a class="action-btn" href="${relatedManual.url || '#'}" target="_blank" rel="noopener" id="open-related-manual">Abrir Manual</a>` : '' }
      <button id="back-to-results" class="back-btn">Voltar</button>
    </div>`;
  setTimeout(()=>{ // attach listeners after node exists
    wrap.querySelector('#back-to-results').addEventListener('click', ()=> renderResults(MOCK_EXAMS));
    // if open-related-manual exists, let default anchor behavior open the manual (no extra handlers)
  },0);
  return wrap;
}

/* Simple search */
qs('#search-btn').addEventListener('click', ()=>{
  const q = qs('#search-input').value.trim().toLowerCase();
  // if an exam is selected via the synced select, open it; otherwise perform text search
  if(examSelect.value){
    const found = MOCK_EXAMS.find(x=>x.id===examSelect.value);
    if(found) return showExamDetail(found);
  }
  performSearch(q);
});
qs('#exam-select').addEventListener('change', (e)=>{
  const moduleId = e.target.value;
  if(!moduleId){
    // if no module selected, show no modules per user request
    return renderResults([]);
  }
  // Show only the exact selected module/exam
  const found = MOCK_EXAMS.filter(x=> x.id === moduleId);
  renderResults(found);
});

function performSearch(q){
  if(!q) return renderResults(MOCK_EXAMS);
  const res = MOCK_EXAMS.filter(it => it.title.toLowerCase().includes(q) || it.content.toLowerCase().includes(q));
  renderResults(res);
}

/* Diseases (mock) */
const MOCK_DISEASES = [
  {id:'diab', title:'Diabetes Mellitus', summary:'Doença metabólica caracterizada por hiperglicemia.', content: `🔹 Definição

O Diabetes Mellitus é uma doença metabólica crónica caracterizada pelo aumento dos níveis de glicose no sangue (hiperglicemia).
Isso ocorre devido à diminuição da produção de insulina pelo pâncreas ou à resistência das células à ação da insulina.

🔹 Função da Insulina

A insulina é um hormônio produzido pelo pâncreas que permite que a glicose entre nas células para ser usada como energia.
Quando há falta ou resistência à insulina, a glicose acumula-se no sangue, originando o diabetes.

🔹 Classificação do Diabetes

Tipo 1:
- Causa autoimune (o corpo destrói as células do pâncreas que produzem insulina).
- O paciente depende totalmente de insulina injetável.
- Surge geralmente na infância ou adolescência.

Tipo 2:
- O organismo produz insulina, mas as células não respondem adequadamente.
- Está associado à obesidade, má alimentação e sedentarismo.
- É o tipo mais comum em adultos.

Gestacional:
- Aparece durante a gravidez.
- Pode desaparecer após o parto, mas aumenta o risco de diabetes tipo 2 no futuro.

🔹 Sinais e Sintomas Comuns
- Sede excessiva (polidipsia)
- Urinar com frequência (poliúria)
- Fome exagerada (polifagia)
- Cansaço e fraqueza
- Perda de peso (principalmente no tipo 1)
- Visão turva
- Feridas que demoram a cicatrizar

🔹 Diagnóstico Laboratorial

Exame\tValor Diagnóstico
Glicemia em jejum\t≥ 126 mg/dL (em 2 ocasiões)
Glicemia casual + sintomas\t≥ 200 mg/dL
Teste oral de tolerância à glicose (TOTG) – 2h\t≥ 200 mg/dL
Hemoglobina glicada (HbA1c)\t≥ 6,5%

💡 Os valores podem variar ligeiramente conforme o método do laboratório.

🔹 Tratamento e Controle

O tratamento tem como objetivo manter a glicose em níveis normais e evitar complicações.

Mudanças no estilo de vida:
- Alimentação equilibrada e com baixo teor de açúcar.
- Prática regular de exercícios.
- Controle do peso corporal.

Medicamentos:
- Tipo 1: Uso de insulina diária.
- Tipo 2: Medicamentos orais (ex: Metformina) e, se necessário, insulina.

Monitorização:
- Medir a glicose regularmente.
- Fazer acompanhamento médico e exames de rotina (HbA1c, função renal, olhos, pés).

🔹 Complicações do Diabetes

Se não for bem controlado, o diabetes pode causar:
- Neuropatia diabética: danos nos nervos (formigueiro, dormência).
- Nefropatia: lesões nos rins.
- Retinopatia: perda de visão.
- Doenças cardíacas e AVC.
- Pé diabético: feridas que não cicatrizam e podem levar à amputação.

🔹 Prevenção
- Manter peso saudável.
- Alimentar-se de forma equilibrada.
- Evitar bebidas açucaradas e excesso de doces.
- Fazer atividade física regular.
- Controlar a pressão arterial e o colesterol.
- Fazer check-ups periódicos.

📘 Resumo Importante

O controle do diabetes depende de educação, disciplina e acompanhamento médico regular.
O diagnóstico precoce e o tratamento adequado evitam complicações graves e melhoram a qualidade de vida do paciente.`},
  {id:'hip', title:'Hipertensão Arterial', summary:'Aumento persistente da pressão arterial.', content: `🔬 Definição
A hipertensão arterial, também chamada de pressão alta, é uma condição crônica em que a pressão do sangue nas artérias está constantemente elevada. Essa elevação força o coração a trabalhar mais para bombear o sangue, podendo causar danos aos vasos sanguíneos, coração, rins e outros órgãos.

🩺 Valores normais e alterados da pressão arterial
Pressão Sistólica (mmHg) — Pressão Diastólica (mmHg)
Normal — Menor que 120 / Menor que 80
Pré-hipertensão (limítrofe) — 120 – 139 / 80 – 89
Hipertensão Grau 1 — 140 – 159 / 90 – 99
Hipertensão Grau 2 — 160 – 179 / 100 – 109
Hipertensão Grau 3 — Igual ou maior que 180 / Igual ou maior que 110

⚠️ Causas Principais
Primária (essencial): sem causa definida, relacionada a fatores genéticos e estilo de vida (90–95% dos casos).
Secundária: causada por outras doenças (problemas renais, distúrbios hormonais) ou uso de medicamentos/consumo excessivo de sal e álcool.

🍔 Fatores de Risco
Consumo excessivo de sal e gorduras; Sedentarismo; Obesidade; Tabagismo e álcool; Estresse; Histórico familiar; Idade avançada.

💥 Sintomas (muitas vezes silenciosa!)
Pode ser assintomática; quando presentes: dor de cabeça, tontura, falta de ar, cansaço, zumbido, epistaxe.

🧠 Complicações se não tratada
Infarto do miocárdio, AVC, insuficiência cardíaca, insuficiência renal, perda de visão, aneurisma arterial.

🩹 Tratamento
Mudanças no estilo de vida (reduzir sal, exercícios regulares, evitar álcool/tabaco, controlar peso e estresse) e, quando indicado, medicamentos (diuréticos, betabloqueadores, inibidores da ECA, bloqueadores de canais de cálcio, vasodilatadores).

👩🏽‍⚕️ Prevenção
Medir a pressão regularmente; alimentação equilibrada; sono adequado; evitar automedicação; consultas periódicas.

❤️ Mensagem Final
A hipertensão não tem cura, mas tem controlo — com acompanhamento médico e hábitos saudáveis é possível viver bem.` },
  {id: 'hiv', title: 'HIV - SIDA (Vírus da Imunodeficiência Humana / Síndrome da Imunodeficiência Adquirida)', summary: 'HIV é o vírus que ataca o sistema imunitário; SIDA (AIDS) é o estágio avançado da infecção.', content: `🧬 1. O que é o HIV?
O HIV (Vírus da Imunodeficiência Humana) é um vírus que ataca o sistema imunitário, principalmente as células CD4 (linfócitos T), que são responsáveis por defender o corpo contra infecções. Com o tempo, se não for tratado, o HIV enfraquece as defesas do organismo, tornando a pessoa vulnerável a várias doenças chamadas infecções oportunistas.

⚕️ 2. O que é a SIDA (AIDS)?
A SIDA (Síndrome da Imunodeficiência Adquirida) é o estágio mais avançado da infecção pelo HIV. Neste ponto, o sistema imunológico já está bastante comprometido e o corpo não consegue combater infecções nem alguns tipos de câncer.

👉 Resumindo:
HIV é o vírus.
SIDA (ou AIDS) é a doença causada pelo vírus quando o sistema imunitário está muito enfraquecido.

🧪 3. Transmissão do HIV
O HIV é transmitido pelo contato direto com fluidos corporais de uma pessoa infectada, como:
• Sangue (uso compartilhado de agulhas, transfusões sem controle);
• Sêmen e secreções vaginais (relações sexuais sem preservativo);
• Leite materno (transmissão de mãe para filho durante a gravidez, parto ou amamentação).

⚠️ O HIV não se transmite por:
Aperto de mãos ou abraços; Beijos; Tosse, espirro ou ar; Talheres, copos, sanitas ou picadas de mosquito.

🧫 4. Sintomas do HIV / SIDA
Fase aguda (2–4 semanas): febre, dor de cabeça, fadiga, dor de garganta, ínguas.
Fase assintomática: pode durar anos sem sintomas claros.
Fase sintomática / SIDA: emagrecimento acentuado, febre prolongada, diarreia persistente, manchas na pele, infeções frequentes.

💊 5. Diagnóstico
Testes laboratoriais detectam anticorpos anti-HIV (teste rápido/ELISA), antígeno p24 (detecta precocemente) e carga viral.

💊 6. Tratamento
Não há cura definitiva; o TARV (Tratamento Antirretroviral) controla a replicação viral, preserva o sistema imunitário e reduz a carga viral a níveis indetectáveis quando seguido correctamente.

❤️ 7. Prevenção
Use preservativos; não partilhe agulhas/seringas; gestantes devem testar-se e seguir tratamento; fazer testes regulares.

🌍 8. Viver com HIV
Com tratamento e acompanhamento, pessoas com HIV podem ter vida longa e saudável; combater estigma e garantir adesão ao tratamento é essencial.`},
  { id: 'malaria', title: 'Malária', summary: 'Doença parasitária transmitida pela picada do mosquito Anopheles; sintomas incluem febre, calafrios, náuseas e fraquezas.', content: `🧬 1. O que é a Malária?
A malária é uma doença causada pelo parasita Plasmodium, transmitida às pessoas pela picada da fêmea infectada do mosquito Anopheles.

Principais sintomas:
- Febre alta (pode surgir em ciclos)
- Suores e calafrios
- Dor de cabeça intensa
- Náuseas e vômitos
- Dor muscular e fraqueza
- Tosse e dificuldade respiratória

Período de incubação
Geralmente 8–14 dias após a picada, podendo chegar a 30 dias em alguns casos.

Transmissão
A transmissão ocorre apenas pela picada do mosquito Anopheles fêmea infectado; raros casos de transmissão ocorrem por transfusão, uso de agulhas contaminadas ou de mãe para filho.

Diagnóstico
Feito por exame de sangue (gota espessa) e testes imunológicos rápidos; é essencial procurar assistência médica se houver suspeita.

Tratamento
Tratamento com antimaláricos (p.ex. Cloroquina, Primaquina, Artemeter+Lumefantrina, Artesunato, Mefloquina), indicado pelo médico conforme espécie, idade e gravidade; iniciar tratamento rapidamente para evitar complicações.

Possíveis complicações:
- Anemia por destruição de hemácias
- Icterícia
- Edema pulmonar
- Hipoglicemia
- Malária cerebral (grave)

Prevenção:
- Evitar picadas: repelentes (DEET), telas em portas/janelas, roupas compridas claras
- Evitar áreas de risco ao entardecer/amanhecer
- Quimioprofilaxia medicamentosa apenas mediante indicação médica para viagens a áreas de alto risco

Observação:
A malária tem cura com tratamento adequado; não ignore sinais — procure assistência médica rapidamente.` }
];
const diseaseSelect = qs('#disease-select');
MOCK_DISEASES.forEach(d=>{
  const o = document.createElement('option'); o.value = d.id; o.textContent = d.title; diseaseSelect.appendChild(o);
});

/* Add Sarampo article if not present (user-provided content) */
if(!MOCK_DISEASES.find(d=>d.id==='sarampo')){
  const SARAMPO_CONTENT = `📖 Definição

O sarampo é uma doença infecciosa viral aguda e altamente contagiosa, causada pelo vírus do gênero Morbillivirus (família Paramyxoviridae).
Afeta principalmente crianças não vacinadas, mas pode atingir pessoas de qualquer idade.
É uma das principais causas de morte evitável por vacinação em todo o mundo.

🦠 Agente Causador

Vírus do sarampo (Morbillivirus).

O vírus é sensível à luz, ao calor e aos desinfetantes comuns, mas permanece viável no ar e em superfícies por até 2 horas.

🔄 Modo de Transmissão

A transmissão ocorre de pessoa para pessoa, por meio de:

Gotículas respiratórias expelidas ao tossir, espirrar ou falar;

Contato direto com secreções nasais ou orais de pessoas infectadas;

Ambientes fechados facilitam o contágio, pois o vírus se espalha pelo ar.

📌 Obs: O sarampo é tão contagioso que uma única pessoa infectada pode transmitir o vírus a até 90% das pessoas suscetíveis ao seu redor.

⏳ Período de Incubação

Dura em média 10 dias (varia entre 7 e 18 dias) após o contato com o vírus até o início dos sintomas.

⚠️ Período de Transmissibilidade

O paciente transmite o vírus de 4 dias antes até 4 dias depois do aparecimento das manchas vermelhas (exantema).

🤒 Manifestações Clínicas
1. Fase Prodrômica (Início da doença)

Dura cerca de 3 a 5 dias e apresenta:

Febre alta (acima de 38,5 °C);

Tosse seca;

Coriza (nariz escorrendo);

Conjuntivite (olhos vermelhos e lacrimejantes);

Manchas de Koplik: pequenos pontos brancos na mucosa da boca, próximos aos dentes molares — sinal característico do sarampo.

2. Fase Exantemática (Aparecimento das manchas)

Surgem manchas vermelhas que:

Começam no rosto e atrás das orelhas;

Espalham-se rapidamente pelo corpo (tronco, braços e pernas);

Duram cerca de 5 a 6 dias e desaparecem descamando levemente.

3. Fase de Recuperação

A febre diminui;

As manchas desaparecem;

O paciente recupera o apetite e o bem-estar geral.

⚕️ Complicações Possíveis

As complicações são mais comuns em crianças pequenas, desnutridas e pessoas imunodeprimidas.

Principais complicações:

Pneumonia (mais frequente e causa principal de morte);

Otite média (infecção no ouvido);

Diarreia intensa e desidratação;

Encefalite (inflamação cerebral, rara porém grave);

Desnutrição (pela perda de apetite e infecções associadas).

💊 Tratamento

Não há tratamento antiviral específico para o sarampo.
O tratamento é sintomático e de suporte, incluindo:

Hidratação oral e/ou intravenosa;

Controle da febre com antipiréticos (ex: paracetamol);

Alimentação adequada e repouso;

Administração de vitamina A (reduz o risco de complicações e mortalidade infantil);

Antibióticos apenas em casos de infecção bacteriana secundária.

💉 Prevenção

A vacinação é a principal forma de prevenção.

Vacina Tríplice Viral (SCR)

Protege contra:

Sarampo

Caxumba

Rubéola

Esquema de vacinação (em Moçambique e vários países):

1ª dose: aos 12 meses de idade;

2ª dose: aos 15 meses de idade (Tetra Viral – inclui Varicela).

📌 Pessoas não vacinadas ou com esquema incompleto devem ser vacinadas o quanto antes.

🏥 Medidas de Controle

Isolamento do paciente até 4 dias após o aparecimento das manchas;

Notificação imediata do caso aos serviços de saúde (doença de notificação obrigatória);

Vacinação de contatos próximos não imunizados em até 72 horas após exposição;

Desinfecção de superfícies e boa ventilação de ambientes.

📊 Resumo Geral
Agente Etiológico — Vírus do sarampo (Morbillivirus)
Transmissão — Gotículas respiratórias e contato direto
Período de Incubação — 7 a 18 dias
Sinais Iniciais — Febre, tosse, coriza, conjuntivite, manchas de Koplik
Exantema — Manchas vermelhas que se iniciam no rosto
Complicações — Pneumonia, diarreia, otite, encefalite
Prevenção — Vacinação (Tríplice Viral)
Tratamento — Sintomático e suporte clínico

📚 Curiosidades

O sarampo foi uma das principais causas de morte infantil antes da introdução da vacina.

Mesmo países que eliminaram o sarampo podem ter novos surtos se houver queda na cobertura vacinal.

A vitamina A é recomendada pela OMS para todas as crianças diagnosticadas com sarampo.

🧠 Conclusão

O sarampo é uma doença grave, porém evitável.
A vacinação em massa e a vigilância epidemiológica constante são fundamentais para impedir a reintrodução do vírus e proteger a saúde pública.`;
  MOCK_DISEASES.push({
    id: 'sarampo',
    title: 'Sarampo',
    summary: 'Doença infecciosa viral altamente contagiosa causada pelo Morbillivirus.',
    content: SARAMPO_CONTENT
  });
  const o = document.createElement('option'); o.value = 'sarampo'; o.textContent = 'Sarampo'; diseaseSelect.appendChild(o);
}

// when a disease is selected, show full article/details
diseaseSelect.addEventListener('change', (e)=>{
  const id = e.target.value;
  const found = MOCK_DISEASES.find(x=>x.id===id);
  const container = qs('#diseases-results-container');
  container.innerHTML = '';
  if(!found) { container.innerHTML = '<div class="results-card">Selecione uma doença ou pesquise.</div>'; return; }
  const el = document.createElement('div'); el.className='results-card';
  el.innerHTML = `<h2 style="margin:0 0 8px 0">${found.title}</h2><p style="white-space:pre-wrap;color:#333">${found.content || found.summary}</p>`;
  container.appendChild(el);
});

/* Add Tétano Neonatal article if not present (user-provided content) */
if(!MOCK_DISEASES.find(d=>d.id==='tetano_neonatal')){
  const TETANO_CONTENT = `O Tétano neonatal é uma doença infecciosa aguda, grave, não contagiosa, que acomete o recém-nascido (RN), nos primeiros 28 dias de vida, tendo como manifestação clínica inicial a dificuldade de sugar, irritabilidade e choro constante. A doença é causada por uma bactéria chamada Clostridium tetani. A suscetibilidade do Tétano Neonatal é universal, afetando recém-nascidos de ambos os sexos. A doença não confere imunidade.

Imunidade e prevenção:
A imunidade do recém-nascido é conferida pela vacinação adequada da mãe. Filhos de mães vacinadas nos últimos cinco anos com esquema completo têm imunidade passiva transitória. O soro antitetânico (SAT) e a imunoglobulina humana antitetânica (IGHAT) fornecem proteção temporária quando indicados.

Fatores de risco:
- Baixas coberturas da vacina antitetânica em mulheres em idade fértil.
- Partos domiciliares com instrumentos não esterilizados ou parteiras não capacitadas.
- Higiene inadequada do coto umbilical; uso de práticas culturais com ervas, pós ou pomadas.
- Baixo acesso e qualidade do pré-natal; baixa escolaridade e condições socioeconômicas vulneráveis.

Transmissão:
Não é transmitido pessoa a pessoa; ocorre pela contaminação do coto umbilical com esporos de Clostridium tetani presentes em instrumentos ou materiais contaminados.

Sinais e sintomas:
- Choro excessivo, irritabilidade;
- Dificuldade para mamar e abrir a boca (trismo);
- Contraturas musculares ao manuseio ou espontâneas;
- Febre geralmente baixa ou ausente.

Diagnóstico:
Essencialmente clínico; exames laboratoriais servem para avaliar complicações, não para confirmação específica.

Tratamento:
Internamento hospitalar (preferencialmente UTI), sedação e controle de estímulos, suporte ventilatório e nutricional, administração de IGHAT ou SAT, antibioticoterapia (penicilina cristalina ou metronidazol) e outras medidas conforme avaliação médica.

Parto e puerpério:
Práticas de parto limpas (assépticas), uso de material esterilizado para secção do cordão umbilical e orientação às mães sobre cuidados do coto, incluindo uso de álcool 70% quando indicado. Atualização vacinal materna é fundamental.

Pré-natal:
Realização adequada do pré-natal, vacinação materna e educação em saúde são medidas-chave para prevenção do tétano neonatal.`;
  MOCK_DISEASES.push({
    id: 'tetano_neonatal',
    title: 'Tétano Neonatal',
    summary: 'Doença grave do recém-nascido causada por Clostridium tetani; prevenção via vacinação materna e parto limpo.',
    content: TETANO_CONTENT
  });
  const o = document.createElement('option'); o.value = 'tetano_neonatal'; o.textContent = 'Tétano Neonatal'; diseaseSelect.appendChild(o);
}

// Add DIARREIA article if not present (user-provided content)
if(!MOCK_DISEASES.find(d=>d.id==='diarreia')){
  const DIARREIA_CONTENT = `🩸 Definição

A diarreia é a eliminação de fezes líquidas ou amolecidas em alta frequência (três ou mais vezes ao dia). Pode ocorrer devido a infecções, intolerâncias alimentares ou outras doenças do sistema digestivo.

⚠️ Principais Causas

Infecções intestinais

Vírus: Rotavírus, Norovírus

Bactérias: Escherichia coli, Salmonella, Shigella

Arasitas: Giardia lamblia, Entamoeba histolytica

Alimentos contaminados

Comida mal cozida ou armazenada de forma incorreta

Água não tratada

Intolerâncias alimentares

Intolerância à lactose

Sensibilidade ao glúten

Medicamentos

Uso prolongado de antibióticos

Alguns laxantes ou antiácidos

Doenças intestinais crônicas

Síndrome do Intestino Irritável

Doença de Crohn

Colite ulcerativa

🩺 Sintomas Comuns

Fezes líquidas ou moles

Dor e cólicas abdominais

Náuseas e vômitos

Febre (em casos infecciosos)

Fraqueza e fadiga

Sinais de desidratação: boca seca, pouca urina, tontura

💊 Tratamento

O tratamento depende da causa, mas inclui:

1. Hidratação

Beber muita água, sumos naturais e caldos leves

Usar Soro Caseiro:

1 litro de água fervida + 1 colher de chá de sal + 2 colheres de sopa de açúcar

Misturar bem e beber em pequenas quantidades ao longo do dia.

2. Alimentação

Preferir: arroz, banana, batata cozida, maçã e torradas

Evitar: leite, gorduras, refrigerantes e álcool

3. Medicamentos (com prescrição médica)

Antibióticos (para infecções bacterianas confirmadas)

Antiparasitários (em casos de parasitas)

Probióticos (para equilibrar a flora intestinal)

🚨 Procure um profissional de saúde se:

A diarreia durar mais de 3 dias

Houver sangue nas fezes

Tiver febre alta persistente

Aparecerem sinais de desidratação grave (olhos fundos, confusão, fraqueza)

O paciente for criança, idoso ou imunodeprimido

🧼 Prevenção

Lavar bem as mãos antes das refeições e após usar o banheiro

Beber apenas água tratada ou fervida

Cozinhar bem os alimentos

Manter utensílios e locais de preparo limpos

Evitar comer em locais de procedência duvidosa

🧠 Resumo

A diarreia pode parecer simples, mas se não tratada corretamente, pode levar à desidratação e complicações graves. O cuidado principal é hidratar o corpo e procurar ajuda médica quando os sintomas persistirem.`;
  MOCK_DISEASES.push({
    id: 'diarreia',
    title: 'Diarreia',
    summary: 'Eliminação de fezes líquidas ou amolecidas em alta frequência; múltiplas causas e risco de desidratação.',
    content: DIARREIA_CONTENT
  });
  const o = document.createElement('option'); o.value = 'diarreia'; o.textContent = 'Diarreia'; diseaseSelect.appendChild(o);
}

// Ensure user-requested core vaccine-preventable diseases are present in the diseases collection
[
  { id:'tb', title:'Tuberculose (TB)', summary:'Doença infecciosa causada por Mycobacterium tuberculosis', content: `🦠 1. TUBERCULOSE (TB)\n\n💉 Vacina: BCG\n\n📖 Definição:\n\nA tuberculose é uma doença infecciosa e contagiosa causada por uma bactéria que ataca principalmente os pulmões, podendo também afetar rins, ossos e cérebro. Ainda é um problema de saúde pública em muitas regiões.\n\n🧫 Agente causador:\n\nMycobacterium tuberculosis (bacilo de Koch)\n\n🔄 Modo de transmissão:\n\nPelo ar, através de gotículas expelidas ao tossir, espirrar ou falar por pessoas infectadas\n\n🤒 Sinais e sintomas:\n\nTosse persistente (>3 semanas)\n\nFebre baixa, principalmente à tarde\n\nSuor noturno\n\nPerda de peso e apetite\n\nCansaço\n\nEm casos graves: sangue no escarro, dificuldade respiratória\n\n💥 Complicações:\n\nMeningite tuberculosa\n\nTuberculose miliar\n\nInsuficiência respiratória\n\nMorte\n\n💊 Tratamento:\n\nAntibióticos específicos: Rifampicina, Isoniazida, Pirazinamida e Etambutol por 6 meses\n\nTratamento gratuito e supervisionado\n\n🛡️ Prevenção completa:\n\nVacinação BCG ao nascer\n\nDiagnóstico e tratamento precoce\n\nBoa ventilação em ambientes fechados\n\nEvitar contato próximo com casos ativos\n\n✅ Importância da vacina:\n\nProtege crianças contra formas graves (meníngea e disseminada)` },

  { id:'poliomielite', title:'Poliomielite (Paralisia Infantil)', summary:'Doença viral que pode causar paralisia; prevenível por vacina', content: `🧾 2. POLIOMIELITE (PARALISIA INFANTIL)\n\n💉 Vacina: VOP (oral) ou VIP (injetável)\n\n📖 Definição:\n\nA poliomielite é uma doença viral altamente contagiosa que ataca o sistema nervoso, podendo causar paralisia irreversível, principalmente em crianças menores de 5 anos.\n\n🧫 Agente causador:\n\nPoliovírus tipos 1, 2 e 3\n\n🔄 Modo de transmissão:\n\nVia fecal-oral, por contato com fezes, água ou alimentos contaminados\n\n🤒 Sinais e sintomas:\n\nFebre, dor de cabeça, dor no pescoço e costas\n\nRigidez muscular\n\nParalisia flácida (em casos graves)\n\n💥 Complicações:\n\nParalisia permanente\n\nDificuldade respiratória\n\nMorte\n\n💊 Tratamento:\n\nNão há cura; apenas suporte (fisioterapia, cuidados respiratórios)\n\n🛡️ Prevenção completa:\n\nVacinação conforme calendário\n\nHigiene das mãos\n\nSaneamento básico\n\n✅ Importância da vacina:\n\nEvita circulação do vírus e erradica a doença` },

  { id:'difteria', title:'Difteria', summary:'Infecção bacteriana grave da garganta prevenível por vacina', content: `😷 3. DIFTERIA\n\n💉 Vacina: DTP\n\n📖 Definição:\n\nA difteria é uma infecção bacteriana grave que ataca a garganta e nariz, podendo produzir toxina que causa asfixia e complicações cardíacas.\n\n🧫 Agente causador:\n\nCorynebacterium diphtheriae\n\n🔄 Modo de transmissão:\n\nPelo ar, através de gotículas respiratórias\n\n🤒 Sinais e sintomas:\n\nFebre\n\nDor de garganta intensa\n\nPlacas acinzentadas na garganta (pseudomembranas)\n\nDificuldade para engolir\n\nInchaço do pescoço\n\n💥 Complicações:\n\nAsfixia\n\nMiocardite\n\nAralisia\n\nMorte\n\n💊 Tratamento:\n\nAntitoxina diftérica\n\nAntibióticos (penicilina ou eritromicina)\n\n🛡️ Prevenção completa:\n\nVacinação DTP\n\nIsolamento de casos\n\nBoa higiene respiratória` },

  { id:'tetano', title:'Tétano', summary:'Doença não contagiosa causada por toxina de Clostridium tetani', content: `⚔️ 4. TÉTANO\n\n💉 Vacina: DTP / TT\n\n📖 Definição:\n\nO tétano é uma doença não contagiosa, causada por toxina bacteriana que provoca espasmos musculares graves.\n\n🧫 Agente causador:\n\nClostridium tetani\n\n🔄 Modo de transmissão:\n\nFeridas contaminadas com terra, poeira ou objetos enferrujados\n\n🤒 Sinais e sintomas:\n\nRigidez muscular (trismo)\n\nEspasmos dolorosos\n\nDificuldade respiratória\n\nFebre\n\n💥 Complicações:\n\nParada respiratória\n\nFraturas durante espasmos\n\nMorte\n\n💊 Tratamento:\n\nAntitoxina tetânica\n\nAntibióticos\n\nSuporte hospitalar\n\n🛡️ Prevenção completa:\n\nVacinação com reforço a cada 10 anos\n\nLimpeza adequada de feridas\n\n✅ Importância da vacina:\n\nProtege recém-nascidos e adultos contra formas graves` }
].forEach(d=>{
  if(!MOCK_DISEASES.find(x=>x.id === d.id)) {
    MOCK_DISEASES.push(d);
    const o = document.createElement('option'); o.value = d.id; o.textContent = d.title;
    const diseaseSelect = document.getElementById('disease-select');
    if(diseaseSelect) diseaseSelect.appendChild(o);
  }
});

// Add or update user-provided vaccine-preventable disease entries: Coqueluche, Sarampo, Rubéola, Parotidite (Caxumba), Hepatite B
[
  {
    id: 'coqueluche',
    title: 'Coqueluche (Tosse Convulsa)',
    summary: 'Doença respiratória causada por Bordetella pertussis; prevenível por DTP.',
    content: `COQUELUCHE (TOSSE CONVULSA)\n\n💉 Vacina: DTP\n\n📖 Definição:\n\nA coqueluche é uma doença infecciosa respiratória causada por bactéria, caracterizada por tosse intensa e prolongada, podendo levar a complicações graves, especialmente em lactentes.\n\n🧫 Agente causador:\n\nBordetella pertussis\n\n🔄 Modo de transmissão:\n\nPelo ar, através de gotículas respiratórias\n\n🤒 Sinais e sintomas:\n\nTosse seca intensa e repetitiva\n\nChiado ou "gargarejo" ao final da crise\n\nVômitos após a tosse\n\nDificuldade respiratória\n\nFebre baixa\n\n💥 Complicações:\n\nPneumonia\n\nConvulsões\n\nDesidratação\n\nMorte em bebês não vacinados\n\n💊 Tratamento:\n\nAntibióticos (ex.: azitromicina)\n\nSuporte respiratório e hidratação\n\n🛡️ Prevenção completa:\n\nVacinação DTP conforme calendário\n\nEvitar contato próximo com pessoas infectadas\n\nBoa higiene respiratória\n\nAmbientes ventilados\n\n✅ Importância da vacina:\n\nProtege lactentes e crianças pequenas, reduzindo risco de complicações graves.`
  },
  {
    id: 'sarampo',
    title: 'Sarampo',
    summary: 'Doença viral altamente contagiosa; prevenível por Tríplice Viral.',
    content: `SARAMPO\n\n💉 Vacina: Tríplice Viral\n\n📖 Definição:\n\nO sarampo é uma doença viral altamente contagiosa que causa erupções cutâneas, febre e sintomas respiratórios, podendo evoluir para complicações graves.\n\n🧫 Agente causador:\n\nVírus do sarampo (Morbillivirus)\n\n🔄 Modo de transmissão:\n\nPelo ar, através de gotículas respiratórias\n\n🤒 Sinais e sintomas:\n\nFebre alta\n\nTosse, coriza e conjuntivite\n\nManchas vermelhas no corpo (exantema)\n\nMal-estar geral\n\n💥 Complicações:\n\nPneumonia\n\nEncefalite\n\nDiarreia grave\n\nMorte, principalmente em crianças desnutridas\n\n💊 Tratamento:\n\nSintomático (não há antiviral específico)\n\nHidratação e suporte nutricional\n\n🛡️ Prevenção completa:\n\nVacinação com Tríplice Viral (duas doses)\n\nEvitar contato com casos suspeitos\n\nBoa ventilação nos ambientes\n\n✅ Importância da vacina:\n\nReduz mortalidade infantil e previne surtos.`
  },
  {
    id: 'rubéola',
    title: 'Rubéola',
    summary: 'Doença viral leve em crianças, gravíssima na gravidez; prevenível por Tríplice Viral.',
    content: `RUBÉOLA\n\n💉 Vacina: Tríplice Viral\n\n📖 Definição:\n\nA rubéola é uma doença viral geralmente leve em crianças, mas grave durante a gravidez, podendo causar má-formação fetal.\n\n🧫 Agente causador:\n\nVírus da rubéola (Rubivirus)\n\n🔄 Modo de transmissão:\n\nPelo ar, por gotículas respiratórias\n\n🤒 Sinais e sintomas:\n\nFebre baixa\n\nManchas rosadas\n\nInchaço dos gânglios linfáticos\n\nMal-estar leve\n\n💥 Complicações:\n\nSíndrome da Rubéola Congênita (malformações cardíacas, surdez, atraso mental)\n\nAbortos espontâneos ou natimortos\n\n💊 Tratamento:\n\nSintomático\n\nHidratação e repouso\n\n🛡️ Prevenção completa:\n\nVacinação antes da gravidez\n\nEvitar contato com pessoas infectadas\n\nAmbientes ventilados\n\n✅ Importância da vacina:\n\nEvita deformidades congênitas e controla surtos.`
  },
  {
    id: 'parotidite',
    title: 'Parotidite Epidêmica (Caxumba)',
    summary: 'Infecção viral das glândulas salivares prevenível por Tríplice Viral.',
    content: `PAROTIDITE EPIDÊMICA (CAXUMBA)\n\n💉 Vacina: Tríplice Viral\n\n📖 Definição:\n\nA caxumba é uma infecção viral que afeta as glândulas salivares, causando dor, inchaço e febre.\n\n🧫 Agente causador:\n\nVírus da caxumba (Paramyxovirus)\n\n🔄 Modo de transmissão:\n\nPelo ar, por gotículas respiratórias\n\nContato com saliva contaminada\n\n🤒 Sinais e sintomas:\n\nInchaço e dor das glândulas parótidas\n\nFebre\n\nDor ao mastigar\n\nMal-estar geral\n\n💥 Complicações:\n\nMeningite viral\n\nOrquite (inflamação testicular, risco de infertilidade)\n\nPancreatite\n\nSurdez temporária\n\n💊 Tratamento:\n\nSintomático\n\nAnalgésicos e repouso\n\n🛡️ Prevenção completa:\n\nVacinação Tríplice Viral (duas doses)\n\nEvitar contato próximo com infectados\n\nBoa higiene das mãos\n\nAmbientes ventilados\n\n✅ Importância da vacina:\n\nReduz complicações graves e surtos em escolas.`
  },
  {
    id: 'hepatite_b',
    title: 'Hepatite B',
    summary: 'Doença viral do fígado que pode tornar-se crónica; prevenível por vacina Hepatite B / Pentavalente.',
    content: `HEPATITE B\n\n💉 Vacina: Hepatite B / Pentavalente\n\n📖 Definição:\n\nA hepatite B é uma doença viral que afeta o fígado, podendo evoluir para infecção crônica, cirrose e câncer hepático.\n\n🧫 Agente causador:\n\nVírus da hepatite B (HBV)\n\n🔄 Modo de transmissão:\n\nSangue e fluidos corporais\n\nRelação sexual sem proteção\n\nTransmissão vertical (mãe para filho)\n\n🤒 Sinais e sintomas:\n\nCansaço\n\nFebre\n\nIcterícia\n\nUrina escura\n\nDor abdominal\n\n💥 Complicações:\n\nCirrose hepática\n\nCâncer de fígado\n\nInsuficiência hepática\n\nMorte em casos graves\n\n💊 Tratamento:\n\nAntivirais para casos crônicos\n\nMonitoramento médico contínuo\n\n🛡️ Prevenção completa:\n\nVacinação nas primeiras 24h de vida\n\nEvitar compartilhamento de objetos cortantes\n\nSexo seguro\n\nHigiene das mãos\n\n✅ Importância da vacina:\n\nPrevine infecção crônica e câncer hepático.`
  }
].forEach(d=>{
  if(!MOCK_DISEASES.find(x=>x.id === d.id)){
    MOCK_DISEASES.push(d);
    const o = document.createElement('option'); o.value = d.id; o.textContent = d.title;
    const diseaseSelect = document.getElementById('disease-select');
    if(diseaseSelect) diseaseSelect.appendChild(o);
  }
});

/* NEW: add additional requested vaccine-preventable diseases if not present */
[
  {
    id: 'febre_amarela',
    title: 'Febre Amarela',
    summary: 'Doença viral aguda transmitida por mosquitos; pode causar icterícia e hemorragias.',
    content: `EBRE AMARELA\n\n💉 Vacina: Febre Amarela (FA)\n\n📖 Definição:\n\nA febre amarela é uma doença viral aguda transmitida por mosquitos, podendo causar icterícia, hemorragias e falência de órgãos, e pode ser fatal em casos graves.\n\n🧫 Agente causador:\n\nVírus da febre amarela (Flavivirus)\n\n🔄 Modo de transmissão:\n\nPicada de mosquitos Aedes aegypti (urbano) ou Haemagogus/Sabethes (silvestre)\n\n🤒 Sinais e sintomas:\n\nFebre alta\n\nCalafrios\n\nDor de cabeça e muscular\n\nNáuseas e vômitos\n\nIcterícia (pele amarelada)\n\nSangramentos em casos graves\n\n💥 Complicações:\n\nInsuficiência hepática e renal\n\nHemorragias internas\n\nMorte em até 50% dos casos graves\n\n💊 Tratamento:\n\nSintomático e de suporte hospitalar\n\nHidratação, monitoramento e cuidados intensivos\n\n🛡️ Prevenção completa:\n\nVacinação única (eficaz para toda a vida)\n\nUso de repelentes e mosquiteiros\n\nEliminação de criadouros de mosquitos\n\nRoupas que cubram o corpo\n\nEvitar áreas de surto sem proteção\n\n✅ Importância da vacina:\n\nEvita doença grave e epidemias, especialmente em regiões endêmicas.`
  },
  {
    id: 'hib',
    title: 'Haemophilus influenzae tipo b (Hib)',
    summary: 'Bactéria que causa meningite e pneumonia em crianças; prevenível pela Pentavalente.',
    content: `HAEMOPHILUS INFLUENZAE TIPO B (Hib)\n\n💉 Vacina: Pentavalente (DTP + Hib + Hepatite B)\n\n📖 Definição:\n\nO Haemophilus influenzae tipo b é uma bactéria que pode causar infecções graves em crianças, como meningite, pneumonia e epiglotite, com risco de sequelas permanentes.\n\n🧫 Agente causador:\n\nHaemophilus influenzae tipo b\n\n🔄 Modo de transmissão:\n\nGotículas respiratórias\n\nContato próximo com portadores\n\n🤒 Sinais e sintomas:\n\nFebre\n\nDificuldade respiratória\n\nDor de garganta\n\nRigidez de nuca (meningite)\n\nMal-estar geral\n\n💥 Complicações:\n\nSurdez permanente\n\nRetardo mental\n\nPneumonia grave\n\nMorte\n\n💊 Tratamento:\n\nAntibióticos (ceftriaxona, ampicilina)\n\nSuporte hospitalar em casos graves\n\n🛡️ Prevenção completa:\n\nVacinação Pentavalente\n\nEvitar contato com pessoas doentes\n\nHigiene das mãos\n\nAmbientes ventilados\n\nNutrição adequada\n\n✅ Importância da vacina:\n\nReduz drasticamente meningites e pneumonia infantil, prevenindo sequelas graves.`
  },
  {
    id: 'rotavirus',
    title: 'Rotavírus',
    summary: 'Vírus que causa diarreia grave em lactentes; prevenível por vacina oral.',
    content: `ROTAVÍRUS\n\n💉 Vacina: Rotavírus oral\n\n📖 Definição:\n\nO rotavírus é uma infecção viral altamente contagiosa que provoca diarreia grave em lactentes e crianças pequenas, podendo levar rapidamente à desidratação e morte.\n\n🧫 Agente causador:\n\nVírus do rotavírus\n\n🔄 Modo de transmissão:\n\nVia fecal-oral (água, alimentos e superfícies contaminadas)\n\n🤒 Sinais e sintomas:\n\nDiarreia intensa e aquosa\n\nVómitos\n\nFebre baixa\n\nDesidratação rápida\n\n💥 Complicações:\n\nDesidratação grave\n\nHospitalização\n\nMorte em casos não tratados\n\n💊 Tratamento:\n\nReidratação oral ou intravenosa\n\nNutrição adequada\n\n🛡️ Prevenção completa:\n\nVacinação oral\n\nHigiene das mãos\n\nSaneamento básico (água potável e esgoto)\n\nLimpeza de brinquedos e utensílios infantis\n\n✅ Importância da vacina:\n\nReduz hospitalizações e mortalidade infantil por diarreia grave.`
  },
  {
    id: 'pneumococo',
    title: 'Pneumococo (Streptococcus pneumoniae)',
    summary: 'Bactéria que causa pneumonia, meningite e sepse; prevenível por PCV.',
    content: `PNEUMOCOCO\n\n💉 Vacina: PCV (Vacina Pneumocócica Conjugada)\n\n📖 Definição:\n\nO Streptococcus pneumoniae é uma bactéria que pode causar pneumonia, meningite e sepse, sendo uma das principais causas de morte infantil.\n\n🧫 Agente causador:\n\nStreptococcus pneumoniae\n\n🔄 Modo de transmissão:\n\nGotículas respiratórias\n\nContato próximo com pessoas infectadas\n\n🤒 Sinais e sintomas:\n\nFebre\n\nTosse com dificuldade respiratória\n\nDor no peito\n\nRigidez do pescoço (meningite)\n\n💥 Complicações:\n\nPneumonia grave\n\nMeningite com sequelas neurológicas\n\nSepse\n\nMorte\n\n💊 Tratamento:\n\nAntibióticos\n\nSuporte hospitalar e respiratório\n\n🛡️ Prevenção completa:\n\nVacinação PCV\n\nBoa higiene respiratória\n\nEvitar contato com pessoas doentes\n\nAmbientes ventilados\n\nNutrição adequada\n\n✅ Importância da vacina:\n\nProtege contra infecções invasivas graves, prevenindo morte e complicações.`
  },
  {
    id: 'hpv',
    title: 'HPV (Papilomavírus Humano)',
    summary: 'Vírus que pode causar câncer cervical e verrugas genitais; prevenível por vacina HPV.',
    content: `HPV (Papilomavírus Humano)\n\n💉 Vacina: HPV\n\n📖 Definição:\n\nO HPV é um vírus que infecta a pele e mucosas, podendo causar câncer do colo do útero, vulva, pênis e orofaringe, além de verrugas genitais.\n\n🧫 Agente causador:\n\nPapilomavírus humano (diversos tipos)\n\n🔄 Modo de transmissão:\n\nRelações sexuais sem proteção\n\nContato pele a pele\n\n🤒 Sinais e sintomas:\n\nVerrugas genitais (em alguns tipos)\n\nLesões pré-cancerosas do colo do útero (assintomáticas)\n\nCâncer em casos avançados\n\n💥 Complicações:\n\nCâncer do colo do útero e outros órgãos genitais\n\nNecessidade de cirurgia\n\nMorte em casos não tratados\n\n💊 Tratamento:\n\nRemoção de verrugas (cirúrgica ou química)\n\nTratamento oncológico (quimioterapia/radioterapia)\n\nMonitoramento ginecológico\n\n🛡️ Prevenção completa:\n\nVacinação antes do início da vida sexual (9-14 anos)\n\nUso de preservativos\n\nExames preventivos regulares (Papanicolau)\n\n✅ Importância da vacina:\n\nReduz significativamente risco de câncer cervical e verrugas genitais.`
  },
  {
    id: 'influenza',
    title: 'Influenza (Gripe)',
    summary: 'Infecção viral respiratória sazonal; prevenível por vacina anual.',
    content: `INFLUENZA (GRIPE)\n\n💉 Vacina: Influenza (trivalente ou quadrivalente)\n\n📖 Definição:\n\nA influenza é uma infecção viral respiratória altamente contagiosa, que causa febre, tosse, dores musculares e, em casos graves, pode levar à pneumonia e morte.\n\n🧫 Agente causador:\n\nVírus influenza tipos A e B\n\n🔄 Modo de transmissão:\n\nPelo ar, por gotículas respiratórias\n\nContato com superfícies contaminadas\n\n🤒 Sinais e sintomas:\n\nFebre alta\n\nCalafrios\n\nTosse e dor de garganta\n\nDores musculares e fadiga\n\nCongestão nasal\n\n💥 Complicações:\n\nPneumonia bacteriana secundária\n\nExacerbação de doenças crônicas (asma, cardíacas)\n\nMorte, especialmente em idosos e imunodeprimidos\n\n💊 Tratamento:\n\nSintomático\n\nAntivirais em casos selecionados\n\nHidratação e repouso\n\n🛡️ Prevenção completa:\n\nVacinação anual\n\nHigiene das mãos\n\nUso de máscara em surtos\n\nEvitar contato com pessoas doentes\n\nAmbientes ventilados\n\n✅ Importância da vacina:\n\nReduz hospitalizações, complicações graves e mortalidade, principalmente em grupos vulneráveis.`
  }
].forEach(d=>{
  if(!MOCK_DISEASES.find(x=> x.id === d.id)){
    MOCK_DISEASES.push(d);
    const sel = document.getElementById('disease-select') /* placeholder to get DOM; actual select used for diseases */;
    // also append to manuals list select (if exists)
    const manualsListEl = document.getElementById('manuals-list');
    // No direct DOM update here — renderManualsForCourse will pick up MANUALS; this ensures idempotent insertion.
  }
});

/* Simulators: populate courses for selection */
// const simSelect = qs('#simulators-course-select');
// const courseOptions = qsa('#courses-screen .course-btn').map(b=>b.textContent);
// courseOptions.forEach(c=>{
//   const o = document.createElement('option'); o.value=c; o.textContent=c; simSelect.appendChild(o);
// });
// simSelect.addEventListener('change', (e)=>{
//   const v = e.target.value;
//   const list = qs('#simulators-list');
//   if(!v){ list.style.display='none'; return; }
//   list.style.display='grid';
//   list.innerHTML = '';
//   // simulators: for Medicina Geral show only Questionnaire; for others show generic simulators
//   if(v.toLowerCase().includes('medicina geral')){
//     const qwrap = document.createElement('div');
//     qwrap.style.display = 'flex';
//     qwrap.style.gap = '8px';
//     qwrap.style.flexWrap = 'wrap';
//
//     const level1btn = document.createElement('button');
//     level1btn.className = 'action-btn';
//     level1btn.textContent = 'Avaliação — Nível 1 (Atendimento e Urgências)';
//     level1btn.addEventListener('click', async ()=>{
//       show('sim-environment');
//       const mod = await import('./quiz.js');
//       mod.openMedicinaGeralLevel1();
//     });
//     qwrap.appendChild(level1btn);
//
//     const level2btn = document.createElement('button');
//     level2btn.className = 'action-btn';
//     level2btn.textContent = 'Avaliação — Nível 2 (CV5)';
//     // start hidden until Level 1 is completed
//     level2btn.style.display = 'none';
//     level2btn.disabled = true;
//     level2btn.title = 'Desbloqueado ao concluir o Nível 1 (aparecerá após concluir Nível 1)';
//     level2btn.addEventListener('click', async ()=>{
//       const st = JSON.parse(localStorage.getItem('medg_level1_done') || 'null');
//       if(!(st && st.passed)){
//         return alert('Avaliacao Nível 2 bloqueada: conclua e alcance o Nível 1 antes de iniciar o Nível 2.');
//       }
//       show('sim-environment');
//       const mod = await import('./quiz.js');
//       mod.openMedicinaGeralLevel2();
//     });
//
//     // NEW: Level 3 button (hidden until Level 2 is completed and passed)
//     const level3btn = document.createElement('button');
//     level3btn.className = 'action-btn';
//     level3btn.textContent = 'Avaliação — Nível 3 (Avançado)';
//     level3btn.style.display = 'none';
//     level3btn.disabled = true;
//     level3btn.title = 'Desbloqueado ao concluir o Nível 2 (aparecerá após concluir Nível 2)';
//     level3btn.addEventListener('click', async ()=>{
//       const st2 = JSON.parse(localStorage.getItem('medg_level2_done') || 'null');
//       if(!(st2 && st2.passed)){
//         return alert('Avaliacao Nível 3 bloqueada: conclua e alcance o Nível 2 antes de iniciar o Nível 3.');
//       }
//       show('sim-environment');
//       const mod = await import('./quiz.js');
//       mod.openMedicinaGeralLevel3();
//     });
//
//     try{
//       const st = JSON.parse(localStorage.getItem('medg_level1_done') || 'null');
//       if(st && st.passed){
//         level2btn.disabled = false;
//         level2btn.style.display = '';
//       }
//       // reveal Level 3 if Level 2 was previously completed/passed
//       const st2 = JSON.parse(localStorage.getItem('medg_level2_done') || 'null');
//       if(st2 && st2.passed){
//         level3btn.disabled = false;
//         level3btn.style.display = '';
//       }
//     }catch(e){ /* ignore */ }
//
//     // listen for completion event to enable Level 2 only when passed
//     window.addEventListener('medg_level1_completed', (ev)=>{
//       localStorage.setItem('medg_level1_done', JSON.stringify({done:true, passed: ev.detail.passed, score: ev.detail.score, date: new Date().toISOString()}));
//       if(ev.detail.passed){
//         level2btn.style.display = '';
//         level2btn.disabled = false;
//         level2btn.title = 'Desbloqueado — clique para iniciar Nível 2';
//       }
//     });
//
//     // NEW: listen for Level 2 completion to enable Level 3
//     window.addEventListener('medg_level2_completed', (ev)=>{
//       localStorage.setItem('medg_level2_done', JSON.stringify({done:true, passed: ev.detail.passed, score: ev.detail.score, date: new Date().toISOString()}));
//       if(ev.detail.passed){
//         level3btn.style.display = '';
//         level3btn.disabled = false;
//         level3btn.title = 'Desbloqueado — clique para iniciar Nível 3';
//       }
//     });
//
//     list.appendChild(qwrap);
//     // append level buttons
//     qwrap.appendChild(level1btn);
//     qwrap.appendChild(level2btn);
//     qwrap.appendChild(level3btn);
//   } else if(v.toLowerCase().includes('administração de gestão de redes') || v.toLowerCase().includes('gestão de redes') || v.toLowerCase().includes('administração de gestão de redes'.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))){
//     // Provide CV5 Administração de Gestão de Redes quiz access
//     const qwrap = document.createElement('div');
//     qwrap.style.display = 'flex';
//     qwrap.style.gap = '8px';
//     qwrap.style.flexWrap = 'wrap';
//
//     const redesQuizBtn = document.createElement('button');
//     redesQuizBtn.className = 'action-btn';
//     redesQuizBtn.textContent = 'Avaliação — CV5 Administração de Gestão de Redes';
//     redesQuizBtn.addEventListener('click', async ()=>{
//       show('sim-environment');
//       const mod = await import('./quiz.js');
//       // start at Level 1
//       if(mod && typeof mod.openGestaoRedesLevel1 === 'function'){
//         mod.openGestaoRedesLevel1();
//       } else if(mod && typeof mod.openGestaoRedesQuiz === 'function'){
//         // fallback to legacy entrypoint
//         mod.openGestaoRedesQuiz();
//       } else {
//         alert('Quiz de Gestão de Redes indisponível.');
//       }
//     });
//     qwrap.appendChild(redesQuizBtn);
//
//     list.appendChild(qwrap);
//   } else if(v.toLowerCase().includes('suporte informático') || v.toLowerCase().includes('suporte informatico')){
//     // Provide CV4 Suporte Informático quiz access
//     const qwrap = document.createElement('div');
//     qwrap.style.display = 'flex';
//     qwrap.style.gap = '8px';
//     qwrap.style.flexWrap = 'wrap';
//
//     const supBtn1 = document.createElement('button');
//     supBtn1.className = 'action-btn';
//     supBtn1.textContent = 'Avaliação — Suporte Informático (Nível 1)';
//     supBtn1.addEventListener('click', async ()=>{
//       show('sim-environment');
//       const mod = await import('./quiz.js');
//       if(mod && typeof mod.openSuporteInformaticaLevel1 === 'function'){ mod.openSuporteInformaticaLevel1(); }
//       else if(mod && typeof mod.openSuporteInformaticaQuiz === 'function'){ mod.openSuporteInformaticaQuiz(); }
//       else alert('Quiz de Suporte Informático indisponível.');
//     });
//     qwrap.appendChild(supBtn1);
//
//     const supBtn2 = document.createElement('button');
//     supBtn2.className = 'action-btn';
//     supBtn2.textContent = 'Avaliação — Suporte Informático (Nível 2)';
//     supBtn2.style.display = 'none';
//     supBtn2.disabled = true;
//     supBtn2.title = 'Desbloqueado ao concluir o Nível 1 com 70%';
//     supBtn2.addEventListener('click', async ()=>{
//       const st = JSON.parse(localStorage.getItem('suporte_cv4_level1_done') || 'null');
//       if(!(st && st.passed)) return alert('Nível 2 bloqueado: conclua e alcance o Nível 1 antes de iniciar o Nível 2.');
//       show('sim-environment');
//       const mod = await import('./quiz.js');
//       if(mod && typeof mod.openSuporteInformaticaLevel2 === 'function'){ mod.openSuporteInformaticaLevel2(); } else alert('Nível 2 indisponível.');
//     });
//     qwrap.appendChild(supBtn2);
//
//     const supBtn3 = document.createElement('button');
//     supBtn3.className = 'action-btn';
//     supBtn3.textContent = 'Avaliação — Suporte Informático (Nível 3)';
//     supBtn3.style.display = 'none';
//     supBtn3.disabled = true;
//     supBtn3.title = 'Desbloqueado ao concluir o Nível 2 com 70%';
//     supBtn3.addEventListener('click', async ()=>{
//       const st2 = JSON.parse(localStorage.getItem('suporte_cv4_level2_done') || 'null');
//       if(!(st2 && st2.passed)) return alert('Nível 3 bloqueado: conclua e alcance o Nível 2 antes de iniciar o Nível 3.');
//       show('sim-environment');
//       const mod = await import('./quiz.js');
//       if(mod && typeof mod.openSuporteInformaticaLevel3 === 'function'){ mod.openSuporteInformaticaLevel3(); } else alert('Nível 3 indisponível.');
//     });
//     qwrap.appendChild(supBtn3);
//
//     // reveal buttons based on stored completion flags
//     try{
//       const st = JSON.parse(localStorage.getItem('suporte_cv4_level1_done') || 'null');
//       if(st && st.passed){ supBtn2.disabled = false; supBtn2.style.display = ''; supBtn2.title = 'Desbloqueado — clique para iniciar Nível 2'; }
//       const st2 = JSON.parse(localStorage.getItem('suporte_cv4_level2_done') || 'null');
//       if(st2 && st2.passed){ supBtn3.disabled = false; supBtn3.style.display = ''; supBtn3.title = 'Desbloqueado — clique para iniciar Nível 3'; }
//     }catch(e){ /* ignore */ }
//
//     // listen for completion events to unlock next levels
//     window.addEventListener('suporte_cv4_level1_completed', (ev)=>{
//       localStorage.setItem('suporte_cv4_level1_done', JSON.stringify({done:true, passed: ev.detail.passed, score: ev.detail.score, percent: ev.detail.percent, date: new Date().toISOString()}));
//       if(ev.detail.passed){
//         supBtn2.style.display = '';
//         supBtn2.disabled = false;
//         supBtn2.title = 'Desbloqueado — clique para iniciar Nível 2';
//       }
//     });
//     window.addEventListener('suporte_cv4_level2_completed', (ev)=>{
//       localStorage.setItem('suporte_cv4_level2_done', JSON.stringify({done:true, passed: ev.detail.passed, score: ev.detail.score, percent: ev.detail.percent, date: new Date().toISOString()}));
//       if(ev.detail.passed){
//         supBtn3.style.display = '';
//         supBtn3.disabled = false;
//         supBtn3.title = 'Desbloqueado — clique para iniciar Nível 3';
//       }
//     });
//
//     list.appendChild(qwrap);
//   } else {
//     ['Coleta','Interpretação','Avaliação'].forEach(name=>{ const btn=document.createElement('button'); btn.className='action-btn'; btn.textContent=`${name} — ${v}`; btn.addEventListener('click', ()=> openSimulator(v, name)); list.appendChild(btn); });
//   }
// });

// function openSimulator(course, type){
//   show('sim-environment' in window ? 'sim-environment' : 'simulators');
//   // if real sim environment present, populate it:
//   const simMain = qs('#sim-env-main') || document.body;
//   if(simMain){
//     simMain.innerHTML = `<div class="results-card"><h3>${type} — ${course}</h3><p>Ambiente de simulação simples (mock).</p>
//       <button id="sim-finish" class="action-btn">Concluir</button></div>`;
//     qs('#sim-env-back').addEventListener('click', ()=> show('simulators'));
//     qs('#sim-finish').addEventListener('click', ()=> show('simulators'));
//     qs('#sim-env-title').textContent = `${type} • ${course}`;
//   }
// }

/* Manuals simple list */
const manualsList = qs('#manuals-list');
 
 // manuals list intentionally left empty per requirements
 
 // Set MANUALS to the requested collection so the manuals screen shows the items
const MANUALS = [
  { id: 'tmg_formulario_medicamentos', title: 'Formulario Nacional de Medicamentos', course: 'Farmácia', url: 'https://drive.google.com/file/d/1L-4Kms8eGp3eU2B6w9bxZD45b_0U4HLC/view?usp=drive_link' },
  { id: 'tmg_manual_farmacologia', title: 'Manual de Farmacologia', course: 'TMG', url: 'https://drive.google.com/file/d/17TtsrWZlG5hC2YOJ3QUJ6Fa0UZjCCmHl/view?usp=drive_link' },
  { id: 'tmg_anatomia_fisiologia', title: 'Manual_Anatomia_Fisiologia_jun18_Final', course: 'TMG', url: 'https://drive.google.com/file/d/1kUM_hXRGbHU0U9BroxjIVRBE3skd6QQ9/view?usp=drive_link' },
  { id: 'tmg_ciencias_medicas', title: 'Manual_Ciencias_Medicas_Julho03_2012_Final', course: 'TMG', url: 'https://drive.google.com/file/d/1FLTiecWhr7UI65xrVZ2IMBsGXBmGcig8/view?usp=drive_link' },
  { id: 'tmg_etica_deontologia', title: 'Manual_Etica_Deontologia_Profissional-1', course: 'TMG', url: 'https://drive.google.com/file/d/1Gd9CcVxBAzHTDHrsLlBUcvdsLLnmjZFk/view?usp=drive_link' },
  { id: 'tmg_enfermagem_diagnosticos', title: 'Manual_Enfermagem_M.Diagnosticos_Julho03_2012_Final', course: 'TMG', url: 'https://drive.google.com/file/d/1CuHvvzqLo-4H0zNbGGqCSTZ9EOXmIz7C/view?usp=drive_link' },
  { id: 'tmg_semiologia', title: 'Manual_Semiologia_Julho03_2012_Final-1', course: 'TMG', url: 'https://drive.google.com/file/d/1Ejz53umdUjzG0wcVCYtzbjStWTNmR-za/view?usp=drive_link' },
  { id: 'tmg_microbiologia', title: 'manual_microbiologia_completo', course: 'TMG', url: 'https://drive.google.com/file/d/1GcQA87eGSWgtoA7VjyGvpk5_qXUIocwk/view?usp=drive_link' },
  { id: 'tmg_meios_auxiliares', title: 'Manual_Meios Auxiliares de Diagnosticos_Julho03_2012_Final', course: 'TMG', url: 'https://drive.google.com/file/d/1HjTChvCn29ldAPs75rOiw1zqGVE5b51H/view?usp=drive_link' },
  { id: 'tmg_enfermagem_1s_socorros', title: 'Manual_Enfermagem e 1s Socorros_Julho03_2012_Final', course: 'TMG', url: 'https://drive.google.com/file/d/12LLE9ci_Pj5BJTzwdP5LB9yFPU1T_0zd/view?usp=drive_link' },
  { id: 'tmg_saude_comunidade', title: 'Manual Saúde_da_Comunidade_TMG', course: 'TMG', url: 'https://drive.google.com/file/d/1TVKgIv56w9VgYuBeqm6DDJju-KuKzWhM/view?usp=drive_link' }
];
// Add additional TMG manuals provided by user into MANUALS if not already present
[
  { id:'tmg_ssr_ii', title:'Manual SSR-II', course:'TMG', url: 'https://drive.google.com/file/d/1W10GRotPi_teIo5C_iptDMy7geptTFdV/view?usp=drive_link' },
  { id:'tmg_aparelho_gastrointestinal_2012', title:'Manual_Aparelho Gastrointestinal_2012_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1KvS42AnrmnpVC2xMvI2yv0HMzTT8T93m/view?usp=drive_link' },
  { id:'tmg_aparelho_respiratorio_2012', title:'Manual_Aparelho Respiratorio_2012_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1Z8aXlvDi0pD52rSNQsLiYXHR9K22korF/view?usp=drive_link' },
  { id:'tmg_aparelho_cardiovascular_2012', title:'Manual_Aparelho Cardiovascular_2012_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1YdYRCD7VHu49i-ghns12PvCXBmLv8PSy/view?usp=drive_link' },
  { id:'tmg_dermatologia_2012', title:'Manual_Dermatologia_2012_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1i1hRWKkyL5bKTRBgZsrLjoEhAG0tE3Nv/view?usp=drive_link' },
  { id:'tmg_etica_ii_2012', title:'Manual_Etica II_2012_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1i1hRWKkyL5bKTRBgZsrLjoEhAG0tE3Nv/view?usp=drive_link' },
  { id:'tmg_procedimentos_clinicos_2012', title:'Manual_Procedimentos Clinicos_2012_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/11oylofesqeii-PUvjcyTFHuDMD_2hA1U/view?usp=drive_link' },
  { id:'tmg_ssr_i_2012', title:'Manual_SSR-I_2012_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1DCG0qYxuaVmyCSmSMKRwlc7Td_SaJDhI/view?usp=drive_link' },
  { id:'tmg_ssr_iii_2012', title:'Manual_SSR-III_2012_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1QEW4kajz9d6Zzi7M7_RjJfig52XKLb8_/view?usp=drive_link' }
].forEach(m=>{
  if(!MANUALS.find(x=>x.id===m.id || x.title===m.title)) MANUALS.push(m);
});
// add remaining user-provided TMG manuals if not already present
[
  { id:'tmg_guiao_bolso_2023', title:'Guiao de Bolso 2023', course:'TMG', url: 'https://drive.google.com/file/d/1bwhaI7INa0M9fZ7tAam4ASaNbdNDuWrv/view?usp=drive_link' },
  { id:'tmg_hiv_avaliacao_manejo_2013', title:'Manual de Avaliação e Manejo dos Doentes com HIV SIDA_Fev 2013', course:'TMG', url: 'https://drive.google.com/file/d/1LWs5LIAz6jbJFf3DLN0qjcRPPnEYVYnt/view?usp=drive_link' },
  { id:'tmg_admin_gestao_i_julho13', title:'Manual_Admin_Gestao_I_Julho13_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/17FtE8PM0SnQ-jsTjBtRJwPkQUmq-ppQ8/view?usp=drive_link' },
  { id:'tmg_doencas_infecciosas_julho13', title:'Manual_Doencas_infecciosas_Julho13_FINAL-1-', course:'TMG', url: 'https://drive.google.com/file/d/1idQ7LQCnMlvoQ_m3Mw9bG0n-mXVCS_T-/view?usp=drive_link' },
  { id:'tmg_endocrinologia_julho13', title:'Manual_Endocrinologia_Julho13_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1iy55bIiWW4_etFXd9cwuzzZd7xpngsdn/view?usp=drive_link' },
  { id:'tmg_hematologia_oncologia_julho13', title:'Manual_Hematologia_e_Oncologia_Julho13', course:'TMG', url: 'https://drive.google.com/file/d/1VNZat6PURVn5JAA2ZVBwJRhp_khtvWgY/view?usp=drive_link' },
  { id:'tmg_neurologia_julho13', title:'Manual_Neurologia_Julho13_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1BgUOxrEQ2KBqEqmeKpJFpWPCbkMW015Z/view?usp=drive_link' },
  { id:'tmg_orl_oftalmologia_estomatologia_julho13', title:'Manual_ORL_Oftalmologia_Estomatologia_Julho13_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1JWfcX5xxHx3wIckUA2nZQXAM70GzWNTZ/view?usp=drive_link' },
  { id:'tmg_saude_mental_julho13', title:'Manual_Saúde_mental_Julho13_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1ggt2QoEb5T7EkHkZdW5ehMUq-H3tk-SD/view?usp=drive_link' },
  { id:'tmg_triptico_2025_final', title:'Triptico 2025_final', course:'TMG', url: 'https://drive.google.com/file/d/1CIjz7T_shFK_PDEBXFns23FfYw1LeS-/view?usp=drive_link' },
  { id:'tmg_gestao_administracao_ii', title:'Manual Gestão e Administração II', course:'TMG', url: 'https://drive.google.com/file/d/1mki0adHE_RCKD2ZlqkTVbKmEn0Nnkbox/view?usp=drive_link' },
  { id:'tmg_pediatria_i', title:'Manual PEDIATRIA_PARTE_I', course:'TMG', url: 'https://drive.google.com/file/d/1_YmCCOAsv4lm-clDmhYLg7VbuA7KVNPa/view?usp=drive_link' },
  { id:'tmg_pediatria_ii', title:'Manual PEDIATRIA_PARTE_II', course:'TMG', url: 'https://drive.google.com/file/d/1Htv2UM3NzrZccTYV8OuBbBCXqi2q7uLm/view?usp=drive_link' },
  { id:'tmg_pediatria_iii', title:'Manual PEDIATRIA_PARTE_III', course:'TMG', url: 'https://drive.google.com/file/d/1BnGlQwLuDBS5G5ja4_pAhVz8P2dPx712/view?usp=drive_link' },
  { id:'tmg_pediatria_iv', title:'Manual PEDIATRIA_PARTE_IV', course:'TMG', url: 'https://drive.google.com/file/d/1rJuaBrNGa58LnBW-5aOK-gr7kjI0v3bp/view?usp=drive_link' },
  { id:'tmg_pediatria_v', title:'Manual PEDIATRIA_PARTE_V', course:'TMG', url: 'https://drive.google.com/file/d/1Z85cwg4mToYDVO8ToGXaDTtFLchAUuUT/view?usp=drive_link' },
  { id:'tmg_pediatria_vi_2013', title:'Manual_PEDIATRIA_PARTE_VI__2013_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1C9w_LcWct58L2Up9j6kc45GU4uefD7kV/view?usp=drive_link' },
  { id:'tmg_aparelho_urinario_julho13', title:'Manual_Aparelho_Urinario_Julho13_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1qfRsQPBANHWbUY3PPDwFDoQh_tIZoBS-/view?usp=drive_link' },
  { id:'tmg_geriatria_julho13', title:'Manual_Geriatria_Julho13_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1pqjTU-hdRd04nmZ7PsfPKBud7IypKzEF/view?usp=drive_link' },
  { id:'tmg_pediatria_vi_2013', title:'Manual_PEDIATRIA_PARTE_VI__2013_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1C9w_LcWct58L2Up9j6kc45GU4uefD7kV/view?usp=drive_link' }
];
// Add VM1 / MV1 manual for CV5 Técnicas de Laboratórios if not present
if(!MANUALS.find(m => m.id === 'vm1_mv1_lab' || m.title && /vm1|mv1/i.test(m.title))){
  MANUALS.push({
    id: 'vm1_mv1_lab',
    title: 'VM1 / MV1 - Módulo VM1 (CV5 Técnicas de Laboratórios de Análises Clínicas)',
    course: 'CV5 em Técnicas de Laboratórios de Análises Clínicas',
    url: 'https://drive.google.com/file/d/1l60aCLTnDiCQ6P0bdBGh_QnMsuC2BQXi/view?usp=drivesdk'
  });
}

// ADD: MV3-2 manual for CV5 Técnicas de Laboratórios
if(!MANUALS.find(m => m.id === 'mv3_2_lab' || (m.title && /mv3[-_\s]*2/i.test(m.title)))){
  MANUALS.push({
    id: 'mv3_2_lab',
    title: 'MV3-2 — Módulo MV3-2 (CV5 Técnicas de Laboratórios de Análises Clínicas)',
    course: 'CV5 em Técnicas de Laboratórios de Análises Clínicas',
    url: 'https://drive.google.com/file/d/1B1ziTy5hpzSaKt2Dv0KsXf8qVvZg3KWY/view?usp=drive_link'
  });
}

/* Add additional TMG manuals requested by user if not already present */
[
  { id:'tmg_doencas_infecciosas_julho13', title:'Manual_Doencas_infecciosas_Julho13_FINAL-1-', url:'https://drive.google.com/file/d/1idQ7LQCnMlvoQ_m3Mw9bG0n-mXVCS_T-/view?usp=drive_link' },
  { id:'tmg_endocrinologia_julho13', title:'Manual_Endocrinologia_Julho13_FINAL', url:'https://drive.google.com/file/d/1iy55bIiWW4_etFXd9cwuzzZd7xpngsdn/view?usp=drive_link' },
  { id:'tmg_hematologia_oncologia_julho13', title:'Manual_Hematologia_e_Oncologia_Julho13', url:'https://drive.google.com/file/d/1VNZat6PURVn5JAA2ZVBwJRhp_khtvWgY/view?usp=drive_link' },
  { id:'tmg_neurologia_julho13', title:'Manual_Neurologia_Julho13_FINAL', url:'https://drive.google.com/file/d/1BgUOxrEQ2KBqEqmeKpJFpWPCbkMW015Z/view?usp=drive_link' },
  { id:'tmg_orl_oftalmologia_estomatologia_julho13', title:'Manual_ORL_Oftalmologia_Estomatologia_Julho13_FINAL', url:'https://drive.google.com/file/d/1JWfcX5xxHx3wIckUA2nZQXAM70GzWNTZ/view?usp=drive_link' },
  { id:'tmg_saude_mental_julho13', title:'Manual_Saúde_mental_Julho13_FINAL', url:'https://drive.google.com/file/d/1ggt2QoEb5T7EkHkZdW5ehMUq-H3tk-SD/view?usp=drive_link' },
  { id:'tmg_triptico_2025_final', title:'Triptico 2025_final', url:'https://drive.google.com/file/d/1CIjz7T_shFK_PDEBXFns23FfYVw1LeS-/view?usp=drive_link' }
].forEach(m=>{
  if(!MANUALS.find(x=> x.id===m.id || x.title===m.title)) MANUALS.push(Object.assign({course:'TMG'}, m));
});

/* Add additional TMG manuals requested by user if not already present */
[
  { id:'tmg_ensino_supervisao_estagio_julho13', title:'Manual_Ensino e Supervisão de Estágio_Julho13_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1qydx45D4lebPThBE7jURJ0AtVNQ6-bZp/view?usp=drive_link' },
  { id:'tmg_gestao_administracao_iii_julho13', title:'Manual_Gestao_e_Administracao_III__Julho13_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1K1iq4METseCijgM_hksT4LAHNgtqYQDA/view?usp=drive_link' },
  { id:'tmg_medicina_legal_julho13', title:'Manual_Medicina_Legal_Julho13_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1pGla_68zFyfESe1aV1mpSiUibFHL2E6v/view?usp=drive_link' },
  { id:'tmg_traumas_emergencias_julho13', title:'Manual_Traumas_e_Emergencias_Julho13_FINAL', course:'TMG', url: 'https://drive.google.com/file/d/1ynaqjsly2v6uZMdcFL-E9cVg6ny6NHNI/view?usp=drive_link' }
].forEach(m=>{
  if(!MANUALS.find(x=>x.id===m.id || x.title===m.title)) MANUALS.push(Object.assign({course:'TMG'}, m));
});

/* Add additional TMG manuals requested by user if not already present */
[
  { id:'tmg_gestao_administracao_ii', title:'Manual Gestão e Administração II', url:'https://drive.google.com/file/d/1mki0adHE_RCKD2ZlqkTVbKmEn0Nnkbox/view?usp=drive_link' },
  { id:'tmg_pediatria_i', title:'Manual PEDIATRIA_PARTE_I', url:'https://drive.google.com/file/d/1_YmCCOAsv4lm-clDmhYLg7VbuA7KVNPa/view?usp=drive_link' },
  { id:'tmg_pediatria_ii', title:'Manual PEDIATRIA_PARTE_II', url:'https://drive.google.com/file/d/1Htv2UM3NzrZccTYV8OuBbBCXqi2q7uLm/view?usp=drive_link' },
  { id:'tmg_pediatria_iii', title:'Manual PEDIATRIA_PARTE_III', url:'https://drive.google.com/file/d/1BnGlQwLuDBS5G5ja4_pAhVz8P2dPx712/view?usp=drive_link' },
  { id:'tmg_pediatria_iv', title:'Manual PEDIATRIA_PARTE_IV', url:'https://drive.google.com/file/d/1rJuaBrNGa58LnBW-5aOK-gr7kjI0v3bp/view?usp=drive_link' },
  { id:'tmg_pediatria_v', title:'Manual PEDIATRIA_PARTE_V', url:'https://drive.google.com/file/d/1Z85cwg4mToYDVO8ToGXaDTtFLchAUuUT/view?usp=drive_link' },
  { id:'tmg_aparelho_urinario_julho13', title:'Manual_Aparelho_Urinario_Julho13_FINAL', url:'https://drive.google.com/file/d/1qfRsQPBANHWbUY3PPDwFDoQh_tIZoBS-/view?usp=drive_link' },
  { id:'tmg_geriatria_julho13', title:'Manual_Geriatria_Julho13_FINAL', url:'https://drive.google.com/file/d/1pqjTU-hdRd04nmZ7PsfPKBud7IypKzEF/view?usp=drive_link' },
  { id:'tmg_pediatria_vi_2013', title:'Manual_PEDIATRIA_PARTE_VI__2013_FINAL', url:'https://drive.google.com/file/d/1C9w_LcWct58L2Up9j6kc45GU4uefD7kV/view?usp=drive_link' }
].forEach(m=>{
  if(!MANUALS.find(x=> x.id===m.id || x.title===m.title)) MANUALS.push(Object.assign({course:'TMG'}, m));
});

/* Add additional TMG manuals requested by user if not already present */
[
  { id:'tmg_nutricao', title:'Manual_Nutricao', url:'https://drive.google.com/file/d/1RZDdFROi8b-7Obu84gArlqe08I-hdPN4/view?usp=drive_link' },
  { id:'tmg_nutricao_ii', title:'Manual_Nutricao_II', url:'https://drive.google.com/file/d/1dGmoK27QJOVv94-XWfStzDPLej-r0cLB/view?usp=drive_link' },
  { id:'tmg_nutricao_iii', title:'Manual_Nutricao_III', url:'https://drive.google.com/file/d/1c8jqkJASyJxv0JD4qnjxJfV5NrA5MAar/view?usp=drive_link' }
].forEach(m=>{
  if(!MANUALS.find(x=> x.id===m.id || x.title===m.title)) MANUALS.push(Object.assign({course:'TMG'}, m));
});

/* Render manuals (no course filter; manuals list intentionally empty) */
function renderManualsForCourse(course, overrideList){
  manualsList.innerHTML = '';
  if(!MANUALS.length){
    const none = document.createElement('div');
    none.className = 'results-card';
    none.textContent = 'Nenhum manual disponível.';
    manualsList.appendChild(none);
    return;
  }
  const base = overrideList || MANUALS;
  const list = course ? base.filter(m=> (m.course||'').toLowerCase() === course.toLowerCase()) : base;
  list.forEach(m=>{
    const el = document.createElement('div'); el.className='results-card';
    const desc = (m.content || '').replace(/<[^>]+>/g,'').slice(0,220);
    const hasUrl = Boolean(m.url);
    const webSearch = `https://www.google.com/search?q=${encodeURIComponent(m.title)}`;
    el.innerHTML = `<div class="manual-title">${m.title}</div>
      <div style="margin-top:8px;color:#333;font-size:0.95rem">${desc}${(m.content && m.content.length>220)?'…':''}</div>
      <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <a role="button" class="action-btn manual-open" data-id="${m.id}">${hasUrl? 'Abrir / Visualizar' : 'Abrir'}</a>
      </div>
      <div style="margin-top:8px;color:#556;font-size:0.9rem">${m.course || 'Geral'}</div>`;
    manualsList.appendChild(el);
  });
}
// initial render
renderManualsForCourse();

/* Contact robot: copy footer contact info into a toggleable popup */
const robotBtn = qs('#contact-robot-btn');
// Replace popup behaviour: open WhatsApp chat for complaints to the provided number
if(robotBtn){
  robotBtn.addEventListener('click', (ev) => {
    // Prefilled message (Portuguese)
    const phoneIntl = '258864326758'; // +258 864 326 758
    const prefill = encodeURIComponent('Olá, gostaria de deixar uma reclamação referente a: ');
    const waLinkWeb = `https://wa.me/${phoneIntl}?text=${prefill}`;
    const isMobile = /Android|iPhone|iPad|iPod|Mobile|Opera Mini/i.test(navigator.userAgent || '');
    // set ARIA attributes for accessibility
    robotBtn.setAttribute('aria-expanded', 'false');
    // On mobile open native WhatsApp (location.href), on desktop open WhatsApp Web in new tab
    try{
      if(isMobile){
        window.location.href = waLinkWeb;
      } else {
        const opened = window.open(waLinkWeb, '_blank');
        if(!opened){
          // fallback to direct navigation if popup blocked
          window.location.href = waLinkWeb;
        }
      }
    }catch(e){
      // last resort: navigate
      window.location.href = waLinkWeb;
    }
  });
}

/* Header inline Robo de Reclamação / Sugestão: toggles small chat in header and opens mail client with validation */
(function headerRobo(){
  const feedbackHeaderBtn = qs('#feedback-robot-btn');
  const roboInline = qs('#roboChatInline');
  const roboWindow = qs('#roboChatHeader');
  const openMailBtn = qs('#openMailClientBtn');
  const closeRoboBtn = qs('#closeRoboHeaderBtn');
  const emailInput = qs('#userEmailHeader');
  const alertMsg = qs('#alertMsgHeader');

  if(!feedbackHeaderBtn || !roboWindow) return;

  feedbackHeaderBtn.addEventListener('click', (ev)=>{
    const expanded = feedbackHeaderBtn.getAttribute('aria-expanded') === 'true';
    feedbackHeaderBtn.setAttribute('aria-expanded', String(!expanded));
    roboWindow.style.display = expanded ? 'none' : 'block';
    if(!expanded && emailInput){ setTimeout(()=> { emailInput.focus(); emailInput.selectionStart = emailInput.value.length; }, 80); }
  });

  if(closeRoboBtn){
    closeRoboBtn.addEventListener('click', ()=>{
      roboWindow.style.display = 'none';
      feedbackHeaderBtn.setAttribute('aria-expanded','false');
      if(alertMsg){ alertMsg.style.display='none'; alertMsg.textContent=''; }
    });
  }

  if(openMailBtn){
    openMailBtn.addEventListener('click', ()=>{
      const name = (qs('#userNameHeader') && qs('#userNameHeader').value || '').trim();
      const course = (qs('#userCourseHeader') && qs('#userCourseHeader').value || '').trim();
      const turma = (qs('#userTurmaHeader') && qs('#userTurmaHeader').value || '').trim();
      if(!name || !course || !turma){
        if(alertMsg){ alertMsg.style.display='block'; alertMsg.textContent = 'Por favor preencha Nome, Curso e Turma.'; }
        return;
      }
      if(alertMsg){ alertMsg.style.display='none'; alertMsg.textContent=''; }
      // prepare mailto with the provided details included as sender info in the body
      const recipient = 'mensageirosftmoz@gmail.com';
      const subject = encodeURIComponent('Reclamação ou Sugestão — IMPCV');
      const bodyText = encodeURIComponent(`Remetente:\nNome: ${name}\nCurso: ${course}\nTurma: ${turma}\n\nEscreva a sua reclamação ou sugestão aqui:\n\n`);
      const mailto = `mailto:${encodeURIComponent(recipient)}?subject=${subject}&body=${bodyText}`;
      const isMobile = /Android|iPhone|iPad|iPod|Mobile|Opera Mini/i.test(navigator.userAgent || '');
      if(isMobile){
        window.location.href = mailto;
      } else {
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${subject}&body=${bodyText}`;
        const opened = window.open(gmailUrl, '_blank');
        if(!opened) window.location.href = mailto;
      }
      // close UI after short delay and clear inputs
      setTimeout(()=> {
        roboWindow.style.display = 'none';
        feedbackHeaderBtn.setAttribute('aria-expanded','false');
        const n = qs('#userNameHeader'); const c = qs('#userCourseHeader'); const t = qs('#userTurmaHeader');
        if(n) n.value = ''; if(c) c.value = ''; if(t) t.value = '';
      }, 350);
    });
  }

  // close when clicking outside header robo
  document.addEventListener('click', (ev)=>{
    if(!roboWindow || roboWindow.style.display === 'none') return;
    const btn = qs('#feedback-robot-btn');
    if(!roboWindow.contains(ev.target) && ev.target !== btn){
      roboWindow.style.display = 'none';
      feedbackHeaderBtn.setAttribute('aria-expanded','false');
      if(alertMsg){ alertMsg.style.display='none'; alertMsg.textContent=''; }
    }
  });
  // Escape to close
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && roboWindow && roboWindow.style.display === 'block'){
      roboWindow.style.display = 'none';
      feedbackHeaderBtn.setAttribute('aria-expanded','false');
      if(alertMsg){ alertMsg.style.display='none'; alertMsg.textContent=''; }
    }
  });
})();

/* NEW: Feedback robot (Reclamação / Sugestão) popup handling */
const feedbackBtn = qs('#feedback-robot-btn');
const feedbackPopup = qs('#feedback-robot-popup');
if(feedbackBtn && feedbackPopup){
  feedbackBtn.addEventListener('click', ()=>{
    const expanded = feedbackBtn.getAttribute('aria-expanded') === 'true';
    feedbackBtn.setAttribute('aria-expanded', String(!expanded));
    feedbackPopup.setAttribute('aria-hidden', String(expanded));
    feedbackPopup.style.display = expanded ? 'none' : 'block';
    if(!expanded){
      // fetch hidden robot-only contact content first; fallback to footer redes clone if missing
      const robotContacts = qs('#robot-contacts');
      if(robotContacts){
        const clone = robotContacts.cloneNode(true);
        clone.style.display = '';
        clone.style.maxWidth = '360px';
        clone.style.margin = '0';
        clone.querySelectorAll('a').forEach(a=> a.target = '_blank');
        feedbackPopup.innerHTML = '';
        feedbackPopup.appendChild(clone);
      } else {
        // fallback: show redes (socials) if hidden contact block missing
        const footerRedes = qs('#contactos .redes');
        if(footerRedes){
          const clone = footerRedes.cloneNode(true);
          clone.style.maxWidth = '360px';
          clone.style.margin = '0';
          clone.querySelectorAll('a').forEach(a=> a.target = '_blank');
          feedbackPopup.innerHTML = '';
          feedbackPopup.appendChild(clone);
        } else {
          feedbackPopup.innerHTML = '<div style="padding:12px;">Contactos indisponíveis.</div>';
        }
      }
      // focus the message textarea so the caret is placed where the user should write
      setTimeout(() => {
        const ta = qs('#feedback-message');
        if(ta) { ta.focus(); ta.selectionStart = ta.value.length; }
      }, 80);
    }
  });

  // form handlers
  const feedbackForm = qs('#feedback-form');
  const feedbackStatus = qs('#feedback-status');
  const feedbackCancel = qs('#feedback-cancel');

  if(feedbackCancel){
    feedbackCancel.addEventListener('click', ()=> {
      feedbackPopup.style.display = 'none';
      feedbackPopup.setAttribute('aria-hidden','true');
      feedbackBtn.setAttribute('aria-expanded','false');
      // clear form
      if(feedbackForm) feedbackForm.reset();
      if(feedbackStatus) { feedbackStatus.style.display='none'; feedbackStatus.textContent=''; }
    });
  }

  if(feedbackForm){
    feedbackForm.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      const subject = qs('#feedback-subject').value.trim();
      const message = qs('#feedback-message').value.trim();
      const name = qs('#feedback-name').value.trim();
      const course = qs('#feedback-course').value.trim();
      const turma = qs('#feedback-turma').value.trim();
      const contact = qs('#feedback-contact').value.trim();
      const email = qs('#feedback-email').value.trim();
      // require subject, message and email
      if(!subject || !message || !email){
        if(feedbackStatus){ feedbackStatus.style.display='block'; feedbackStatus.style.color='#c0392b'; feedbackStatus.textContent = 'Por favor preencha assunto e mensagem.'; }
        return;
      }

      // prepare payload
      const payload = {
        id: 'fb_' + Date.now(),
        subject,
        message,
        email: email,
        name: name,
        course: course,
        turma: turma,
        contact: contact,
        date: new Date().toISOString()
      };

      // CONFIG: set your server endpoint here to receive feedbacks server-side and forward by email.
      // Example: const ADMIN_FEEDBACK_ENDPOINT = 'https://your-server.example.com/api/feedback';
      const ADMIN_FEEDBACK_ENDPOINT = window.ADMIN_FEEDBACK_ENDPOINT || ''; 

      // save to localStorage (queue) so admin can retrieve later
      try{
        const raw = localStorage.getItem('impcv_feedbacks');
        const arr = raw ? JSON.parse(raw) : [];
        arr.unshift(payload);
        localStorage.setItem('impcv_feedbacks', JSON.stringify(arr.slice(0,200)));
        if(feedbackStatus){ feedbackStatus.style.display='block'; feedbackStatus.style.color='#0b845e'; feedbackStatus.textContent = 'Enviado localmente; a abrir cliente de e-mail...'; }

        // Immediately open the user's default mail client with prefilled recipient, subject and body.
        // Using window.location.href ensures the mail client compose window opens in most environments.
        const recipient = 'mensageirosftmoz@gmail.com';
        const body = encodeURIComponent(`Mensagem:\n${message}\n\nNome: ${name}\nCurso: ${course}\nTurma: ${turma}\nContacto: ${contact}\nEmail do remetente: ${email}`);
        const mailto = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${body}`;
        // open mail client
        window.location.href = mailto;

         // close popup after short delay and reset
         setTimeout(()=> {
           feedbackForm.reset();
           setTimeout(()=> {
             feedbackPopup.style.display = 'none';
             feedbackPopup.setAttribute('aria-hidden','true');
             feedbackBtn.setAttribute('aria-expanded','false');
           }, 700);
         }, 300);
       }catch(err){
        // fallback: if localStorage fails, still open mail client
        const recipient = 'mensageirosftmoz@gmail.com';
        const body = encodeURIComponent(`Mensagem:\n${message}\n\nContacto do remetente: ${email}`);
        window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${body}`;
        if(feedbackStatus){ feedbackStatus.style.display='block'; feedbackStatus.style.color='#c0392b'; feedbackStatus.textContent = 'Erro ao gravar localmente — abriu cliente de email.'; }
       }

      // also dispatch a custom event so other modules (admin) can listen for new feedbacks
      window.dispatchEvent(new CustomEvent('impcv_feedback_submitted', { detail: payload }));
    });
  }
}

/* Manuals list: filter by course */
const manualSearch = qs('#manual-search');
if(manualSearch){
  manualSearch.addEventListener('input', (e)=>{
    const q = (e.target.value || '').trim().toLowerCase();
    if(!q){
      return renderManualsForCourse(); // restore full list
    }
    const filtered = MANUALS.filter(m => {
      const title = (m.title||'').toLowerCase();
      const content = (m.content||'').toLowerCase();
      const course = (m.course||'').toLowerCase();
      return title.includes(q) || content.includes(q) || course.includes(q);
    });
    renderManualsForCourse(null, filtered);
  });
}

/* Helper: find manual by id */
function findManualById(id){ return MANUALS.find(m=>m.id===id); }

// Open manual: internal content opens in new window; remote PDF opens in new tab
function openManual(manual){
  if(manual.url){
    // Open provided remote URL directly in a new tab (user expects direct Drive link to open)
    window.open(manual.url, '_blank', 'noopener');
    return;
  }
  const w = window.open('', '_blank', 'noopener,width=900,height=700');
  if(!w) return alert('Bloqueador de janelas impediu a abertura.');
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${manual.title}</title>
    <style>body{font-family:Arial,Helvetica,sans-serif;padding:20px;max-width:900px;margin:auto;color:#111}</style>
    </head><body>${manual.content || '<p>Sem conteúdo.</p>'}
    <hr><div style="margin-top:12px"><button onclick="window.print()" style="padding:8px 12px;border-radius:6px;background:#0A66FF;color:#fff;border:0;cursor:pointer">Imprimir</button></div>
    </body></html>`);
  w.document.close();
}

// Download manual: if remote URL -> fetch and save; if internal -> generate PDF via html2canvas+jspdf
async function downloadManual(manual){
  // Download functionality has been disabled by request.
  // Keep the function present as a safe no-op so other code calling it won't break.
  try{
    alert('A funcionalidade de baixar manuais foi desativada neste sistema.');
  }catch(e){}
}

// Print manual: either open a print window for remote PDF or internal content
function printManual(manual){
  if(manual.url && manual.url.endsWith('.pdf')){
    // Opening PDF in new tab and allow user to print
    const w = window.open(manual.url, '_blank', 'noopener');
    if(!w) return alert('Bloqueador de janelas impediu a abertura.');
    // can't auto-print cross-origin PDFs reliably; user will use their viewer
    return;
  }
  // For remote non-PDF URLs, open via Google Viewer so user can print from there
  if(manual.url){
    const viewer = `https://docs.google.com/viewer?url=${encodeURIComponent(manual.url)}&embedded=true`;
    const wv = window.open(viewer, '_blank', 'noopener');
    if(!wv) return alert('Bloqueador de janelas impediu a abertura.');
    return;
  }
  // internal content -> open window and auto-trigger print
  const w = window.open('', '_blank', 'noopener,width=900,height=700');
  if(!w) return alert('Bloqueador de janelas impediu a abertura.');
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${manual.title}</title>
    <style>body{font-family:Arial,Helvetica,sans-serif;padding:20px;color:#111}</style></head><body>${manual.content || ''}</body></html>`);
  w.document.close();
  w.focus();
  // slight delay to ensure rendering before print
  setTimeout(()=>{ w.print(); }, 600);
}

// Delegated event handlers for manual buttons
manualsList.addEventListener('click', (e)=>{
  const btn = e.target.closest('[data-id]');
  if(!btn) return;
  const id = btn.getAttribute('data-id');
  if(!id) return;
  const manual = findManualById(id);
  if(!manual) return;
  if(btn.classList.contains('manual-open')) openManual(manual);
  if(btn.classList.contains('manual-download')) downloadManual(manual);
  if(btn.classList.contains('manual-print')) printManual(manual);
});

/* Footer social buttons interactive parallax/glow on mouse move */
(function footerSocialFollow(){
  const contactos = document.getElementById('contactos');
  if(!contactos) return;
  const container = contactos.querySelector('.redes');
  if(!container) return;
  const buttons = Array.from(container.querySelectorAll('a'));
  // enable interactive mode class on enter
  container.addEventListener('mouseenter', ()=> contactos.classList.add('interactive'));
  container.addEventListener('mouseleave', ()=> {
    contactos.classList.remove('interactive');
    buttons.forEach(b=> {
      b.style.transform = '';
      b.removeAttribute('data-active');
    });
  });
  container.addEventListener('mousemove', (e)=>{
    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    buttons.forEach((btn, i)=>{
      const bRect = btn.getBoundingClientRect();
      const bx = bRect.left + bRect.width/2;
      const by = bRect.top + bRect.height/2;
      // vector from pointer to button center
      const dx = (e.clientX - bx);
      const dy = (e.clientY - by);
      // subtle movement opposite to pointer (parallax) scaled by distance and button size
      const moveX = (-dx / (rect.width)) * 14; // scale factor
      const moveY = (-dy / (rect.height)) * 10;
      // slight rotation for depth
      const rot = (dx / rect.width) * 4;
      btn.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rot}deg) scale(1.02)`;
      // mark the button closest to pointer as active to increase glow
      const dist = Math.hypot(e.clientX - bx, e.clientY - by);
      const threshold = Math.max(bRect.width, bRect.height) * 1.6;
      btn.setAttribute('data-active', dist < threshold ? 'true' : 'false');
      // NEW: compute glow position relative to button and set CSS vars so the radial gradient follows cursor
      const relX = ((e.clientX - bRect.left) / bRect.width) * 100;
      const relY = ((e.clientY - bRect.top) / bRect.height) * 100;
      const g = Math.max(0, 1 - dist / (threshold * 1.4)); // glow intensity 0..1
      btn.style.setProperty('--mx', `${relX}%`);
      btn.style.setProperty('--my', `${relY}%`);
      btn.style.setProperty('--gOpacity', g.toFixed(3));
    });
  });
})();

/* NEW: Admin panel minimal behaviour */
(function adminPanelInit(){
  const adminRefresh = qs('#admin-refresh');
  const adminList = qs('#admin-feedback-list');
  const adminClear = qs('#admin-clear-feedback');
  const changelogEl = qs('#admin-changelog');

  function renderStatistics(){
    // feedbacks
    const raw = localStorage.getItem('impcv_feedbacks');
    const fb = raw ? JSON.parse(raw) : [];
    const fbCountEl = qs('#stat-feedback-count');
    if(fbCountEl) fbCountEl.textContent = String(fb.length);

    // manuals count
    const manualsCountEl = qs('#stat-manuals-count');
    if(manualsCountEl){
      try {
        const mCount = Array.isArray(MANUALS) ? MANUALS.length : 0;
        manualsCountEl.textContent = String(mCount);
      } catch (e) { manualsCountEl.textContent = '0'; }
    }

    // diseases count
    const diseasesCountEl = qs('#stat-diseases-count');
    if(diseasesCountEl){
      try {
        const dSel = qs('#disease-select');
        // If MOCK_DISEASES exists, use its length; otherwise count options
        const dCount = (typeof MOCK_DISEASES !== 'undefined' && Array.isArray(MOCK_DISEASES)) ? MOCK_DISEASES.length
          : (dSel ? dSel.querySelectorAll('option').length - 1 : 0);
        diseasesCountEl.textContent = String(dCount);
      } catch (e) { diseasesCountEl.textContent = '0'; }
    }

    // MedG quiz pass stats (level 1..3)
    const l1El = qs('#stat-medg-l1');
    const l2El = qs('#stat-medg-l2');
    const l3El = qs('#stat-medg-l3');

    function _fmtLevelStat(key){
      try{
        const raw = localStorage.getItem(key);
        if(!raw) return '—';
        const obj = JSON.parse(raw);
        if(!obj || typeof obj.passed === 'undefined') return '—';
        return obj.passed ? `Sim · ${obj.score}/20` : `Não · ${obj.score}/20`;
      }catch(e){ return '—'; }
    }
    if(l1El) l1El.textContent = _fmtLevelStat('medg_level1_done');
    if(l2El) l2El.textContent = _fmtLevelStat('medg_level2_done');
    if(l3El) l3El.textContent = _fmtLevelStat('medg_level3_done');
  }

  function renderFeedbacks(){
    if(!adminList) return;
    const raw = localStorage.getItem('impcv_feedbacks');
    const arr = raw ? JSON.parse(raw) : [];
    adminList.innerHTML = '';
    if(!arr.length){
      adminList.innerHTML = '<div style="color:#666">Nenhum feedback guardado localmente.</div>';
      return;
    }
    arr.forEach(f=>{
      const node = document.createElement('div');
      node.style.borderBottom = '1px solid #eee';
      node.style.padding = '8px 0';
      node.innerHTML = `<div style="font-weight:700">${f.subject || 'Sem assunto'}</div>
        <div style="font-size:0.9rem;color:#444;white-space:pre-wrap;margin-top:6px">${(f.message||'')}</div>
        <div style="margin-top:6px;font-size:0.85rem;color:#666">Remetente: ${f.name||'–'} · Curso: ${f.course||'–'} · Turma: ${f.turma||'–'} · Contacto: ${f.contact||'–'} · Email: ${f.email||'–'}</div>`;
      adminList.appendChild(node);
    });
  }

  function renderChangelog(){
    if(!changelogEl) return;
    // reuse stored changelog if any (loadChangelog exists elsewhere); fallback to empty note
    const raw = localStorage.getItem('impcv_changelog') || '[]';
    let arr = [];
    try{ arr = JSON.parse(raw); }catch(e){ arr = []; }
    if(!arr.length) { changelogEl.innerHTML = '<div style="color:#666">Nenhuma atualização registada.</div>'; return; }
    changelogEl.innerHTML = '';
    arr.forEach(it=>{
      const div = document.createElement('div');
      div.style.padding = '6px 0';
      div.innerHTML = `<div style="font-weight:700">${it.title || 'Atualização'}</div><div style="font-size:0.9rem;color:#444">${it.text||''}</div>`;
      changelogEl.appendChild(div);
    });
  }

  if(adminRefresh) adminRefresh.addEventListener('click', ()=> { renderFeedbacks(); renderChangelog(); renderStatistics(); });
  if(adminClear) adminClear.addEventListener('click', ()=> {
    if(!confirm('Limpar todos os feedbacks guardados localmente?')) return;
    localStorage.removeItem('impcv_feedbacks');
    renderFeedbacks();
    renderStatistics();
  });

  // Print admin panel: create a clean printable window with admin-panel contents and trigger print
  const adminPrintBtn = qs('#admin-print');
  async function printAdminPanel(){
    const adminEl = qs('#admin-panel');
    if(!adminEl) return alert('Painel do Administrador não encontrado para impressão.');

    // Before cloning, capture the attempts chart canvas as a data URL so it prints reliably
    const chartCanvas = qs('#chart-attempts');
    let chartDataUrl = null;
    try{
      if(chartCanvas && chartCanvas instanceof HTMLCanvasElement){
        // create an offscreen copy scaled for print clarity
        const ratio = 2; // increase resolution for print
        const tmp = document.createElement('canvas');
        tmp.width = chartCanvas.width * ratio;
        tmp.height = chartCanvas.height * ratio;
        const ctx = tmp.getContext('2d');
        ctx.scale(ratio, ratio);
        ctx.drawImage(chartCanvas, 0, 0);
        chartDataUrl = tmp.toDataURL('image/png');
      }
    }catch(e){
      console.warn('Não foi possível capturar o gráfico para impressão:', e);
    }

    // clone to avoid altering live DOM and remove interactive controls
    const clone = adminEl.cloneNode(true);
    clone.querySelectorAll('button').forEach(b => b.removeAttribute('id'));
    // if we have the chart image, replace the canvas element in the clone with an <img> using the data URL
    if(chartDataUrl){
      const clonedCanvas = clone.querySelector('#chart-attempts');
      if(clonedCanvas){
        const img = document.createElement('img');
        img.src = chartDataUrl;
        img.style.width = '100%';
        img.style.maxWidth = '880px';
        img.alt = 'Gráfico — Tentativas por data';
        clonedCanvas.parentNode && clonedCanvas.parentNode.replaceChild(img, clonedCanvas);
      } else {
        // try to inject the image into the "Gráfico" card if canvas not found in clone
        const chartCard = Array.from(clone.querySelectorAll('.results-card')).find(rc => /Tentativas por data|Gráfico/i.test(rc.textContent || ''));
        if(chartCard){
          const img = document.createElement('img');
          img.src = chartDataUrl;
          img.style.width = '100%';
          img.style.maxWidth = '880px';
          img.alt = 'Gráfico — Tentativas por data';
          chartCard.appendChild(img);
        }
      }
    }

    // Build printable HTML with conservative styles to ensure the 'Estatísticas e Segurança' section prints well.
    const printableHtml = `<!doctype html><html><head><meta charset="utf-8"><title>Painel Administrador — IMPCV</title>
      <style>
        @media print {
          body { -webkit-print-color-adjust: exact; color-adjust: exact; }
        }
        body{font-family:Arial,Helvetica,sans-serif;color:#111;margin:18px;}
        h1,h2,h3{color:#0A66FF;margin:6px 0;}
        .results-card{border:1px solid #e6eef8;padding:12px;border-radius:6px;margin-bottom:12px;page-break-inside:avoid}
        #admin-panel{max-width:1100px;margin:0 auto}
        .stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
        .small-muted{color:#666;font-size:0.95rem}
        canvas, img { display:block; margin-top:8px; max-width:100%; height:auto; border:1px solid #eef3ff; background:#fff; }
        pre{white-space:pre-wrap;word-wrap:break-word;font-family:inherit}
      </style>
      </head><body>
      <h1>Painel Administrador — IMPCV</h1>
      <div id="admin-panel">${clone.innerHTML}</div>
      <script>
        // wait a moment for images to load then trigger print
        function waitForImages(cb){
          const imgs = Array.from(document.images);
          if(imgs.length === 0) return cb();
          let loaded = 0;
          imgs.forEach(i=>{
            if(i.complete) { loaded++; if(loaded===imgs.length) cb(); return; }
            i.addEventListener('load', ()=> { loaded++; if(loaded===imgs.length) cb(); });
            i.addEventListener('error', ()=> { loaded++; if(loaded===imgs.length) cb(); });
          });
        }
        window.addEventListener('load', ()=> {
          try{
            waitForImages(()=> {
              setTimeout(()=> { window.print(); }, 250);
            });
          }catch(e){
            // fallback to immediate print
            setTimeout(()=> { window.print(); }, 500);
          }
        });
      <\/script>
      </body></html>`;

    const w = window.open('', '_blank', 'noopener,width=1000,height=900');
    if(!w) return alert('Bloqueador de janelas impediu a abertura de uma janela de impressão.');
    w.document.open();
    w.document.write(printableHtml);
    w.document.close();
  }

  if(adminPrintBtn) adminPrintBtn.addEventListener('click', ()=> {
    // refresh metrics to ensure latest data is printed
    renderFeedbacks(); renderChangelog(); renderStatistics();
    printAdminPanel();
  });

  // render when admin panel is shown
  window.addEventListener('hashchange', ()=> {});
  // also render when opening via show()
  const originalShow = show;
  window.showAdminRefresh = () => { renderFeedbacks(); renderChangelog(); renderStatistics(); };

  // Initial rendering
  renderFeedbacks();
  renderChangelog();
  renderStatistics();

  // Update stats live when feedbacks are submitted or quiz levels are completed
  window.addEventListener('impcv_feedback_submitted', (ev)=> {
    renderFeedbacks();
    renderStatistics();
  });
  window.addEventListener('medg_level1_completed', (ev)=> { renderStatistics(); });
  window.addEventListener('medg_level2_completed', (ev)=> { renderStatistics(); });
  window.addEventListener('medg_level3_completed', (ev)=> { renderStatistics(); });
});

// add function to update admin button visibility according to the selected role
function updateAdminButtonVisibility(){
  try{
    const btn = document.getElementById('admin-btn');
    if(!btn) return;
    const role = sessionStorage.getItem('impcv_user_role') || 'user';
    if(role === 'admin'){
      btn.style.display = '';
      btn.setAttribute('title','Painel Administrador (visível porque entrou como Administrador)');
    } else {
      btn.style.display = 'none';
    }
  }catch(e){ console.warn('Erro ao atualizar visibilidade do admin-btn', e); }
}

// ensure visibility is correct after unlocking and on app init
/* inside the init() flow, after unlocking (where sessionStorage is set), call updateAdminButtonVisibility */
(function init(){
  // Passwords removed — system unlock will proceed without credential prompt

  // Automatic unlock: remove password prompt and set default non-admin role
  function promptSystemPassword(){
    // If already unlocked, continue
    if(sessionStorage.getItem('impcv_system_unlocked') === 'true') return Promise.resolve(true);
    // Mark system as unlocked and default to 'user' role
    try{
      sessionStorage.setItem('impcv_system_unlocked','true');
      sessionStorage.setItem('impcv_user_role','user');
    }catch(e){
      // ignore storage errors
    }
    return Promise.resolve(true);
  }

   // run prompt before showing app; if not unlocked, show login-screen minimal and block welcome
   (async () => {
     const ok = await promptSystemPassword();
     if(!ok){
       // block access: show login-screen (minimal) and hide other screens
       Object.values(screens).forEach(s => s && (s.style.display = 'none'));
       const login = qs('#login-screen');
       if(login) {
         login.style.display = '';
         // update its message to inform about locked system
         const lb = login.querySelector('.login-box');
         if(lb){
           const note = lb.querySelector('.system-lock-note');
           if(!note){
             const p = document.createElement('div');
             p.className = 'system-lock-note';
             p.style.margin = '8px 0';
             p.style.color = '#c0392b';
             p.textContent = 'Acesso ao sistema bloqueado: é necessário introduzir a senha do sistema.';
             lb.insertBefore(p, lb.firstChild.nextSibling);
           }
         }
       } else {
         alert('Acesso ao sistema bloqueado: senha não fornecida.');
       }
       return;
     }

     // if unlocked proceed with normal initialization
     show('welcome');
     loadChangelog();
     ensureGlobalBackButtons(); // add consistent back arrows to all screens
     // render admin metrics if admin already visible
     setTimeout(()=> { try{ renderAdminMetrics();}catch(e){} }, 600);
     // set admin button visibility according to role chosen during unlock
     try{ updateAdminButtonVisibility(); }catch(e){}

     // Auto-open Biblioteca modal overlay atop the welcome screen so the portal appears over the system on load.
     // Use a slight delay to ensure DOM and top-menu handler are ready, then trigger the same modal creation flow.
     setTimeout(() => {
     // Auto-open Biblioteca removed to prevent embedding external portal inside the system on load.
     }, 600);

   })();

})();

/* Init helper: ensure every screen has a consistent back button (except welcome) */
function ensureGlobalBackButtons(){
  const backMap = {
    'courses-screen': 'welcome',
    'app': 'courses',
    'diseases-screen': 'welcome',
    'manuals-screen': 'welcome',
    'login-screen': 'welcome',
    'guide-screen': 'welcome',
    'admin-panel': 'welcome'
  };
  Object.keys(backMap).forEach(id=>{
    const el = qs('#' + id);
    if(!el) return;
    // avoid duplicating if already has a back button inside
    if(el.querySelector('.global-back-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'back-btn global-back-btn';
    btn.title = 'Voltar';
    btn.setAttribute('aria-label','Voltar');
    btn.textContent = '‹';
    btn.style.position = 'absolute';
    btn.style.top = '12px';
    btn.style.left = '12px';
    btn.addEventListener('click', ()=> show(backMap[id]));
    // ensure the container is positioned so absolute works
    el.style.position = el.style.position || 'relative';
    el.appendChild(btn);
  });
}

/* --- BEGIN: Admin telemetry / usage logging --- */

// Lightweight telemetry store in localStorage under key 'impcv_metrics'
// structure:
// {
//   accesses: [{ts, page, userId, sessionId}],
//   searches: [{ts, query, userId}],
//   downloads: [{ts, manualId, userId}],
//   reads: [{ts, bookId, userId, percentRead, durationSeconds}],
//   logins: [{ts, userId, ip, city, region, country}],
//   sessions: [{sessionId, userId, startedAt, lastSeen, ip, city, region, country, suspicious:false}],
//   attemptsByDate: { '2025-11-10': count, ... }
// }

const METRICS_KEY = 'impcv_metrics';

function loadMetrics(){
  try{
    const raw = localStorage.getItem(METRICS_KEY);
    return raw ? JSON.parse(raw) : { accesses:[], searches:[], downloads:[], reads:[], logins:[], sessions:[], attemptsByDate:{} };
  }catch(e){ return { accesses:[], searches:[], downloads:[], reads:[], logins:[], sessions:[], attemptsByDate:{} }; }
}

function saveMetrics(m){
  try{ localStorage.setItem(METRICS_KEY, JSON.stringify(m)); }catch(e){ /* ignore storage errors */ }
}

// create or resume a session id for this browser instance
function getOrCreateSession(){
  let sid = sessionStorage.getItem('impcv_session_id');
  if(!sid){
    sid = 's_' + Date.now() + '_' + Math.random().toString(36).slice(2,10);
    sessionStorage.setItem('impcv_session_id', sid);
    // record new session start with IP/location lookup asynchronously
    createSessionRecord(sid);
  } else {
    // update lastSeen
    updateSessionLastSeen(sid);
  }
  return sid;
}

async function createSessionRecord(sid){
  const metrics = loadMetrics();
  const info = await fetchIpInfo().catch(()=> null);
  const session = {
    sessionId: sid,
    userId: (window.CURRENT_USER_ID || 'guest'),
    startedAt: new Date().toISOString(),
    lastSeen: new Date().toISOString(),
    ip: info ? info.ip : null,
    city: info ? info.city : null,
    region: info ? info.region : null,
    country: info ? info.country_name : null,
    suspicious: false
  };
  metrics.sessions.unshift(session);
  // keep sessions limited
  metrics.sessions = metrics.sessions.slice(0,200);
  saveMetrics(metrics);
  // dispatch event
  window.dispatchEvent(new CustomEvent('impcv_session_created', { detail: session }));
}

function updateSessionLastSeen(sid){
  try{
    const m = loadMetrics();
    const s = m.sessions.find(x=> x.sessionId === sid);
    if(s){ s.lastSeen = new Date().toISOString(); saveMetrics(m); }
  }catch(e){}
}

// minimal IP/location lookup (free public endpoint). If blocked, fail silently.
async function fetchIpInfo(){
  try{
    const resp = await fetch('https://ipapi.co/json/');
    if(!resp.ok) throw new Error('ip lookup failed');
    const j = await resp.json();
    // ipapi.co returns {ip, city, region, country_name, ...}
    return j;
  }catch(e){
    return null;
  }
}

// record an access (page view)
function recordAccess(pageId){
  try{
    const m = loadMetrics();
    const ts = new Date().toISOString();
    const sessionId = sessionStorage.getItem('impcv_session_id') || getOrCreateSession();
    m.accesses.unshift({ ts, page: pageId, userId: window.CURRENT_USER_ID || 'guest', sessionId });
    // increment attemptsByDate for chart
    const key = (new Date()).toISOString().slice(0,10);
    m.attemptsByDate[key] = (m.attemptsByDate[key] || 0) + 1;
    // cap arrays
    m.accesses = m.accesses.slice(0,2000);
    saveMetrics(m);
    window.dispatchEvent(new CustomEvent('impcv_access_recorded', { detail: { ts, page: pageId } }));
  }catch(e){}
}

// record search
function recordSearch(query){
  if(!query) return;
  try{
    const m = loadMetrics();
    m.searches.unshift({ ts: new Date().toISOString(), query, userId: window.CURRENT_USER_ID || 'guest' });
    m.searches = m.searches.slice(0,500);
    saveMetrics(m);
    window.dispatchEvent(new CustomEvent('impcv_search_recorded', { detail: { query } }));
  }catch(e){}
}

// record download/view of manual/book
function recordDownload(manualId){
  if(!manualId) return;
  try{
    const m = loadMetrics();
    m.downloads.unshift({ ts: new Date().toISOString(), manualId, userId: window.CURRENT_USER_ID || 'guest' });
    m.downloads = m.downloads.slice(0,1000);
    saveMetrics(m);
    window.dispatchEvent(new CustomEvent('impcv_download_recorded', { detail: { manualId } }));
  }catch(e){}
}

// record read progress (percent read 0..100, durationSeconds)
function recordReadProgress(bookId, percentRead, durationSeconds){
  if(!bookId) return;
  try{
    const m = loadMetrics();
    m.reads.unshift({ ts: new Date().toISOString(), bookId, percentRead: Number(percentRead || 0), durationSeconds: Number(durationSeconds || 0), userId: window.CURRENT_USER_ID || 'guest' });
    m.reads = m.reads.slice(0,2000);
    saveMetrics(m);
    window.dispatchEvent(new CustomEvent('impcv_read_recorded', { detail: { bookId, percentRead, durationSeconds } }));
  }catch(e){}
}

// record login event (also store last IP/location)
async function recordLogin(userId){
  try{
    const m = loadMetrics();
    const info = await fetchIpInfo().catch(()=> null);
    const rec = { ts: new Date().toISOString(), userId: userId || 'guest', ip: info ? info.ip : null, city: info ? info.city : null, region: info ? info.region : null, country: info ? info.country_name : null };
    m.logins.unshift(rec);
    m.logins = m.logins.slice(0,200);
    saveMetrics(m);
    window.dispatchEvent(new CustomEvent('impcv_login_recorded', { detail: rec }));
  }catch(e){}
}

// end (terminate) a remote session by sessionId: mark suspicious and remove from active list
function endSession(sessionId){
  try{
    const m = loadMetrics();
    const idx = m.sessions.findIndex(s=> s.sessionId === sessionId);
    if(idx >= 0){
      // mark suspicious and remove
      m.sessions[idx].suspicious = true;
      // optionally remove sessions older than some threshold
      m.sessions = m.sessions.filter(s=> s.sessionId !== sessionId);
      saveMetrics(m);
      window.dispatchEvent(new CustomEvent('impcv_session_ended', { detail: { sessionId } }));
      return true;
    }
  }catch(e){}
  return false;
}

// Hook points into existing flows to record events

// record page accesses for screens
['welcome','courses','app','diseases','simulators','manuals','sim-environment'].forEach(id => {
  const el = qs('#' + id);
  if(el){
    // when shown via show() we call recordAccess; override show to also record
  }
});

// wrap existing show() to record access per screen
const _originalShow = show;
window.show = function(name){
  try{ recordAccess(name); }catch(e){}
  return _originalShow(name);
};

// record search events from search input and courses search
const searchInput = qs('#search-input');
if(searchInput){
  searchInput.addEventListener('keydown', (e)=> {
    if(e.key === 'Enter'){
      const q = (searchInput.value || '').trim();
      if(q) recordSearch(q);
    }
  });
  searchInput.addEventListener('blur', (e)=>{
    const q = (searchInput.value || '').trim();
    if(q) recordSearch(q);
  });
}
const courseSearchEl = qs('#courses-search');
if(courseSearchEl){
  courseSearchEl.addEventListener('keydown', (e)=> { if(e.key === 'Enter'){ const q = (courseSearchEl.value||'').trim(); if(q) recordSearch(q); }});
}

// hook manual open/download buttons to record downloads
document.addEventListener('click', (ev)=>{
  const a = ev.target.closest('a,button');
  if(!a) return;
  // Opening/viewing manuals or modules is allowed, but downloading has been disabled.
  // Do not record automatic 'download' events when users click to open manuals/exams.
  // (This avoids counting 'baixar' actions when users open resources.)
});

// Simulate "book read" events: when user opens a manual via openManual(), we can start a timer and when they close tab or window, record progress.
// For simplicity, when openManual() opens an internal print/preview window we do not reliably get duration; offer API function for external code to call recordReadProgress(bookId,...)

// expose telemetry functions globally so other modules (simulators, reading UI) can call them
window.impcvTelemetry = {
  recordAccess,
  recordSearch,
  recordDownload,
  recordReadProgress,
  recordLogin,
  loadMetrics,
  endSession
};

/* --- END: Admin telemetry / usage logging --- */

/* --- BEGIN: Admin metrics rendering --- */

function renderAdminMetrics(){
  try{
    const metrics = loadMetrics();

    // aggregate counts
    // daily / weekly / monthly counts based on attemptsByDate and accesses timestamps
    const now = new Date();
    const dayKey = now.toISOString().slice(0,10);

    // Acessos diários, semanais, mensais computed from accesses array
    const accesses = metrics.accesses || [];
    const dailyCount = accesses.filter(a => a.ts.slice(0,10) === dayKey).length;

    // week: last 7 days
    const weekAgo = new Date(Date.now() - 7*24*60*60*1000);
    const weeklyCount = accesses.filter(a => new Date(a.ts) >= weekAgo).length;

    // month: last 30 days
    const monthAgo = new Date(Date.now() - 30*24*60*60*1000);
    const monthlyCount = accesses.filter(a => new Date(a.ts) >= monthAgo).length;

    qs('#stat-access-daily').textContent = String(dailyCount);
    qs('#stat-access-weekly').textContent = String(weeklyCount);
    qs('#stat-access-monthly').textContent = String(monthlyCount);

    // active users (unique userIds in accesses within last 24h)
    const dayAgo = new Date(Date.now() - 24*60*60*1000);
    const activeUserIds = new Set(accesses.filter(a=> new Date(a.ts) >= dayAgo).map(a=> a.userId || 'guest'));
    qs('#stat-active-users').textContent = String(activeUserIds.size);

    // Top books / manuals by downloads & reads
    const downloadCounts = {};
    (metrics.downloads || []).forEach(d => { if(!d.manualId) return; downloadCounts[d.manualId] = (downloadCounts[d.manualId]||0) + 1; });
    const readCounts = {};
    (metrics.reads || []).forEach(r => { readCounts[r.bookId] = (readCounts[r.bookId]||0) + 1; });
    // build combined ranking
    const combined = {};
    Object.keys(downloadCounts).forEach(k => combined[k] = (combined[k]||0) + downloadCounts[k] * 1);
    Object.keys(readCounts).forEach(k => combined[k] = (combined[k]||0) + readCounts[k] * 1.3);
    const ranked = Object.keys(combined).sort((a,b)=> combined[b]-combined[a]).slice(0,6);
    const topBooksEl = qs('#stat-top-books');
    if(ranked.length){
      const lines = ranked.map(id => {
        const manual = MANUALS && findManualById(id);
        const title = manual ? manual.title : id;
        const downloads = downloadCounts[id] || 0;
        const reads = readCounts[id] || 0;
        return `${title} · D:${downloads} R:${reads}`;
      });
      topBooksEl.textContent = lines.join('\n');
    } else {
      topBooksEl.textContent = 'Nenhum livro ainda.';
    }

    // attempts by date chart (use metrics.attemptsByDate if present else derive from accesses)
    const attemptsMap = metrics.attemptsByDate && Object.assign({}, metrics.attemptsByDate);
    if(!attemptsMap || Object.keys(attemptsMap).length === 0){
      // derive from accesses: counts per day for last 30 days
      (accesses || []).forEach(a => { const d = a.ts.slice(0,10); attemptsMap[d] = (attemptsMap[d] || 0) + 1; });
    }
    renderAttemptsChart(attemptsMap);

    // top searches
    const searchCounts = {};
    (metrics.searches || []).slice(0,500).forEach(s => {
      const q = (s.query || '').toLowerCase();
      if(!q) return;
      searchCounts[q] = (searchCounts[q]||0) + 1;
    });
    const searchRank = Object.keys(searchCounts).sort((a,b)=> searchCounts[b]-searchCounts[a]).slice(0,10);
    const topSearchesEl = qs('#admin-top-searches');
    topSearchesEl.innerHTML = '';
    if(!searchRank.length) topSearchesEl.textContent = 'Sem pesquisas registadas.';
    else {
      searchRank.forEach(k => {
        const div = document.createElement('div');
        div.style.padding = '6px 0';
        div.style.borderBottom = '1px dashed #eee';
        div.textContent = `${k} · ${searchCounts[k]}x`;
        topSearchesEl.appendChild(div);
      });
    }

    // average read time and completion
    const reads = metrics.reads || [];
    if(reads.length){
      const avgDuration = Math.round((reads.reduce((s,r)=> s + (r.durationSeconds||0),0) / reads.length) / 60); // minutes
      const avgCompletionPercent = Math.round(reads.reduce((s,r)=> s + (r.percentRead||0),0) / reads.length);
      qs('#admin-avg-read-time').textContent = `${avgDuration} min`;
      qs('#admin-avg-completion').textContent = `${avgCompletionPercent}%`;
    } else {
      qs('#admin-avg-read-time').textContent = '—';
      qs('#admin-avg-completion').textContent = '—';
    }

    // recent logins
    const recentLoginsEl = qs('#admin-recent-logins');
    recentLoginsEl.innerHTML = '';
    (metrics.logins || []).slice(0,20).forEach(l => {
      const d = document.createElement('div');
      d.style.padding = '6px 0';
      d.style.borderBottom = '1px dashed #eee';
      d.innerHTML = `<div style="font-weight:700">${l.userId}</div><div style="font-size:0.9rem;color:#444">${(l.city? l.city + ', ' : '') + (l.region? l.region + ', ' : '') + (l.country? l.country : '')} · ${l.ip || '—'}</div><div style="font-size:0.85rem;color:#666">${new Date(l.ts).toLocaleString()}</div>`;
      recentLoginsEl.appendChild(d);
    });

    // sessions list
    const sessionsList = qs('#admin-sessions-list');
    sessionsList.innerHTML = '';
    (metrics.sessions || []).slice(0,40).forEach(s=>{
      const row = document.createElement('div');
      row.style.padding = '6px 0';
      row.style.borderBottom = '1px dashed #eee';
      row.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;"><div><div style="font-weight:700">${s.userId}</div><div style="font-size:0.9rem;color:#444">${s.city? s.city + ', ' + s.country : (s.ip || '—')}</div><div style="font-size:0.85rem;color:#666">${new Date(s.startedAt).toLocaleString()}</div></div><div style="text-align:right"><div style="font-size:0.85rem;color:${s.suspicious? '#c0392b' : '#0b845e'}">${s.suspicious? 'Suspeita' : 'Ativa'}</div><button class="action-btn admin-end-session" data-session="${s.sessionId}" style="margin-top:6px;background:#c0392b;padding:6px 8px">Encerrar</button></div></div>`;
      sessionsList.appendChild(row);
    });

    // last IP info
    const lastLogin = (metrics.logins && metrics.logins[0]) || null;
    const lastIpEl = qs('#admin-last-ip');
    if(lastLogin){
      lastIpEl.textContent = `${lastLogin.ip || '—'} — ${lastLogin.city || ''} ${lastLogin.region || ''} ${lastLogin.country || ''} · ${new Date(lastLogin.ts).toLocaleString()}`;
    } else {
      lastIpEl.textContent = 'Nenhum login registado.';
    }

  }catch(e){
    console.error('Erro ao renderizar métricas admin', e);
  }
}

// simple canvas chart for attempts by date (last 30 days)
function renderAttemptsChart(attemptsMap){
  try{
    const canvas = qs('#chart-attempts');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    // build last 30 days labels & values
    const days = [];
    const vals = [];
    for(let i=29;i>=0;i--){
      const d = new Date(Date.now() - i*24*60*60*1000);
      const k = d.toISOString().slice(0,10);
      days.push(k);
      vals.push(Number(attemptsMap[k] || 0));
    }
    // clear
    ctx.clearRect(0,0,canvas.width, canvas.height);
    // responsive scale
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    // determine max
    const max = Math.max(5, ...vals);
    // draw grid lines
    ctx.strokeStyle = '#e9eef4';
    ctx.lineWidth = 1;
    for(let i=0;i<=4;i++){
      const y = (h / 4) * i;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    // draw polyline
    ctx.beginPath();
    const padLeft = 28, padRight = 8, padTop = 12, padBottom = 24;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;
    vals.forEach((v,i)=>{
      const x = padLeft + (i / (vals.length - 1 || 1)) * plotW;
      const y = padTop + (1 - (v / max)) * plotH;
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.strokeStyle = '#0A66FF';
    ctx.lineWidth = 2;
    ctx.stroke();

    // fill area gradient
    const grad = ctx.createLinearGradient(0, padTop, 0, padTop + plotH);
    grad.addColorStop(0, 'rgba(10,102,255,0.18)');
    grad.addColorStop(1, 'rgba(10,102,255,0.02)');
    ctx.lineTo(padLeft + plotW, padTop + plotH);
    ctx.lineTo(padLeft, padTop + plotH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // draw simple x labels for first, mid and last
    ctx.fillStyle = '#223';
    ctx.font = '11px Arial';
    ctx.fillText(days[0], padLeft, h - 6);
    ctx.fillText(days[Math.floor(days.length/2)], padLeft + plotW/2 - 30, h - 6);
    ctx.fillText(days[days.length-1], padLeft + plotW - 70, h - 6);

  }catch(e){
    console.error('Erro ao desenhar chart', e);
  }
}

// attach click handler for admin-end-session buttons via delegation
document.addEventListener('click', (ev)=>{
  const btn = ev.target.closest('.admin-end-session');
  if(!btn) return;
  const sid = btn.dataset.session;
  if(!sid) return;
  if(!confirm('Encerrar sessão selecionada?')) return;
  const ok = endSession(sid);
  if(ok){ alert('Sessão encerrada.'); renderAdminMetrics(); } else { alert('Não foi possível encerrar sessão.'); }
});

// button to end suspicious sessions (ends first suspicious or last session)
safeAdd('#admin-end-suspicious', ()=> {
  const m = loadMetrics();
  const suspicious = (m.sessions || []).find(s=> s.suspicious);
  const target = suspicious || (m.sessions && m.sessions[0]);
  if(!target) return alert('Nenhuma sessão ativa encontrada.');
  if(!confirm(`Encerrar sessão de ${target.userId} (${target.ip || '—'})?`)) return;
  const ok = endSession(target.sessionId);
  if(ok){ alert('Sessão encerrada.'); renderAdminMetrics(); } else alert('Falha ao encerrar sessão.');
});

// ensure admin metrics render when admin panel opens and on refresh events
window.addEventListener('impcv_feedback_submitted', ()=> renderAdminMetrics());
window.addEventListener('medg_level1_completed', ()=> renderAdminMetrics());
window.addEventListener('medg_level2_completed', ()=> renderAdminMetrics());
window.addEventListener('medg_level3_completed', ()=> renderAdminMetrics());
window.addEventListener('impcv_session_created', ()=> renderAdminMetrics());
window.addEventListener('impcv_access_recorded', ()=> renderAdminMetrics());
window.addEventListener('impcv_search_recorded', ()=> renderAdminMetrics());
window.addEventListener('impcv_download_recorded', ()=> renderAdminMetrics());
window.addEventListener('impcv_read_recorded', ()=> renderAdminMetrics());
window.addEventListener('impcv_login_recorded', ()=> renderAdminMetrics());

// initial call when admin panel shown (also call when adminRefresh clicked)
safeAdd('#admin-refresh', ()=> { renderAdminMetrics(); });

// when admin panel shown (existing show('admin') is used), ensure metrics render
// We can't change show('admin') caller everywhere; instead observe DOM visibility change: render when admin panel is displayed
const adminPanelObserver = new MutationObserver(()=> {
  const admin = qs('#admin-panel');
  if(admin && admin.style && admin.style.display !== 'none') renderAdminMetrics();
});
const admRoot = qs('#admin-panel');
if(admRoot) adminPanelObserver.observe(admRoot, { attributes:true, attributeFilter:['style'] });

// create session id immediately for this browser
getOrCreateSession();

/* --- END: Admin metrics rendering --- */

/* add export binding but ensure the top-level export button is hidden by default and remains functional if re-enabled */
qs('#export-pdf-btn').style.display = 'none';

// Insert new manual "Manual_PAV_finalissima" if not present
if(!MANUALS.find(m => m.id === 'manual_pav_finalissima' || (m.title && m.title.toLowerCase().includes('manual_pav_finalissima')))){
  MANUALS.push({
    id: 'manual_pav_finalissima',
    title: 'Manual_PAV_finalissima',
    course: 'TMP/SM',
    url: 'https://drive.google.com/file/d/1lolHoMdN5dO_nqZe2JFVKq1zoz-uRexS/view?usp=drive_link'
  });
}

// Insert new manual "manual_redes" (CV5 Administração de Gestão de Redes) if not present
if(!MANUALS.find(m => m.id === 'manual_redes' || (m.title && /manual[_\s]?redes/i.test(m.title)))){
  MANUALS.push({
    id: 'manual_redes',
    title: 'Manual_Redes - Gestão de Redes',
    course: 'Gestão de Redes',
    url: 'https://drive.google.com/file/d/1IoHJ5uGozXNvxrprGJKfyHz59ALLJUTW/view?usp=drive_link'
  });
}

// Add Informatica Basica manual as requested
if(!MANUALS.find(m => m.id === 'manual_informatica_basica' || (m.title && /informatica basica/i.test(m.title)))){
  MANUALS.push({
    id: 'manual_informatica_basica',
    title: 'Manual — Informatica Basica',
    course: 'Informática',
    url: 'https://drive.google.com/file/d/17FoLOv8WL3n37tGrjRN7UgyOvFTbXlbS/view?usp=drive_link'
  });
}

/* Detect embedded Biblioteca iframe load failures and fallback to opening in a new tab.
   Some sites block embedding via X-Frame-Options or CSP; this observer watches for the
   modal iframe and, if cross-origin access is blocked or the iframe fails to load, opens
   the portal URL in a new tab and removes the modal to keep the user inside the app. */
(function(){
  // only run in pages where the top-menu handler may have created the biblioteca-modal
  const observer = new MutationObserver((mutations) => {
    for(const m of mutations){
      for(const node of Array.from(m.addedNodes || [])){
        try{
          if(node && node.id === 'biblioteca-modal'){
            const iframe = node.querySelector('iframe');
            if(!iframe) return;
            // if iframe errors or appears cross-origin blocked, fallback after timeout
            let handled = false;
            const cleanup = () => {
              handled = true;
              try{ const el = document.getElementById('biblioteca-modal'); if(el) el.remove(); }catch(e){}
            };
            // on iframe load try-check access; if access throws (cross-origin) assume blocked
            iframe.addEventListener('load', () => {
              try{
                // trying to read location.href will throw for cross-origin if blocked
                const href = iframe.contentWindow && iframe.contentWindow.location && iframe.contentWindow.location.href;
                // if we successfully read an href and it's not the intended URL (still about:blank) wait a bit
                if(typeof href === 'string' && href !== 'about:blank'){
                  // looks like load succeeded in a way we can use
                  return;
                }
              }catch(err){
                // cross-origin access blocked — fallback
              }
              // schedule fallback if we didn't bail out above
              if(!handled){
                // open in new tab as fallback
                const url = window.BIB_URL || iframe.src || '';
                try{
                  const w = window.open(url, '_blank');
                  if(!w) {
                    // If popup blocked, navigate current tab as last resort
                    window.location.href = url;
                  }
                }catch(e){
                  window.location.href = url;
                }
                cleanup();
              }
            }, { once: true });

            // also set a timeout in case the iframe never fires load (network/CSP denial)
            const t = setTimeout(() => {
              if(handled) return;
              // if iframe still has about:blank or didn't render content, fallback
              try{
                // attempt to detect visible content by checking iframe.offsetHeight (may be 0)
                if(!iframe.contentWindow) throw new Error('no contentWindow');
                // try to sniff if iframe is same-origin and has a document
                try {
                  const doc = iframe.contentWindow.document;
                  if(doc && (doc.body && doc.body.childElementCount > 0)) {
                    // seems to have content — do nothing
                    clearTimeout(t);
                    return;
                  }
                }catch(e){
                  // cross-origin access thrown — fallback
                }
              }catch(e){
                // fallback to open in new tab
              }
              if(!handled){
                const url = window.BIB_URL || iframe.src || '';
                try{
                  const w = window.open(url, '_blank');
                  if(!w) window.location.href = url;
                }catch(e){
                  window.location.href = url;
                }
                cleanup();
              }
            }, 1400);
            return;
          }
        }catch(err){
          // ignore DOM traversal errors
        }
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();

/* Study popup: toggle and open links (videos / audios / online resources) */
(function studyPopupInit(){
  const studyBtn = document.getElementById('study-btn');
  const studyPopup = document.getElementById('study-popup');
  const studyClose = document.getElementById('study-close');
  const studyStatus = document.getElementById('study-status');
  const studyCourseSelect = document.getElementById('study-course-select');
  const studyResourcesWrap = document.getElementById('study-resources-wrap');

  if(!studyBtn || !studyPopup) return;

  // Define a catalog of study resources grouped by course.
  // This can be extended or replaced with dynamic data; keep IDs stable for easier future updates.
  const STUDY_CATALOG = {
    "CV5 em Medicina Geral": {
      videos: [
        { title: "Aula: Semiologia — YouTube", href: "https://www.youtube.com/watch?v=VIDEO_ID_1" },
        { title: "Palestra de Ovo Cru — YouTube", href: "https://youtu.be/RFy0BAOGfFQ?si=LxNSaci3vhxCqvvL" }
      ],
      audios: [
        { title: "Podcast: Condutas Clínicas", href: "https://example.com/podcast1.mp3" }
      ],
      links: [
        { title: "PubMed / NCBI", href: "https://www.ncbi.nlm.nih.gov" },
        { title: "Google Scholar", href: "https://scholar.google.com" }
      ]
    },
    "CV5 em Técnicas de Laboratórios de Análises Clínicas": {
      videos: [
        { title: "Procedimentos de Coleta — Video", href: "https://www.youtube.com/watch?v=VIDEO_ID_2" }
      ],
      audios: [
        { title: "Áudio: Interpretação de Exames", href: "https://example.com/podcast2.mp3" }
      ],
      links: [
        { title: "Guia MV1 (VM1)", href: "https://drive.google.com/file/d/1l60aCLTnDiCQ6P0bdBGh_QnMsuC2BQXi/view?usp=drivesdk" },
        { title: "MV3-2 — Módulo MV3-2", href: "https://drive.google.com/file/d/1B1ziTy5hpzSaKt2Dv0KsXf8qVvZg3KWY/view?usp=drive_link" }
      ]
    },
    "Geral": {
      videos: [
        { title: "Canal IMPCV — YouTube", href: "https://www.youtube.com/@impcv-2025" }
      ],
      audios: [],
      links: [
        { title: "Google Scholar", href: "https://scholar.google.com" },
        { title: "PubMed / NCBI", href: "https://www.ncbi.nlm.nih.gov" }
      ]
    }
  };

  // Populate course selector from catalog + also add unique courses pulled from MANUALS if present
  function populateCourseOptions(){
    const seen = new Set();
    // add catalog keys first
    Object.keys(STUDY_CATALOG).forEach(k => {
      if(!seen.has(k)){
        const opt = document.createElement('option'); opt.value = k; opt.textContent = k; studyCourseSelect.appendChild(opt); seen.add(k);
      }
    });
    // also add courses inferred from MANUALS array (keeps selection consistent with available manuals)
    try{
      (MANUALS || []).forEach(m => {
        const c = (m.course || 'Geral').trim();
        if(c && !seen.has(c)){
          const opt = document.createElement('option'); opt.value = c; opt.textContent = c; studyCourseSelect.appendChild(opt); seen.add(c);
        }
      });
    }catch(e){}
  }

  function renderResourcesFor(course){
    studyResourcesWrap.innerHTML = '';
    const key = (course && course.length) ? course : '';
    // prefer explicit catalog entry when available, else attempt to show manuals/links for that course
    if(key && STUDY_CATALOG[key]){
      const group = STUDY_CATALOG[key];
      if(group.videos && group.videos.length){
        const vcard = document.createElement('div');
        vcard.innerHTML = `<strong>Vídeos — ${key}</strong>`;
        const list = document.createElement('div'); list.style.display='flex'; list.style.flexDirection='column'; list.style.gap='6px'; list.style.marginTop='8px';
        group.videos.forEach(v => {
          const b = document.createElement('a'); b.className='action-btn'; b.style.display='inline-block'; b.href = v.href; b.target = '_blank'; b.rel='noopener'; b.textContent = `📺 ${v.title}`;
          list.appendChild(b);
        });
        vcard.appendChild(list);
        studyResourcesWrap.appendChild(vcard);
      }
      if(group.audios && group.audios.length){
        const acard = document.createElement('div');
        acard.innerHTML = `<strong>Áudios / Podcasts — ${key}</strong>`;
        const list = document.createElement('div'); list.style.display='flex'; list.style.flexDirection='column'; list.style.gap='6px'; list.style.marginTop='8px';
        group.audios.forEach(a => {
          const b = document.createElement('a'); b.className='action-btn'; b.style.display='inline-block'; b.href = a.href; b.target = '_blank'; b.rel='noopener'; b.textContent = `🔊 ${a.title}`;
          list.appendChild(b);
        });
        acard.appendChild(list);
        studyResourcesWrap.appendChild(acard);
      }
      if(group.links && group.links.length){
        const lcard = document.createElement('div');
        lcard.innerHTML = `<strong>Recursos Online — ${key}</strong>`;
        const list = document.createElement('div'); list.style.display='flex'; list.style.flexDirection='column'; list.style.gap='6px'; list.style.marginTop='8px';
        group.links.forEach(l => {
          const b = document.createElement('a'); b.className='action-btn'; b.style.display='inline-block'; b.href = l.href; b.target = '_blank'; b.rel='noopener'; b.textContent = `🔗 ${l.title}`;
          list.appendChild(b);
        });
        lcard.appendChild(list);
        studyResourcesWrap.appendChild(lcard);
      }
      return;
    }

    // fallback: if no explicit catalog entry, derive a list from MANUALS and general links
    const any = document.createElement('div');
    any.innerHTML = `<strong>Recursos — ${course || 'Todos os Cursos'}</strong>`;
    const list = document.createElement('div'); list.style.display='flex'; list.style.flexDirection='column'; list.style.gap='6px'; list.style.marginTop='8px';

    // include manuals that match the course
    try{
      const byCourse = (MANUALS || []).filter(m => {
        if(!course) return true;
        return (m.course || '').toLowerCase() === course.toLowerCase();
      }).slice(0,8);
      if(byCourse.length){
        byCourse.forEach(m => {
          const b = document.createElement('a');
          b.className = 'action-btn';
          b.style.display='inline-block';
          b.href = m.url || '#';
          b.target = '_blank';
          b.rel = 'noopener';
          b.textContent = `📘 ${m.title}`;
          list.appendChild(b);
        });
      } else {
        const msg = document.createElement('div'); msg.style.color='#666'; msg.textContent = 'Nenhum manual encontrado para este curso.';
        list.appendChild(msg);
      }
    }catch(e){
      const err = document.createElement('div'); err.style.color='#c0392b'; err.textContent = 'Erro ao carregar manuais.';
      list.appendChild(err);
    }

    // always provide general useful links
    const extras = [
      { title: 'Google Scholar', href: 'https://scholar.google.com' },
      { title: 'PubMed / NCBI', href: 'https://www.ncbi.nlm.nih.gov' }
    ];
    extras.forEach(l => {
      const b = document.createElement('a'); b.className='action-btn'; b.style.display='inline-block'; b.href = l.href; b.target = '_blank'; b.rel='noopener'; b.textContent = `🔎 ${l.title}`;
      list.appendChild(b);
    });

    any.appendChild(list);
    studyResourcesWrap.appendChild(any);
  }

  function setExpanded(val){
    studyBtn.setAttribute('aria-expanded', String(!!val));
    studyPopup.setAttribute('aria-hidden', String(!val));
    studyPopup.style.display = val ? 'block' : 'none';
    if(val){
      // focus selector or first actionable control
      setTimeout(()=> {
        if(studyCourseSelect) studyCourseSelect.focus();
        const first = studyPopup.querySelector('.action-btn');
        if(first) first.focus();
      }, 60);
    }
  }

  studyBtn.addEventListener('click', (ev)=>{
    const expanded = studyBtn.getAttribute('aria-expanded') === 'true';
    setExpanded(!expanded);
  });

  studyClose && studyClose.addEventListener('click', ()=> setExpanded(false));

  // populate options and initial render
  populateCourseOptions();
  renderResourcesFor(''); // show all / default

  // when course changes, render appropriate resources
  studyCourseSelect && studyCourseSelect.addEventListener('change', (ev)=>{
    const sel = ev.target.value;
    renderResourcesFor(sel);
  });

  // delegate open handlers for study links (keeps previous .study-open behaviour working if present)
  studyResourcesWrap.addEventListener('click', (ev)=>{
    const a = ev.target.closest('a');
    if(!a) return;
    const href = a.href;
    if(!href) return;
    try{
      const w = window.open(href, '_blank');
      if(!w) window.location.href = href;
      if(studyStatus){
        studyStatus.style.display = 'block';
        studyStatus.style.color = '#0b845e';
        studyStatus.textContent = 'Abrindo recurso em nova aba...';
        setTimeout(()=> { studyStatus.style.display = 'none'; }, 1200);
      }
    }catch(e){
      window.location.href = href;
    }
  });

  // close when clicking outside the popup
  document.addEventListener('click', (ev)=>{
    if(studyPopup.style.display === 'none') return;
    if(!studyPopup.contains(ev.target) && ev.target !== studyBtn){
      setExpanded(false);
    }
  });

  // close on Escape
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && studyPopup.style.display !== 'none'){
      setExpanded(false);
    }
  });
})();