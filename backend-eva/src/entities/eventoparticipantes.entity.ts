import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Eventos } from './eventos.entity';
import { Usuarios } from './usuarios.entity';

@Entity({ name: 'eventoparticipantes' })
export class EventoParticipantes {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  evento_id: number;

  @PrimaryColumn()
  participante_id: string;

  @ManyToOne(() => Eventos, (evento) => evento.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'evento_id' })
  evento: Eventos;

  @ManyToOne(() => Usuarios, (usuario) => usuario.usuario, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'participante_id', referencedColumnName: 'usuario' })
  usuario: Usuarios;
}
