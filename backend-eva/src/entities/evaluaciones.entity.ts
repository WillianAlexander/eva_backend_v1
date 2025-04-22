import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  Check,
  JoinColumn,
} from 'typeorm';
import { Eventos } from './eventos.entity';
import { Participantes } from './participantes.entity';

@Entity({ name: 'evaluaciones' })
@Check(`"responsabilidad" BETWEEN 0 AND 10`)
@Check(`"comunicacion" BETWEEN 0 AND 10`)
@Check(`"gestion" BETWEEN 0 AND 10`)
@Check(`"evaluador_id" <> "evaluado_id"`)
export class Evaluaciones {
  @PrimaryColumn({ type: 'date', nullable: false })
  fevaluacion: Date;

  @PrimaryColumn({ type: 'int', nullable: false })
  @ManyToOne(() => Eventos, { nullable: false })
  @JoinColumn({ name: 'evento_id' }) // Relación con la columna EVENTO_ID
  evento_id: Eventos;

  @PrimaryColumn({ type: 'int', nullable: false })
  @ManyToOne(() => Participantes, { nullable: false })
  @JoinColumn({ name: 'evaluador_id' }) // Relación con la columna EVALUADOR_ID
  evaluador_id: Participantes;

  @PrimaryColumn({ type: 'int', nullable: false })
  @ManyToOne(() => Participantes, { nullable: false })
  @JoinColumn({ name: 'evaluado_id' }) // Relación con la columna EVALUADO_ID
  evaluado_id: Participantes;

  @Column({ type: 'int', nullable: false })
  responsabilidad: number;

  @Column({ type: 'int', nullable: false })
  comunicacion: number;

  @Column({ type: 'int', nullable: false })
  gestion: number;

  @Column({ type: 'varchar', length: 1000, nullable: false })
  comentario: string;
}
