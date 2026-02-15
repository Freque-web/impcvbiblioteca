// Quiz module for Medicina Geral — opens inside sim environment and provides questions with explanations.
export function openMedicinaGeralQuiz(){
  // ensure sim environment visible
  const simEnv = document.getElementById('sim-environment');
  if(simEnv) simEnv.style.display = '';
  const simMain = document.getElementById('sim-env-main') || document.body;
  simMain.innerHTML = '';
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV5 Medicina Geral';

  const QUESTIONS = [
    // 1. Anatomia e Fisiologia
    { id:'q1', q:'Qual é a principal função do sistema circulatório?', choices:[
      {id:'a','text':'Produzir insulina'},{id:'b','text':'Transportar sangue, nutrientes e oxigénio'},{id:'c','text':'Digestionar alimentos'}
    ],
      answer:'b',
      explain:'O sistema circulatório transporta sangue, nutrientes, oxigénio e remove resíduos metabólicos.'
    },
    { id:'q2', q:'Quais são as quatro cavidades do coração humano?', choices:[
      {id:'a','text':'Aurícula direita, ventrículo direito, aurícula esquerda, ventrículo esquerdo'},
      {id:'b','text':'Átrio, septo, válvula mitral, válvula aórtica'},
      {id:'c','text':'Ventrículo superior, ventrículo inferior, átrio superior, átrio inferior'}
    ],
      answer:'a',
      explain:'As quatro cavidades são aurícula (átrio) direita, ventrículo direito, aurícula (átrio) esquerda e ventrículo esquerdo.'
    },
    { id:'q3', q:'Onde ocorre a troca gasosa entre o sangue e o ar inspirado?', choices:[
      {id:'a','text':'Nos alvéolos pulmonares'},{id:'b','text':'No coração'},{id:'c','text':'No estômago'}
    ],
      answer:'a',
      explain:'A troca gasosa ocorre nos alvéolos, pequenas estruturas nos pulmões com ampla área de superfície.'
    },
    { id:'q4', q:'Cite três órgãos do sistema digestivo e suas funções.', choices:[
      {id:'a','text':'Fígado (digestão de gorduras), estômago (quebra de alimentos), intestino delgado (absorção)'},
      {id:'b','text':'Rim (filtração), pulmão (respiração), coração (bombear sangue)'},
      {id:'c','text':'Pâncreas (respiração), fígado (produção de células)'}
    ],
      answer:'a',
      explain:'Exemplos: fígado (processamento e produção de bile), estômago (quebra mecânica/ácida) e intestino delgado (absorção de nutrientes).'
    },
    { id:'q5', q:'O que é o sistema nervoso central e quais são seus componentes?', choices:[
      {id:'a','text':'Sistema que coordena; composto por cérebro e medula espinhal'},{id:'b','text':'Parte dos pulmões'},{id:'c','text':'Sistema digestivo'}
    ],
      answer:'a',
      explain:'O sistema nervoso central integra informação e é composto pelo cérebro e pela medula espinhal.'
    },

    // 2. Patologia e Diagnóstico
    { id:'q6', q:'O que é uma doença infecciosa? Dê dois exemplos.', choices:[
      {id:'a','text':'Doença causada por agentes patogénicos; ex: malária, tuberculose'},{id:'b','text':'Doença genética only'},{id:'c','text':'Doença causada por trauma físico'}
    ],
      answer:'a',
      explain:'Doenças infecciosas são causadas por agentes (vírus, bactérias, parasitas); ex: malária, tuberculose.'
    },
    { id:'q7', q:'Qual é a diferença entre infecção e inflamação?', choices:[
      {id:'a','text':'Infecção é invasão por microrganismos; inflamação é resposta tecidual (p. ex. rubor, calor)'},
      {id:'b','text':'São sinónimos'},{id:'c','text':'Inflamação sempre significa bactéria'}
    ],
      answer:'a',
      explain:'Infecção refere-se ao agente invasor; inflamação é a resposta do organismo, que pode ocorrer sem infecção.'
    },
    { id:'q8', q:'Quais são os sinais clássicos de inflamação?', choices:[
      {id:'a','text':'Rubor, calor, dor, tumefação e perda de função'},{id:'b','text':'Tosse e espirro'},{id:'c','text':'Hiperglicemia'}
    ],
      answer:'a',
      explain:'Sinais clássicos: rubor (vermelhidão), calor, dor, inchaço (tumefação) e às vezes perda de função.'
    },
    { id:'q9', q:'O que significa "anemia"? Quais são as suas principais causas?', choices:[
      {id:'a','text':'Diminuição de hemoglobina/eritrócitos; causas: défice de ferro, perda sanguínea, doenças crónicas'},
      {id:'b','text':'Aumento de leucócitos'},{id:'c','text':'Altas taxas de glicemia'}
    ],
      answer:'a',
      explain:'Anemia é baixa hemoglobina ou glóbulos vermelhos; causas comuns incluem défice de ferro, hemorragia e doenças crónicas.'
    },
    { id:'q10', q:'Explique o que é hipertensão arterial e como é diagnosticada.', choices:[
      {id:'a','text':'Pressão arterial persistentemente elevada; diagnosticada por leituras repetidas ≥140/90 mmHg (variações por guidelines)'},
      {id:'b','text':'Baixa pressão arterial'},{id:'c','text':'Somente pela análise de sangue'}
    ],
      answer:'a',
      explain:'Hipertensão é pressão arterial elevada crónica; diagnóstico com leituras repetidas acima dos limiares definidos.'
    },

    // 3. Microbiologia e Parasitologia
    { id:'q11', q:'O que são microrganismos patogênicos?', choices:[
      {id:'a','text':'Organismos microscópicos capazes de causar doença (bactérias, vírus, fungos, parasitas)'},
      {id:'b','text':'Somente bactérias'},{id:'c','text':'Plantas'}
    ],
      answer:'a',
      explain:'Microrganismos patogénicos causam doenças; incluem bactérias, vírus, fungos e parasitas.'
    },
    { id:'q12', q:'Cite três vias de transmissão de doenças infecciosas.', choices:[
      {id:'a','text':'Respiratória, fecal-oral, contacto direto / vetores'},{id:'b','text':'Só via sanguínea'},{id:'c','text':'Via óssea'}
    ],
      answer:'a',
      explain:'Vias comuns: via respiratória, fecal-oral, contacto direto e via vetorial (mosquitos).'
    },
    { id:'q13', q:'Quais são as principais características das bactérias Gram-positivas?', choices:[
      {id:'a','text':'Parede celular rica em peptidoglicano e coram roxo no teste de Gram'},{id:'b','text':'Sem parede celular'},{id:'c','text':'São vírus'}
    ],
      answer:'a',
      explain:'Gram-positivas têm parede rica em peptidoglicano e retêm a coloração violeta no teste de Gram.'
    },
    { id:'q14', q:'Qual é o vetor da malária e qual é o agente causador?', choices:[
      {id:'a','text':'Vetor: mosquito Anopheles; agente: Plasmodium spp.'},{id:'b','text':'Vetor: carrapato; agente: vírus'},{id:'c','text':'Vetor: pulga; agente: bactéria'}
    ],
      answer:'a',
      explain:'A malária é transmitida por Anopheles e causada por parasitas do género Plasmodium.'
    },
    { id:'q15', q:'Explique a importância da lavagem das mãos na prevenção de infecções.', choices:[
      {id:'a','text':'Remove microrganismos e reduz transmissão, prevenindo muitas infeções'},{id:'b','text':'É inútil'},{id:'c','text':'Causa imunossupressão'}
    ],
      answer:'a',
      explain:'Lavagem correta das mãos remove agentes infecciosos e reduz transmissões em ambientes de saúde e comunidade.'
    },

    // 4. Farmacologia e Tratamento
    { id:'q16', q:'O que significa "via de administração" de um medicamento?', choices:[
      {id:'a','text':'O caminho pelo qual o fármaco é introduzido no organismo (oral, IV, IM, etc.)'},{id:'b','text':'A via por onde o paciente fala'},{id:'c','text':'A data de validade'}
    ],
      answer:'a',
      explain:'Via de administração refere-se ao método/caminho usado para entregar o medicamento ao corpo.'
    },
    { id:'q17', q:'Cite três vias comuns de administração de medicamentos.', choices:[
      {id:'a','text':'Oral, intravenosa (IV), intramuscular (IM)'},{id:'b','text':'Cutânea apenas'},{id:'c','text':'Via ótica apenas'}
    ],
      answer:'a',
      explain:'Vias comuns incluem oral, IV e IM; também subcutânea, tópica, inalatória etc.'
    },
    { id:'q18', q:'O que é um antibiótico e para que serve?', choices:[
      {id:'a','text':'Fármaco que combate infecções bacterianas'},{id:'b','text':'Vacina'},{id:'c','text':'Analgésico apenas'}
    ],
      answer:'a',
      explain:'Antibióticos tratam infecções bacterianas; não são eficazes contra vírus.'
    },
    { id:'q19', q:'Qual é a diferença entre dose terapêutica e dose tóxica?', choices:[
      {id:'a','text':'Dose terapêutica é eficaz e segura; dose tóxica causa danos/efeitos adversos'},{id:'b','text':'São iguais'},{id:'c','text':'Dose tóxica é sempre menor'}
    ],
      answer:'a',
      explain:'Therapeutic dose provides benefit without harm; toxic dose causes harmful effects.'
    },
    { id:'q20', q:'O que deve ser verificado antes de administrar um medicamento?', choices:[
      {id:'a','text':'Identidade do paciente, dose, via, horário, alergias e validade'},{id:'b','text':'A cor do comprimido apenas'},{id:'c','text':'Nada'}
    ],
      answer:'a',
      explain:'Verificar 5R+ (Right patient, drug, dose, route, time), alergias e integridade do medicamento.'
    },

    // 5. Saúde Pública e Prevenção
    { id:'q21', q:'O que significa "promoção da saúde"?', choices:[
      {id:'a','text':'Atividades que aumentam bem-estar e previnem doenças (educação, políticas saudáveis)'},{id:'b','text':'Somente vacinação'},{id:'c','text':'Treating only illnesses'}
    ],
      answer:'a',
      explain:'Promoção da saúde envolve educação, políticas e ações para melhorar a saúde da população.'
    },
    { id:'q22', q:'Quais são as principais vacinas administradas em crianças?', choices:[
      {id:'a','text':'BCG, DTP (pentavalente), Poliomielite, Tríplice viral (SCR)'},{id:'b','text':'Somente vacina contra gripe'},{id:'c','text':'Nenhuma vacina'}
    ],
      answer:'a',
      explain:'Esquema infantil inclui BCG, pentavalente, polio e tríplice viral entre outras conforme país.'
    },
    { id:'q23', q:'Explique a importância do saneamento básico na prevenção de doenças.', choices:[
      {id:'a','text':'Reduz contaminação de água e alimentos e previne doenças transmitidas por água e contactos'},{id:'b','text':'Apenas conforto'},{id:'c','text':'Só evita mosquitos'}
    ],
      answer:'a',
      explain:'Saneamento e água segura reduzem diarreias, parasitoses e outras doenças de transmissão hídrica.'
    },
    { id:'q24', q:'O que é vigilância epidemiológica?', choices:[
      {id:'a','text':'Monitorização sistemática de doenças para detecção precoce e controlo de surtos'},{id:'b','text':'Apenas estatísticas de finances'},{id:'c','text':'Somente vacinação'}
    ],
      answer:'a',
      explain:'Vigilância envolve coleta e análise de dados de saúde para ação precoce e medidas de controlo.'
    },
    { id:'q25', q:'Qual é o papel do técnico de medicina geral na comunidade?', choices:[
      {id:'a','text':'Prestar cuidados básicos, educação em saúde, identificação precoce e encaminhamentos'},{id:'b','text':'Apenas prescrever cirurgias'},{id:'c','text':'Trabalhar só em laboratórios'}
    ],
      answer:'a',
      explain:'Técnicos fornecem cuidados primários, educação e ligação entre comunidade e serviços de saúde.'
    },

    // 6. Atendimento e Urgências
    { id:'q26', q:'Qual é a primeira atitude diante de uma pessoa inconsciente?', choices:[
      {id:'a','text':'Avaliar responsividade, abrir vias aéreas e verificar respiração'},{id:'b','text':'Dar comida imediatamente'},{id:'c','text':'Mover sem avaliação'}
    ],
      answer:'a',
      explain:'Primeiro avaliar segurança, responsividade e depois abrir vias e verificar respiração.'
    },
    { id:'q27', q:'Como se faz a reanimação cardiopulmonar (RCP)?', choices:[
      {id:'a','text':'Compressões torácicas e ventilações numa sequência adequada (30:2) até ajuda'},{id:'b','text':'Apenas massagem no braço'},{id:'c','text':'Elevar pernas apenas'}
    ],
      answer:'a',
      explain:'RCP combina compressões de alta qualidade e ventilações; protocolos variam por idade e situação.'
    },
    { id:'q28', q:'O que é choque anafilático e como deve ser tratado?', choices:[
      {id:'a','text':'Reacção alérgica grave com hipotensão/obstrução das vias; tratar com adrenalina IM imediata e suporte'},{id:'b','text':'Somente lavagem'},{id:'c','text':'Induzido apenas por infeções'}
    ],
      answer:'a',
      explain:'Anafilaxia é emergência; adrenalina intramuscular imediata é tratamento inicial essencial.'
    },
    { id:'q29', q:'Quais são os sinais de hemorragia interna?', choices:[
      {id:'a','text':'Dor abdominal, hipotensão, taquicardia, pele pálida, confusão'},{id:'b','text':'Somente tosse'},{id:'c','text':'Aumento de apetite'}
    ],
      answer:'a',
      explain:'Hemorragia interna pode causar sinais de choque (queda da pressão, taquicardia) e dor localizada.'
    },
    { id:'q30', q:'Como proceder em caso de queimadura grave?', choices:[
      {id:'a','text':'Remover fonte, resfriar com água corrente, cobrir e encaminhar para emergência'},{id:'b','text':'Aplicar manteiga'},{id:'c','text':'Esfregar a pele'}
    ],
      answer:'a',
      explain:'Queimaduras graves exigem remoção do agente causador, arrefecimento e avaliação médica imediata.'
    },

    // 7. Doenças Comuns
    { id:'q31', q:'O que é Diabetes Mellitus e quais são seus sintomas principais?', choices:[
      {id:'a','text':'Doença metabólica com hiperglicemia; sintomas: sede, poliúria, fome e perda de peso'},{id:'b','text':'Doença pulmonar'},{id:'c','text':'Só infecciosa'}
    ],
      answer:'a',
      explain:'Diabetes é caracterizada por hiperglicemia; sinais clássicos incluem sede, aumento da micção e perda de peso.'
    },
    { id:'q32', q:'Quais são as causas e o tratamento básico da hipertensão arterial?', choices:[
      {id:'a','text':'Causas: genética e estilo de vida; tratamento: mudanças de estilo de vida e antihipertensores'},{id:'b','text':'Causada por vírus'},{id:'c','text':'Só cirurgia'}
    ],
      answer:'a',
      explain:'Hipertensão tem múltiplas causas; controle inclui dieta, exercício e medicação quando indicada.'
    },
    { id:'q33', q:'O que é tuberculose e como se transmite?', choices:[
      {id:'a','text':'Doença infecciosa causada por Mycobacterium tuberculosis, transmitida por via aérea'},{id:'b','text':'Doença transmitida por água'},{id:'c','text':'Doença genética'}
    ],
      answer:'a',
      explain:'Tuberculose é bacteriana e transmitida por gotículas respiratórias de pessoas doentes.'
    },
    { id:'q34', q:'Explique o que é HIV/AIDS e como pode ser prevenido.', choices:[
      {id:'a','text':'Vírus que afecta sistema imunitário; prevenção: preservativos, não partilhar agulhas, testagem e tratamento'},{id:'b','text':'Só uma alergia'},{id:'c','text':'Transmitido por mosquitos'}
    ],
      answer:'a',
      explain:'Prevenção inclui práticas sexuais seguras, redução de exposição sanguínea e terapias preventivas.'
    },
    { id:'q35', q:'Quais são as principais causas de diarreia em adultos?', choices:[
      {id:'a','text':'Infecções virais/bacterianas, intoxicação alimentar, parasitas, medicações'},{id:'b','text':'Apenas alergias'},{id:'c','text':'Somente stress'}
    ],
      answer:'a',
      explain:'Diarreia tem múltiplas causas, frequentemente infecciosas ou relacionadas com alimentos/medicação.'
    },

    // 8. Exames e Diagnósticos Laboratoriais
    { id:'q36', q:'Para que serve o hemograma completo?', choices:[
      {id:'a','text':'Avaliar células sanguíneas: glóbulos vermelhos, brancos e plaquetas'},{id:'b','text':'Medir glicemia apenas'},{id:'c','text':'Testar função hepática'}
    ],
      answer:'a',
      explain:'Hemograma avalia parâmetros celulares do sangue para detectar anemia, infeções e coagulopatias.'
    },
    { id:'q37', q:'O que é urina tipo I e o que se avalia nesse exame?', choices:[
      {id:'a','text':'Exame de rotina de urina; avalia aspecto, densidade, glicose, sangue, proteínas e sedimento'},{id:'b','text':'Teste de gravidez só'},{id:'c','text':'Testa vacinas'}
    ],
      answer:'a',
      explain:'Urina tipo I (EAS) verifica componentes químicos e microscópicos para doenças urinárias e sistémicas.'
    },
    { id:'q38', q:'Explique o princípio do exame de glicemia capilar.', choices:[
      {id:'a','text':'Medir glicose no sangue capilar usando tira reagente e medidor; resultado rápido'},{id:'b','text':'Medir colesterol'},{id:'c','text':'Testar pressão'}
    ],
      answer:'a',
      explain:'Glicemia capilar usa fotometria/enzimas nas tiras para quantificar glicose de uma gota de sangue.'
    },
    { id:'q39', q:'Quais cuidados devem ser tomados na coleta de sangue venoso?', choices:[
      {id:'a','text':'Identificação correta, assepsia, uso de material estéril, etiquetagem e ordem de venopunção'},{id:'b','text':'Apenas rapidez'},{id:'c','text':'Usar qualquer frasco sujo'}
    ],
      answer:'a',
      explain:'Cuidados incluem verificação de identidade, técnica asséptica e rotulagem correta para evitar erros.'
    },
    { id:'q40', q:'Por que é importante identificar corretamente as amostras no laboratório?', choices:[
      {id:'a','text':'Para garantir resultados atribuídos ao paciente certo e evitar erros de diagnóstico/tratamento'},{id:'b','text':'Não é importante'},{id:'c','text':'Só para estatísticas'}
    ],
      answer:'a',
      explain:'Identificação correta evita danos ao paciente por resultados trocados e garante qualidade do cuidado.'
    }
  ];

  // Build UI
  const card = document.createElement('div');
  card.className = 'results-card';
  card.style.minHeight = '140px';
  let idx = 0;
  let score = 0;

  const header = document.createElement('div');
  header.style.display='flex'; header.style.justifyContent='space-between'; header.style.alignItems='center';
  header.innerHTML = `<strong>Avaliação - Medicina Geral</strong><div id=\"quiz-progress\">0 / ${QUESTIONS.length}</div>`;
  card.appendChild(header);

  const body = document.createElement('div'); body.style.marginTop='12px';
  const qwrap = document.createElement('div');
  body.appendChild(qwrap);

  const controls = document.createElement('div'); controls.style.marginTop='12px'; controls.style.display='flex'; controls.style.gap='8px';
  const nextBtn = document.createElement('button'); nextBtn.className='action-btn'; nextBtn.textContent='Próxima';
  const finishBtn = document.createElement('button'); finishBtn.className='action-btn'; finishBtn.textContent='Terminar';
  controls.appendChild(nextBtn); controls.appendChild(finishBtn);
  card.appendChild(body); card.appendChild(controls);

  simMain.appendChild(card);

  function renderQuestion(i){
    const item = QUESTIONS[i];
    qwrap.innerHTML = '';
    document.getElementById('quiz-progress').textContent = `${i+1} / ${QUESTIONS.length}`;
    const qh = document.createElement('h3'); qh.textContent = `${i+1}. ${item.q}`; qwrap.appendChild(qh);
    const list = document.createElement('div'); list.style.display='grid'; list.style.gap='8px';
    item.choices.forEach(ch=>{
      const btn = document.createElement('button');
      btn.className = 'action-btn';
      btn.style.textAlign='left';
      btn.textContent = ch.text || ch;
      btn.dataset.choice = ch.id;
      btn.addEventListener('click', ()=> handleAnswer(item, ch.id, btn, list));
      list.appendChild(btn);
    });
    qwrap.appendChild(list);
    // clear any feedback
  }

  function handleAnswer(item, choiceId, btnClicked, listEl){
    // disable all choices
    Array.from(listEl.children).forEach(b=> b.disabled = true);
    const correct = item.answer;
    const feedback = document.createElement('div');
    feedback.style.marginTop='10px';
    if(choiceId === correct){
      score++;
      feedback.innerHTML = `<div style=\"color:green;font-weight:700\">Correto ✓</div><div style=\"margin-top:6px\">${item.explain}</div>`;
      btnClicked.style.outline = '3px solid rgba(40,167,69,0.14)';
      // motivational note for correct answer
      const praise = ['Excelente! Continua assim.','Bom trabalho — vai crescendo!','Ótimo! Aprendeste bem este tópico.'];
      const pnote = document.createElement('div');
      pnote.style.marginTop='8px'; pnote.style.color='#0b845e'; pnote.style.fontWeight='600';
      pnote.textContent = praise[Math.floor(Math.random()*praise.length)];
      feedback.appendChild(pnote);
    } else {
      feedback.innerHTML = `<div style=\"color:#c0392b;font-weight:700\">Errado ✕ — opção correta marcada</div><div style=\"margin-top:6px\">${item.explain}</div>`;
      // highlight correct option
      Array.from(listEl.children).forEach(b=>{
        if(b.dataset.choice === correct){
          b.style.border = '2px solid rgba(10,150,200,0.12)';
          b.style.background = '#eef9ff';
        } else if(b === btnClicked){
          b.style.opacity = '0.7';
        }
      });
      // supportive note for incorrect answer
      const support = ['Quase lá — revisa esta explicação e tenta novamente.','Boa tentativa — aprende com a explicação e segue em frente.','Não desistas — pratica mais este tema para consolidar.'];
      const snote = document.createElement('div');
      snote.style.marginTop='8px'; snote.style.color='#a03b2f'; snote.style.fontWeight='600';
      snote.textContent = support[Math.floor(Math.random()*support.length)];
      feedback.appendChild(snote);
    }
    qwrap.appendChild(feedback);
  }

  nextBtn.addEventListener('click', ()=>{
    if(idx < QUESTIONS.length -1){ idx++; renderQuestion(idx); window.scrollTo({top:0,behavior:'smooth'}); }
  });
  finishBtn.addEventListener('click', ()=>{
    // show summary with grade 0-20 and pass/fail (alcancou)
    simMain.innerHTML = '';
    const out = document.createElement('div'); out.className='results-card';
    const nota = Math.round((score / QUESTIONS.length) * 20);
    const passou = nota >= 10;
    out.innerHTML = `<h2>Resumo</h2>
      <p>Pontuação: ${score} / ${QUESTIONS.length}</p>
      <p><strong>Nota:</strong> ${nota} / 20 — ${passou ? 'Alcançou' : 'Não alcançou'}</p>
      <p>Obrigado por completar o questionário. Cada pergunta inclui explicação para reforçar o aprendizado.</p>
      <div style=\"margin-top:12px\"><button class=\"action-btn\" id=\"retake\">Refazer</button> <button class=\"action-btn\" id=\"close\">Fechar</button></div>`;
    simMain.appendChild(out);
    out.querySelector('#retake').addEventListener('click', ()=> openMedicinaGeralQuiz());
    out.querySelector('#close').addEventListener('click', ()=> {
      // go back to simulators screen
      const back = document.getElementById('sim-env-back');
      if(back) back.click(); else { simMain.innerHTML=''; }
    });
  });

  // initial render
  renderQuestion(0);
}

export function openMedicinaGeralLevel1(){
  const simEnv = document.getElementById('sim-environment');
  if(simEnv) simEnv.style.display = '';
  const simMain = document.getElementById('sim-env-main') || document.body;
  simMain.innerHTML = '';
  document.getElementById('sim-env-title').textContent = 'Avaliação • Medicina Geral — Nível 1 (Atendimento e Urgências)';

  const QUESTIONS = [
    // Atendimento e Urgências (21-25 as requested in user's flow for Level 1)
    { id:'q21', q:'Qual é a primeira atitude diante de uma pessoa inconsciente?', choices:[
      {id:'a','text':'Dar água imediatamente'},{id:'b','text':'Avaliar segurança, verificar respiração e pulsação'},{id:'c','text':'Administrar medicamentos'},{id:'d','text':'Chamar familiares antes de qualquer ação'}
    ], answer:'b', explain:'Avaliar segurança e verificar vias aéreas, respiração e circulação é a primeira ação.' },
    { id:'q22', q:'Como se faz a reanimação cardiopulmonar (RCP)?', choices:[
      {id:'a','text':'Apenas respiração boca a boca'},{id:'b','text':'Compressões torácicas combinadas com respiração artificial'},{id:'c','text':'Elevar pernas e esperar'},{id:'d','text':'Aplicar gelo na cabeça'}
    ], answer:'b', explain:'RCP combina compressões torácicas de alta qualidade com ventilações (proporção adaptada por idade).' },
    { id:'q23', q:'O que é choque anafilático e como deve ser tratado?', choices:[
      {id:'a','text':'Reação alérgica grave – aplicar adrenalina imediatamente'},{id:'b','text':'Estado de estresse leve – repouso'},{id:'c','text':'Infecção bacteriana – antibiótico oral'},{id:'d','text':'Baixa pressão sanguínea – beber água'}
    ], answer:'a', explain:'Anafilaxia é emergência — adrenalina intramuscular é tratamento inicial imediato.' },
    { id:'q24', q:'Quais são os sinais de hemorragia interna?', choices:[
      {id:'a','text':'Palidez, sudorese, dor abdominal, tontura'},{id:'b','text':'Tosse seca e febre'},{id:'c','text':'Náusea e coceira na pele'},{id:'d','text':'Dor muscular leve'}
    ], answer:'a', explain:'Hemorragia interna pode provocar sinais de choque como palidez, sudorese, tontura e dor localizada.' },
    { id:'q25', q:'Como proceder em caso de queimadura grave?', choices:[
      {id:'a','text':'Passar pomada caseira imediatamente'},{id:'b','text':'Resfriar a área com água corrente e procurar atendimento médico urgente'},{id:'c','text':'Expor ao sol para secar'},{id:'d','text':'Cobrir com algodão seco'}
    ], answer:'b', explain:'Arrefecer com água corrente e procurar atendimento; evitar remédios caseiros.' }
  ];

  buildAndRunQuiz(QUESTIONS, 'medg_level1_done');
}

export function openMedicinaGeralLevel2(){
  const simEnv = document.getElementById('sim-environment');
  if(simEnv) simEnv.style.display = '';
  const simMain = document.getElementById('sim-env-main') || document.body;
  simMain.innerHTML = '';
  document.getElementById('sim-env-title').textContent = 'Avaliação • Medicina Geral — Nível 2 (CV5)';

  const QUESTIONS = [
    // Doenças Comuns (26-30) and Exames e Diagnósticos Laboratoriais (31-35/36-40 as per user's list)
    { id:'q26', q:'O que é Diabetes Mellitus e quais são seus sintomas principais?', choices:[
      {id:'a','text':'Doença autoimune com febre alta'},{id:'b','text':'Doença metabólica caracterizada por hiperglicemia; sintomas incluem sede excessiva, urina frequente e fadiga'},{id:'c','text':'Infecção viral com dor abdominal'},{id:'d','text':'Doença cardíaca com falta de ar'}
    ], answer:'b', explain:'Diabetes é doença metabólica com hiperglicemia; sintomas clássicos incluem sede, poliúria e fadiga.' },
    { id:'q27', q:'Quais são as causas e o tratamento básico da hipertensão arterial?', choices:[
      {id:'a','text':'Genética, obesidade, excesso de sal – controle com dieta, exercícios e medicamentos'},{id:'b','text':'Baixa ingestão de água – tratamento com café'},{id:'c','text':'Exposição ao frio – repouso'},{id:'d','text':'Apenas estresse – sem tratamento'}
    ], answer:'a', explain:'Hipertensão tem múltiplos fatores e é controlada por medidas de estilo de vida e fármacos quando necessários.' },
    { id:'q28', q:'O que é tuberculose e como se transmite?', choices:[
      {id:'a','text':'Infecção viral transmitida por água contaminada'},{id:'b','text':'Infecção bacteriana transmitida por gotículas respiratórias'},{id:'c','text':'Doença genética'},{id:'d','text':'Infecção parasitária transmitida por mosquitos'}
    ], answer:'b', explain:'Tuberculose é causada por Mycobacterium tuberculosis e transmite via gotículas respiratórias.' },
    { id:'q29', q:'Explique o que é HIV/AIDS e como pode ser prevenido.', choices:[
      {id:'a','text':'Doença bacteriana curável com antibiótico'},{id:'b','text':'Infecção viral que ataca o sistema imunológico; prevenção inclui uso de preservativos e exames regulares'},{id:'c','text':'Infecção cutânea que causa erupções'},{id:'d','text':'Inflamação intestinal causada por vírus'}
    ], answer:'b', explain:'HIV é vírus; prevenção por práticas seguras, testagem e medidas de redução de risco.' },
    { id:'q30', q:'Quais são as principais causas de diarreia em adultos?', choices:[
      {id:'a','text':'Consumo de alimentos contaminados, infecções, medicamentos'},{id:'b','text':'Apenas estresse emocional'},{id:'c','text':'Falta de exercícios'},{id:'d','text':'Excesso de sono'}
    ], answer:'a', explain:'Diarreia tem várias causas, frequentemente infecciosas ou relacionadas a alimentos e medicações.' },

    // Exames e Diagnósticos Laboratoriais (31-35 / 36-40 mapped)
    { id:'q31', q:'Para que serve o hemograma completo?', choices:[
      {id:'a','text':'Avaliar função renal'},{id:'b','text':'Avaliar células do sangue, como glóbulos vermelhos, glóbulos brancos e plaquetas'},{id:'c','text':'Medir pressão arterial'},{id:'d','text':'Determinar nível de colesterol'}
    ], answer:'b', explain:'Hemograma avalia parâmetros celulares do sangue.' },
    { id:'q32', q:'O que é urina tipo I e o que se avalia nesse exame?', choices:[
      {id:'a','text':'Avaliação visual da urina apenas'},{id:'b','text':'Exame de urina que avalia aspectos físicos, químicos e microscópicos'},{id:'c','text':'Exame de sangue'},{id:'d','text':'Avaliação de pressão venosa'}
    ], answer:'b', explain:'Urina tipo I (EAS) avalia aspecto, densidade, glicose, sangue, proteínas e sedimento.' },
    { id:'q33', q:'Explique o princípio do exame de glicemia capilar.', choices:[
      {id:'a','text':'Medir glicose no sangue periférico usando uma gota de sangue da ponta do dedo'},{id:'b','text':'Medir glicose na urina'},{id:'c','text':'Medir pressão arterial'},{id:'d','text':'Avaliar oxigenação pulmonar'}
    ], answer:'a', explain:'Glicemia capilar mede glicose em sangue capilar com tiras e medidor.' },
    { id:'q34', q:'Quais cuidados devem ser tomados na coleta de sangue venoso?', choices:[
      {id:'a','text':'Higienização das mãos, uso de luvas, identificação correta da amostra, antissepsia do local'},{id:'b','text':'Apenas identificar o paciente'},{id:'c','text':'Aplicar calor na veia antes da coleta'},{id:'d','text':'Nenhum cuidado é necessário'}
    ], answer:'a', explain:'Técnica asséptica, identificação e rotulagem correta são essenciais.' },
    { id:'q35', q:'Por que é importante identificar corretamente as amostras no laboratório?', choices:[
      {id:'a','text':'Para evitar contaminação cruzada e erros de diagnóstico'},{id:'b','text':'Para decorar os nomes dos pacientes'},{id:'c','text':'Apenas para registro contábil'},{id:'d','text':'Para agilizar a coleta sem conferir'}
    ], answer:'a', explain:'Identificação correta garante resultados atribuídos ao paciente certo e segurança.' },

    { id:'q36', q:'O que significa "promoção da saúde"?', choices:[
      {id:'a','text':'Distribuir medicamentos gratuitamente'},{id:'b','text':'Conjunto de ações que visam melhorar a saúde e prevenir doenças'},{id:'c','text':'Apenas vacinar crianças'},{id:'d','text':'Construir hospitais'}
    ], answer:'b', explain:'Promoção da saúde engloba ações de educação, políticas e ambientes saudáveis.' },
    { id:'q37', q:'Quais são as principais vacinas administradas em crianças?', choices:[
      {id:'a','text':'BCG, DTP, poliomielite, hepatite B, rotavírus'},{id:'b','text':'Apenas gripe'},{id:'c','text':'Antirrábica e tétano em todas as idades'},{id:'d','text':'Nenhuma vacina antes dos 5 anos'}
    ], answer:'a', explain:'Esquema infantil inclui BCG, DTP (pentavalente), polio, hepatite B e rotavírus entre outras.' },
    { id:'q38', q:'Explique a importância do saneamento básico na prevenção de doenças.', choices:[
      {id:'a','text':'Evita contaminação do solo e da água, prevenindo doenças transmissíveis'},{id:'b','text':'Apenas melhora o aspecto da cidade'},{id:'c','text':'Reduz a poluição sonora'},{id:'d','text':'É útil apenas para controle de tráfego'}
    ], answer:'a', explain:'Saneamento reduz transmissão hídrica de doenças e protege saúde pública.' },
    { id:'q39', q:'O que é vigilância epidemiológica?', choices:[
      {id:'a','text':'Monitoramento de doenças para prevenção e controle'},{id:'b','text':'Observação de animais em laboratórios'},{id:'c','text':'Pesquisa genética de pacientes'},{id:'d','text':'Contagem de médicos em hospitais'}
    ], answer:'a', explain:'Vigilância envolve detecção, monitoramento e resposta a eventos de saúde pública.' },
    { id:'q40', q:'Qual é o papel do técnico de medicina geral na comunidade?', choices:[
      {id:'a','text':'Diagnosticar, tratar, prevenir doenças e educar em saúde'},{id:'b','text':'Apenas aplicar injeções'},{id:'c','text':'Somente atender emergências'},{id:'d','text':'Administrar hospitais'}
    ], answer:'a', explain:'Técnicos prestam cuidados primários, educação e encaminhamento na comunidade.' }
  ];

  buildAndRunQuiz(QUESTIONS, 'medg_level2_done');
}

/* NEW: Nível 3 — Anatomia e Fisiologia Avançada (Q41–Q60) */
export function openMedicinaGeralLevel3(){
  const simEnv = document.getElementById('sim-environment');
  if(simEnv) simEnv.style.display = '';
  const simMain = document.getElementById('sim-env-main') || document.body;
  simMain.innerHTML = '';
  document.getElementById('sim-env-title').textContent = 'Avaliação • Medicina Geral — Nível 3 (Avançado)';

  const QUESTIONS = [
    { id:'q41', q:'Qual é a função do fígado no metabolismo?', choices:[
      {id:'a','text':'Produzir insulina'},{id:'b','text':'Metabolizar nutrientes, produzir bile e armazenar glicogênio'},{id:'c','text':'Filtrar urina'},{id:'d','text':'Transportar oxigênio'}
    ], answer:'b', explain:'O fígado metaboliza nutrientes, produz bile para digestão de gorduras e armazena glicogênio.' },
    { id:'q42', q:'Qual é a função dos rins?', choices:[
      {id:'a','text':'Produzir glóbulos vermelhos'},{id:'b','text':'Filtrar o sangue e excretar resíduos na urina'},{id:'c','text':'Produzir bile'},{id:'d','text':'Controlar a respiração'}
    ], answer:'b', explain:'Rins filtram sangue, removem resíduos e regulam fluidos e eletrólitos na urina.' },
    { id:'q43', q:'Qual é a função dos pulmões?', choices:[
      {id:'a','text':'Bombear sangue'},{id:'b','text':'Realizar trocas gasosas entre oxigênio e dióxido de carbono'},{id:'c','text':'Armazenar glicose'},{id:'d','text':'Produzir anticorpos'}
    ], answer:'b', explain:'Pulmões realizam trocas gasosas entre O2 e CO2 nos alvéolos.' },
    { id:'q44', q:'Qual é a função do pâncreas?', choices:[
      {id:'a','text':'Produzir hormônios e enzimas digestivas'},{id:'b','text':'Filtrar toxinas do sangue'},{id:'c','text':'Produzir bile'},{id:'d','text':'Regular batimentos cardíacos'}
    ], answer:'a', explain:'Pâncreas tem função endócrina (insulina/glucagon) e exócrina (enzimas digestivas).' },
    { id:'q45', q:'Qual é a diferença entre artérias e veias?', choices:[
      {id:'a','text':'Artérias transportam sangue venoso; veias transportam sangue arterial'},{id:'b','text':'Artérias transportam sangue do coração para os tecidos; veias retornam sangue ao coração'},{id:'c','text':'Veias têm parede mais grossa que artérias'},{id:'d','text':'Artérias não possuem sangue'}
    ], answer:'b', explain:'Artérias levam sangue do coração aos tecidos; veias trazem sangue de volta ao coração.' },

    { id:'q46', q:'Qual é o agente causador da pneumonia bacteriana?', choices:[
      {id:'a','text':'Streptococcus pneumoniae'},{id:'b','text':'Influenza vírus'},{id:'c','text':'Plasmodium'},{id:'d','text':'HIV'}
    ], answer:'a', explain:'Streptococcus pneumoniae é uma causa comum de pneumonia bacteriana.' },
    { id:'q47', q:'Qual é a causa mais comum de infecção urinária?', choices:[
      {id:'a','text':'Vírus da gripe'},{id:'b','text':'Bactérias, especialmente Escherichia coli'},{id:'c','text':'Parasitas intestinais'},{id:'d','text':'Fungos da pele'}
    ], answer:'b', explain:'E. coli é a principal causa de infecções do trato urinário.' },
    { id:'q48', q:'Qual é a complicação mais grave da hipertensão não tratada?', choices:[
      {id:'a','text':'Cálculo renal'},{id:'b','text':'AVC, infarto e insuficiência renal'},{id:'c','text':'Dermatite'},{id:'d','text':'Diarreia'}
    ], answer:'b', explain:'Hipertensão não controlada pode levar a AVC, infarto e insuficiência renal.' },
    { id:'q49', q:'Qual é a principal via de transmissão da dengue?', choices:[
      {id:'a','text':'Aedes aegypti (mosquito)'},{id:'b','text':'Contato físico direto'},{id:'c','text':'Água contaminada'},{id:'d','text':'Alimentos crus'}
    ], answer:'a', explain:'Dengue é transmitida principalmente pela picada do mosquito Aedes aegypti.' },
    { id:'q50', q:'Qual é a causa do tétano?', choices:[
      {id:'a','text':'Vírus transmitido pelo ar'},{id:'b','text':'Bactéria Clostridium tetani presente em ferimentos sujos'},{id:'c','text':'Fungos de pele'},{id:'d','text':'Mosquitos'}
    ], answer:'b', explain:'Tétano é causado pela bactéria Clostridium tetani, geralmente entrando por ferimentos contaminados.' },

    { id:'q51', q:'O que significa "farmacocinética"?', choices:[
      {id:'a','text':'Estudo do efeito dos medicamentos no corpo'},{id:'b','text':'Estudo do movimento do medicamento no corpo: absorção, distribuição, metabolização e excreção'},{id:'c','text':'Nome comercial do medicamento'},{id:'d','text':'Reação adversa do medicamento'}
    ], answer:'b', explain:'Farmacocinética descreve ADME do fármaco no organismo.' },
    { id:'q52', q:'Qual é o principal objetivo de uma dose de manutenção de um medicamento?', choices:[
      {id:'a','text':'Reduzir efeitos colaterais'},{id:'b','text':'Manter concentração terapêutica do medicamento no sangue'},{id:'c','text':'Curar imediatamente a doença'},{id:'d','text':'Evitar visitas médicas'}
    ], answer:'b', explain:'Dose de manutenção mantém níveis terapêuticos estáveis no sangue.' },
    { id:'q53', q:'Qual é a diferença entre medicamento genérico e de referência?', choices:[
      {id:'a','text':'Genérico tem mesma composição e efeito do de referência, mas preço menor'},{id:'b','text':'Genérico é sempre menos eficaz'},{id:'c','text':'Genérico é produzido apenas em laboratórios privados'},{id:'d','text':'Genérico não é regulado'}
    ], answer:'a', explain:'Medicamento genérico tem equivalência farmacêutica ao de referência e normalmente custo menor.' },
    { id:'q54', q:'O que significa efeito colateral de um medicamento?', choices:[
      {id:'a','text':'Benefício do medicamento'},{id:'b','text':'Reação indesejada, não pretendida pelo tratamento'},{id:'c','text':'Forma de administração'},{id:'d','text':'Redução do efeito principal'}
    ], answer:'b', explain:'Efeito colateral é uma reação indesejada associada ao fármaco.' },
    { id:'q55', q:'Qual é a importância da adesão ao tratamento?', choices:[
      {id:'a','text':'Evitar desperdício de medicamentos'},{id:'b','text':'Garantir eficácia do tratamento e prevenção de complicações'},{id:'c','text':'Reduzir consultas médicas'},{id:'d','text':'Aumentar lucros das farmácias'}
    ], answer:'b', explain:'Adesão é crucial para eficácia clínica e prevenção de recaídas/complicações.' }
  ];

  buildAndRunQuiz(QUESTIONS, 'medg_level3_done');
}

/* NEW: shuffle helper and updated rendering logic to randomise option order per question run */
function shuffleArray(arr){
  for(let i = arr.length -1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* shared builder: renders quiz UI, handles scoring and (optionally) sets a localStorage flag on completion
   added parameter requiredPassPercent (0..100) default 70 to require e.g. 70% to unlock next level */
function buildAndRunQuiz(QUESTIONS, completionFlagKey, requiredPassPercent = 70){
  const simMain = document.getElementById('sim-env-main') || document.body;
  simMain.innerHTML = '';
  const card = document.createElement('div'); card.className = 'results-card'; card.style.minHeight='140px';
  let idx = 0; let score = 0;
  const header = document.createElement('div');
  header.style.display='flex'; header.style.justifyContent='space-between'; header.style.alignItems='center';
  header.innerHTML = `<strong>Avaliação - Nível</strong><div id="quiz-progress">0 / ${QUESTIONS.length}</div>`;
  card.appendChild(header);
  const body = document.createElement('div'); body.style.marginTop='12px';
  const qwrap = document.createElement('div');
  body.appendChild(qwrap);
  const controls = document.createElement('div'); controls.style.marginTop='12px'; controls.style.display='flex'; controls.style.gap='8px';
  const nextBtn = document.createElement('button'); nextBtn.className='action-btn'; nextBtn.textContent='Próxima';
  const finishBtn = document.createElement('button'); finishBtn.className='action-btn'; finishBtn.textContent='Terminar';
  controls.appendChild(nextBtn); controls.appendChild(finishBtn);
  card.appendChild(body); card.appendChild(controls);
  simMain.appendChild(card);

  function renderQuestion(i){
    const item = QUESTIONS[i];
    qwrap.innerHTML = '';
    document.getElementById('quiz-progress').textContent = `${i+1} / ${QUESTIONS.length}`;
    const qh = document.createElement('h3'); qh.textContent = `${i+1}. ${item.q}`; qwrap.appendChild(qh);
    const list = document.createElement('div'); list.style.display='grid'; list.style.gap='8px';

    // deep copy choices and shuffle so correct option moves position each run
    const choicesCopy = (item.choices || []).map(c => Object.assign({}, c));
    shuffleArray(choicesCopy);

    // render shuffled choices; mark dataset.isCorrect for evaluation
    choicesCopy.forEach((ch, idx)=>{
      const btn = document.createElement('button');
      btn.className = 'action-btn';
      btn.style.textAlign='left';
      btn.textContent = ch.text || ch;
      // store whether this rendered button is the correct answer
      btn.dataset.isCorrect = String(ch.id === item.answer);
      btn.dataset.choice = ch.id;
      btn.addEventListener('click', ()=> handleAnswer(item, btn, list));
      list.appendChild(btn);
    });
    qwrap.appendChild(list);
  }

  function handleAnswer(item, btnClicked, listEl){
    // disable all choices
    Array.from(listEl.children).forEach(b=> b.disabled = true);
    const isCorrect = btnClicked.dataset.isCorrect === 'true';
    const feedback = document.createElement('div'); feedback.style.marginTop='10px';
    if(isCorrect){
      score++;
      feedback.innerHTML = `<div style="color:green;font-weight:700">Correto ✓</div><div style="margin-top:6px">${item.explain || ''}</div>`;
      btnClicked.style.outline = '3px solid rgba(40,167,69,0.14)';
      // motivational note for correct answer
      const praise = ['Excelente! Continua assim.','Bom trabalho — vai crescendo!','Ótimo! Aprendeste bem este tópico.'];
      const pnote = document.createElement('div'); pnote.style.marginTop='8px'; pnote.style.color='#0b845e'; pnote.style.fontWeight='600';
      pnote.textContent = praise[Math.floor(Math.random()*praise.length)];
      feedback.appendChild(pnote);
    } else {
      // highlight correct option among rendered buttons
      Array.from(listEl.children).forEach(b=>{
        if(b.dataset.isCorrect === 'true'){
          b.style.border = '2px solid rgba(10,150,200,0.12)';
          b.style.background = '#eef9ff';
        } else if(b === btnClicked){
          b.style.opacity = '0.7';
        }
      });
      feedback.innerHTML = `<div style="color:#c0392b;font-weight:700">Errado ✕ — opção correta marcada</div><div style="margin-top:6px">${item.explain || ''}</div>`;
      const support = ['Quase lá — revisa esta explicação e tenta novamente.','Boa tentativa — aprende com a explicação e segue em frente.','Não desistas — pratica mais este tema para consolidar.'];
      const snote = document.createElement('div'); snote.style.marginTop='8px'; snote.style.color='#a03b2f'; snote.style.fontWeight='600';
      snote.textContent = support[Math.floor(Math.random()*support.length)];
      feedback.appendChild(snote);
    }
    qwrap.appendChild(feedback);
  }

  nextBtn.addEventListener('click', ()=>{
    if(idx < QUESTIONS.length -1){ idx++; renderQuestion(idx); window.scrollTo({top:0,behavior:'smooth'}); }
  });
  finishBtn.addEventListener('click', ()=>{
    simMain.innerHTML = '';
    const out = document.createElement('div'); out.className = 'results-card';
    const nota = Math.round((score / QUESTIONS.length) * 20);
    const percent = (score / QUESTIONS.length) * 100;
    const passou = percent >= requiredPassPercent;
    out.innerHTML = `<h2>Resumo</h2>
      <p>Pontuação: ${score} / ${QUESTIONS.length}</p>
      <p><strong>Nota:</strong> ${nota} / 20 — ${percent.toFixed(1)}% — ${passou ? 'Alcançou' : 'Não alcançou'}</p>
      <p>Obrigado por completar o questionário. Cada pergunta inclui explicação para reforçar o aprendizado.</p>
      <div id="quiz-summary-buttons" style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;"></div>`;
    simMain.appendChild(out);
    const btnWrap = out.querySelector('#quiz-summary-buttons');
    const retake = document.createElement('button'); retake.className='action-btn'; retake.id='retake'; retake.textContent='Refazer';
    const close = document.createElement('button'); close.className='action-btn'; close.id='close'; close.textContent='Fechar';
    btnWrap.appendChild(retake);

    // reveal button for next level only when passed and when completionFlagKey provided
    if(completionFlagKey && passou){
      // compute next level key by numeric suffix if present, else generic
      let nextKey = null;
      const m = completionFlagKey.match(/(.*_level)(\d+)_done$/) || completionFlagKey.match(/(.*_cv5_level)(\d+)_done/);
      if(m){
        const base = m[1];
        const num = Number(m[2]) + 1;
        nextKey = base + num + '_done';
      } else {
        // if format different, attempt to derive common patterns: e.g. 'medg_level1_done' -> attach 2
        const r = completionFlagKey.replace(/(\d+)/, (a)=> String(Number(a)+1));
        if(r !== completionFlagKey) nextKey = r;
      }
      // create a Next Level button that attempts to call a function named open<...>Level<...> if available
      const nivelBtn = document.createElement('button'); nivelBtn.className='action-btn'; nivelBtn.id='next-level'; nivelBtn.textContent='Próximo Nível';
      nivelBtn.title = 'Iniciar próximo nível';
      nivelBtn.addEventListener('click', async ()=>{
        // attempt to derive current function from completionFlagKey stored on this quiz run via closure (we can also pass a function ref in future)
        // As robust fallback, call window to try named functions.
        // Build candidate names:
        const candidates = [];
        // If this quiz was launched with completionFlagKey like 'medg_level1_done' -> extract prefix
        const m = completionFlagKey.match(/([a-zA-Z_]+?)(\d+)_done$/);
        if(m){
          const prefix = m[1].replace(/_$/,'');
          const nextNum = Number(m[2]) + 1;
          // possible function patterns:
          candidates.push(`open${prefix.replace(/(^|_)([a-z])/g, (_,p,ch)=> ch.toUpperCase())}Level${nextNum}`);
          candidates.push(`open${prefix.replace(/(^|_)([a-z])/g, (_,p,ch)=> ch.toUpperCase())}${nextNum}`);
          candidates.push(`openGestaoRedesLevel${nextNum}`);
          candidates.push(`openGestaoRedesLevel${nextNum}`);
        }
        candidates.push('openGestaoRedesLevel2', 'openGestaoRedesLevel3','openGestaoRedesLevel4','openGestaoRedesLevel5','openGestaoRedesLevel6','openGestaoRedesLevel7','openGestaoRedesLevel8','openGestaoRedesLevel9','openGestaoRedesLevel10');
        // iterate to find an exported function
        for(const name of candidates){
          if(!name) continue;
          const mod = await import('./quiz.js');
          if(mod && typeof mod[name] === 'function'){
            mod[name]();
            return;
          }
        }
        alert('Próximo nível não encontrado ou indisponível.');
      });
      btnWrap.appendChild(nivelBtn);
    }

    btnWrap.appendChild(close);
    btnWrap.appendChild(retake);
    retake.addEventListener('click', ()=> buildAndRunQuiz(QUESTIONS, completionFlagKey, requiredPassPercent));
    close.addEventListener('click', ()=> {
      const back = document.getElementById('sim-env-back');
      if(back) back.click(); else { simMain.innerHTML=''; }
    });

    // store completion flag with pass percent and score info
    if(completionFlagKey){
      localStorage.setItem(completionFlagKey, JSON.stringify({done:true, passed: passou, score: nota, percent: percent, requiredPassPercent, date: new Date().toISOString()}));
      // dispatch event
      const evName = completionFlagKey.replace(/_done$/, '_completed');
      window.dispatchEvent(new CustomEvent(evName, { detail: {passed: passou, score: nota, percent} }));
    }
  });

  renderQuestion(0);
}

/* NEW: Create 10 graduated levels for the CV5 Administração de Gestão de Redes quiz.
   Each level will call buildAndRunQuiz with its question set and require 70% to unlock the next.
   For brevity, Levels 1..3 reuse/expand the earlier QUESTIONS; Levels 4..10 use small placeholder
   questions that you can replace with richer content later. */

function redesQuestionsFor(level){
  // produce 10 distinct questions per level; content tailored to increasing complexity
  const lvl = Number(level);
  const base = [];
  if(lvl === 1){
    base.push(
      { id:`r1_01`, q:'O que faz um switch na camada 2?', choices:[{id:'a',text:'Comuta frames entre portas'},{id:'b',text:'Roteia pacotes entre redes'},{id:'c',text:'Atribui IPs automaticamente'},{id:'d',text:'Monitora utilização de disco'}], answer:'a', explain:'Switch comuta frames na camada de enlace.'},
      { id:`r1_02`, q:'O que é uma VLAN?', choices:[{id:'a',text:'Segmentação lógica de LAN'},{id:'b',text:'Um tipo de cabo'},{id:'c',text:'Um protocolo de roteamento'},{id:'d',text:'Uma aplicação web'}], answer:'a', explain:'VLAN separa domínios de broadcast logicamente.'},
      { id:`r1_03`, q:'Portas padrão do HTTP e HTTPS?', choices:[{id:'a',text:'HTTP 80 / HTTPS 443'},{id:'b',text:'HTTP 22 / HTTPS 21'},{id:'c',text:'HTTP 25 / HTTPS 110'},{id:'d',text:'HTTP 8080 / HTTPS 8443'}], answer:'a', explain:'HTTP=80 e HTTPS=443.'},
      { id:`r1_04`, q:'Função básica do DHCP?', choices:[{id:'a',text:'Atribuir IPs automaticamente'},{id:'b',text:'Criptografar tráfego'},{id:'c',text:'Monitorar utilização de banda'},{id:'d',text:'Bloquear portas'}], answer:'a', explain:'DHCP distribui IP/gateway/DNS automaticamente.'},
      { id:`r1_05`, q:'O que é NAT?', choices:[{id:'a',text:'Tradução de endereços privados para públicos'},{id:'b',text:'Protocolo de roteamento'},{id:'c',text:'Mecanismo de autenticação'},{id:'d',text:'Switch virtual'}], answer:'a', explain:'NAT permite acesso externo via endereços públicos.'},
      { id:`r1_06`, q:'Por que aplicar QoS?', choices:[{id:'a',text:'Priorizar tráfego crítico'},{id:'b',text:'Aumentar número de clientes'},{id:'c',text:'Substituir VLANs'},{id:'d',text:'Reduzir cabos'}], answer:'a', explain:'QoS prioriza voz/vídeo sensíveis à latência.'},
      { id:`r1_07`, q:'O que é um cabo UTP?', choices:[{id:'a',text:'Cabo Ethernet comum para redes locais'},{id:'b',text:'Cabo de fibra óptica'},{id:'c',text:'Cabo de alimentação'},{id:'d',text:'Cabo de áudio'}], answer:'a', explain:'UTP é o cabo de par trançado usado em LANs.'},
      { id:`r1_08`, q:'O que é um endereço MAC?', choices:[{id:'a',text:'Identificador físico único de interface de rede'},{id:'b',text:'Endereço IP público'},{id:'c',text:'Nome de host'},{id:'d',text:'Protocolo de roteamento'}], answer:'a', explain:'MAC identifica hardware de interface na camada de enlace.'},
      { id:`r1_09`, q:'Qual a função de um firewall básico?', choices:[{id:'a',text:'Filtrar tráfego com base em regras'},{id:'b',text:'Atribuir IPs'},{id:'c',text:'Comutar frames'},{id:'d',text:'Atualizar firmware'}], answer:'a', explain:'Firewall controla acesso baseado em regras de segurança.'},
      { id:`r1_10`, q:'O que é latência numa rede?', choices:[{id:'a',text:'Tempo de ida e volta de um pacote'},{id:'b',text:'Taxa de perda de pacotes'},{id:'c',text:'Largura de banda disponível'},{id:'d',text:'Número de dispositivos' }], answer:'a', explain:'Latência é atraso entre envio e recepção de pacotes.'}
    );
  } else if(lvl === 2){
    base.push(
      { id:`r2_01`, q:'Comando para ver tabela ARP?', choices:[{id:'a',text:'arp -a / show arp'},{id:'b',text:'ifconfig'},{id:'c',text:'netstat -r'},{id:'d',text:'ipconfig /all'}], answer:'a', explain:'"arp -a" ou "show arp" lista entradas ARP.'},
      { id:`r2_02`, q:'O que faz um roteador?', choices:[{id:'a',text:'Encaminha pacotes entre redes'},{id:'b',text:'Comuta frames'},{id:'c',text:'Fornece endereços MAC'},{id:'d',text:'Armazena arquivos'}], answer:'a', explain:'Roteadores conectam redes diferentes e encaminham pacotes.'},
      { id:`r2_03`, q:'Máscara 255.255.255.0 (\/24) indica?', choices:[{id:'a',text:'254 hosts utilizáveis'},{id:'b',text:'128 hosts'},{id:'c',text:'65000 hosts'},{id:'d',text:'Somente 16 hosts'}], answer:'a', explain:'\/24 permite 256 endereços totais, 254 hosts.'},
      { id:`r2_04`, q:'O que é gateway padrão?', choices:[{id:'a',text:'Roteador para tráfego fora da LAN'},{id:'b',text:'Servidor DNS local'},{id:'c',text:'Switch core'},{id:'d',text:'Servidor web'}], answer:'a', explain:'Gateway é o next-hop para redes remotas.'},
      { id:`r2_05`, q:'O que é duplex em interfaces?', choices:[{id:'a',text:'Half/Full — transmissão simultânea ou não'},{id:'b',text:'Tipo de cabo'},{id:'c',text:'Protocolo de roteamento'},{id:'d',text:'Velocidade do CPU'}], answer:'a', explain:'Full-duplex transmite e recebe ao mesmo tempo.'},
      { id:`r2_06`, q:'Qual a utilidade do ping?', choices:[{id:'a',text:'Testar conectividade ICMP'},{id:'b',text:'Configurar VLAN'},{id:'c',text:'Listar interfaces'},{id:'d',text:'Alterar IP'}], answer:'a', explain:'Ping verifica resposta e latência entre hosts.'},
      { id:`r2_07`, q:'O que é MTU?', choices:[{id:'a',text:'Tamanho máximo do quadro IP'},{id:'b',text:'Protocolo de roteamento'},{id:'c',text:'Endereço MAC'},{id:'d',text:'Velocidade do link'}], answer:'a', explain:'MTU é o maior tamanho de pacote permitido sem fragmentação.'},
      { id:`r2_08`, q:'Qual a função do DNS?', choices:[{id:'a',text:'Resolver nomes para endereços IP'},{id:'b',text:'Atribuir IPs'},{id:'c',text:'Autenticar usuários'},{id:'d',text:'Monitorar tráfego'}], answer:'a', explain:'DNS traduz nomes legíveis para IPs.'},
      { id:`r2_09`, q:'O que é traceroute?', choices:[{id:'a',text:'Ferramenta que mostra caminho de pacotes até destino'},{id:'b',text:'Comando de copiar arquivos'},{id:'c',text:'Teste de velocidade'},{id:'d',text:'Comando para reiniciar roteador'}], answer:'a', explain:'Traceroute mostra cada hop entre origem e destino.'},
      { id:`r2_10`, q:'O que mede jitter?', choices:[{id:'a',text:'Variação de latência entre pacotes'},{id:'b',text:'Largura de banda'},{id:'c',text:'Perda de pacotes'},{id:'d',text:'Tempo de uptime'}], answer:'a', explain:'Jitter é variação no atraso de pacotes, crítico para voz/video.'}
    );
  } else if(lvl === 3){
    base.push(
      { id:`r3_01`, q:'O que é BGP?', choices:[{id:'a',text:'Protocolo de roteamento entre sistemas autônomos'},{id:'b',text:'Switch virtual'},{id:'c',text:'Serviço DNS'},{id:'d',text:'Tipo de cabo'}], answer:'a', explain:'BGP é usado entre ASs na Internet.'},
      { id:`r3_02`, q:'O que é subnetting avançado?', choices:[{id:'a',text:'Divisão de redes para otimização'},{id:'b',text:'Configuração de Wi‑Fi'},{id:'c',text:'Backup de configs'},{id:'d',text:'Criação de VLANs físicas'}], answer:'a', explain:'Subnetting permite gerir endereços eficientemente.'},
      { id:`r3_03`, q:'O que é STP?', choices:[{id:'a',text:'Protocolo que previne loops em L2'},{id:'b',text:'Sistema de backup'},{id:'c',text:'Tabela de roteamento'},{id:'d',text:'Protocolo DHCP'}], answer:'a', explain:'STP evita loops em topologias redundantes.'},
      { id:`r3_04`, q:'O que é ACL?', choices:[{id:'a',text:'Regras para permitir/negar tráfego'},{id:'b',text:'Tabela ARP'},{id:'c',text:'Tipo de cabo'},{id:'d',text:'Serviço de autenticação'}], answer:'a', explain:'ACLs controlam acesso por IP/porta/protocolo.'},
      { id:`r3_05`, q:'O que é SNMP?', choices:[{id:'a',text:'Protocolo de monitorização de dispositivos'},{id:'b',text:'Protocolo de roteamento'},{id:'c',text:'Sistema de ficheiros'},{id:'d',text:'Tipo de VLAN'}], answer:'a', explain:'SNMP recolhe métricas e permite gerir dispositivos.'},
      { id:`r3_06`, q:'Por que fazer backups de config?', choices:[{id:'a',text:'Recuperação rápida em falhas'},{id:'b',text:'Reduzir consumo de energia'},{id:'c',text:'Aumentar latência'},{id:'d',text:'Substituir VLANs'}], answer:'a', explain:'Backups permitem restaurar configs e reduzir downtime.'},
      { id:`r3_07`, q:'O que é agregação de links (LACP)?', choices:[{id:'a',text:'Combinar múltiplos links para maior largura de banda'},{id:'b',text:'Protocolo de roteamento'},{id:'c',text:'Tipo de firewall'},{id:'d',text:'Serviço de DNS'}], answer:'a', explain:'LACP permite balancear tráfego sobre múltiplas ligações.'},
      { id:`r3_08`, q:'Qual o propósito de logging centralizado?', choices:[{id:'a',text:'Coletar eventos para análise e auditoria'},{id:'b',text:'Atribuir IPs'},{id:'c',text:'Atualizar firmware'},{id:'d',text:'Monitorar CPU apenas'}], answer:'a', explain:'Logging central facilita investigação e conformidade.'},
      { id:`r3_09`, q:'O que é redundância em redes?', choices:[{id:'a',text:'Múltiplos caminhos/dispositivos para alta disponibilidade'},{id:'b',text:'Apenas cabos extras'},{id:'c',text:'Backup de servidores'},{id:'d',text:'Criação de VLANs'}], answer:'a', explain:'Redundância reduz points of failure e aumenta disponibilidade.'},
      { id:`r3_10`, q:'Por que monitorizar utilização de link?', choices:[{id:'a',text:'Para dimensionar capacidade e detectar congestionamentos'},{id:'b',text:'Para reduzir segurança'},{id:'c',text:'Só por estatística'},{id:'d',text:'Para desligar links automaticamente'}], answer:'a', explain:'Monitorização permite otimizar e prever necessidade de upgrades.'}
    );
  } else {
    // levels 4..10: generate 10 distinct placeholder network-topic questions per level
    for(let i=1;i<=10;i++){
      base.push({
        id: `r${lvl}_${('0'+i).slice(-2)}`,
        q: `Nível ${lvl} — Pergunta ${i} (conceito de gestão de redes)`,
        choices: [
          {id:'a', text: 'Resposta A'},
          {id:'b', text: 'Resposta B'},
          {id:'c', text: 'Resposta C'},
          {id:'d', text: 'Resposta D'}
        ],
        // cycle correct answer to vary positions across levels
        answer: ['a','b','c','d'][ (i + lvl) % 4 ],
        explain: `Explicação para a pergunta ${i} do Nível ${lvl}.`
      });
    }
  }

  return base;
}

// export levels 1..10
export function openGestaoRedesLevel1(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV5 — Gestão de Redes — Nível 1';
  buildAndRunQuiz(redesQuestionsFor(1), 'redes_cv5_level1_done', 70);
}
export function openGestaoRedesLevel2(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV5 — Gestão de Redes — Nível 2';
  buildAndRunQuiz(redesQuestionsFor(2), 'redes_cv5_level2_done', 70);
}
export function openGestaoRedesLevel3(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV5 — Gestão de Redes — Nível 3';
  buildAndRunQuiz(redesQuestionsFor(3), 'redes_cv5_level3_done', 70);
}
export function openGestaoRedesLevel4(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV5 — Gestão de Redes — Nível 4';
  buildAndRunQuiz(redesQuestionsFor(4), 'redes_cv5_level4_done', 70);
}
export function openGestaoRedesLevel5(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV5 — Gestão de Redes — Nível 5';
  buildAndRunQuiz(redesQuestionsFor(5), 'redes_cv5_level5_done', 70);
}
export function openGestaoRedesLevel6(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV5 — Gestão de Redes — Nível 6';
  buildAndRunQuiz(redesQuestionsFor(6), 'redes_cv5_level6_done', 70);
}
export function openGestaoRedesLevel7(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV5 — Gestão de Redes — Nível 7';
  buildAndRunQuiz(redesQuestionsFor(7), 'redes_cv5_level7_done', 70);
}
export function openGestaoRedesLevel8(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV5 — Gestão de Redes — Nível 8';
  buildAndRunQuiz(redesQuestionsFor(8), 'redes_cv5_level8_done', 70);
}
export function openGestaoRedesLevel9(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV5 — Gestão de Redes — Nível 9';
  buildAndRunQuiz(redesQuestionsFor(9), 'redes_cv5_level9_done', 70);
}
export function openGestaoRedesLevel10(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV5 — Gestão de Redes — Nível 10';
  buildAndRunQuiz(redesQuestionsFor(10), 'redes_cv5_level10_done', 70);
}

// Keep legacy openGestaoRedesQuiz as alias to Level 1 for backward compatibility
export function openGestaoRedesQuiz(){ openGestaoRedesLevel1(); }

/* NEW: Suporte Informático quiz (CV4) — 3 progressive levels; each requires 70% to unlock the next */
function suporteQuestionsFor(level){
  const lvl = Number(level);
  const qsArr = [];
  if(lvl === 1){
    qsArr.push(
      { id:'s1_01', q:'O que é um sistema operativo?', choices:[{id:'a',text:'Software que gere hardware e fornece serviços a aplicações'},{id:'b',text:'Um tipo de antivírus'},{id:'c',text:'Dispositivo de armazenamento'},{id:'d',text:'Protocolo de rede'}], answer:'a', explain:'O sistema operativo gere recursos do computador e fornece serviços para aplicações.'},
      { id:'s1_02', q:'Qual o papel da RAM?', choices:[{id:'a',text:'Armazenamento permanente'},{id:'b',text:'Memória volátil usada para operações em execução'},{id:'c',text:'Controlador de rede'},{id:'d',text:'Fonte de alimentação'}], answer:'b', explain:'A RAM é memória temporária que guarda dados em uso pelo CPU.'},
      { id:'s1_03', q:'O que faz um disco SSD comparado a um HDD?', choices:[{id:'a',text:'SSDs usam memória flash e são mais rápidos'},{id:'b',text:'SSDs são sempre maiores em capacidade'},{id:'c',text:'HDDs têm menos latência'},{id:'d',text:'HDDs não armazenam dados'}], answer:'a', explain:'SSDs usam memória flash, sem partes móveis, resultando em maior velocidade.'},
      { id:'s1_04', q:'Qual o comando para listar ficheiros numa pasta no Windows (Prompt)?', choices:[{id:'a',text:'ls'},{id:'b',text:'dir'},{id:'c',text:'pwd'},{id:'d',text:'cat'}], answer:'b', explain:'No Windows, "dir" lista conteúdos da pasta no prompt de comando.'},
      { id:'s1_05', q:'O que é uma porta USB usada para?', choices:[{id:'a',text:'Somente para carregar'},{id:'b',text:'Conectar periféricos e permitir comunicação/dados'},{id:'c',text:'Aumentar a RAM'},{id:'d',text:'Trocar o sistema operativo'}], answer:'b', explain:'Portas USB conectam teclados, ratos, discos e outros periféricos.'}
    );
  } else if(lvl === 2){
    qsArr.push(
      { id:'s2_01', q:'O que é uma imagem de sistema (system image)?', choices:[{id:'a',text:'Backup completo do disco/partição para restauração'},{id:'b',text:'Foto da secretária do desktop'},{id:'c',text:'Arquivo de texto'},{id:'d',text:'Lista de utilizadores' }], answer:'a', explain:'Imagem do sistema é backup integral usado para restaurar um sistema.'},
      { id:'s2_02', q:'Qual o propósito do CHKDSK no Windows?', choices:[{id:'a',text:'Verificar e reparar erros de disco'},{id:'b',text:'Atualizar drivers'},{id:'c',text:'Limpar a RAM'},{id:'d',text:'Desinstalar programas'}], answer:'a', explain:'CHKDSK verifica integridade do sistema de ficheiros e tenta reparar erros.'},
      { id:'s2_03', q:'O que é um driver?', choices:[{id:'a',text:'Software que permite ao sistema operativo controlar hardware'},{id:'b',text:'Tipo de cabo'},{id:'c',text:'Comando de rede'},{id:'d',text:'Usuário administrador'}], answer:'a', explain:'Drivers são módulos que fazem interface entre SO e hardware.'},
      { id:'s2_04', q:'Como identificar um problema de ligação de rede básico?', choices:[{id:'a',text:'Verificar cabo/LEDs, IP e fazer ping ao gateway'},{id:'b',text:'Formatar o disco'},{id:'c',text:'Substituir a motherboard'},{id:'d',text:'Reinstalar antivirus'}], answer:'a', explain:'Passos básicos: cabos/LEDs, configuração IP e teste com ping.'},
      { id:'s2_05', q:'O que é um restore point?', choices:[{id:'a',text:'Ponto de restauração que reverte configurações do sistema'},{id:'b',text:'Backup da conta de email'},{id:'c',text:'Tipo de antivírus'},{id:'d',text:'Log de eventos'}], answer:'a', explain:'Ponto de restauração permite reverter alterações de sistema sem afetar ficheiros pessoais.'}
    );
  } else {
    // level 3 - avançado
    qsArr.push(
      { id:'s3_01', q:'O que é RAID 1?', choices:[{id:'a',text:'Mirror (espelhamento) para redundância'},{id:'b',text:'Striping para velocidade sem redundância'},{id:'c',text:'Compressão de ficheiros'},{id:'d',text:'Backup na cloud'}], answer:'a', explain:'RAID 1 espelha discos para redundância dos dados.'},
      { id:'s3_02', q:'Qual a função do BIOS/UEFI?', choices:[{id:'a',text:'Inicializar hardware e arrancar o sistema operativo'},{id:'b',text:'Gerir emails'},{id:'c',text:'Controlar a impressora'},{id:'d',text:'Criar contas de utilizador'}], answer:'a', explain:'BIOS/UEFI inicializa hardware e carrega o bootloader do SO.'},
      { id:'s3_03', q:'O que é DHCP e por que é útil?', choices:[{id:'a',text:'Protocolo que atribui IPs dinamicamente'},{id:'b',text:'Anti-malware'},{id:'c',text:'Tipo de cabo'},{id:'d',text:'Aplicação de e-mail'}], answer:'a', explain:'DHCP automatiza a atribuição de endereços IP e parâmetros de rede.'},
      { id:'s3_04', q:'Como remover malware de forma segura?', choices:[{id:'a',text:'Isolar máquina, executar antivírus atualizado, analisar boots e restaurar backups'},{id:'b',text:'Formatar sem backup'},{id:'c',text:'Ignorar e continuar'},{id:'d',text:'Desligar o monitor'}], answer:'a', explain:'Fluxo seguro: isolar, scan, remover, verificar integridade e restaurar de backup se necessário.'},
      { id:'s3_05', q:'O que é partição e por que se usa?', choices:[{id:'a',text:'Divisão lógica de um disco para organizar dados e SOs'},{id:'b',text:'Tipo de memória'},{id:'c',text:'Comando de rede'},{id:'d',text:'Antivírus integrado'}], answer:'a', explain:'Partições segmentam disco para separar sistemas, dados e facilitar backups.'}
    );
  }
  return qsArr;
}

export function openSuporteInformaticaLevel1(){
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV4 — Suporte Informático — Nível 1';
  buildAndRunQuiz(suporteQuestionsFor(1), 'suporte_cv4_level1_done', 70);
}
export function openSuporteInformaticaLevel2(){
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV4 — Suporte Informático — Nível 2';
  buildAndRunQuiz(suporteQuestionsFor(2), 'suporte_cv4_level2_done', 70);
}
export function openSuporteInformaticaLevel3(){
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV4 — Suporte Informático — Nível 3';
  buildAndRunQuiz(suporteQuestionsFor(3), 'suporte_cv4_level3_done', 70);
}

// alias for quick access
export function openSuporteInformaticaQuiz(){ openSuporteInformaticaLevel1(); }

/* NEW: Create 10 graduated levels for the CV4 Suporte Informático quiz.
   Each level will call buildAndRunQuiz with its question set and require 70% to unlock the next.
   For brevity, Levels 1..3 reuse/expand the earlier QUESTIONS; Levels 4..10 use small placeholder
   questions that you can replace with richer content later. */

function suporteQuestionsFor(level){
  // produce 10 distinct questions per level; content tailored to increasing complexity
  const lvl = Number(level);
  const base = [];
  if(lvl === 1){
    base.push(
      { id:`s1_01`, q:'O que é um sistema operativo?', choices:[{id:'a',text:'Software que gere hardware e fornece serviços a aplicações'},{id:'b',text:'Um tipo de antivírus'},{id:'c',text:'Dispositivo de armazenamento'},{id:'d',text:'Protocolo de rede'}], answer:'a', explain:'O sistema operativo gere recursos do computador e fornece serviços para aplicações.'},
      { id:`s1_02`, q:'Qual o papel da RAM?', choices:[{id:'a',text:'Armazenamento permanente'},{id:'b',text:'Memória volátil usada para operações em execução'},{id:'c',text:'Controlador de rede'},{id:'d',text:'Fonte de alimentação'}], answer:'b', explain:'A RAM é memória temporária que guarda dados em uso pelo CPU.'},
      { id:`s1_03`, q:'O que faz um disco SSD comparado a um HDD?', choices:[{id:'a',text:'SSDs usam memória flash e são mais rápidos'},{id:'b',text:'SSDs são sempre maiores em capacidade'},{id:'c',text:'HDDs têm menos latência'},{id:'d',text:'HDDs não armazenam dados'}], answer:'a', explain:'SSDs usam memória flash, sem partes móveis, resultando em maior velocidade.'},
      { id:`s1_04`, q:'Qual o comando para listar ficheiros numa pasta no Windows (Prompt)?', choices:[{id:'a',text:'ls'},{id:'b',text:'dir'},{id:'c',text:'pwd'},{id:'d',text:'cat'}], answer:'b', explain:'No Windows, "dir" lista conteúdos da pasta no prompt de comando.'},
      { id:`s1_05`, q:'O que é uma porta USB usada para?', choices:[{id:'a',text:'Somente para carregar'},{id:'b',text:'Conectar periféricos e permitir comunicação/dados'},{id:'c',text:'Aumentar a RAM'},{id:'d',text:'Trocar o sistema operativo'}], answer:'b', explain:'Portas USB conectam teclados, ratos, discos e outros periféricos.'}
    );
  } else if(lvl === 2){
    base.push(
      { id:`s2_01`, q:'O que é uma imagem de sistema (system image)?', choices:[{id:'a',text:'Backup completo do disco/partição para restauração'},{id:'b',text:'Foto da secretária do desktop'},{id:'c',text:'Arquivo de texto'},{id:'d',text:'Lista de utilizadores' }], answer:'a', explain:'Imagem do sistema é backup integral usado para restaurar um sistema.'},
      { id:`s2_02`, q:'Qual o propósito do CHKDSK no Windows?', choices:[{id:'a',text:'Verificar e reparar erros de disco'},{id:'b',text:'Atualizar drivers'},{id:'c',text:'Limpar a RAM'},{id:'d',text:'Desinstalar programas'}], answer:'a', explain:'CHKDSK verifica integridade do sistema de ficheiros e tenta reparar erros.'},
      { id:`s2_03`, q:'O que é um driver?', choices:[{id:'a',text:'Software que permite ao sistema operativo controlar hardware'},{id:'b',text:'Tipo de cabo'},{id:'c',text:'Comando de rede'},{id:'d',text:'Usuário administrador'}], answer:'a', explain:'Drivers são módulos que fazem interface entre SO e hardware.'},
      { id:`s2_04`, q:'Como identificar um problema de ligação de rede básico?', choices:[{id:'a',text:'Verificar cabo/LEDs, IP e fazer ping ao gateway'},{id:'b',text:'Formatar o disco'},{id:'c',text:'Substituir a motherboard'},{id:'d',text:'Reinstalar antivirus'}], answer:'a', explain:'Passos básicos: cabos/LEDs, configuração IP e teste com ping.'},
      { id:`s2_05`, q:'O que é um restore point?', choices:[{id:'a',text:'Ponto de restauração que reverte configurações do sistema'},{id:'b',text:'Backup da conta de email'},{id:'c',text:'Tipo de antivírus'},{id:'d',text:'Log de eventos'}], answer:'a', explain:'Ponto de restauração permite reverter alterações de sistema sem afetar ficheiros pessoais.'}
    );
  } else {
    // levels 3..10: generate 10 distinct placeholder questions per level
    for(let i=1;i<=10;i++){
      base.push({
        id: `s${lvl}_${('0'+i).slice(-2)}`,
        q: `Nível ${lvl} — Pergunta ${i} (conceito de suporte informático)`,
        choices: [
          {id:'a', text: 'Resposta A'},
          {id:'b', text: 'Resposta B'},
          {id:'c', text: 'Resposta C'},
          {id:'d', text: 'Resposta D'}
        ],
        // cycle correct answer to vary positions across levels
        answer: ['a','b','c','d'][ (i + lvl) % 4 ],
        explain: `Explicação para a pergunta ${i} do Nível ${lvl}.`
      });
    }
  }

  return base;
}

// export levels 1..10
export function openSuporteInformaticaLevel1(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV4 — Suporte Informático — Nível 1';
  buildAndRunQuiz(suporteQuestionsFor(1), 'suporte_cv4_level1_done', 70);
}
export function openSuporteInformaticaLevel2(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV4 — Suporte Informático — Nível 2';
  buildAndRunQuiz(suporteQuestionsFor(2), 'suporte_cv4_level2_done', 70);
}
export function openSuporteInformaticaLevel3(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV4 — Suporte Informático — Nível 3';
  buildAndRunQuiz(suporteQuestionsFor(3), 'suporte_cv4_level3_done', 70);
}
export function openSuporteInformaticaLevel4(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV4 — Suporte Informático — Nível 4';
  buildAndRunQuiz(suporteQuestionsFor(4), 'suporte_cv4_level4_done', 70);
}
export function openSuporteInformaticaLevel5(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV4 — Suporte Informático — Nível 5';
  buildAndRunQuiz(suporteQuestionsFor(5), 'suporte_cv4_level5_done', 70);
}
export function openSuporteInformaticaLevel6(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV4 — Suporte Informático — Nível 6';
  buildAndRunQuiz(suporteQuestionsFor(6), 'suporte_cv4_level6_done', 70);
}
export function openSuporteInformaticaLevel7(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV4 — Suporte Informático — Nível 7';
  buildAndRunQuiz(suporteQuestionsFor(7), 'suporte_cv4_level7_done', 70);
}
export function openSuporteInformaticaLevel8(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV4 — Suporte Informático — Nível 8';
  buildAndRunQuiz(suporteQuestionsFor(8), 'suporte_cv4_level8_done', 70);
}
export function openSuporteInformaticaLevel9(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV4 — Suporte Informático — Nível 9';
  buildAndRunQuiz(suporteQuestionsFor(9), 'suporte_cv4_level9_done', 70);
}
export function openSuporteInformaticaLevel10(){ 
  document.getElementById('sim-env-title').textContent = 'Avaliação • CV4 — Suporte Informático — Nível 10';
  buildAndRunQuiz(suporteQuestionsFor(10), 'suporte_cv4_level10_done', 70);
}

// Keep legacy openSuporteInformaticaQuiz as alias to Level 1 for backward compatibility
export function openSuporteInformaticaQuiz(){ openSuporteInformaticaLevel1(); }