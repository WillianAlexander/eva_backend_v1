import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from 'src/dto/usuario/create-usuario.dto';
import { Usuarios } from 'src/entities/usuarios.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private usuarioRepository: Repository<Usuarios>,
    private datasource: DataSource,
  ) {}

  findAll() {
    return this.datasource.manager.find(Usuarios, {
      relations: ['departamento'],
    });
  }

  findOneById(usuario: string) {
    return this.usuarioRepository.findOne({
      where: {
        usuario: usuario,
        fhasta: new Date('2999-12-31 00:00:00'),
      },
      relations: ['departamento'],
    });
  }

  createuser(userDto: CreateUsuarioDto) {
    const usuario = this.usuarioRepository.create(userDto);
    return this.usuarioRepository.save(usuario);
  }

  remove(usuario: string) {
    return this.usuarioRepository.delete({ usuario });
  }

  findUsersByDepartment(departmentId: number) {
    return this.datasource.manager.find(Usuarios, {
      where: { departamento_id: departmentId },
      relations: ['departamento'],
    });
  }
}
