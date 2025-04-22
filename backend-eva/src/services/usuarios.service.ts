import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';
import { Usuarios } from 'src/entities/usuarios.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private usuarioRepository: Repository<Usuarios>,
  ) {}

  findAll() {
    return this.usuarioRepository.findBy({
      fhasta: new Date('2999-12-31 00:00:00'),
    });
  }

  findOneById(usuario: string) {
    return this.usuarioRepository.findOneBy({
      usuario: usuario,
      fhasta: new Date('2999-12-31 00:00:00'),
    });
  }

  createuser(userDto: CreateUsuarioDto) {
    const usuario = this.usuarioRepository.create(userDto);
    return this.usuarioRepository.save(usuario);
  }

  remove(usuario: string) {
    return this.usuarioRepository.delete({ usuario });
  }
}
