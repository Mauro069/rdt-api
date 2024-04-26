# Red de Trabajo (RDT) API

## Endpoints

- [] AGREGAR LISTA DE ENDPOINTS

## Modelos

- [] User
- [] Applicant
- [] Companie
- [] Application
- [] Job

## Docker

Para correr el backend localmente hacer esto

```
docker pull pablojpedraza/rdt-api:latest
docker run -d -p 4000:4000 pablojpedraza/rdt-api
```

## Con docker compose para modificar las variables de entorno

Simplemente ejeuctar

```
docker-compose up -d
```

esa instrucción ejecuta el archivo docker-compose.yml y toma de ese archivo las variables de entorno configuradas

## Generar nueva imagen

```
docker build -t rdtapi .
```

## Subir imagen a Docker Hub

```
docker login
docker image tag rdtapi pablojpedraza/rdt-api:version
docker push pablojpedraza/rdt-api:version
```

Para checkear que se subio consultar en https://hub.docker.com/repository/docker/pablojpedraza/rdt-api/general
