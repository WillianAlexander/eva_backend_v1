

INSERT INTO eva.DEPARTAMENTOS (nombre) VALUES ('TECNOLOGIA');
INSERT INTO eva.DEPARTAMENTOS (nombre) VALUES ('INVERSIONES - CAPTACIONES');
INSERT INTO eva.DEPARTAMENTOS (nombre) VALUES ('OPERACIONES');
INSERT INTO eva.DEPARTAMENTOS (nombre) VALUES ('SEGURIDAD FISICA Y ELECTRONICA');
INSERT INTO eva.DEPARTAMENTOS (nombre) VALUES ('PROCESOS');
INSERT INTO eva.DEPARTAMENTOS (nombre) VALUES ('FINANCIERO');
INSERT INTO eva.DEPARTAMENTOS (nombre) VALUES ('CREDITO Y COBRANZAS');
INSERT INTO eva.DEPARTAMENTOS (nombre) VALUES ('SEGURIDAD DE LA INFORMACION Y PROTECCION DE DATOS');
INSERT INTO eva.DEPARTAMENTOS (nombre) VALUES ('TALENTO HUMANO');
INSERT INTO eva.DEPARTAMENTOS (nombre) VALUES ('TESORERIA');
INSERT INTO eva.DEPARTAMENTOS (nombre) VALUES ('RIESGOS');
INSERT INTO eva.DEPARTAMENTOS (nombre) VALUES ('CUMPLIMIENTO');
INSERT INTO eva.DEPARTAMENTOS (nombre) VALUES ('COMUNICACION');
INSERT INTO eva.DEPARTAMENTOS (nombre) VALUES ('JURIDICO');
INSERT INTO eva.DEPARTAMENTOS (nombre) VALUES ('SEGUROS');


-- Usuarios (todos con el rol PARTICIPANTE)
INSERT INTO EVA.USUARIOS (USUARIO, NOMBRES, APELLIDOS, IDENTIFICACION, CORREO, PASSWORD, ROL_ID)
VALUES 
('ana.martinez', 'Ana', 'Martínez', '1234567890', 'ana.martinez@example.com', 'pass1', 2),
('carlos.ramirez', 'Carlos', 'Ramírez', '2345678901', 'carlos.ramirez@example.com', 'pass2', 2),
('lucia.gomez', 'Lucía', 'Gómez', '3456789012', 'lucia.gomez@example.com', 'pass3', 2),
('miguel.torres', 'Miguel', 'Torres', '4567890123', 'miguel.torres@example.com', 'pass4', 2),
('valeria.fernandez', 'Valeria', 'Fernández', '5678901234', 'valeria.fernandez@example.com', 'pass5', 2);



INSERT INTO EVA.PARTICIPANTES (NOMBRE, APELLIDO, CORREO, DEPARTAMENTO_ID)
VALUES 
('Ana', 'Martínez', 'ana.martinez@example.com', 1),
('Carlos', 'Ramírez', 'carlos.ramirez@example.com', 1),
('Lucía', 'Gómez', 'lucia.gomez@example.com', 1),
('Miguel', 'Torres', 'miguel.torres@example.com', 1),
('Valeria', 'Fernández', 'valeria.fernandez@example.com', 1);
SELECT * FROM PARTICIPANTES

INSERT INTO EVA.EVENTOS (TITULO, FEVENTO, OBSERVACION, ESTADO)
VALUES ('Hackathon de Innovación', '2025-04-01', 'Evento interno de evaluación de ideas', 'ACTIVO');

SELECT * FROM EVENTOS

INSERT INTO EVA.EVENTOPARTICIPANTES (EVENTO_ID, PARTICIPANTE_ID)
VALUES 
(2, 11),
(2, 12),
(2, 13),
(2, 14),
(2, 15);


INSERT INTO EVA.EVALUACIONES (FEVALUACION, EVENTO_ID, EVALUADOR_ID, EVALUADO_ID, RESPONSABILIDAD, COMUNICACION, GESTION, COMENTARIO)
VALUES 
-- Ana evalúa a los otros
('2025-04-02', 2, 11, 12, 8, 9, 7, 'test1'),
('2025-04-02', 2, 11, 13, 9, 8, 8, 'test1'),
('2025-04-02', 2, 11, 14, 7, 7, 6, 'test1'),
('2025-04-02', 2, 11, 15, 8, 9, 8, 'test1'),

-- Carlos evalúa
('2025-04-02', 2, 12, 11, 7, 8, 7, 'Test2'),
('2025-04-02', 2, 12, 13, 8, 9, 8, 'Test2'),
('2025-04-02', 2, 12, 14, 9, 8, 9, 'Test2'),
('2025-04-02', 2, 12, 15, 6, 7, 6, 'Test2'),

-- Lucía evalúa
('2025-04-02', 2, 13, 11, 9, 8, 7, 'test3'),
('2025-04-02', 2, 13, 12, 7, 9, 8, 'test3'),
('2025-04-02', 2, 13, 14, 8, 8, 7, 'test3'),
('2025-04-02', 2, 13, 15, 9, 9, 9, 'test3'),

-- Miguel evalúa
('2025-04-02', 2, 14, 11, 6, 7, 7, 'test4'),
('2025-04-02', 2, 14, 12, 8, 6, 8, 'test4'),
('2025-04-02', 2, 14, 13, 7, 8, 7, 'test4'),
('2025-04-02', 2, 14, 15, 9, 9, 8, 'test4'),

-- Valeria evalúa
('2025-04-02', 2, 15, 11, 9, 9, 9, 'test5'),
('2025-04-02', 2, 15, 12, 8, 8, 8, 'test5'),
('2025-04-02', 2, 15, 13, 7, 8, 7, 'test5'),
('2025-04-02', 2, 15, 14, 9, 9, 9, 'test5');



SELECT 
    e.FEVALUACION,
    ev.TITULO AS EVENTO,
    p.NOMBRE || ' ' || p.APELLIDO AS EVALUADOR,
    e.RESPONSABILIDAD,
    e.COMUNICACION,
    e.GESTION
FROM EVA.EVALUACIONES e
JOIN EVA.EVENTOS ev ON e.EVENTO_ID = ev.ID
JOIN EVA.PARTICIPANTES p ON e.EVALUADOR_ID = p.ID
WHERE e.EVALUADO_ID = :participante_id;


