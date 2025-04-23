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
@Check(`"criterio1" BETWEEN 0 AND 10`)
@Check(`"criterio2" BETWEEN 0 AND 10`)
@Check(`"criterio3" BETWEEN 0 AND 10`)
@Check(`"criterio4" BETWEEN 0 AND 10`)
@Check(`"criterio5" BETWEEN 0 AND 10`)
@Check(`"criterio6" BETWEEN 0 AND 10`)
@Check(`"criterio7" BETWEEN 0 AND 10`)
@Check(`"criterio8" BETWEEN 0 AND 10`)
@Check(`"criterio9" BETWEEN 0 AND 10`)
@Check(`"criterio10" BETWEEN 0 AND 10`)
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
  criterio1: number;

  @Column({ type: 'int', nullable: false })
  criterio2: number;

  @Column({ type: 'int', nullable: false })
  criterio3: number;

  @Column({ type: 'int', nullable: false })
  criterio4: number;

  @Column({ type: 'int', nullable: false })
  criterio5: number;

  @Column({ type: 'int', nullable: false })
  criterio6: number;

  @Column({ type: 'int', nullable: false })
  criterio7: number;

  @Column({ type: 'int', nullable: false })
  criterio8: number;

  @Column({ type: 'int', nullable: false })
  criterio9: number;

  @Column({ type: 'int', nullable: false })
  criterio10: number;

  @Column({ type: 'varchar', length: 1000, nullable: false })
  comentario: string;
}
