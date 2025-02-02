# 🍔 C-Fitness

¡Bienvenido a C-Fitness! Esta aplicación está diseñada para ayudarte a mantener un estilo de vida activo y saludable. Con ella, puedes crear una cuenta, buscar ejercicios, crear rutinas personalizadas, guardar tus rutinas y organizar tus entrenamientos en un calendario para un mejor control y seguimiento.

## 📝 Descripción

Esta es una aplicación web desarrollada con **React usando Next.js** en el front-end. Los usuarios pueden:

- Crear una cuenta e iniciar sesión.

- Buscar ejercicios y crear rutinas personalizadas.

- Guardar rutinas en su perfil.

- Agregar rutinas a un calendario para planificar sus entrenamientos.

- Modificar o eliminar rutinas según sea necesario.

El back-end de la aplicación fue desarrollado con NestJS y utiliza MongoDB como base de datos. La autenticación se maneja con JWT (JSON Web Tokens), puedes bajarlo del siguiente link: https://github.com/jhosbel/Fitness-Backend

## 🖼️ Capturas de Pantalla

### Página de Inicio
<img src="public/c-fitnasshome.png" alt="Página de Inicio" width="600" height="400" />

## 🛠️ Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/FitnessWebApp.git
   cd FitnessWebApp
2. **Instala las dependencias del front-end:**
    ```bash Copy
    npm install
3. **Configura las variables de entorno:**
    ```bash Copy
    Crea un archivo .env en la carpeta frontend y agrega las siguientes variables:

    NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api
    NEXT_PUBLIC_BACKEND_URL_SOCKET=http://localhost:5000
    NEXTAUTH_SECRET=no_hacer_publica_esta_variable
4. **Inicia el servidor front-end:**
   ```bash Copy
    npm run dev
5. **Abre tu navegador y visita:**
    ```bash Copy
    http://localhost:3000

## ⚙️ Configuración

Variables de Entorno
Asegúrate de configurar las siguientes variables de entorno en el archivo .env:

- NEXT_PUBLIC_BACKEND_URL: URL del backend para las solicitudes HTTP.

- NEXT_PUBLIC_BACKEND_URL_SOCKET: URL del backend para la conexión WebSocket.

- NEXTAUTH_SECRET: Clave secreta para la autenticación JWT. No compartirla públicamente.

**Dependencias**

- La aplicación utiliza las siguientes dependencias principales:

- Next.js: Framework de React para renderizado del lado del servidor y generación de sitios estáticos.

- Tailwind CSS: Framework de CSS para estilizar la aplicación.

- JWT (JSON Web Tokens): Para manejar la autenticación de usuarios.

- WebSocket: Para comunicación en tiempo real con el back-end.

## 🚀 Uso
1. Registro: Ve a /register para crear una nueva cuenta.

2. Inicio de Sesión: Ve a /login para iniciar sesión.

3. Búsqueda de Ejercicios: Una vez autenticado, puedes buscar ejercicios en la página de inicio.

4. Crear Rutinas: Selecciona ejercicios y crea rutinas personalizadas.

5. Guardar Rutinas: Guarda tus rutinas en tu perfil personal.

6. Calendario de Entrenamientos: Agrega rutinas a un calendario para planificar tus entrenamientos.

7. Modificar Rutinas: Edita o elimina rutinas según tus necesidades.

## 🛠️ Tecnologías Utilizadas
Front-End:
- React: Biblioteca de JavaScript para construir interfaces de usuario.

- Next.js: Framework de React para renderizado del lado del servidor.

- Tailwind CSS: Framework de CSS para estilizar la aplicación.

- WebSocket: Para comunicación en tiempo real con el back-end.

Autenticación:
- JWT (JSON Web Tokens): Para manejar la autenticación de usuarios.

## 📂 Estructura del Proyecto
    /FitnessWebApp
    ├── public
    ├── src
    │   ├── app
    │   │   ├── api
    │   │   │   ├── auth
    │   │   ├── dashboard
    │   │   ├── feeding
    │   │   ├── login
    │   │   ├── profile
    │   │   ├── register
    │   │   ├── settings
    │   │   ├── training
    │   │   ├── ui
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   ├── components
    │   │   ├── Navigation.jsx
    │   │   ├── CalendarData.jsx
    │   │   ├── UsersData.jsx
    │   │   └── ...
    │   ├── context
    │   ├── interfaces
    │   ├── types
    │   ├── middleware.ts
    ├── .env
    ├── package.json
    └── README.md

## 📄 Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.