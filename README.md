# 🎁 ¡Feliz Cumpleaños Flor Lihue! 👑🧁

Un regalo interactivo y delicado diseñado de principio a fin bañado en **Verde Agua**, repleto de amor, mimos, recuerdos cotidianos y sorpresas mágicas para celebrar los hermosos **26 años** de la reina de la casa.

---

## ✨ Características Especiales del Espacio

- 🎵 **Jukebox de Amor**: Un reproductor de música interactivo ambientado con un vinilo giratorio y las canciones más significativas de Morat de fondo.
- 💌 **Carta Sellada**: Un sobre con un lacre interactivo que revela un emotivo saludo de cumpleaños profundo, sincero y redactado con todo el cariño de tu amorcito.
- 🧪 **Frasco de Mimos & Invocador Mágico (IA)**: Un tarro interactivo para pedir deseos al oráculo, elogios o agradecimientos mágicos potenciados por Gemini.
- 🧠 **Trivia de Amor**: Un divertido cuestionario de opciones múltiples sobre nuestras rutinas cotidianas para ver qué tan bien nos conocemos (mates, hamburguesas, dorama, etc.).
- 🐾 **El Rincón de la Duque**: Un panel especial dedicado a la perrita consentida del hermano del novio que siempre nos acompaña. ¡Tocá para escuchar sus divertidos pensamientos traducidos al lenguaje canino!
- 🎫 **Cuponera de Vales de Amor**: Un talonario interactivo con cupones de planes cotidianos (mates, masajes, skincare, series coreanas) canjeables y presentables físicamente con código de autenticación único.
- 🧉 **Refugio de Mates & Generador de Citas**: Simula cebarte un mate caliente a 80°C o hace girar el engranaje del destino para idear el próximo plan de fin de semana perfecto.

---

## 🛠️ Cómo ejecutar este proyecto en tu computadora (Local)

Si descargaste este proyecto en formato `.zip` y querés ejecutarlo localmente en tu editor de código preferido (como **Visual Studio Code**), sigue estos sencillos pasos:

### Requisitos Previos:
- Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).

### Paso a Paso para Iniciar:

1. **Descomprimir** el archivo `.zip` en una carpeta de tu preferencia.
2. **Abrir** una terminal en esa carpeta y ejecutar el siguiente comando para instalar las dependencias:
   ```bash
   npm install
   ```
3. **Configurar la Inteligencia Artificial (Opcional pero recomendado)**:
   Crea un archivo llamado `.env` en la raíz del proyecto y escribe tu clave de la API de Gemini (puedes conseguir una gratuita en Google AI Studio):
   ```env
   GEMINI_API_KEY=tu_clave_aqui
   ```
   *Si no configuras la clave, el Frasco de Mimos funcionará de forma offline usando una bonita base de datos local predefinida.*
4. **Ejecutar en modo de desarrollo**:
   ```bash
   npm run dev
   ```
5. ¡Listo! Abre en tu navegador favorito el enlace que te aparezca en la consola (usualmente `http://localhost:3000`).

---

## 🚀 Cómo subirlo a GitHub y compartirlo

### 1. Crear un Repositorio en GitHub:
1. Entra a tu cuenta de [GitHub](https://github.com/) (si no tienes, créate una gratis en dos minutos).
2. Haz clic en el botón **New** (Nuevo) para crear un repositorio vacío.
3. Elige un nombre bonito (ej: `feliz-cumple-flor`) y asegúrate de marcarlo como **Público**.
4. Deja **desmarcadas** las opciones de añadir `README.md`, `.gitignore` o licencia, y dale clic a **Create repository**.

### 2. Inicializar Git y subir el código desde tu PC:
Abre una terminal en la carpeta raíz del proyecto y ejecuta estos comandos:
```bash
# Inicializar Git en la carpeta
git init

# Agregar todos los archivos preparados
git add .

# Crear el primer guardado (commit)
git commit -m "Regalo de amor para Flor Lihue 🎁"

# Enlazar tu carpeta local con el repositorio de GitHub (Reemplaza TU_USUARIO y TU_REPOSITORIO)
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# Renombrar rama a main y subir los archivos
git branch -M main
git push -u origin main
```

---

## 🌐 ¿Dónde lo puedo hospedar gratis con el backend activo?

Dado que este proyecto contiene rutas de servidor (un backend de Node/Express en `server.ts` que se encarga de proteger la clave de Gemini de forma segura para que nadie te la robe), las plataformas de hosting puramente estáticas (como GitHub Pages o Vercel standard) hospedarán la web perfectamente pero la interacción con la Inteligencia Artificial fallará al no tener un servidor físico que ejecute Node.

Para tener el espacio **100% activo** con el Jukebox, mimos y el Invocador de IA completamente gratis, te recomiendo subirlo a:
- **Render** ([render.com](https://render.com/)):
  1. Conéctalo con tu repositorio de GitHub recién subido.
  2. Crea un **Web Service**.
  3. Configura:
     - **Build Command**: `npm run build`
     - **Start Command**: `npm run start`
  4. En la sección **Environment Variables**, añade:
     - `GEMINI_API_KEY` con tu clave de Google.
     - `NODE_ENV` con el valor `production`.
- **Railway** o **Fly.io** también son excelentes alternativas.

---

## 🎶 Cómo Cambiar las Canciones Reales del Jukebox en VS Code

Si querés reemplazar los enlaces de prueba actuales por las canciones oficiales reales en formato MP3 para que suenen directo desde el almacenamiento:
1. Descargá las canciones de Morat que desees en formato `.mp3`.
2. Renómbralas con nombres sencillos sin espacios (ej: `la_correcta.mp3`, `no_se_va.mp3`).
3. Guarda estos archivos adentro de la carpeta `public/` de este proyecto.
4. Abre el archivo `src/App.tsx` en tu editor de código.
5. Busca el arreglo `MUSIC_PLAYLIST` en la parte superior y cambia los valores de la propiedad `audioUrl` para que apunten a los archivos locales.
   - Ejemplo: `audioUrl: "/la_correcta.mp3"`
6. ¡Guarda, vuelve a subir los cambios a GitHub y la música real se escuchará de forma nativa e inmediata en todo el mundo!

---

**Hecho con amor eterno por su novio.** ❤️✨
🐾 *La Duque aprueba la totalidad de esta hermosa y dedicada obra de arte.*
