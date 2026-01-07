# 🎮 RPG DA MINHA VIDA 2026

Um projeto de gamificação de hábitos e tarefas diárias, transformando sua vida em um RPG real.

## 📊 Status do Projeto

- **Versão:** 1.0.0-beta
- **Status:** Em refatoração (correção de bugs críticos)
- **Fase:** Iniciante → Intermediária

## 🎯 Objetivo

Aprender **IA + Code Review + Desenvolvimento profissional** enquanto constrói uma aplicação real de gamificação.

## 📁 Estrutura do Projeto

```
rpg-vida/
├── docs/           # Documentação e análises
├── src/            # Código fonte
│   ├── html/       # Versão HTML (web)
│   └── base44/     # Estrutura de dados
├── tests/          # Testes automáticos
├── code-review/    # Análises de código (AI-powered)
└── README.md
```

## 🐛 Bugs Conhecidos (Críticos)

1. **[CRÍTICO]** Reversão de quests diárias permite exploit de XP
2. **[CRÍTICO]** Valores de XP e coins podem ficar negativos
3. **[ALTO]** calculateLevel() tem loop ineficiente (O(n))
4. **[ALTO]** Sistema de levels na BASE44 não herda overflow correto
5. **[MÉDIO]** getProgressToNextLevel() não está definida

## 🚀 Roadmap de Correções

- [ ] Fix: Quests irreversíveis (toggleDailyQuest)
- [ ] Fix: Validação de valores mínimos (coins/xp >= 0)
- [ ] Fix: Otimizar calculateLevel() para O(1)
- [ ] Fix: Sistema de progression na BASE44
- [ ] Feature: Sistema de streaks com reset automático
- [ ] Feature: Notificações (email/SMS)
- [ ] Feature: Integração com Notion
- [ ] Feature: Dashboard de análises

## 📚 Aprendizados

### Aula 1: Code Review com IA
- Como usar Perplexity API para analisar código
- Identificar bugs críticos, médios e baixos
- Otimizações de performance

### Aula 2: Debugging Profissional
- Entender logs e mensagens de erro
- Validação de dados
- Tratamento de edge cases

---

**Desenvolvido com ❤️ e IA**
