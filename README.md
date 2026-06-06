# Sistema ABM con Docker

Sistema de **Alta, Baja y Modificación (ABM)** de registros, desarrollado con arquitectura de contenedores usando Docker Compose. El proyecto separa el frontend (React) del backend (Node.js) en servicios independientes, facilitando el despliegue y la escalabilidad.

## Tecnologías utilizadas

| Capa | Tecnología |
|------|-----------|
| Frontend | React |
| Backend | Node.js |
| Contenedores | Docker / Docker Compose |
| Comunicación | API REST (HTTP/JSON) |

## Funcionalidades

- Crear nuevos registros (Alta)
- Eliminar registros existentes (Baja)
- Editar información de registros (Modificación)
- Listar y visualizar todos los registros
- Frontend y backend desacoplados, comunicados por API REST
- Despliegue completo con un solo comando (`docker-compose up`)

## Estructura del proyecto
sistema-ABM-con-DOCKER/
├── backend/          # API REST con Node.js
│   ├── src/
│   └── Dockerfile
├── docker-compose.yml  # Orquestación de servicios
└── README.md

## Requisitos previos

- [Docker](https://www.docker.com/) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado

## Cómo ejecutar el proyecto

```
# 1. Clonar el repositorio
git clone https://github.com/EMRocioB/sistema-ABM-con-DOCKER.git
cd sistema-ABM-con-DOCKER

# 2. Levantar todos los servicios
docker-compose up

# 3. Acceder a la aplicación
# Frontend: http://localhost:3000
# Backend:  http://localhost:4000
```

Para detener los servicios:
```
docker-compose down
```

## Decisiones de diseño

- Se eligió **Docker Compose** para simplificar el entorno de desarrollo y garantizar que el proyecto funcione igual en cualquier máquina, sin importar el sistema operativo.
- El frontend y el backend corren como **servicios separados**, siguiendo el principio de separación de responsabilidades.

---

Desarrollado por [Rocio Burguener](https://github.com/EMRocioB)
