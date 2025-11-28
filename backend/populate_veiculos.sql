USE cnh_livre;

-- Inserir veículos para instrutores que não têm (usa usuario_id pois a FK é em instrutores.usuario_id)
INSERT INTO veiculos (instrutor_id, placa, modelo, ano, categoria, cor, disponivel)
SELECT 
    i.usuario_id,
    CONCAT('SJK', LPAD(i.usuario_id * 100 + FLOOR(RAND() * 99), 4, '0')) as placa,
    CASE FLOOR(RAND() * 6)
        WHEN 0 THEN 'Chevrolet Onix Plus'
        WHEN 1 THEN 'Honda Civic'
        WHEN 2 THEN 'Fiat Argo'
        WHEN 3 THEN 'Hyundai HB20'
        WHEN 4 THEN 'Volkswagen Polo'
        WHEN 5 THEN 'Toyota Corolla'
    END as modelo,
    YEAR(NOW()) - FLOOR(RAND() * 5) as ano,
    CASE FLOOR(RAND() * 3)
        WHEN 0 THEN 'A'
        WHEN 1 THEN 'B'
        WHEN 2 THEN 'AB'
    END as categoria,
    CASE FLOOR(RAND() * 8)
        WHEN 0 THEN 'Branco'
        WHEN 1 THEN 'Preto'
        WHEN 2 THEN 'Prata'
        WHEN 3 THEN 'Cinza'
        WHEN 4 THEN 'Vermelho'
        WHEN 5 THEN 'Azul'
        WHEN 6 THEN 'Verde'
        WHEN 7 THEN 'Amarelo'
    END as cor,
    1 as disponivel
FROM instrutores i
WHERE NOT EXISTS (SELECT 1 FROM veiculos v WHERE v.instrutor_id = i.usuario_id);
