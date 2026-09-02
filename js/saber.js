const CHAKRA_DATA = {
  basico: { nome: 'Básico', color: '#8b3a3a', necessidade: 'Segurança, estabilidade e continuidade' },
  sacral: { nome: 'Sacral', color: '#c45c2a', necessidade: 'Prazer, vínculo, vitalidade e experiência' },
  plexo: { nome: 'Plexo Solar', color: '#c49a2a', necessidade: 'Autonomia, valor, conquista e direção' },
  cardiaco: { nome: 'Cardíaco', color: '#3d7a4a', necessidade: 'Amor, conexão, cuidado e pertencimento' },
  laringeo: { nome: 'Laríngeo', color: '#3a6a9a', necessidade: 'Expressão, verdade e compreensão mútua' },
  frontal: { nome: 'Frontal', color: '#4a4a8a', necessidade: 'Compreensão, clareza e aprendizado' },
  coronario: { nome: 'Coronário', color: '#6a4a8a', necessidade: 'Sentido, propósito e alinhamento' }
};

const CHAKRA_HINTS = {
  basico: {
    falta: 'Instabilidade, desorganização, dificuldade de sustentar.',
    proporcional: 'Base e segurança suficientes sem exigir controle total.',
    excesso: 'Rigidez, apego ao conhecido, resistência à mudança.',
    pensamento: 'Preocupação com riscos, catastrofização.',
    emocao: 'Ansiedade, insegurança.',
    acao: 'Evitar mudanças, acumular recursos.',
    pergunta: 'Tenho base e segurança suficientes para este passo?'
  },
  sacral: {
    falta: 'Bloqueio emocional, pouca vitalidade, dificuldade de sentir prazer.',
    proporcional: 'Sentir profundamente sem entregar à emoção o controle total.',
    excesso: 'Impulsividade, dispersão, fuga do desconforto.',
    pensamento: 'Busca de estímulo, evitar tédio.',
    emocao: 'Intensidade emocional, oscilações.',
    acao: 'Experimentar, buscar prazer ou novidade.',
    pergunta: 'Como isso me faz sentir — e o que posso experimentar?'
  },
  plexo: {
    falta: 'Indecisão, pouca prioridade pessoal, dificuldade de limite.',
    proporcional: 'Sustentar direção sem transformar firmeza em domínio.',
    excesso: 'Controle, pressão, comparação ou ação sem consideração.',
    pensamento: 'Foco em metas, valor pessoal, competição.',
    emocao: 'Frustração quando bloqueado, orgulho ao avançar.',
    acao: 'Decidir, executar, priorizar.',
    pergunta: 'O que eu quero sustentar nesta situação?'
  },
  cardiaco: {
    falta: 'Isolamento, indiferença, dificuldade de confiar.',
    proporcional: 'Considerar o outro sem desaparecer da própria equação.',
    excesso: 'Autoabandono, culpa, responsabilidade excessiva pelo outro.',
    pensamento: 'Preocupação com impacto relacional.',
    emocao: 'Empatia, ternura, ou distanciamento.',
    acao: 'Acolher, cuidar, ou evitar conflito.',
    pergunta: 'Como isso afeta a mim, o outro e nossa conexão?'
  },
  laringeo: {
    falta: 'Silêncio, comunicação indireta, acúmulo interno.',
    proporcional: 'Dizer o essencial com clareza, sem silêncio nem excesso.',
    excesso: 'Falar sem escutar, exposição excessiva.',
    pensamento: 'Repetir o que precisa ser dito.',
    emocao: 'Alívio ao expressar, frustração ao ser silenciado.',
    acao: 'Comunicar, explicar, ensinar.',
    pergunta: 'O que precisa ser expresso aqui?'
  },
  frontal: {
    falta: 'Confusão, baixa reflexão, dificuldade de aprender.',
    proporcional: 'Compreender o suficiente para escolher, sem eliminar toda incerteza.',
    excesso: 'Análise infinita, busca de certeza impossível.',
    pensamento: 'Analisar, comparar, planejar.',
    emocao: 'Ansiedade com incerteza, alívio com clareza.',
    acao: 'Pesquisar, estudar, adiar decisão.',
    pergunta: 'O que está acontecendo e como posso compreender?'
  },
  coronario: {
    falta: 'Ausência de sentido, desconexão de valores.',
    proporcional: 'Agir com sentido sem exigir controlar todo o caminho.',
    excesso: 'Abstração, fuga do concreto.',
    pensamento: 'Buscar propósito, questionar o sentido.',
    emocao: 'Inspiração ou vazio existencial.',
    acao: 'Ressignificar, confiar, entregar.',
    pergunta: 'Qual é o sentido e com o que estou alinhado?'
  }
};

function detectChakras(text) {
  const lower = text.toLowerCase();
  const keywords = {
    basico: ['segurança', 'seguro', 'estabilidade', 'dinheiro', 'rotina', 'organização', 'medo', 'risco', 'base'],
    sacral: ['prazer', 'sentir', 'criar', 'criatividade', 'emoção', 'vitalidade', 'experiência', 'diversão'],
    plexo: ['decidir', 'decisão', 'meta', 'conquista', 'autonomia', 'limite', 'executar', 'prioridade', 'coragem'],
    cardiaco: ['amor', 'conexão', 'cuidar', 'empatia', 'relacionamento', 'pertencimento', 'confiança', 'outro'],
    laringeo: ['falar', 'expressar', 'comunicar', 'dizer', 'verdade', 'voz', 'conversa', 'explicar'],
    frontal: ['entender', 'compreender', 'aprender', 'analisar', 'clareza', 'estratégia', 'planejar', 'pesquisar'],
    coronario: ['propósito', 'sentido', 'significado', 'valores', 'alinhamento', 'confiar', 'visão']
  };
  const scores = {};
  for (const [id, words] of Object.entries(keywords)) {
    scores[id] = words.filter(w => lower.includes(w)).length;
  }
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const relevant = sorted.filter(([, s]) => s > 0).map(([id]) => id);
  if (relevant.length === 0) return ['basico', 'frontal', 'plexo'];
  return relevant.slice(0, 4);
}

function renderProporcaoOutput(situacao, contexto) {
  const chakras = detectChakras(situacao + ' ' + contexto);
  const container = document.getElementById('saber-output');
  if (!container) return;

  let html = `<p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:1.5rem"><strong>Nota:</strong> Com base no contexto informado, estas são <em>possibilidades</em> para reflexão — não conclusões definitivas.</p>`;

  chakras.forEach(id => {
    const c = CHAKRA_DATA[id];
    const h = CHAKRA_HINTS[id];
    html += `
      <div class="output-chakra" style="--chakra-color:${c.color}">
        <h4>${c.nome}</h4>
        <p><strong>Necessidade:</strong> ${c.necessidade}</p>
        <div class="proportion-row">
          <div class="prop-card prop-falta"><strong>Falta</strong><span>${h.falta}</span></div>
          <div class="prop-card prop-proporcional"><strong>Proporcional</strong><span>${h.proporcional}</span></div>
          <div class="prop-card prop-excesso"><strong>Excesso</strong><span>${h.excesso}</span></div>
        </div>
        <p style="margin-top:0.75rem"><strong>Sinais:</strong> Pensamento — ${h.pensamento} · Emoção — ${h.emocao} · Ação — ${h.acao}</p>
        <div class="output-reflection">${h.pergunta}</div>
      </div>`;
  });

  html += `<p style="font-size:0.875rem;color:var(--text-muted);margin-top:1rem"><strong>Síntese:</strong> Observe qual energia parece liderar nesta situação e quais podem estar em falta ou excesso. Use o Saber da Compatibilidade para cruzar com sua personalidade.</p>`;
  container.className = 'tool-output';
  container.innerHTML = html;
}

function renderCompatibilidadeOutput(principais, opostos, elemento) {
  const container = document.getElementById('saber-output');
  if (!container) return;

  const nomes = principais.map(id => CHAKRA_DATA[id]?.nome).filter(Boolean);
  const opostosNomes = opostos.map(id => CHAKRA_DATA[id]?.nome).filter(Boolean);

  let nivel = 'adaptavel';
  let nivelLabel = 'Adaptável';
  const el = elemento.toLowerCase();
  if (principais.some(id => {
    const words = { basico: ['rotina', 'organiz'], sacral: ['criativ', 'social'], plexo: ['meta', 'lider'], cardiaco: ['equipe', 'cuidar'], laringeo: ['comunic', 'apresent'], frontal: ['analis', 'estrat'], coronario: ['propósito', 'visão'] };
    return (words[id] || []).some(w => el.includes(w));
  })) {
    nivel = 'natural';
    nivelLabel = 'Natural';
  } else if (opostos.length > 0) {
    nivel = 'exigente';
    nivelLabel = 'Exigente';
  }

  let html = `
    <span class="compat-badge compat-${nivel}">${nivelLabel}</span>
    <p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:1.5rem"><strong>Nota:</strong> Compatibilidade é relacional e pode mudar com prática e adaptação. Isto é uma hipótese orientadora.</p>
    <div class="output-chakra">
      <h4>Personalidade analisada</h4>
      <p><strong>Chakras principais:</strong> ${nomes.join(', ') || 'Não informados'}</p>
      ${opostosNomes.length ? `<p><strong>Menos naturais:</strong> ${opostosNomes.join(', ')}</p>` : ''}
    </div>
    <div class="output-chakra">
      <h4>Elemento: ${elemento || 'Não informado'}</h4>
      <p><strong>Tendências prováveis:</strong> Necessidades de ${nomes.slice(0, 2).join(' e ')} tendem a ganhar peso. Capacidades naturais favorecem caminhos alinhados a esses chakras.</p>
      ${opostosNomes.length ? `<p><strong>Esforço possível:</strong> Energias de ${opostosNomes.join(' e ')} podem exigir mais intenção consciente neste contexto.</p>` : ''}
    </div>
    <div class="output-chakra">
      <h4>Pontos de compatibilidade</h4>
      <p>${nivel === 'natural' ? 'O elemento tende a combinar com suas energias principais — caminho com menor custo consciente.' : nivel === 'adaptavel' ? 'Combinação parcial — adaptável com ferramentas e apoio dos chakras disponíveis.' : 'Depende principalmente de capacidades menos naturais — pode representar aprendizado ou prioridade contextual.'}</p>
    </div>
    <div class="output-reflection">Como posso adaptar este caminho para aproximar o que a situação pede do que minha personalidade tende a oferecer?</div>`;

  container.className = 'tool-output';
  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  const formProporcao = document.getElementById('form-proporcao');
  if (formProporcao) {
    formProporcao.addEventListener('submit', e => {
      e.preventDefault();
      const situacao = formProporcao.situacao.value;
      const contexto = formProporcao.contexto.value;
      renderProporcaoOutput(situacao, contexto);
    });
  }

  const formCompat = document.getElementById('form-compatibilidade');
  if (formCompat) {
    formCompat.addEventListener('submit', e => {
      e.preventDefault();
      const principais = [...formCompat.querySelectorAll('input[name="principal"]:checked')].map(i => i.value);
      const opostos = [...formCompat.querySelectorAll('input[name="oposto"]:checked')].map(i => i.value);
      const elemento = formCompat.elemento.value;
      renderCompatibilidadeOutput(principais, opostos, elemento);
    });
  }

  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.toggle('active', c.dataset.filter === filter));
      document.querySelectorAll('.tool-card').forEach(card => {
        if (filter === 'all') {
          card.style.display = '';
        } else {
          card.style.display = card.dataset.chakra === filter ? '' : 'none';
        }
      });
    });
  });
});
