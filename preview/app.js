const previewRecipes = window.module.exports.recipes;
const state = {
  recipe: previewRecipes[0],
  cookingIndex: Number(localStorage.getItem('preview:cookingIndex') || 0)
};

const views = ['list', 'detail', 'shopping', 'prep', 'cooking'];

function showView(name) {
  views.forEach((view) => {
    document.querySelector(`#view-${view}`).classList.toggle('is-active', view === name);
    document.querySelector(`[data-view="${view}"]`).classList.toggle('is-active', view === name);
  });
}

function bindTabs() {
  document.querySelectorAll('[data-view]').forEach((button) => {
    button.addEventListener('click', () => showView(button.dataset.view));
  });
}

function renderList(keyword = '') {
  const list = document.querySelector('#recipe-list');
  const filtered = previewRecipes.filter((recipe) => recipe.name.includes(keyword.trim()));

  if (!filtered.length) {
    list.innerHTML = '<div class="card recipe-body muted">没有找到匹配菜品</div>';
    return;
  }

  list.innerHTML = filtered.map((recipe) => `
    <article class="card recipe-card">
      <img src="${recipe.coverImage}" alt="${recipe.name}" />
      <div class="recipe-body">
        <h3>${recipe.name}</h3>
        <p>${recipe.description}</p>
        <div class="meta-row">
          <span class="meta">难度 ${recipe.difficulty}/5</span>
          <span class="meta">${recipe.timeMinutes} 分钟</span>
          <span class="meta">${recipe.serving}</span>
        </div>
        <div class="pill-row">${recipe.tags.map((tag) => `<span class="pill">${tag}</span>`).join('')}</div>
        <div class="action-row" style="margin-top: 18px;">
          <button class="primary" data-open-detail>查看详情</button>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('[data-open-detail]').forEach((button) => {
    button.addEventListener('click', () => showView('detail'));
  });
}

function renderDetail() {
  const recipe = state.recipe;
  document.querySelector('#detail-content').innerHTML = `
    <div class="detail-grid">
      <div class="card detail-body">
        <h3>${recipe.name}</h3>
        <p>${recipe.description}</p>
        <div class="stat-grid">
          <div class="stat"><strong>${recipe.timeMinutes} 分钟</strong><span class="muted">总耗时</span></div>
          <div class="stat"><strong>${recipe.difficulty}/5</strong><span class="muted">难度</span></div>
          <div class="stat"><strong>${recipe.serving}</strong><span class="muted">份量</span></div>
        </div>
        <h3>适合谁做</h3>
        <ul class="line-list">${recipe.suitableUsers.map((item) => `<li>${item}</li>`).join('')}</ul>
        <h3>成功关键点</h3>
        <ul class="line-list">${recipe.coreTips.map((item) => `<li>${item}</li>`).join('')}</ul>
        <div class="action-row">
          <button class="primary" data-jump="shopping">查看买菜清单</button>
          <button class="secondary" data-jump="prep">我已有食材，去备菜</button>
          <button class="secondary" data-jump="cooking">直接开始做菜</button>
        </div>
      </div>
      <img class="hero-image card" src="${recipe.coverImage}" alt="${recipe.name}" />
    </div>
  `;
}

function renderShopping() {
  const recipe = state.recipe;
  document.querySelector('#shopping-content').innerHTML = `
    <div class="shopping-list">
      ${recipe.ingredients.map((item) => `
        <article class="card shopping-item">
          <label class="checkbox-line">
            <input type="checkbox" />
            <span><strong>${item.name}</strong> <span class="muted">${item.amount} · ${item.type} · ${item.required ? '必需' : '可选'}</span></span>
          </label>
          <p>${item.description}</p>
          <div class="tips">
            <strong>挑选口诀：${item.selectionTips.simpleRule}</strong>
            <span class="muted">推荐：${item.selectionTips.preferred.join('、')}</span>
            <span class="muted">避开：${item.selectionTips.avoid.join('、')}</span>
            <span class="muted">可替代：${item.substitutes.join('；')}</span>
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

function renderPrep() {
  const recipe = state.recipe;
  document.querySelector('#prep-content').innerHTML = `
    <div class="card detail-body">
      <h3>需要工具</h3>
      <div class="pill-row">${recipe.tools.map((tool) => `<span class="pill">${tool}</span>`).join('')}</div>
    </div>
    <div class="prep-list" style="margin-top: 16px;">
      ${recipe.prepSteps.map((step, index) => `
        <article class="card prep-step">
          <h3>${index + 1}. ${step.title}</h3>
          <p>${step.action}</p>
          <div class="info-box"><strong>为什么这样排</strong><span>${step.reason}</span></div>
          <div class="info-box"><strong>完成判断</strong><span>${step.completionState}</span></div>
          <span class="muted">预计 ${step.estimatedMinutes} 分钟</span>
        </article>
      `).join('')}
    </div>
  `;
}

function renderCooking() {
  const recipe = state.recipe;
  const step = recipe.cookingSteps[state.cookingIndex];
  document.querySelector('#cooking-content').innerHTML = `
    <div class="cooking-layout">
      <article class="card cooking-card">
        <p class="muted">第 ${state.cookingIndex + 1} / ${recipe.cookingSteps.length} 步</p>
        <div class="progress"><span style="width: ${(state.cookingIndex + 1) * 100 / recipe.cookingSteps.length}%"></span></div>
        <h3 style="margin-top: 18px;">${step.title}</h3>
        <div class="focus"><strong>现在做什么</strong>${step.action}</div>
        <div class="stat-grid">
          <div class="stat"><strong>${step.heatLevel}</strong><span class="muted">火候</span></div>
          <div class="stat"><strong>${step.estimatedTime}</strong><span class="muted">时间</span></div>
        </div>
        <h3>看到这些状态再继续</h3>
        <ul class="line-list">${step.stateJudgements.map((item) => `<li>${item}</li>`).join('')}</ul>
        <h3>下一步条件</h3>
        <p>${step.nextStepCondition}</p>
        <h3>新手提醒</h3>
        <ul class="line-list">${step.beginnerTips.map((item) => `<li>${item}</li>`).join('')}</ul>
        <div class="nav-row">
          <button class="secondary" data-step="-1" ${state.cookingIndex === 0 ? 'disabled' : ''}>上一步</button>
          <button class="primary" data-step="1">${state.cookingIndex === recipe.cookingSteps.length - 1 ? '完成' : '下一步'}</button>
        </div>
      </article>
      <aside class="card help-card">
        <h3>常见错误</h3>
        <ul class="line-list">${step.mistakes.map((item) => `<li>${item}</li>`).join('')}</ul>
        <h3>可执行补救</h3>
        <ul class="line-list">${step.rescues.map((item) => `<li>${item}</li>`).join('')}</ul>
      </aside>
    </div>
  `;

  document.querySelectorAll('[data-step]').forEach((button) => {
    button.addEventListener('click', () => {
      const next = state.cookingIndex + Number(button.dataset.step);
      state.cookingIndex = Math.max(0, Math.min(next, recipe.cookingSteps.length - 1));
      localStorage.setItem('preview:cookingIndex', state.cookingIndex);
      renderCooking();
    });
  });
}

function bindActions() {
  document.querySelector('#search').addEventListener('input', (event) => renderList(event.target.value));
  document.querySelector('#copy-shopping').addEventListener('click', async () => {
    const text = state.recipe.ingredients
      .map((item) => `${item.name} ${item.amount} ${item.required ? '必需' : '可选'}`)
      .join('\n');
    await navigator.clipboard.writeText(text);
    document.querySelector('#copy-shopping').textContent = '已复制';
    setTimeout(() => {
      document.querySelector('#copy-shopping').textContent = '复制清单';
    }, 1200);
  });

  document.body.addEventListener('click', (event) => {
    const target = event.target.closest('[data-jump]');
    if (target) {
      showView(target.dataset.jump);
    }
  });
}

bindTabs();
bindActions();
renderList();
renderDetail();
renderShopping();
renderPrep();
renderCooking();
