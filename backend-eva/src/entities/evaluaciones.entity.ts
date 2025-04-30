import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  Check,
  JoinColumn,
} from 'typeorm';
import { Eventos } from './eventos.entity';
import { Usuarios } from './usuarios.entity';

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
  @ManyToOne(() => Usuarios, { nullable: false })
  @JoinColumn({ name: 'evaluador_id', referencedColumnName: 'usuario' }) // Relación con la columna EVALUADOR_ID
  evaluador_id: Usuarios;

  @PrimaryColumn({ type: 'int', nullable: false })
  // @ManyToOne(() => Participantes, { nullable: false })
  // @JoinColumn({ name: 'evaluado_id' }) // Relación con la columna EVALUADO_ID
  evaluado_id: number;

  @Column({ type: 'int', nullable: true })
  criterio1?: number;

  @Column({ type: 'int', nullable: true })
  criterio2?: number;

  @Column({ type: 'int', nullable: true })
  criterio3?: number;

  @Column({ type: 'int', nullable: true })
  criterio4?: number;

  @Column({ type: 'int', nullable: true })
  criterio5?: number;

  @Column({ type: 'int', nullable: true })
  criterio6?: number;

  @Column({ type: 'int', nullable: true })
  criterio7?: number;

  @Column({ type: 'int', nullable: true })
  criterio8?: number;

  @Column({ type: 'int', nullable: true })
  criterio9?: number;

  @Column({ type: 'int', nullable: true })
  criterio10?: number;

  @Column({ type: 'varchar', length: 1000, nullable: false })
  comentario: string;
}
