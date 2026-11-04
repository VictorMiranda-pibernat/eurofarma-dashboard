const express = require('express');
const cors = require('cors');
const path = require('path');
const { BigQuery } = require('@google-cloud/bigquery');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const bigqueryProjectId = process.env.BIGQUERY_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT || 'qualidade-poc';
const bigqueryLocation = process.env.BIGQUERY_LOCATION || 'southamerica-east1';
const bigqueryDatasetTable = process.env.BIGQUERY_TABLE || 'warehouse-pibernat.SPA.EUROFARMA_CARDS';

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
      COALESCE(current_phase, 'Pendente') as status,
      COALESCE(refer_ncia_cliente, '') as referencia_cliente,
      COALESCE(refer_ncia_card, CAST(card_id AS STRING), refer_ncia_cliente, 'S/N') as numero_processo,
      COALESCE(respons_vel, 'Não informado') as responsavel,
      COALESCE(planta_do_importador, 'Não informada') as planta,
      COALESCE(categoria, 'Geral') as categoria,
      COALESCE(NULLIF(exportador, ''), NULLIF(nome_do_exportador, ''), 'Não informado') as exportador,
      COALESCE(modal, 'Marítimo') as modal,
      CASE WHEN LOWER(COALESCE(tem_li, '')) IN ('sim', 'yes', 'true', '1') THEN TRUE ELSE FALSE END as possui_li,

      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', data_da_solicita_o) as data_recebimento_pedido,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', recebimento_de_proforma) as data_recebimento_proforma,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', conferencia_de_proforma) as data_conferencia_proforma,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', COALESCE(carga_dispon_vel_na_origem_ajustada_1, carga_dispon_vel_na_origem_1, previs_o_de_disponibilidade_da_carga)) as data_disponibilidade,

      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', recebimento_de_c_pia_de_documentos_1) as data_recebimento_documentos,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', aprova_o_de_c_pia_de_documentos_1) as data_aprovacao_documentos,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', recebimento_draft_bl_1) as data_recebimento_draft_conhecimento,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', aprova_o_draft_bl_1) as data_aprovacao_draft_conhecimento,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', data_efetiva_de_embarque_1) as data_atd,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', COALESCE(conhecimento_de_embarque_assinado_1, emiss_o_de_conhecimento_de_embarque_1, documentos_recebidos_1)) as data_recebimento_conhecimento_original,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', data_do_protocolo_li_1) as data_protocolo_li,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', data_de_envio_instru_o_de_embarque_1) as data_envio_id,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', data_de_emiss_o_li_1) as data_emissao_li,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', data_de_registro_li_1) as data_pagamento_gru,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', autoriza_o_de_embarque_li_pr) as data_deferimento_li,

      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', data_de_chegada_da_carga) as data_chegada_ata,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', presen_a_da_carga) as data_presenca,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', data_de_registro_di) as data_registro_di,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', data_do_desembara_o) as data_desembaraco,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', data_de_solicita_o_de_danfe) as data_solicitacao_danfe,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', data_da_emiss_o_danfe) as data_emissao_danfe,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', libera_o_da_carga) as data_liberacao_transporte,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', sa_da_do_recinto) as data_saida_recinto,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', data_de_entrega_na_planta) as data_entrega_fabrica,

      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', data_de_emiss_o_nfse) as data_emissao_nf,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', faturado) as data_faturado,

      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', data_devolu_o_container_1) as data_devolucao_container,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', limite_de_devolu_o_cntr) as data_inicio_demurrage,
      SAFE_CAST(REGEXP_REPLACE(valor_di_ria_demurrage_usd_1, r'[^0-9.]', '') AS FLOAT64) as valor_demurrage_usd,

      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%S', COALESCE(chegada_da_carga_no_eadi, presen_a_da_carga_no_eadi, data_de_recebimento_do_armaz_m)) as data_entrada_recinto
    FROM \`${bigqueryDatasetTable}\`
  `;

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
      erro: 'Falha ao consultar BigQuery view EUROFARMA_CARDS',
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
