// RPG DA MINHA VIDA - CÓDIGO ATUAL (com bugs conhecidos)
// Análise completa disponível em: docs/code-review-v1.md

let gameState = {
  character: { name: 'Jogador', level: 1, xpCurrent: 0, xpTotal: 0, coins: 5, coinsTotal: 5 },
  dailyQuests: [
    { id: 1, name: '🌅 Acordar Cedo', desc: 'Acordar às 9h e tomar água', xp: 50, completed: false },
    { id: 2, name: '☀️ Banho de Sol', desc: '15min de sol direto', xp: 30, completed: false },
    { id: 3, name: '☕ Café Proteico', desc: 'Café + proteína de manhã', xp: 25, completed: false },
    { id: 4, name: '📚 Leitura/Meditação', desc: '30min de leitura ou meditação', xp: 40, completed: false },
    { id: 5, name: '📝 Planejamento', desc: 'Planejar o dia em 10min', xp: 10, completed: false },
    { id: 6, name: '📵 Sem Telas', desc: 'Sem celular antes do meio-dia', xp: 20, completed: false },
    { id: 7, name: '🎯 Primeira Ação', desc: 'Executar tarefa importante', xp: 60, completed: false },
    { id: 8, name: '🔇 Digital Detox', desc: 'Sem redes sociais após 21h', xp: 50, completed: false },
    { id: 9, name: '😴 Dormir Cedo', desc: 'Ir dormir antes das 23h', xp: 50, completed: false }
  ],
  pillars: { corpo: 25, mente: 20, social: 15, financeiro: 10, pessoal: 30 }
};

// ============ BUG CRÍTICO #1: Toggle permite reversao de quests ============
function toggleDailyQuest(id) {
  const quest = gameState.dailyQuests.find(q => q.id === id);
  if (quest) {
    quest.completed = !quest.completed;  // ❌ PERMITE DESMARCAR
    if (quest.completed) {
      gameState.character.xpTotal += quest.xp;
      gameState.character.coins += 1;
    } else {
      // ❌ BUG: Pode ficar negativo!
      gameState.character.xpTotal -= quest.xp;
      gameState.character.coins -= 1;
    }
    updateLevel();
    saveGame();
    renderDailyQuests();
    updateUI();
  }
}

// ============ BUG ALTO #2: Loop O(n) extremamente ineficiente ============
function calculateLevel() {
  let level = 1;
  let totalXpNeeded = 0;
  // ❌ Se xpTotal = 1.000.000, roda ~10.000 vezes!
  while (totalXpNeeded + (300 + 50 * level) <= gameState.character.xpTotal) {
    totalXpNeeded += 300 + 50 * level;
    level++;
  }
  return Math.min(level, 100);
}

function getXPForCurrentLevel() {
  return 300 + 50 * gameState.character.level;
}

function getProgressToNextLevel() {
  // ❌ Função incompleta
  let totalXpNeeded = 0;
  for (let i = 1; i < gameState.character.level; i++) {
    totalXpNeeded += 300 + 50 * i;
  }
  gameState.character.xpCurrent = gameState.character.xpTotal - totalXpNeeded;
  return gameState.character.xpCurrent;
}

function updateLevel() {
  gameState.character.level = calculateLevel();
  getProgressToNextLevel();
}

function loadGame() {
  const saved = localStorage.getItem('rpgGameState');
  if (saved) gameState = JSON.parse(saved);  // ❌ Sem try/catch!
}

function saveGame() {
  localStorage.setItem('rpgGameState', JSON.stringify(gameState));
}

// ===========================================================
// NOTA: Versão corrigida em: src/rpg-fixed.js
// ===========================================================
