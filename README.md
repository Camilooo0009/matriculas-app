# Matriculas App

Aplicación web para gestión de matrículas, pensiones, notas y materias con tres interfaces: estudiante, docente y administrador.

## Requisitos
- Node.js 18+

## Configuración
1. Crear archivo `.env` (ya generado con valores por defecto):
```
SESSION_SECRET=super_secreto_cambia_esto
PORT=3000
NODE_ENV=development
```

## Instalación
```
npm install
```

## Ejecutar
```
npm run start
```

Usuario admin inicial: `admin@colegio.edu` / `admin123`

## Próximos módulos
- Usuarios (CRUD y roles)
- Materias (CRUD)
- Matrículas por período
- Notas por materia y período
- Pensiones y pagos
- Reportes
