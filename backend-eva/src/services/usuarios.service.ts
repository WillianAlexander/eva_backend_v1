/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from 'src/dto/usuario/create-usuario.dto';
import { Usuarios } from 'src/entities/usuarios.entity';
import { Repository, DataSource } from 'typeorm';
import http from 'node:http';
import { AuthService } from './auth.service';
import 'dotenv/config';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private usuarioRepository: Repository<Usuarios>,
    private datasource: DataSource,
    private authService: AuthService, // Inyecta AuthService
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

  async login(usuario: string, password: string): Promise<any> {
    const data = JSON.stringify({
      usuario,
      password,
    });

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Content-Length': data.length.toString(),
    };
    console.log(`Authorization: ${process.env.AUTHORIZATIONLOGIN}`);
    headers['Authorization'] = 'rsYWvpruX4I4Pnp8ZZxiAb67TJxEu8LmaO868RXVnvdXU9m-qqQaFyUYVs16jZq695fcVfDlvIrcfIpax_ec_uiqrrvQdiwJNQ8O2MiRxZZ8rXZvtn_LlDR_5r3Fks54Gp0DkDq_PM-7NAgUSvDRfBrVI6VnLn1WDA9EJoBQAqVKK6OBIX-NJnOXmZxCeTidvHqIY0EE1SqyNCpZG60zckQJAzyReaS8w4do2V88_lr8JPgCCpnGNAZaoOPiaBR0KCL1vXvtmTePyMup0GBlDep_iZpl_DIR7CtrdPCPfqVZXMPjAnWmTKbhGox1Nghvk4Y&U5vR4Pb3B9Mp!VUYhM';

    const options = {
      hostname: '192.168.112.133',
      port: 5000,
      path: '/api/LoginCore',
      method: 'POST',
      headers: headers,
    };

    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', async () => {
          if (res.statusCode === 200) {
            const externalResponse = JSON.parse(responseData);

            if (externalResponse.ok) {
              // Firma el objeto recibido con AuthService
              const signedToken = await this.authService.login({
                nombres: externalResponse.data.nombreLegal,
                identificacion: externalResponse.data.identifiacion,
                correo: externalResponse.data.email,
              });

              resolve({
                ...externalResponse,
                token: signedToken.access_token, // Agrega el token firmado
              });
            } else {
              reject(
                new Error('Error en la autenticación del backend externo.'),
              );
            }
          } else {
            reject(
              new Error(
                `Error: ${res.statusCode} - ${res.statusMessage}. Response: ${responseData}`,
              ),
            );
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Request error: ${error.message}`));
      });

      req.write(data);
      req.end();
    });
  }
}
