/* ─────────────────────────────────────────────────
   FAQ Data — typed, filterable, categorized
   ───────────────────────────────────────────────── */

export type FaqCategory =
  | "instalacao"
  | "requisitos"
  | "problemas"
  | "conta"
  | "seguranca";

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  /** Optional numbered steps rendered as <ol> */
  steps?: string[];
  tags: string[];
}

export const categoryLabels: Record<FaqCategory, string> = {
  requisitos: "Requisitos",
  instalacao: "Instalação",
  problemas: "Solução de problemas",
  conta: "Conta e assinatura",
  seguranca: "Segurança e integridade",
};

export const categoryOrder: FaqCategory[] = [
  "requisitos",
  "instalacao",
  "problemas",
  "conta",
  "seguranca",
];

export const faqData: FaqItem[] = [
  /* ── Requisitos ── */
  {
    id: "req-01",
    category: "requisitos",
    question: "Quais requisitos eu preciso antes de instalar?",
    answer:
      "Antes de iniciar a instalação, certifique-se de que seu sistema atende aos seguintes pré-requisitos para evitar erros de execução e garantir compatibilidade total:",
    steps: [
      "DirectX 11 e DirectX 12 instalados e atualizados. O software depende de componentes gráficos que exigem ambas as versões.",
      "Microsoft Visual C++ Redistributable atualizado. Instale os pacotes mais recentes (2015–2022) pelo site oficial da Microsoft.",
      "Windows atualizado. Verifique em Configurações > Windows Update se há atualizações pendentes, incluindo atualizações cumulativas e de segurança.",
      "Drivers de GPU atualizados. Acesse o site do fabricante (NVIDIA, AMD ou Intel) e baixe a versão mais recente para sua placa de vídeo.",
    ],
    tags: ["directx", "visual c++", "drivers", "gpu", "windows", "requisitos"],
  },
  {
    id: "req-02",
    category: "requisitos",
    question: "Como verificar minha versão do DirectX?",
    answer:
      "Você pode verificar rapidamente qual versão do DirectX está instalada usando a ferramenta de diagnóstico do Windows:",
    steps: [
      "Pressione Win + R para abrir a caixa Executar.",
      "Digite dxdiag e pressione Enter.",
      "Na aba Sistema, localize o campo Versão do DirectX na parte inferior.",
      "Confirme que aparece DirectX 12 ou superior. Caso esteja em uma versão anterior, atualize o Windows para obter a versão mais recente.",
    ],
    tags: ["directx", "dxdiag", "versão", "diagnóstico"],
  },
  {
    id: "req-03",
    category: "requisitos",
    question: "Quais versões do Visual C++ eu preciso?",
    answer:
      "O software depende de bibliotecas do Microsoft Visual C++ Redistributable. Recomendamos instalar os pacotes referentes aos anos 2015, 2017, 2019 e 2022, que são agrupados em um único instalador unificado na página oficial da Microsoft. Instale ambas as versões: x86 (32 bits) e x64 (64 bits), mesmo que seu sistema seja 64 bits, pois alguns componentes internos utilizam a versão 32 bits. Após a instalação, reinicie o computador para que as alterações sejam aplicadas.",
    tags: ["visual c++", "vcredist", "msvcp", "vcruntime", "dll", "microsoft"],
  },

  /* ── Instalação ── */
  {
    id: "inst-01",
    category: "instalacao",
    question: "Como instalar corretamente?",
    answer:
      "Siga o procedimento padrão abaixo para uma instalação limpa e segura:",
    steps: [
      "Baixe o instalador exclusivamente pelo canal oficial (Discord ou site). Nunca utilize fontes de terceiros.",
      "Antes de executar, desative temporariamente o antivírus ou adicione a pasta de destino à lista de exclusões. Alguns antivírus podem bloquear componentes legítimos por falso positivo.",
      "Verifique a integridade do arquivo baixado. Se um checksum (SHA-256) for fornecido no canal de download, compare-o com o do arquivo local.",
      "Execute o instalador como Administrador (clique direito > Executar como administrador) e siga o assistente de instalação.",
      "Após a instalação, reinicie o computador se solicitado pelo instalador.",
      "Inicie o software e verifique se a versão exibida corresponde à versão mais recente divulgada.",
    ],
    tags: [
      "instalar",
      "download",
      "instalador",
      "antivírus",
      "exclusão",
      "checksum",
      "administrador",
    ],
  },
  {
    id: "inst-02",
    category: "instalacao",
    question: "Onde encontro o arquivo instalado e os logs?",
    answer:
      "Por padrão, o software é instalado em uma pasta própria dentro de Arquivos de Programas ou em um diretório personalizado escolhido durante a instalação. Os logs de execução ficam armazenados em uma subpasta chamada logs dentro do diretório principal do aplicativo. Para acessá-los, abra o explorador de arquivos e navegue até a pasta de instalação. Caso o software possua interface, procure por uma opção como Exibir Logs ou Abrir pasta de logs no menu de configurações. Esses logs são úteis para diagnóstico em caso de suporte técnico.",
    tags: ["pasta", "diretório", "logs", "instalação", "caminho"],
  },
  {
    id: "inst-03",
    category: "instalacao",
    question: "Preciso desativar o antivírus para instalar?",
    answer:
      "Em muitos casos, sim. Softwares que interagem diretamente com processos do sistema podem ser sinalizados como falsos positivos por antivírus. Você tem duas opções seguras:",
    steps: [
      "Opção 1: Desative temporariamente a proteção em tempo real do antivírus durante a instalação e a reative após concluir.",
      "Opção 2 (recomendada): Adicione a pasta de instalação à lista de exclusões do antivírus. No Windows Defender, acesse Configurações > Segurança do Windows > Proteção contra vírus > Gerenciar configurações > Exclusões > Adicionar exclusão > Pasta.",
      "Após configurar a exclusão, execute a instalação normalmente.",
    ],
    tags: [
      "antivírus",
      "exclusão",
      "windows defender",
      "falso positivo",
      "proteção",
    ],
  },

  /* ── Solução de problemas ── */
  {
    id: "prob-01",
    category: "problemas",
    question: "Erro ao iniciar ou tela preta, o que fazer?",
    answer:
      "Esse problema geralmente está relacionado a componentes desatualizados ou conflitos de software. Siga os passos abaixo na ordem:",
    steps: [
      "Atualize os drivers da GPU para a versão mais recente pelo site do fabricante (NVIDIA, AMD ou Intel).",
      "Reinstale o Microsoft Visual C++ Redistributable (versões 2015–2022, x86 e x64).",
      "Verifique se o Windows está completamente atualizado em Configurações > Windows Update.",
      "Reinicie o computador após aplicar as atualizações.",
      "Se o problema persistir, execute o software como Administrador e verifique os logs para mensagens de erro específicas.",
    ],
    tags: [
      "erro",
      "tela preta",
      "iniciar",
      "driver",
      "visual c++",
      "atualizar",
    ],
  },
  {
    id: "prob-02",
    category: "problemas",
    question: "Erro de DLL ausente (MSVCP ou VCRUNTIME)",
    answer:
      "Mensagens como MSVCP140.dll não encontrado ou VCRUNTIME140.dll ausente indicam que o Microsoft Visual C++ Redistributable não está instalado ou está corrompido. Para resolver:",
    steps: [
      "Desinstale todas as versões existentes do Visual C++ Redistributable pelo Painel de Controle > Programas e Recursos.",
      "Baixe o instalador mais recente do Visual C++ Redistributable (2015–2022) diretamente do site oficial da Microsoft.",
      "Instale ambas as versões: x86 (32 bits) e x64 (64 bits).",
      "Reinicie o computador e tente executar o software novamente.",
    ],
    tags: [
      "dll",
      "msvcp",
      "vcruntime",
      "msvcp140",
      "vcruntime140",
      "visual c++",
      "ausente",
    ],
  },
  {
    id: "prob-03",
    category: "problemas",
    question: "Baixo desempenho ou FPS instável",
    answer:
      "Quedas de desempenho podem ser causadas por sobrecargas de software ou configurações inadequadas. Recomendamos:",
    steps: [
      "Feche overlays e aplicativos em segundo plano (Discord overlay, GeForce Experience, MSI Afterburner, etc.).",
      "Atualize os drivers da GPU para a versão mais recente.",
      "No Windows, ative o Modo de alto desempenho em Configurações > Sistema > Energia e bateria > Modo de energia.",
      "Nas configurações gráficas do jogo, reduza efeitos visuais pesados como sombras, anti-aliasing e pós-processamento.",
      "Verifique a temperatura da CPU e GPU durante o uso. Temperaturas acima de 90°C podem causar throttling automático.",
    ],
    tags: [
      "fps",
      "desempenho",
      "lento",
      "overlay",
      "driver",
      "temperatura",
      "throttling",
    ],
  },

  /* ── Conta e assinatura ── */
  {
    id: "conta-01",
    category: "conta",
    question: "Como criar minha conta?",
    answer:
      "Clique no botão Login no topo da página e selecione Criar conta. Preencha seu nome, email e senha. Após o cadastro, você terá acesso ao painel do usuário onde pode gerenciar sua assinatura e downloads.",
    tags: ["conta", "cadastro", "registro", "login", "criar"],
  },
  {
    id: "conta-02",
    category: "conta",
    question: "Esqueci minha senha, como recuperar?",
    answer:
      "Na tela de login, clique em Esqueci minha senha. Informe o email cadastrado e verifique sua caixa de entrada (incluindo a pasta de spam). Siga o link recebido para criar uma nova senha. O link expira em 30 minutos por segurança.",
    tags: ["senha", "recuperar", "esqueci", "email", "reset"],
  },
  {
    id: "conta-03",
    category: "conta",
    question: "Como funciona a assinatura?",
    answer:
      "As assinaturas são mensais e dão acesso completo ao software e atualizações durante o período ativo. Ao final do ciclo, a assinatura pode ser renovada manualmente ou configurada para renovação automática. Em caso de cancelamento, o acesso permanece ativo até o fim do período já pago.",
    tags: ["assinatura", "plano", "mensal", "renovação", "cancelar", "pagamento"],
  },

  /* ── Segurança e integridade ── */
  {
    id: "seg-01",
    category: "seguranca",
    question: "O software é seguro para usar?",
    answer:
      "Sim. O software passa por testes contínuos de segurança e é atualizado frequentemente para manter compatibilidade e integridade. Utilizamos criptografia em todas as comunicações e não coletamos dados sensíveis do seu sistema. Recomendamos sempre baixar exclusivamente pelos canais oficiais.",
    tags: ["seguro", "segurança", "criptografia", "dados", "confiável"],
  },
  {
    id: "seg-02",
    category: "seguranca",
    question: "Posso ser banido por usar o software?",
    answer:
      "Nosso sistema de proteção anti-detecção é atualizado constantemente para minimizar riscos. Embora nenhum software possa garantir 100% de imunidade contra sistemas de detecção de terceiros, nossa equipe monitora ativamente atualizações de segurança e adapta as proteções de forma proativa. Siga sempre as instruções de uso recomendadas para reduzir riscos.",
    tags: ["banido", "ban", "detecção", "anti-cheat", "proteção", "risco"],
  },
  {
    id: "seg-03",
    category: "seguranca",
    question: "O antivírus detectou o software como ameaça, é normal?",
    answer:
      "Sim, isso é um falso positivo comum. Softwares que interagem com processos do sistema operacional frequentemente são sinalizados por heurísticas genéricas dos antivírus. Adicione a pasta de instalação à lista de exclusões do seu antivírus para evitar bloqueios. No Windows Defender, acesse Proteção contra vírus > Exclusões > Adicionar pasta.",
    tags: [
      "antivírus",
      "falso positivo",
      "ameaça",
      "defender",
      "exclusão",
      "bloqueio",
    ],
  },
];
