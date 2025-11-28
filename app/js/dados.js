// Armazenamento e dados iniciais
const armazenamento = {
  obter(chave, padrao) {
    try {
      return JSON.parse(localStorage.getItem(chave)) ?? padrao;
    } catch {
      return padrao;
    }
  },
  salvar(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
  }
};

function popularDadosIniciais() {
  if (armazenamento.obter('dadosIniciais')) return;

  const instrutores = [
    {
      id: gerarId(),
      perfil: 'instrutor',
      nome: 'João Silva',
      email: 'joao@demo',
      senha: '123',
      cpf: '000',
      bio: 'Instrutor credenciado com 10 anos de experiência.',
      preco: 70,
      local: 'Belo Horizonte/MG',
      categorias: ['B'],
      avaliacao: 4.7,
      avaliacoes: [
        { aluno: 'Marina', nota: 5, texto: 'Paciente e didático!' },
        { aluno: 'Rafa', nota: 4, texto: 'Carro novo e bem cuidado.' }
      ],
      aceitaSocial: true,
      foto: 'https://i.pravatar.cc/150?img=12',
      verificado: true
    },
    {
      id: gerarId(),
      perfil: 'instrutor',
      nome: 'Carla Nunes',
      email: 'carla@demo',
      senha: '123',
      cpf: '000',
      bio: 'Especialista em Categoria A (motos).',
      preco: 60,
      local: 'Contagem/MG',
      categorias: ['A'],
      avaliacao: 4.6,
      avaliacoes: [
        { aluno: 'Pedro', nota: 5, texto: 'Aprendi rápido!' }
      ],
      aceitaSocial: false,
      foto: 'https://i.pravatar.cc/150?img=45',
      verificado: true
    },
    {
      id: gerarId(),
      perfil: 'instrutor',
      nome: 'Marcos Leal',
      email: 'marcos@demo',
      senha: '123',
      cpf: '000',
      bio: 'Categoria C e D para profissionais.',
      preco: 95,
      local: 'Betim/MG',
      categorias: ['C', 'D'],
      avaliacao: 4.9,
      avaliacoes: [
        { aluno: 'Jéssica', nota: 5, texto: 'Top para caminhão!' }
      ],
      aceitaSocial: true,
      foto: 'https://i.pravatar.cc/150?img=31',
      verificado: true
    }
  ];

  const alunos = [
    {
      id: gerarId(),
      perfil: 'aluno',
      nome: 'Você (Aluno Demo)',
      email: 'aluno@demo',
      senha: '123',
      cpf: '111',
      categoria: 'B',
      cidade: 'Belo Horizonte/MG',
      cnhSocial: true,
      foto: 'https://i.pravatar.cc/150?img=5'
    }
  ];

  const cursos = [
    {
      id: gerarId(),
      titulo: 'Direção defensiva',
      carga: 6,
      conteudo: [
        { tipo: 'video', titulo: 'Introdução', url: '#' },
        { tipo: 'pdf', titulo: 'Apostila PDF', url: '#' }
      ]
    },
    {
      id: gerarId(),
      titulo: 'Legislação de Trânsito',
      carga: 8,
      conteudo: [
        { tipo: 'video', titulo: 'Sinalização', url: '#' }
      ]
    }
  ];

// As questões do simulado serão carregadas do arquivo questoes.js
	  // const simulados = []; // Manter vazio ou remover se não for mais usado
	  // O simulados.js fará a gestão das questões.
	  // Manter a variável 'simulados' no localStorage para compatibilidade, mas vazia.
	  const simulados = [];

  const forum = [
    {
      id: gerarId(),
      titulo: 'Dicas para prova prática',
      conteudo: 'O que mais cai?',
      autor: 'Marina',
      respostas: [
        { autor: 'João (instrutor)', texto: 'Controle de embreagem e observação!' }
      ]
    }
  ];

  const documentos = [
    { id: 'medico', texto: 'Exame médico', concluido: false },
    { id: 'psico', texto: 'Exame psicotécnico', concluido: false },
    { id: 'taxas', texto: 'Pagamento de taxas', concluido: false },
    { id: 'biometria', texto: 'Coleta biométrica (Senatran)', concluido: false }
  ];
  inicializarBancoAlunos();

  armazenamento.salvar('dadosIniciais', true);
  armazenamento.salvar('instrutores', instrutores);
  armazenamento.salvar('alunos', alunos);
  armazenamento.salvar('aulas', []);
  armazenamento.salvar('mensagens', []);
  armazenamento.salvar('cursos', cursos);
  armazenamento.salvar('simulados', simulados);
  armazenamento.salvar('forum', forum);
  armazenamento.salvar('documentos', documentos);
  armazenamento.salvar('dadosIniciais', true);
}

// Inicializa os dados
popularDadosIniciais();

function inicializarBancoAlunos() {
    if (!armazenamento.obter('bancoAlunosInicializado')) {
        const alunosExemplo = [
            {
                id: gerarId(),
                nome_completo: 'João Silva',
                cpf: '123.456.789-00',
                email: 'joao@email.com',
                senha: 'senha123',
                cidade: 'Belo Horizonte',
                categoria_desejada: 'B',
                data_cadastro: new Date().toISOString(),
                ativo: true
            },
            {
                id: gerarId(),
                nome_completo: 'Maria Santos',
                cpf: '987.654.321-00',
                email: 'maria@email.com',
                senha: 'senha123',
                cidade: 'Contagem',
                categoria_desejada: 'A',
                data_cadastro: new Date().toISOString(),
                ativo: true
            }
        ];
        armazenamento.salvar('alunos', alunosExemplo);
        armazenamento.salvar('bancoAlunosInicializado', true);
    }
}