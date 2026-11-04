# 📊 Dashboard Operacional de Importação – Eurofarma

Dashboard desenvolvido para acompanhamento dos processos de importação, monitoramento de prazos operacionais e análise de indicadores de desempenho.

O projeto tem como objetivo centralizar informações da operação em uma interface interativa, facilitando a identificação de atrasos, acompanhamento de SLAs e análise dos processos logísticos.

> **Status:** Frontend desenvolvido com dados fictícios para validação. Integração com API REST e Google BigQuery prevista para etapas futuras.

---

## 🎯 Objetivo do projeto

Desenvolver uma ferramenta de acompanhamento operacional que permita:

- Centralizar indicadores dos processos de importação.
- Monitorar prazos e SLAs por modalidade de transporte.
- Identificar processos dentro do prazo, em atenção ou atrasados.
- Acompanhar etapas de desembaraço e logística.
- Monitorar custos relacionados à demurrage.
- Analisar o lead time das operações.
- Facilitar a visualização de informações para apoiar a tomada de decisões.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| React | Construção da interface |
| Vite | Ambiente de desenvolvimento |
| TypeScript | Tipagem e organização do código |
| Tailwind CSS | Estilização da aplicação |
| Lucide React | Ícones |
| Recharts | Gráficos e visualização de dados |

## 📌 Funcionalidades

O dashboard possui seis áreas operacionais:

### 1. Home
Página inicial e ponto de entrada para navegação entre as áreas do sistema.

### 2. Prontidão
Acompanhamento das etapas iniciais da importação:

- Recebimento do pedido.
- Recebimento da proforma.
- Conferência da proforma.
- Disponibilidade da mercadoria.

### 3. Indicadores
Área destinada à apresentação e análise dos indicadores operacionais.

### 4. Desembaraço
Monitoramento das etapas do desembaraço aduaneiro:

- Chegada da carga.
- Presença de carga.
- Registro da DI.
- Deferimento da LI.
- Desembaraço aduaneiro.
- Emissão da DANFE.
- Liberação do transporte.
- Saída do recinto.
- Entrega na fábrica.

Também contempla a diferenciação entre processos com e sem LI.

### 5. Logística e Entregas
Acompanhamento dos prazos logísticos:

- Embarque × Chegada.
- Chegada × Entrega na fábrica.
- Embarque × Entrega na fábrica.
- Comparação entre processos com e sem LI.
- Emissão da NF × Faturamento.

### 6. Gestão de Containers
Monitoramento da devolução de containers e dos custos de demurrage:

- Entrega na fábrica × Devolução do Container.
- Farol de Demurrage – Dias.
- Farol de Demurrage – Valores (USD e BRL).

### 7. Armazenagem e Lead Time
Acompanhamento dos prazos de armazenagem e do tempo total de importação:

- **Vencimento de Armazenagem:** entrada da carga no recinto × saída do recinto.
- **Lead Time do Produto:** ATD (embarque) × entrega na fábrica.

## 🚦 Classificação dos indicadores

Os indicadores operacionais utilizam regras de SLA configuráveis por modalidade de transporte:

- Aéreo.
- Marítimo.
- Rodoviário.

Classificações utilizadas:

| Farol | Significado |
|---|---|
| 🟢 Dentro do Prazo | Dentro do limite estabelecido |
| 🟡 Atenção | Próximo de ultrapassar o SLA |
| 🟠 Alerta | Faixa intermediária de risco, quando configurada |
| 🔴 Atraso | Prazo ultrapassado |
| ⚪ Pendente | Sem informações suficientes para iniciar o cálculo |

Os cálculos consideram calendários de dias úteis ou corridos, conforme a configuração de cada indicador.

## 🏗️ Estrutura do projeto

```text
src/
├── components/
│   ├── dashboard/
│   │   ├── ControleOperacional.tsx
│   │   ├── Indicador.tsx
│   │   ├── GraficoStatus.tsx
│   │   ├── TabelaProcessos.tsx
│   │   └── IndicadorDemurrageValores.tsx
│   │
│   └── layout/
│       ├── Layout.tsx
│       └── Navbar.tsx
│
├── data/
│   ├── mockProntidao.ts
│   ├── mockIndicadores.ts
│   ├── mockDesembaraco.ts
│   ├── mockLogistica.ts
│   ├── mockGestaoContainers.ts
│   └── mockArmazenagemLeadTime.ts
│
├── pages/
│   ├── Home.tsx
│   ├── Prontidao.tsx
│   ├── Indicadores.tsx
│   ├── Desembaraco.tsx
│   ├── Logistica.tsx
│   ├── GestaoContainers.tsx
│   └── ArmazenagemLeadTime.tsx
│
├── types/
│   ├── controle.ts
│   └── metricas.ts
│
└── utils/
    └── calcularStatus.ts
```

*Observação: a estrutura acima representa os principais arquivos do projeto. Existem também arquivos complementares de configuração de métricas e outros arquivos de inicialização.*

## ⚙️ Executando o projeto localmente

### Pré-requisitos

- Node.js
- npm

### 1. Clonar o repositório

```bash
git clone https://github.com/VictorMiranda-pibernat/eurofarma-dashboard.git
```

### 2. Entrar na pasta do projeto

```bash
cd eurofarma-dashboard
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Executar a aplicação

```bash
npm run dev
```

### 5. Acessar o dashboard

Abra no navegador o endereço apresentado pelo Vite, normalmente:

```text
http://localhost:5173
```

## 🔄 Arquitetura planejada

A arquitetura futura prevê a integração do frontend com uma API REST, que será responsável por disponibilizar os dados analíticos armazenados no Google BigQuery.

```text
             Google BigQuery
                    |
                    v
                 API REST
             (Node.js / Express)
                    |
                    v
              React Dashboard
                    |
                    v
          Indicadores e Visualizações
```

Essa estrutura permitirá substituir os dados fictícios por informações reais da operação, mantendo a organização e os componentes já desenvolvidos no frontend.

## 📍 Status do desenvolvimento

| Etapa | Situação |
|---|---|
| Estrutura inicial do frontend | Concluída |
| Navegação entre páginas | Concluída |
| Componentes reutilizáveis | Concluídos |
| Indicadores de Prontidão | Desenvolvidos |
| Indicadores de Desembaraço | Desenvolvidos |
| Indicadores de Logística | Desenvolvidos |
| Gestão de Containers | Desenvolvida |
| Armazenagem e Lead Time | Desenvolvida |
| Validação com dados fictícios | Em andamento |
| Modelagem e integração com BigQuery | Planejada |
| Desenvolvimento da API REST | Planejado |
| Integração com dados reais | Planejada |

## 🚀 Próximas etapas

- Consolidar e validar as regras de negócio com a equipe de importação.
- Revisar a estrutura dos dados operacionais.
- Preparar as tabelas analíticas no Google BigQuery.
- Desenvolver a API REST com Node.js, Express e TypeScript.
- Integrar o frontend à API.
- Substituir os dados fictícios pelos dados reais.
- Validar os indicadores com a operação.
- Preparar a aplicação para publicação.

---

**Desenvolvido por:** Victor Miranda  
**Projeto:** Dashboard Operacional de Importação – Eurofarma
