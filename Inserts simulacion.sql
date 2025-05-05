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

INSERT INTO EVA.USUARIOS (USUARIO, NOMBRES, APELLIDOS, IDENTIFICACION, CORREO, ROL_ID)
VALUES 
('ana.martinez', 'Ana', 'Martínez', '1234567890', 'ana.martinez@example.com', 2),
('carlos.ramirez', 'Carlos', 'Ramírez', '2345678901', 'carlos.ramirez@example.com', 2),
('lucia.gomez', 'Lucía', 'Gómez', '3456789012', 'lucia.gomez@example.com', 2),
('miguel.torres', 'Miguel', 'Torres', '4567890123', 'miguel.torres@example.com', 2),
('valeria.fernandez', 'Valeria', 'Fernández', '5678901234', 'valeria.fernandez@example.com', 2);

INSERT INTO EVA.EVENTOS (TITULO, FEVENTO, OBSERVACION, ESTADO)
VALUES ('Hackathon de Innovación', '2025-04-01', 'Evento interno de evaluación de ideas', 'ACTIVO');

INSERT INTO EVA.EVENTOPARTICIPANTES (EVENTO_ID, PARTICIPANTE_ID)
VALUES 
(1, 'ana.martinez'),
(1, 'carlos.ramirez'),
(1, 'lucia.gomez'),
(1, 'miguel.torres'),
(1, 'valeria.fernandez');

INSERT INTO EVA.EVALUACIONES (EVENTO_ID, FEVALUACION, EVALUADOR_ID, EVALUADO_ID, 
    CRITERIO1, CRITERIO2, CRITERIO3, CRITERIO4, CRITERIO5, 
    CRITERIO6, CRITERIO7, CRITERIO8, CRITERIO9, CRITERIO10, COMENTARIO)
SELECT 
    1 AS EVENTO_ID,
    '2025-04-01' AS FEVALUACION,
    evaluador.usuario AS EVALUADOR_ID,
    evaluado.usuario AS EVALUADO_ID,
    8, 7, 9, 8, 7, 9, 8, 7, 9, 8, -- valores fijos de ejemplo
    'Buena participación y trabajo en equipo'
FROM EVA.USUARIOS evaluador
JOIN EVA.USUARIOS evaluado ON evaluador.usuario != evaluado.usuario
WHERE evaluador.usuario IN (
    'ana.martinez', 'carlos.ramirez', 'lucia.gomez', 'miguel.torres', 'valeria.fernandez'
)
AND evaluado.usuario IN (
    'ana.martinez', 'carlos.ramirez', 'lucia.gomez', 'miguel.torres', 'valeria.fernandez'
);

SELECT * FROM EVA.CRITERIOS_DETALLE

INSERT INTO EVA.CRITERIOS_DETALLE (DESCRIPCION) VALUES 
('PRESENTACION'),
('CONTENIDO'),
('GESTION'),
('MEJORA');

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


SELECT evaluado_id, COALESCE(actual, 0) as actual, COALESCE(anterior, 0) as anterior, COALESCE(anterior2, 0) as anterior2 
FROM eva.crosstab(
  $$SELECT 
      evaluado_id, 
      evento_id, 
      (criterio1 + criterio2 + criterio3 + criterio4) AS total
    FROM eva.evaluaciones
    WHERE evento_id <= 6
    ORDER BY evaluado_id, evento_id desc$$
) AS ct (
  evaluado_id INT,
  actual      INT,
  anterior    INT,
  anterior2   INT
);

INSERT INTO EVA.EVALUACIONES (evento_id, fevaluacion, evaluador_id, evaluado_id, criterio1, criterio2, criterio3, criterio4, comentario)
VALUES
(12, '2025-10-06', 'ESANMARTIN', 6, 10, 10, 10, 10, ''),
(12, '2025-10-06', 'GLITUMA', 6, 10, 10, 10, 10, ''),
(12, '2025-10-06', 'LGALINDO', 6, 10, 10, 10, 10, ''),
(12, '2025-10-06', 'JLEON', 6, 10, 10, 10, 10, ''),
(12, '2025-10-06', 'SMOSCOSO', 6, 10, 10, 10, 10, ''),
(12, '2025-10-06', 'MLLIVICHUZC', 6, 10, 10, 10, 10, ''),
(12, '2025-10-06', 'CCORREA', 6, 10, 10, 10, 10, ''),
(12, '2025-10-06', 'ana.martinez', 6, 10, 10, 10, 10, ''),
(12, '2025-10-06', 'lucia.gomez', 6, 10, 10, 10, 10, ''),
(12, '2025-10-06', 'miguel.torres', 6, 10, 10, 10, 10, ''),
(12, '2025-10-06', 'CVALDIVIEZO', 6, 10, 10, 10, 10, ''),
(11, '2025-10-06', 'JYUNGA', 6, 7, 2, 8, 4, ''),
(12, '2025-10-06', 'valeria.fernandez', 6, 10, 10, 10, 10, ''),
(12, '2025-10-06', 'carlos.ramirez', 6, 10, 10, 10, 10, '')