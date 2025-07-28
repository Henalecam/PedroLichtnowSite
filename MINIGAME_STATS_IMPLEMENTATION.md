# Implementação de Estatísticas para Minigames

## Resumo das Mudanças

Esta implementação adiciona um sistema completo de estatísticas para minigames, incluindo tracking de números jogados, performance dos usuários e estatísticas globais da campanha.

## 1. Correção do Erro de Enum

O erro original estava ocorrendo porque o código estava tentando usar o valor `'completed'` no enum `participation_status_enum`, mas esse valor não existia. 

**Solução:** 
- Atualizado o enum para conter apenas os valores: `'active'`, `'inactive'`, `'pending'`
- Criado script de migração que atualiza qualquer valor `'completed'` existente para `'inactive'`

## 2. Novas Tabelas Criadas

### `participations`
Tabela para rastrear participações gerais em campanhas:
- `id`: UUID (PK)
- `user_id`: Referência ao usuário
- `campaign_id`: Referência à campanha
- `quantity`: Número de participações
- `status`: Enum ('active', 'inactive', 'pending')
- `created_at`, `updated_at`: Timestamps

### `minigame_participations`
Armazena cada jogada individual em um minigame:
- `id`: UUID (PK)
- `user_id`, `minigame_id`, `campaign_id`: Referências
- `score`: Pontuação obtida
- `numbers`: Array JSON com os números escolhidos
- `play_duration`: Duração da jogada em segundos
- `metadata`: JSON com dados adicionais do jogo
- `created_at`: Timestamp

### `minigame_statistics`
Estatísticas agregadas por usuário por minigame:
- Estatísticas gerais: total de jogadas, pontuação total/média
- Estatísticas de números: maior/menor número, mais frequente, números da sorte
- Performance: melhor/pior pontuação, sequências de jogadas
- Tempo: tempo total/médio de jogo
- Constraint única em (user_id, minigame_id)

### `campaign_statistics`
Estatísticas globais da campanha:
- Total de participantes e jogadas
- Número mais/menos jogado globalmente
- Distribuição completa de números
- Melhor pontuação global e usuário
- Média de pontuação de todos usuários

## 3. Serviço de Estatísticas

Criado `MinigameStatsService` em `server/routes/minigame-stats.ts` com métodos:

- `recordParticipation()`: Registra nova participação e atualiza todas as estatísticas
- `updateUserStatistics()`: Atualiza estatísticas do usuário
- `updateCampaignStatistics()`: Atualiza estatísticas globais
- `getUserStats()`: Busca estatísticas de um usuário
- `getCampaignStats()`: Busca estatísticas da campanha
- `getLeaderboard()`: Retorna ranking dos melhores jogadores

## 4. API Endpoints

Rotas criadas em `server/routes/minigame-api.ts`:

### POST `/api/minigames/participations`
Registra uma nova participação no minigame
```json
{
  "minigameId": "uuid",
  "campaignId": "uuid", 
  "score": 100,
  "numbers": [1, 5, 10, 15],
  "playDuration": 120,
  "metadata": {}
}
```

### GET `/api/minigames/stats/user/:minigameId`
Retorna estatísticas do usuário autenticado para um minigame

### GET `/api/minigames/stats/campaign/:campaignId`
Retorna estatísticas globais de uma campanha

### GET `/api/minigames/leaderboard/:minigameId`
Retorna o ranking dos melhores jogadores

### GET `/api/minigames/participations/recent`
Retorna as jogadas recentes do usuário

### GET `/api/minigames/stats/numbers/:campaignId`
Retorna distribuição de números jogados na campanha

## 5. Recursos de Destaque

### Tracking de Números
- **Números mais jogados**: Sistema identifica os números favoritos de cada usuário
- **Lucky numbers**: Top 5 números mais frequentes do usuário
- **Distribuição global**: Mapa completo de quantas vezes cada número foi jogado

### Performance Tracking
- **Streaks**: Rastreia sequências de dias jogados consecutivos
- **Melhores/piores scores**: Mantém registro de extremos
- **Médias**: Calcula médias de pontuação e tempo de jogo

### Otimizações
- Índices criados para queries frequentes
- Triggers automáticos para atualizar `updated_at`
- Agregações incrementais (não recalcula tudo a cada jogada)

## 6. Scripts de Migração

### Executar migração:
```bash
npm run migrate:minigame-stats
```

### Script também disponível em:
`server/scripts/migrate-minigame-stats.ts`

## 7. Próximos Passos

Para usar o sistema:

1. Execute a migração quando o banco estiver disponível
2. Integre o `MinigameStatsService.recordParticipation()` nos minigames existentes
3. Use os endpoints da API para exibir estatísticas no frontend

## Exemplo de Uso

```typescript
// Ao finalizar uma jogada no minigame:
await MinigameStatsService.recordParticipation({
  userId: "user-uuid",
  minigameId: "minigame-uuid",
  campaignId: "campaign-uuid",
  score: 150,
  numbers: [7, 14, 21, 28, 35],
  playDuration: 180,
  metadata: {
    level: 3,
    bonusUsed: true
  }
});
```

## Benefícios

1. **Para usuários**: Podem ver seus números da sorte, performance e evolução
2. **Para administradores**: Insights sobre números mais populares, engajamento
3. **Para campanhas**: Dados para ajustar mecânicas e prêmios baseados em estatísticas reais