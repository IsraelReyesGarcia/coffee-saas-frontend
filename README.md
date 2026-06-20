This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## Objetivo general
Este proyecto se hace pensado para poder escalar, pero la idea central es que este proyecto sea administrado independientemente por cada cafetería, posteriormente se busca convertir en un multitenat, pero una primera versión es hacerla para una cafetería, pensado en evolucionar en un futuro.

## Requerimientos funcionales 
- Busca ser operada por una cafetería pequeña, mediana y grande.
- Esta debe soportar entre 200 y 1000 peticiones por minuto
- Los menús deben verse al instante y las ordenes también son operaciones críticas, el sistema debe responder muy rápido ante estas situaciones
- Los datos de los usuarios, lo que se requiere para los pedidos, las ventas deben guardarse y persistirse de forma segura
- Si no hay internet el sistema debe funcionar ()

### Requerimientos no funcionales
- Seguridad: El sistema debe estar diseñado a prueba de ataques de todo tipo.
- Disponibilidad: El sistema debe estar disponible inclusive si la conexión es lenta, sin embargo si se toma una opción web, el sistema estará limitada al internet.
- Consistencia: Los datos del sistema deberán presentarse iguales para todos al mismo tiempo
- Usabilidad: El sistema debe estar diseñado de tal forma que todos los usuarios puedan hacer uso de ella, inclusive si tienen alguna discapacidad que les imposibilite ver o si se les complica leer, ellos deben poder interactuar con el sistema de una forma amigable.

