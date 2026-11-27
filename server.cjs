const express = require('express');
const cors = require('cors');
const path = require('path');
const { BigQuery } = require('@google-cloud/bigquery');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const bigqueryProjectId = process.env.BIGQUERY_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT || 'warehouse-pibernat';
const bigqueryLocation = process.env.BIGQUERY_LOCATION || 'southamerica-east1';
const bigqueryDatasetTable = process.env.BIGQUERY_TABLE || 'warehouse-pibernat.SPA.EUROFARMA_PROCESSOS';

const bigquery = new BigQuery({ projectId: bigqueryProjectId });

// Cache em memória para não sobrecarregar o BigQuery a cada requisição
let memoryCache = {
  data: null,
  timestamp: 0,
};
const CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutos

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'eurofarma-dashboard',
    timestamp: new Date().toISOString(),
    bigqueryProject: bigqueryProjectId,
    table: bigqueryDatasetTable,
  });
});

app.get('/api/processos', async (req, res) => {
  const forceRefresh = req.query.refresh === 'true';
  const now = Date.now();

  if (!forceRefresh && memoryCache.data && now - memoryCache.timestamp < CACHE_TTL_MS) {
    return res.json({
      origem: 'cache',
      total: memoryCache.data.length,
      atualizadoEm: new Date(memoryCache.timestamp).toISOString(),
      dados: memoryCache.data,
    });
  }

  const query = `
    SELECT
  COALESCE(STATUS_PROCESSO, 'Pendente') AS status,
  COALESCE(REFERENCIA_CLIENTE, '') AS referencia_cliente,
  COALESCE(
    NULLIF(REFERENCIA_PIBERNAT, ''),
    NULLIF(REFERENCIA_CLIENTE, ''),
    'S/N'
  ) AS numero_processo,

  COALESCE(RESPONSAVEL, 'Não informado') AS responsavel,
  COALESCE(PLANTA_IMPORTADOR, 'Não informada') AS planta,
  COALESCE(CATEGORIA, 'Geral') AS categoria,
  COALESCE(
    NULLIF(EXPORTADOR, ''),
    NULLIF(NOME_EXPORTADOR, ''),
    'Não informado'
  ) AS exportador,
  COALESCE(MODAL, 'Não informado') AS modal,

  CAST(NULL AS BOOL) AS possui_li,

  CAST(NULL AS STRING) AS data_recebimento_pedido,
  CAST(NULL AS STRING) AS data_recebimento_proforma,
  CAST(NULL AS STRING) AS data_conferencia_proforma,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', CARGA_DISPONIVEL
  ) AS data_disponibilidade,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', DOCUMENTOS_RECEBIDOS
  ) AS data_recebimento_documentos,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', APROVACAO_COPIA_DOCUMENTOS
  ) AS data_aprovacao_documentos,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', RECEBIMENTO_DRAFT_BL
  ) AS data_recebimento_draft_conhecimento,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', APROVACAO_DRAFT_BL
  ) AS data_aprovacao_draft_conhecimento,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', DATA_EFETIVA_EMBARQUE
  ) AS data_atd,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', CONHECIMENTO_EMBARQUE
  ) AS data_recebimento_conhecimento_original,

  CAST(NULL AS STRING) AS data_protocolo_li,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', ENVIO_INSTRUCAO_DESEMBARACO
  ) AS data_envio_id,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S',
    DATA_REALIZADA_IM0068_DATA_EMISSAO_LI
  ) AS data_emissao_li,

  CAST(NULL AS STRING) AS data_pagamento_gru,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S',
    DATA_REALIZADA_IM0079_DEFERIMENTO_LI
  ) AS data_deferimento_li,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', DATA_DE_CHEGADA_CARGA
  ) AS data_chegada_ata,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', PRESENCA_CARGA
  ) AS data_presenca,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', DATA_REGISTRO_DI
  ) AS data_registro_di,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', DATA_DESEMBARACO
  ) AS data_desembaraco,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', DATA_SOLICITACAO_DANFE
  ) AS data_solicitacao_danfe,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', DATA_EMISSAO_DANFE
  ) AS data_emissao_danfe,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', DATA_RECEBIMENTO_DANFE
  ) AS data_recebimento_danfe,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', LIBERACAO_CARGA
  ) AS data_liberacao_transporte,

  COALESCE(STATUS_LIBERACAO_CARGA, '') AS status_liberacao_carga,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', SAIDA_RECINTO
  ) AS data_saida_recinto,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', CHEGADA_DESTINO
  ) AS data_chegada_destino,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', DATA_ENTREGA_PLANTA
  ) AS data_entrega_fabrica,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', DATA_EMISSAO_NFSE
  ) AS data_emissao_nf,

  FORMAT_TIMESTAMP(
    '%Y-%m-%dT%H:%M:%S', DEVOLUCAO_EQUIPAMENTO
  ) AS data_devolucao_container,

  FORMAT_TIMESTAMP(
  '%Y-%m-%dT%H:%M:%S',
  VENCIMENTO_ARMAZENAGEM
) AS data_vencimento_armazenagem,

  FREE_TIME_DEMURRAGE AS free_time_demurrage,

  REFERENCIA_PIBERNAT AS referencia_pibernat,
  RESPONSAVEL_ABERTURA AS responsavel_abertura,
  STATUS_EMBARQUE AS status_embarque,
  NOME_EXPORTADOR AS nome_exportador,
  IMPORTADOR AS importador,
  RECINTO_ALFANDEGADO AS recinto_alfandegado,
  PARAMETRIZACAO AS parametrizacao,

  CAST(NULL AS STRING) AS data_faturado,
  CAST(NULL AS STRING) AS data_inicio_demurrage,
  CAST(NULL AS FLOAT64) AS valor_demurrage_usd,
  CAST(NULL AS STRING) AS data_entrada_recinto

FROM \`${bigqueryDatasetTable}\` AS t

QUALIFY
  NULLIF(TRIM(REFERENCIA_PIBERNAT), '') IS NULL
  OR ROW_NUMBER() OVER (
    PARTITION BY
      TRIM(REFERENCIA_CLIENTE),
      TRIM(REFERENCIA_PIBERNAT)
    ORDER BY TO_JSON_STRING(t)
  ) = 1
  ` ;

  try {
    const [rows] = await bigquery.query({
      query,
      location: bigqueryLocation,
    });

    memoryCache = {
      data: rows,
      timestamp: Date.now(),
    };

    res.json({
      origem: 'bigquery',
      total: rows.length,
      atualizadoEm: new Date(memoryCache.timestamp).toISOString(),
      dados: rows,
    });
  } catch (err) {
    console.error('Erro ao consultar BigQuery:', err);
    if (memoryCache.data) {
      // Retorna cache anterior se houver falha temporária
      return res.json({
        origem: 'cache_fallback_apos_erro',
        total: memoryCache.data.length,
        atualizadoEm: new Date(memoryCache.timestamp).toISOString(),
        aviso: 'Erro na consulta mais recente; exibindo cache anterior.',
        dados: memoryCache.data,
      });
    }
    res.status(500).json({
      erro: 'Falha ao consultar BigQuery view EUROFARMA_PROCESSOS',
      detalhes: err.message,
    });
  }
});

// Arquivos estáticos do frontend (após npm run build)
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback SPA para todas as outras rotas (compatível com Express 5)
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[eurofarma-dashboard] Servidor rodando na porta ${PORT}`);
  console.log(`[eurofarma-dashboard] BigQuery: ${bigqueryDatasetTable} (${bigqueryLocation})`);
});
