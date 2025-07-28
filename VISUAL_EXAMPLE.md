# Exemplo Visual - Ranking de Top Compradores

## Como ficará a tela de Campanhas

### Lista de Campanhas (Lado Esquerdo)
```
┌─────────────────────────────────────┐
│ Campanhas Ativas                    │
├─────────────────────────────────────┤
│ ▶ Campanha de Natal 2025            │
│   Promoções especiais de fim de ano │
│   [🟢 Ativa] [Ver Minigames]        │
├─────────────────────────────────────┤
│   Campanha Black Friday             │
│   Descontos imperdíveis             │
│   [⚫ Inativa] [Ver Minigames]      │
└─────────────────────────────────────┘
```

### Ranking de Top Compradores (Lado Direito)
```
┌─────────────────────────────────────────────────────────┐
│ 🏆 Top Compradores                                      │
├─────┬─────────────┬──────────────┬───────────┬─────────┤
│Rank │ Nome        │ Email        │Total Gasto│Compras  │
├─────┼─────────────┼──────────────┼───────────┼─────────┤
│ 🥇  │ Usuário 1   │ user1@...    │ R$ 2,450.00│   5    │
│ 🥈  │ Usuário 4   │ user4@...    │ R$ 1,890.50│   4    │
│ 🥉  │ Usuário 7   │ user7@...    │ R$ 1,675.00│   3    │
│ 4º  │ Usuário 2   │ user2@...    │ R$ 1,230.00│   3    │
│ 5º  │ Usuário 9   │ user9@...    │ R$ 980.75  │   2    │
│ 6º  │ Usuário 3   │ user3@...    │ R$ 750.00  │   2    │
│ 7º  │ Usuário 6   │ user6@...    │ R$ 650.50  │   1    │
│ 8º  │ Usuário 10  │ user10@...   │ R$ 525.00  │   1    │
│ 9º  │ Usuário 5   │ user5@...    │ R$ 450.00  │   1    │
│ 10º │ Usuário 8   │ user8@...    │ R$ 325.25  │   1    │
└─────┴─────────────┴──────────────┴───────────┴─────────┘
```

## Resposta da API de Ranking

```json
{
  "campaignId": "f0956192-801d-4f8f-858f-41f017e61a98",
  "topBuyers": [
    {
      "rank": 1,
      "userId": "123e4567-e89b-12d3-a456-426614174000",
      "userName": "Usuário 1",
      "userEmail": "user1@example.com",
      "totalAmount": "2450.00",
      "purchaseCount": 5
    },
    {
      "rank": 2,
      "userId": "223e4567-e89b-12d3-a456-426614174001",
      "userName": "Usuário 4",
      "userEmail": "user4@example.com",
      "totalAmount": "1890.50",
      "purchaseCount": 4
    }
  ],
  "totalCount": 10
}
```

## Erro 403 Corrigido para Minigames

### Antes (Erro genérico):
```json
{
  "statusCode": 403,
  "message": "Forbidden resource"
}
```

### Depois (Erro completo e formatado):
```json
{
  "error": "Forbidden",
  "message": "Forbidden resource",
  "statusCode": 403,
  "timestamp": "2025-01-28T11:45:13.394Z",
  "method": "GET",
  "path": "/api/admin/minigames/campaign/f0956192-801d-4f8f-858f-41f017e61a98"
}
```

## Card no Dashboard Admin

```
┌─────────────────────────────────────────┐
│ 🏆 Campanhas e Rankings                 │
│                                         │
│ Gerencie campanhas e veja o ranking    │
│ de compradores                          │
│                                         │
│ [     Acessar Campanhas     ]          │
└─────────────────────────────────────────┘
```