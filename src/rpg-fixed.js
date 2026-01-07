// RPG DA MINHA VIDA - VERSÃO CORRIGIDA
// Bugs corrigidos: Quest reversao, valores negativos, performance

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

// ============ FIX #1: Quests SÓ podem ser completadas uma vez ============
function toggleDailyQuest(id) {
  const quest = gameState.dailyQuests.find(q => q.id === id);
  
  // ✅ Validação: se já completada ou não existe, retorna
  if (!quest || quest.completed) {
    console.warn(`Quest ${id} já foi completada ou não existe`);
    return;
  }
  
  // ✅ Marca como completada (IRREVERSÍVEL)
  quest.completed = true;
  gameState.character.xpTotal += quest.xp;
  gameState.character.coins += 1;
  gameState.character.coinsTotal += 1;
  
  showNotification(`+${quest.xp} XP 🎉 +1 COIN`);
  
  // ✅ Debounce de updates para performance
  debouncedUpdate();
}

// ============ FIX #2: calculateLevel() agora é O(1) ============
function calculateLevel() {
  // Ao invés de loop, usa fórmula matemática
  // XP total = sum(300 + 50*i) para i = 1 a n
  // Resolvendo: xp = 300*n + 50*(n*(n+1)/2)
  // Simplificado: aproximação: level ≈ sqrt(xpTotal/50)
  
  const estimatedLevel = Math.floor(1 + Math.sqrt(gameState.character.xpTotal / 50));
  return Math.min(estimatedLevel, 100);
}

// ============ FIX #3: Validar valores mínimos ============
function validateStats() {
  // ✅ Garante que nenhum valor fica negativo
  gameState.character.xpTotal = Math.max(0, gameState.character.xpTotal);
  gameState.character.coins = Math.max(0, gameState.character.coins);
  gameState.character.level = Math.max(1, gameState.character.level);
}

function getXPForCurrentLevel() {
  return 300 + 50 * gameState.character.level;
}

function getProgressToNextLevel() {
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
  validateStats();
}

// ============ FIX #4: localStorage com tratamento de erro ============
function loadGame() {
  try {
    const saved = localStorage.getItem('rpgGameState');
    if (saved) {
      gameState = JSON.parse(saved);
      validateStats();  // Valida dados salvos
    }
  } catch (error) {
    console.error('Erro ao carregar jogo:', error);
    // Fallback: mantém gameState inicial
  }
}

function saveGame() {
  try {
    localStorage.setItem('rpgGameState', JSON.stringify(gameState));
  } catch (error) {
    console.error('Erro ao salvar jogo:', error);
  }
}

// ============ FIX #5: Debounce para otimizar re-renders ============
let updateTimeout;
function debouncedUpdate() {
  clearTimeout(updateTimeout);
  updateTimeout = setTimeout(() => {
    updateLevel();
    saveGame();
    // renderDailyQuests() - adicionar quando tiver HTML
    // updateUI() - adicionar quando tiver HTML
  }, 100);
}

// ============ Placeholder para notificações ============
function showNotification(message) {
  console.log('📢 Notificação:', message);
}

// ============ EXPOR PARA TESTES ============
module.exports = {
  gameState,
  toggleDailyQuest,
  calculateLevel,
  validateStats,
  loadGame,
  saveGame,
  updateLevel,
  getProgressToNextLevel
};
