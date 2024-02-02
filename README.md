This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Configuracion Entorno Desarrollo

primero, descargar las dependencias del proyecto.

```bash
npm install
```

segundo, correr el proyecto entorno de desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en tu ordenardor para ver la aplicación funcionando

Puede comenzar a editar la página midficando`app/page.tsx`.

tercero, los comando para produccion y tester

```bash
npm run build
npm run test
```

## Configuración bases de datos

Actualmente el proyecto esta trabajando con una base ya establecidad en postgres(_solo para pruebas_), en el caso que se desee crear una nueva base o cambiar la configuración actual, debes realizar cambios en las variables de entorno en archivo .env.

```bash
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
```

La creación de la base de datos en posgres, se realiza en el siguiente[https://vercel.com/my-team-7427c95e/~/stores](https://vercel.com/my-team-7427c95e/~/stores). Vercel tiene una version gratuita unicamente para pruebas.

Despeues de crear la base base datos, lo siguiente es ingresar en ella derigirnos a la pestaña **.env.local**, te sale los siguientes datos. das clic en el boton ver, tienes acceso a las credenciales.

```bash
POSTGRES_URL="************"
POSTGRES_PRISMA_URL="************"
POSTGRES_URL_NON_POOLING="************"
POSTGRES_USER="************"
POSTGRES_HOST="************"
POSTGRES_PASSWORD="************"
POSTGRES_DATABASE="************"

```

En la carpeta prisma se encuentra un archivo `schema.prisma`, este es donde se realiza la siguiente configuracion. se recomienda eliminar la carpeta migrations

```prisma
// schema.prisma
datasource db {
  provider = "postgresql"
  url = env("POSTGRES_PRISMA_URL") // uses connection pooling
  directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
}
```

Despues de realizar la anterior configuración y eliminar la carpeta migration en la carpeta prisma del proyecto, se procede inicializar la nueava base de datos.

```bash
npx prisma migrate dev --name init
```

## Despliegue en Vercel

El proyecto esta desplegado en la siguiente url [https://post-app-beige.vercel.app/](https://post-app-beige.vercel.app/)
