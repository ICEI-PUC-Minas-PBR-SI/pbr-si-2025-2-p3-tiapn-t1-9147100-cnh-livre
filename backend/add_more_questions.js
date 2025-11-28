const mysql = require('mysql2/promise');

// Mais questões de qualidade - segunda leva de 60 questões
const maisQuestoes = [
    // LEGISLAÇÃO (11 questões adicionais)
    {
        pergunta: "Qual é a penalidade para dirigir sem a CNH?",
        opcoes: ["Multa simples", "Multa + apreensão do veículo", "Apenas advertência", "Nenhuma penalidade"],
        respostaCorreta: 1,
        categoria: "legislacao",
        explicacao: "Dirigir sem CNH é infração gravíssima, resultando em multa pesada e apreensão do veículo.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que é habilitação provisória?",
        opcoes: ["CNH de um mês", "CNH temporária de 12 meses para novos condutores", "CNH vitalícia", "Não existe"],
        respostaCorreta: 1,
        categoria: "legislacao",
        explicacao: "Habilitação provisória é válida por 12 meses após aprovação no exame, para novos condutores aperfeiçoarem sua direção.",
        dificuldade: "medio"
    },
    {
        pergunta: "Qual é a idade mínima para obter a CNH?",
        opcoes: ["16 anos", "17 anos", "18 anos", "21 anos"],
        respostaCorreta: 2,
        categoria: "legislacao",
        explicacao: "A idade mínima para obter a CNH é 18 anos para a maioria das categorias.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que é suspensão da CNH?",
        opcoes: ["Perda definitiva", "Impossibilidade temporária de dirigir", "Apenas multa", "Nada grave"],
        respostaCorreta: 1,
        categoria: "legislacao",
        explicacao: "Suspensão é a impossibilidade temporária de dirigir. A perda é definitiva.",
        dificuldade: "medio"
    },
    {
        pergunta: "Qual é o limite de pontos na CNH antes de suspensão?",
        opcoes: ["10 pontos", "20 pontos", "30 pontos", "Sem limite"],
        respostaCorreta: 1,
        categoria: "legislacao",
        explicacao: "Acumular 20 pontos em 12 meses resulta em suspensão automática da CNH.",
        dificuldade: "dificil"
    },
    {
        pergunta: "Quanto tempo dura a validade do CRLV (licenciamento anual)?",
        opcoes: ["6 meses", "1 ano", "2 anos", "Permanente"],
        respostaCorreta: 1,
        categoria: "legislacao",
        explicacao: "O CRLV (Certificado de Registro e Licenciamento) tem validade de 1 ano e precisa ser renovado anualmente.",
        dificuldade: "facil"
    },
    {
        pergunta: "Qual é a penalidade para usar o celular ao dirigir?",
        opcoes: ["Multa leve", "Multa pesada e adicional de pontos", "Apenas advertência", "Sem penalidade"],
        respostaCorreta: 1,
        categoria: "legislacao",
        explicacao: "Usar celular ao dirigir é infração média, resultando em multa e adição de 4 pontos na CNH.",
        dificuldade: "facil"
    },

    // SINALIZAÇÃO (11 questões adicionais)
    {
        pergunta: "O que significa uma placa com fundo amarelo e figura preta?",
        opcoes: ["Proibição", "Advertência", "Informação", "Obrigação"],
        respostaCorreta: 1,
        categoria: "sinalizacao",
        explicacao: "Placas com fundo amarelo indicam advertência de perigo.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que indica uma linha branca contínua na via?",
        opcoes: ["Permitido ultrapassar", "Proibido ultrapassar", "Via de mão única", "Estacionamento permitido"],
        respostaCorreta: 1,
        categoria: "sinalizacao",
        explicacao: "Linha branca contínua indica proibição de ultrapassagem.",
        dificuldade: "facil"
    },
    {
        pergunta: "Qual é o significado de uma placa hexagonal?",
        opcoes: ["Parada obrigatória", "Ceder a preferência", "Reduzir velocidade", "Perigo à frente"],
        respostaCorreta: 0,
        categoria: "sinalizacao",
        explicacao: "Placa hexagonal é o sinal de 'Parada Obrigatória' (STOP).",
        dificuldade: "facil"
    },
    {
        pergunta: "O que significa uma seta diagonal branca em uma via?",
        opcoes: ["Obrigação de seguir", "Informação de saída", "Proibição de passagem", "Velocidade máxima"],
        respostaCorreta: 1,
        categoria: "sinalizacao",
        explicacao: "Seta diagonal indica a saída ou mudança de via que o condutor deve fazer.",
        dificuldade: "medio"
    },
    {
        pergunta: "O que indica uma placa retangular com fundo branco e borda preta?",
        opcoes: ["Proibição", "Informação ou via", "Obrigação", "Advertência"],
        respostaCorreta: 1,
        categoria: "sinalizacao",
        explicacao: "Placas retangulares com fundo branco indicam informações sobre vias.",
        dificuldade: "facil"
    },
    {
        pergunta: "Qual é o significado de um triângulo vermelho com figura de veículo escorregando?",
        opcoes: ["Aquaplanagem", "Via escorregadia", "Pista em reformação", "Velocidade reduzida"],
        respostaCorreta: 1,
        categoria: "sinalizacao",
        explicacao: "Placa indica via escorregadia por chuva, lama ou outro motivo.",
        dificuldade: "medio"
    },
    {
        pergunta: "O que significa uma placa circular com seta branca?",
        opcoes: ["Obrigação de seguir a direção", "Proibição de passagem", "Permitido estacionar", "Advertência"],
        respostaCorreta: 0,
        categoria: "sinalizacao",
        explicacao: "Placas circulares com seta branca indicam obrigação de seguir a direção indicada.",
        dificuldade: "medio"
    },
    {
        pergunta: "O que indica uma linha branca tracejada na via?",
        opcoes: ["Proibido ultrapassar", "Permitido ultrapassar", "Via de mão única", "Pedestre presente"],
        respostaCorreta: 1,
        categoria: "sinalizacao",
        explicacao: "Linha branca tracejada indica que é permitido ultrapassar com segurança.",
        dificuldade: "facil"
    },

    // DIREÇÃO DEFENSIVA (10 questões adicionais)
    {
        pergunta: "O que fazer quando fica com sono ao dirigir?",
        opcoes: ["Continuar dirigindo", "Aumentar velocidade", "Parar em local seguro e descansar", "Aumentar ar-condicionado"],
        respostaCorreta: 2,
        categoria: "direcao_defensiva",
        explicacao: "Sono ao dirigir é perigoso. O condutor deve parar em local seguro e descansar.",
        dificuldade: "facil"
    },
    {
        pergunta: "Como proceder em uma curva de uma estrada de montanha?",
        opcoes: ["Acelerar", "Reduzir velocidade antes da curva e depois manter constante", "Frear dentro da curva", "Mudar marcha dentro da curva"],
        respostaCorreta: 1,
        categoria: "direcao_defensiva",
        explicacao: "Em curvas, reduz-se velocidade antes de entrar e mantém-se velocidade constante durante a curva.",
        dificuldade: "medio"
    },
    {
        pergunta: "O que fazer se perder o controle do veículo em aquaplanagem?",
        opcoes: ["Acelerar", "Frear bruscamente", "Tirar o pé do acelerador e não frear", "Girar o volante rapidamente"],
        respostaCorreta: 2,
        categoria: "direcao_defensiva",
        explicacao: "Em aquaplanagem, deve-se manter o volante direito, tirar o pé do acelerador e não frear bruscamente.",
        dificuldade: "dificil"
    },
    {
        pergunta: "Qual é a distância de parada a 100 km/h em pista seca?",
        opcoes: ["20 metros", "40 metros", "80 metros", "120 metros"],
        respostaCorreta: 2,
        categoria: "direcao_defensiva",
        explicacao: "A distância de parada a 100 km/h é aproximadamente 80 metros em pista seca.",
        dificuldade: "dificil"
    },
    {
        pergunta: "O que é efeito de tunnel vision?",
        opcoes: ["Visão escura", "Foco excessivo em um ponto, perdendo visão periférica", "Cegueira", "Nada grave"],
        respostaCorreta: 1,
        categoria: "direcao_defensiva",
        explicacao: "Tunnel vision é quando o condutor foca apenas no que está à frente, perdendo a visão periférica.",
        dificuldade: "medio"
    },
    {
        pergunta: "Como manter a vigilância constante ao dirigir?",
        opcoes: ["Olhar apenas para frente", "Usar espelhos regularmente e verificar pontos cegos", "Não precisa vigiar", "Focar na estrada"],
        respostaCorreta: 1,
        categoria: "direcao_defensiva",
        explicacao: "Deve-se usar espelhos constantemente, verificar pontos cegos e manter vigilância em 360 graus.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que fazer se o volante ficar duro durante a direção?",
        opcoes: ["Continuar dirigindo", "Parar em local seguro e procurar mecânico", "Acelerar", "Nada"],
        respostaCorreta: 1,
        categoria: "direcao_defensiva",
        explicacao: "Volante duro pode indicar problema no sistema de direção. Deve-se parar e procurar ajuda.",
        dificuldade: "facil"
    },
    {
        pergunta: "Como proceder ao dirigir em neblina intensa?",
        opcoes: ["Aumentar velocidade", "Reduzir velocidade, usar farol baixo e aumentar distância de seguimento", "Desligar farol", "Usar buzina"],
        respostaCorreta: 1,
        categoria: "direcao_defensiva",
        explicacao: "Em neblina, reduz-se velocidade, liga-se farol baixo e aumenta-se distância de seguimento.",
        dificuldade: "medio"
    },
    {
        pergunta: "O que é platooning em direção defensiva?",
        opcoes: ["Dirigir em grupo", "Seguir muito perto de um veículo à frente para ganhar velocidade", "Frear juntos", "Não existe"],
        respostaCorreta: 1,
        categoria: "direcao_defensiva",
        explicacao: "Platooning é seguir muito perto de outro veículo. É perigoso e deve-se evitar.",
        dificuldade: "medio"
    },

    // PRIMEIROS SOCORROS (10 questões adicionais)
    {
        pergunta: "Como fazer compressão cardíaca correta em um adulto?",
        opcoes: ["Suavemente", "Com força, no mínimo 5 cm de profundidade", "Muito fraco", "Não importa"],
        respostaCorreta: 1,
        categoria: "primeiros_socorros",
        explicacao: "Compressão cardíaca deve ter profundidade mínima de 5 cm em um adulto.",
        dificuldade: "dificil"
    },
    {
        pergunta: "O que fazer se a vítima estiver queimada?",
        opcoes: ["Aplicar gelo diretamente", "Resfriar com água fria por 10-20 minutos", "Aplicar pomada", "Deixar exposto"],
        respostaCorreta: 1,
        categoria: "primeiros_socorros",
        explicacao: "Queimaduras devem ser resfriadas com água fria, não gelo direto.",
        dificuldade: "facil"
    },
    {
        pergunta: "Como reconhecer uma fratura fechada?",
        opcoes: ["Osso exposto", "Dor, inchaço e deformidade sem rompimento de pele", "Sem sintomas", "Apenas hematoma"],
        respostaCorreta: 1,
        categoria: "primeiros_socorros",
        explicacao: "Fratura fechada apresenta dor, inchaço e deformidade, mas sem rompimento da pele.",
        dificuldade: "medio"
    },
    {
        pergunta: "Qual é o procedimento para vítima com hemorragia abundante?",
        opcoes: ["Deixar sangrar", "Fazer compressão direta com pano limpo e elevar membro", "Aplicar torniquete", "Não fazer nada"],
        respostaCorreta: 1,
        categoria: "primeiros_socorros",
        explicacao: "Hemorragia é controlada com compressão direta e elevação do membro.",
        dificuldade: "medio"
    },
    {
        pergunta: "O que fazer se a vítima engasgar completamente?",
        opcoes: ["Ignorar", "Manobra de Heimlich imediatamente", "Esperar passar", "Dar água"],
        respostaCorreta: 1,
        categoria: "primeiros_socorros",
        explicacao: "Se há engasgo completo (sem passagem de ar), a manobra de Heimlich deve ser aplicada imediatamente.",
        dificuldade: "medio"
    },
    {
        pergunta: "Como imobilizar um membro suspeito de fratura?",
        opcoes: ["Não imobilizar", "Imobilizar com pano, atadura ou tala", "Massagear", "Mover para testar"],
        respostaCorreta: 1,
        categoria: "primeiros_socorros",
        explicacao: "Membros com suspeita de fratura devem ser imobilizados para evitar piora.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que é e como tratar hipotermia?",
        opcoes: ["Temperatura alta", "Temperatura corporal perigosamente baixa, deve-se aquecer gradualmente", "Apenas incômodo", "Não existe"],
        respostaCorreta: 1,
        categoria: "primeiros_socorros",
        explicacao: "Hipotermia é queda perigosa de temperatura. Reaquecimento deve ser gradual.",
        dificuldade: "dificil"
    },
    {
        pergunta: "Como proceder com vítima em convulsão?",
        opcoes: ["Segurar com força", "Colocar algo na boca", "Deixar convulsionar e proteger de lesões", "Jogue água"],
        respostaCorreta: 2,
        categoria: "primeiros_socorros",
        explicacao: "Durante convulsão, protege-se a vítima de lesões e coloca-se em posição lateral após término.",
        dificuldade: "dificil"
    },
    {
        pergunta: "O que fazer com objeto penetrante (como vidro) em ferida?",
        opcoes: ["Remover imediatamente", "Deixar no local e chamar socorro", "Empurrar para dentro", "Ignorar"],
        respostaCorreta: 1,
        categoria: "primeiros_socorros",
        explicacao: "Objeto penetrante não deve ser removido. Deve-se chamar socorro e estabilizar.",
        dificuldade: "dificil"
    },

    // MEIO AMBIENTE (10 questões adicionais)
    {
        pergunta: "O que é emissão de CO2 pelo veículo?",
        opcoes: ["Gás venenoso", "Gás de efeito estufa liberado na combustão", "Fumaça preta", "Não existe"],
        respostaCorreta: 1,
        categoria: "meio_ambiente",
        explicacao: "CO2 é gás de efeito estufa liberado na combustão do combustível.",
        dificuldade: "medio"
    },
    {
        pergunta: "Como reduzir emissão de poluentes na direção?",
        opcoes: ["Dirigir mais rápido", "Evitar acelerações bruscas e manter velocidade constante", "Ligar climatizador", "Não importa"],
        respostaCorreta: 1,
        categoria: "meio_ambiente",
        explicacao: "Acelerações bruscas aumentam consumo e emissões. Direção suave reduz poluição.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que é combustível ecológico?",
        opcoes: ["Gasolina comum", "Combustível com menor teor de carbono, como etanol", "Só óleo", "Não existe"],
        respostaCorreta: 1,
        categoria: "meio_ambiente",
        explicacao: "Combustíveis ecológicos como etanol têm menor impacto ambiental.",
        dificuldade: "facil"
    },
    {
        pergunta: "Qual é o impacto do vazamento de óleo em veículos?",
        opcoes: ["Nenhum", "Poluição do solo e água", "Apenas cheiro ruim", "Econômico"],
        respostaCorreta: 1,
        categoria: "meio_ambiente",
        explicacao: "Vazamento de óleo contamina solo e água, causando danos ambientais graves.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que é filtro de ar e sua importância?",
        opcoes: ["Não é importante", "Remove poluentes do ar que entra no motor", "Apenas decorativo", "Não importa"],
        respostaCorreta: 1,
        categoria: "meio_ambiente",
        explicacao: "Filtro de ar remove partículas poluentes, reduzindo emissões e melhorando desempenho.",
        dificuldade: "medio"
    },
    {
        pergunta: "Como uma manutenção inadequada afeta o meio ambiente?",
        opcoes: ["Não afeta", "Aumenta emissões poluentes e consumo de combustível", "Apenas problema econômico", "Nada"],
        respostaCorreta: 1,
        categoria: "meio_ambiente",
        explicacao: "Manutenção inadequada aumenta emissões e consumo, prejudicando o meio ambiente.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que é pegada de carbono de um veículo?",
        opcoes: ["Marca deixada pelas rodas", "Total de emissões de carbono durante sua vida útil", "Cor do carro", "Não existe"],
        respostaCorreta: 1,
        categoria: "meio_ambiente",
        explicacao: "Pegada de carbono é o total de emissões de gases durante toda a vida do veículo.",
        dificuldade: "medio"
    },
    {
        pergunta: "Como diminuir consumo de combustível e poluição?",
        opcoes: ["Não há forma", "Dirigir defensivamente, manter pressão dos pneus e fazer manutenção", "Só comprando carro novo", "Impossível"],
        respostaCorreta: 1,
        categoria: "meio_ambiente",
        explicacao: "Direção defensiva, manutenção e pressão correta dos pneus reduzem consumo.",
        dificuldade: "medio"
    },
    {
        pergunta: "O que é catalisador no veículo?",
        opcoes: ["Parte do motor", "Componente que reduz emissões tóxicas nos gases de escape", "Sistema de freios", "Não existe"],
        respostaCorreta: 1,
        categoria: "meio_ambiente",
        explicacao: "Catalisador converte gases tóxicos em substâncias menos nocivas.",
        dificuldade: "medio"
    },

    // MECÂNICA (9 questões adicionais)
    {
        pergunta: "Para que serve o alternador?",
        opcoes: ["Iniciar o motor", "Gerar eletricidade para alimentar sistemas", "Frear o veículo", "Nada"],
        respostaCorreta: 1,
        categoria: "mecanica",
        explicacao: "Alternador gera eletricidade durante o funcionamento do motor.",
        dificuldade: "medio"
    },
    {
        pergunta: "Qual é a função do cilindro mestre dos freios?",
        opcoes: ["Armazenar óleo", "Transmitir a pressão do pedal de freio para as rodas", "Resfriar", "Nada"],
        respostaCorreta: 1,
        categoria: "mecanica",
        explicacao: "Cilindro mestre converte força do pedal em pressão hidráulica.",
        dificuldade: "medio"
    },
    {
        pergunta: "O que causa desgaste prematuro dos pneus?",
        opcoes: ["Nada causa", "Pressão incorreta, alinhamento deficiente, direção agressiva", "Apenas tempo", "Não é possível"],
        respostaCorreta: 1,
        categoria: "mecanica",
        explicacao: "Pressão incorreta, desalinhamento e direção agressiva causam desgaste prematuro.",
        dificuldade: "facil"
    },
    {
        pergunta: "Como verificar o óleo do motor?",
        opcoes: ["Não é possível", "Com motor frio, usando a vareta de nível", "Enquanto dirigindo", "Não importa"],
        respostaCorreta: 1,
        categoria: "mecanica",
        explicacao: "Verificação de óleo é feita com motor desligado e frio, usando a vareta de nível.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que é alinhamento de rodas?",
        opcoes: ["Pintura das rodas", "Ajuste para manter rodas na posição correta", "Troca de pneus", "Não existe"],
        respostaCorreta: 1,
        categoria: "mecanica",
        explicacao: "Alinhamento ajusta posição das rodas para evitar desgaste e melhorar direção.",
        dificuldade: "facil"
    },
    {
        pergunta: "Para que serve amortecedor?",
        opcoes: ["Acelerar", "Absorver impactos e manter estabilidade", "Frear", "Nada"],
        respostaCorreta: 1,
        categoria: "mecanica",
        explicacao: "Amortecedor absorve impactos do terreno, mantendo conforto e estabilidade.",
        dificuldade: "facil"
    },
    {
        pergunta: "O que indica vazamento de fluido de freio?",
        opcoes: ["Nada grave", "Problema sério - frenagem comprometida", "Apenas incômodo", "Normal"],
        respostaCorreta: 1,
        categoria: "mecanica",
        explicacao: "Vazamento de fluido de freio compromete a frenagem e é perigoso.",
        dificuldade: "facil"
    },
    {
        pergunta: "Como identificar velas de ignição gastas?",
        opcoes: ["Não é possível", "Dificuldade na partida, falta de potência", "Apenas pela cor", "Não importa"],
        respostaCorreta: 1,
        categoria: "mecanica",
        explicacao: "Velas gastas causam dificuldade na partida e falta de potência no motor.",
        dificuldade: "medio"
    },
    {
        pergunta: "Qual é a função do sistema de suspensão?",
        opcoes: ["Congelação", "Suportar peso do veículo e absorver impactos", "Frenar", "Acelerar"],
        respostaCorreta: 1,
        categoria: "mecanica",
        explicacao: "Sistema de suspensão suporta o peso e absorve impactos do terreno.",
        dificuldade: "facil"
    }
];

(async () => {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'cnhlivre1234*',
        database: 'cnh_livre'
    });

    const conn = await pool.getConnection();

    try {
        console.log(`\nAdicionando ${maisQuestoes.length} questões adicionais...\n`);
        
        let adicionadas = 0;
        
        for (const q of maisQuestoes) {
            const opcoesJSON = JSON.stringify(q.opcoes);
            
            const [result] = await conn.query(`
                INSERT INTO questoes (enunciado, pergunta, opcoes_array, resposta_correta, categoria, explicacao, dificuldade, ativa)
                VALUES (?, ?, ?, ?, ?, ?, ?, 1)
            `, [q.pergunta, q.pergunta, opcoesJSON, q.respostaCorreta, q.categoria, q.explicacao, q.dificuldade]);
            
            if (result.affectedRows > 0) {
                adicionadas++;
            }
        }
        
        console.log(`✅ ${adicionadas} questões adicionadas com sucesso!\n`);
        
        // Mostrar estatísticas
        const [total] = await conn.query('SELECT COUNT(*) as total FROM questoes');
        console.log(`📊 Total de questões no banco: ${total[0].total}`);
        
        const [porCategoria] = await conn.query(`
            SELECT categoria, COUNT(*) as qtd FROM questoes 
            GROUP BY categoria ORDER BY categoria ASC
        `);
        
        console.log('\n📂 Distribuição por categoria:');
        porCategoria.forEach(c => {
            console.log(`   ${c.categoria.padEnd(20)} ${String(c.qtd).padStart(2)} questões`);
        });
        
        const [porDificuldade] = await conn.query(`
            SELECT dificuldade, COUNT(*) as qtd FROM questoes 
            GROUP BY dificuldade ORDER BY 
              CASE WHEN dificuldade='facil' THEN 1
                   WHEN dificuldade='medio' THEN 2
                   WHEN dificuldade='dificil' THEN 3 END ASC
        `);
        
        console.log('\n⭐ Distribuição por dificuldade:');
        porDificuldade.forEach(d => {
            const emoji = d.dificuldade === 'facil' ? '🟢' : d.dificuldade === 'medio' ? '🟡' : '🔴';
            console.log(`   ${emoji} ${d.dificuldade.padEnd(15)} ${String(d.qtd).padStart(2)} questões`);
        });
        
        console.log('\n✨ Banco de dados melhorado e enriquecido!');
        
    } catch (err) {
        console.error('❌ Erro:', err.message);
    } finally {
        conn.release();
        pool.end();
    }
})();
