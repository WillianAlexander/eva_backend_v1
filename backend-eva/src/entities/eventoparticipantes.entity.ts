import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Eventos } from './eventos.entity';
import { Departamentos } from './departamentos.entity';

@Entity({ name: 'eventoparticipantes' })
export class EventoParticipantes {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  evento_id: number;

  @PrimaryColumn()
  participante_id: number;

  @ManyToOne(() => Eventos, (evento) => evento.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'evento_id' })
  evento: Eventos;

  @ManyToOne(() => Departamentos, (departamento) => departamento.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'participante_id', referencedColumnName: 'id' })
  departamento: Departamentos;
}
