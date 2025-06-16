Web
https://tomi2107.github.io/Pre-entrega/

Usuarios Se puede registrar y entrar pero para rol=admin tiene que usar

      "email": "admin@example.com",
      "password": "adminpass",

Otras webs amigas para visitar

Un form todo guarda en dom

https://todo-react25.netlify.app/

Un reproductor con back en java y front en react, base de datos en Fire
Abria que cambiar la base de datos a otra con plan gratuito para almacenar archivos
Para que funcione

https://frontmusic.netlify.app/

Crear proyecto react vite con JS, en app.js solo la etiqueta bodi, en componentes, header con el nav items home nosotros Lista contacto Usuarios(Un registro sencillo y redirige a login estas dos pestañas deben estar dentro de itms usuarios). Footer derechos reservados////// adentro de la pagina agrega al nav un items Productos con cards de los productos de la lista, cuando se cliquea Agregar al carrito la imagen de un carrito en el nav muestra que suma un producto y quitar resta. si se cliquea sobre el caritto se va a una pagina de usuario con un resumen de los productos agregados, y un total del precio. Manejado con persistencia en json, usuarios.json productos.json carrito.json otra caracteristica si el usuario esta setteado como Admin agrega un item al nav Adm con un crud para agregar editar y borrar productos ademas se tienen que poder cargar imagenes. Dame una lista ordenada con lo que te pido para ir construyendo paso a paso.


🧱 FASE 1: Configuración del Proyecto
Crear el proyecto React con Vite (JS):

bash
Copiar
Editar
npm create vite@latest mi-proyecto --template react
cd mi-proyecto
npm install
Estructura de carpetas:

pgsql
Copiar
Editar
/src
  ├── App.jsx
  ├── main.jsx
  ├── componentes/
  │   ├── Header.jsx
  │   ├── Footer.jsx
  │   ├── Productos.jsx
  │   ├── Carrito.jsx
  │   ├── Usuarios/
  │   │   ├── Registro.jsx
  │   │   ├── Login.jsx
  │   │   └── Perfil.jsx
  │   ├── Admin.jsx
/public
  ├── data/
  │   ├── productos.json
  │   ├── usuarios.json
  │   └── carrito.json
Instalar React Router:

bash
Copiar
Editar
npm install react-router-dom
📐 FASE 2: Estructura Básica y Navegación
Modificar App.jsx: Solo dejar la etiqueta <body> con Header, Footer, y un <Outlet /> para las rutas.

Crear Header.jsx:

Agregar nav con los ítems:

Home

Nosotros

Lista

Contacto

Usuarios → Dropdown con:

Registro

Login

Productos

🛒 Carrito (contador dinámico)

(Condicional) Admin (si el usuario es admin)

Crear Footer.jsx:

Mostrar: © Derechos reservados

Configurar react-router-dom:

Rutas:

/ → Home

/nosotros

/lista

/contacto

/registro

/login

/productos

/carrito

/admin (si el usuario es admin)

🛒 FASE 3: Productos y Carrito
Crear Productos.jsx:

Mostrar cards de productos desde productos.json

Cada card tiene botón: Agregar al carrito

Persistencia del carrito en carrito.json:

Al hacer clic en Agregar, suma el producto

Icono de carrito muestra cantidad actual

Al hacer clic en el icono del carrito, redirige a /carrito

Crear Carrito.jsx:

Mostrar resumen con:

Productos agregados

Botón para quitar

Total del precio

👤 FASE 4: Usuarios
Crear Registro.jsx:

Formulario básico: nombre, email, contraseña

Guarda usuario en usuarios.json

Redirige a /login

Crear Login.jsx:

Verifica credenciales desde usuarios.json

Setea en localStorage o contexto el usuario logueado

Crear Perfil.jsx (opcional):

Mostrar datos del usuario logueado

🛠️ FASE 5: Admin Panel
Detectar si el usuario es Admin:

Al loguearse, si role: "admin", se habilita Admin en el nav

Crear Admin.jsx:

CRUD de productos:

Agregar nuevo (con imagen)

Editar producto

Borrar producto

Guarda cambios en productos.json

Carga de imagenes:

Guardar rutas de imágenes en public/images (simuladas)

🧪 FASE 6: Extras y Testing
Guardar y leer datos de los JSON:

Usar fetch('/data/productos.json') para simular la persistencia

Guardar localmente con localStorage o un backend (si luego se quiere escalar)

Probar flujo completo:

Registro > login > agregar productos al carrito > ver resumen > si admin > editar productos


✅ Actualización del Plan: API en Home
Agregamos un nuevo paso para esto:

🔄 NUEVO Paso 19: Agregar ítem "API" al Navbar
En Header.jsx, agregar una ruta nueva:

API → /api

🧩 Paso 20: Crear la página /api (Api.jsx)
Usar una API externa pública, por ejemplo:

Clima actual: OpenWeatherMap

Imágenes random: Unsplash API

NASA: APOD - Astronomy Picture of the Day

Curiosidades: Bored API

📌 Sugerencia atractiva y fácil de implementar: usar la API de NASA (APOD) o clima con una card que muestre una imagen del día, título y explicación breve.

✨ Ejemplo visual para Api.jsx:
🔐 Puedes usar la clave DEMO_KEY de NASA o registrarte para una propia.

🧭 Actualizar las rutas:
Agregar a App.jsx o Routes.jsx:

jsx
Copiar
Editar

🔧 Actualización Final del Plan del Proyecto
🔌 Tecnologías y Librerías a Usar
Instalaremos estas dependencias:

bash
Copiar
Editar
npm install react-router-dom react-bootstrap bootstrap sweetalert2
Y en main.jsx importamos Bootstrap:

jsx
Copiar
Editar

🔁 Nuevas Funcionalidades Agregadas
✅ Props
Se usarán en todos los componentes reutilizables (ej: ProductoCard, UsuarioForm, CarritoItem).

Permiten que un componente reciba datos y funciones desde el componente padre.

✅ Hooks
useState, useEffect y useContext para:

Manejo de estado local y global

Peticiones a API

Almacenar usuario logueado y carrito

useNavigate de React Router para redirecciones.

✅ SweetAlert2
Confirmaciones visuales para:

Agregar/quitar del carrito

Login exitoso/fallido

Confirmar eliminación de productos (Admin)

Ejemplo:

jsx
Copiar
Editar
import Swal from 'sweetalert2';
Swal.fire("Producto agregado al carrito", "", "success");

✅ React-Bootstrap
Usaremos componentes como:

Navbar, NavDropdown, Card, Button, Form, Container, Row, Col, etc.

Mejora la estética sin escribir CSS personalizado desde cero.

🧱 Estructura con Todo Integrado
/src/componentes/

Header.jsx → Usa react-bootstrap/Navbar, muestra ítems dinámicos según login/admin.

Footer.jsx

Productos.jsx → Cards con productos y botón para agregar al carrito (usa props).

Carrito.jsx → Lista de productos con botón "Quitar" (usa SweetAlert2).

Usuarios/

Registro.jsx → Form con validación.

Login.jsx → Alerta de éxito o error.

Perfil.jsx

Admin.jsx → CRUD completo con SweetAlert2 para eliminar y editar productos.

Api.jsx → Datos bonitos desde API NASA o clima.

¿Querés que ahora te dé el código del Header.jsx con React-Bootstrap, ítems condicionales y navegación lista para usar?

-----------------------------
Creamos usuarios desde Reg y json
losusuarios de json pueden settearse a admin..
solo los del json entran a la parte admin de laweb

JSON.parse(localStorage.getItem("usuarios"))

para ver los usuarios guardados el localstorage

para remover los usuarios cargados desde reg y que guarde los nuevos desde el json borramos la memoria del localstorage de la web
localStorage.removeItem("usuarios");

Recargamos la pagina 

JSON.parse(localStorage.getItem("usuarios"))

Ya muestra los usuarios del Json

----------Github-pages--------------

Iniciar Git en tu proyecto (si no lo hiciste)
Desde la terminal, en la carpeta raíz de tu proyecto:

git init

✅ 2. Agregar y confirmar tus archivos

git add .

git commit -m "Subida inicial del proyecto"

✅ 3. Crear un repositorio en GitHub
Ve a https://github.com

Clic en “New repository”

Asignale un nombre (ej: mi-tienda)

No marques la opción de crear README si ya tenés uno local

Crea el repo

✅ 4. Vincular tu proyecto local con el repo de GitHub
Copia la URL del repo y ejecutá (usá HTTPS o SSH según corresponda):

git remote add origin https://github.com/TU_USUARIO/mi-tienda.git
✅ 5. Subirlo a la rama principal

git branch -M main

git push -u origin main

🚀 Publicar en GitHub Pages (por ejemplo si es un proyecto con React + Vite)

✅ 6. Instalar gh-pages (si usás React/Vite)

npm install gh-pages --save-dev

✅ 7. Modificar vite.config.js para producción
Agregá:

export default defineConfig({
  base: '/mi-tienda/', // nombre del repo
  ...
});

✅ 8. Agregar los scripts a package.json

json
Copiar
Editar
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "gh-pages -d dist"
}

✅ 9. Hacer build y desplegar

npm run build

npm run deploy

✅ 10. Activar GitHub Pages

Entra a tu repositorio en GitHub

Ve a Settings > Pages

En “Source” seleccioná la rama: gh-pages y carpeta: / (root)

Guardá

✅ 11. ¡Listo! Tu página estará publicada en:

https://TU_USUARIO.github.io/Proy-final/


