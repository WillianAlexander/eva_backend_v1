
# Autenticación manual con JWT en NestJS y Flutter

Este documento explica cómo implementar una autenticación manual usando **JWT** generado en **Flutter** y validado en **NestJS**, evitando Firebase.

---

# 🔄 Flujo General

1. Flutter genera un **JWT** usando una clave secreta compartida.
2. Flutter envía el JWT en el encabezado **Authorization** de las peticiones HTTP.
3. NestJS valida el JWT usando la misma clave secreta.
4. Si es válido, la petición es aceptada.

---

# 📈 Configuración Completa

## 1. Flutter: Generar JWT

Instala la librería en Flutter:
```bash
dart pub add dart_jsonwebtoken
```

Generar un token:
```dart
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';

String generateToken() {
  final jwt = JWT(
    {
      'id': 'user123',
      'role': 'admin',
    },
    issuer: 'flutter-app',
  );

  return jwt.sign(SecretKey('mi-clave-secreta-super-safe'));
}
```

Enviar el token en las peticiones:
```dart
final token = generateToken();

final response = await http.get(
  Uri.parse('https://tu-backend.com/protected'),
  headers: {
    'Authorization': 'Bearer $token',
  },
);
```

---

## 2. NestJS: Validar JWT

### a. Instalar dependencias
```bash
npm install @nestjs/jwt @nestjs/passport passport
```

### b. Crear JwtAuthGuard

Archivo `auth/jwt-auth.guard.ts`:
```typescript
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No Authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'mi-clave-secreta-super-safe',
      });

      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
```

### c. Importar JwtModule

En el módulo donde quieras usar el `JwtAuthGuard` (por ejemplo, `usuarios.module.ts`):

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'mi-clave-secreta-super-safe',
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, JwtAuthGuard],
})
export class UsuariosModule {}
```

---

# 🌊 Mejora recomendada

Crear un `AuthModule` donde:
- Configures `JwtModule`
- Proveas `JwtAuthGuard`
- Exports `JwtService`

Esto hace que sea fácil reutilizar el sistema de autenticación en múltiples módulos.

---

# ✅ Resumen Rápido

| Paso | Acción |
|:----|:----|
| 1 | Flutter: instalar `dart_jsonwebtoken` |
| 2 | Flutter: generar y firmar JWT |
| 3 | Flutter: enviar JWT en header Authorization |
| 4 | NestJS: instalar `@nestjs/jwt` |
| 5 | NestJS: crear `JwtAuthGuard` |
| 6 | NestJS: importar `JwtModule.register()` en el módulo correspondiente |


---

# 💡Notas Finales

- **La clave secreta debe ser la misma** tanto en Flutter como en NestJS.
- **Protege bien** tu clave secreta: usa variables de entorno en producción.
- Puedes agregar datos extras al payload, como `email`, `role`, `id_usuario`.

---

# 👋🏻 Listo para usar
Ahora tienes un sistema de autenticación totalmente manual sin Firebase y con el control total en tus manos.
