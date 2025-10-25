# 🚀 GraphQL Empresa API

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)
[![GraphQL](https://img.shields.io/badge/GraphQL-Latest-pink.svg)](https://graphql.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Local-green.svg)](https://mongodb.com)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com)

> 🏢 API GraphQL moderna para gestión empresarial con MongoDB, Express y Babel

Una API GraphQL completa para la gestión de departamentos, empleados y gerentes de una empresa, construida con las mejores prácticas de desarrollo moderno.

---

## 🌟 Características

- ✨ **GraphQL API** completa con queries y mutations
- 🗄️ **MongoDB** integración con Mongoose ODM
- 🔄 **Hot Reload** con Nodemon y Babel
- 📊 **GraphiQL** interface para testing
- 🎯 **Validaciones** robustas de datos
- 🏗️ **Arquitectura modular** bien organizada
- 📝 **Logging** detallado para debugging
- 🌱 **Seed data** para inicio rápido

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | 18+ | Runtime de JavaScript |
| **Express** | 5.x | Framework web |
| **GraphQL** | 16+ | Lenguaje de consultas |
| **MongoDB** | Local | Base de datos NoSQL |
| **Mongoose** | 8+ | ODM para MongoDB |
| **Babel** | 7+ | Transpilador ES6+ |
| **Nodemon** | 3+ | Hot reload en desarrollo |

---

## 🚀 Inicio Rápido

### 📋 Prerrequisitos

- Node.js 18 o superior
- MongoDB ejecutándose localmente
- npm o yarn

### ⚡ Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/practica05_graphql.git
cd practica05_graphql

# 2. Instalar dependencias
npm install

# 3. Poblar base de datos con datos iniciales
npm run seed

# 4. Ejecutar en modo desarrollo
npm start
```

### 🌐 Acceso

- **Servidor**: http://localhost:4000
- **GraphiQL**: http://localhost:4000/graphql
- **Base de datos**: `mongodb://localhost:27017/graphql_empresa`

---

## 📚 Esquema GraphQL

### 🏢 Tipos Principales

```graphql
type Departamento {
  _id: ID!
  nombre: String!
  slogan: String!
  empleados: [Empleado!]!
}

type Empleado {
  _id: ID!
  nombre: String!
  sueldo: Float!
}

type Gerente {
  _id: ID!
  nombre: String!
  email: String!
}
```

### 🔍 Queries Disponibles

```graphql
type Query {
  # Consultas básicas
  hello: String!
  saludar(name: String!): String!
  
  # Consultas de datos
  empleados: [Empleado!]!
  departamentos: [Departamento!]!
  departamento(nombre: String!): String!
  gerentes: [Gerente!]!
}
```

### ✏️ Mutations Disponibles

```graphql
type Mutation {
  createEmpleado(input: EmpleadoInput!): Empleado!
  createGerente(input: GerenteInput!): Gerente!
  createDepartamento(input: DepartamentoInput!): Departamento!
}
```

---

## 🧪 Ejemplos de Uso

### 📊 Listar todos los departamentos

```graphql
{
  departamentos {
    _id
    nombre
    slogan
    empleados {
      _id
      nombre
      sueldo
    }
  }
}
```

### ➕ Crear nuevo empleado

```graphql
mutation {
  createEmpleado(input: {
    nombre: "Juan Pérez"
    sueldo: 4000.00
  }) {
    _id
    nombre
    sueldo
  }
}
```

### 🏢 Crear departamento con empleados

```graphql
mutation {
  createDepartamento(input: {
    nombre: "Tecnología"
    slogan: "Innovación digital"
    empleados: [
      { nombre: "Ana López", sueldo: 3800.00 },
      { nombre: "Carlos Ruiz", sueldo: 4200.00 }
    ]
  }) {
    _id
    nombre
    slogan
    empleados {
      nombre
      sueldo
    }
  }
}
```

### 👔 Crear gerente

```graphql
mutation {
  createGerente(input: {
    nombre: "María García"
    email: "maria.garcia@empresa.com"
  }) {
    _id
    nombre
    email
  }
}
```

---

## 📁 Estructura del Proyecto

```
practica05_graphql/
├── 📦 src/
│   ├── 🗄️ models/
│   │   └── index.js          # Modelos de Mongoose
│   ├── 📄 database.js        # Configuración MongoDB
│   ├── 📄 schema.js          # Esquema GraphQL
│   ├── 📄 resolvers.js       # Resolvers GraphQL
│   ├── 📄 seedData.js        # Datos iniciales
│   └── 📄 index.js           # Servidor principal
├── 📄 package.json           # Dependencias y scripts
├── 📄 .babelrc              # Configuración Babel
└── 📄 README.md             # Este archivo
```

---

## 🎮 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| **Desarrollo** | `npm start` | Ejecuta servidor con hot reload |
| **Datos iniciales** | `npm run seed` | Pobla la BD con datos de prueba |
| **Dev completo** | `npm run dev` | Seed + Start en un comando |
| **Compilar** | `npm run build` | Transpila código a `/dist` |
| **Producción** | `npm run serve` | Ejecuta código compilado |
| **Limpiar** | `npm run clean` | Elimina carpeta `/dist` |

---

## 📊 Datos de Prueba

Al ejecutar `npm run seed`, se crean:

### 👥 **7 Empleados**
- Ana García ($3,500)
- Carlos Rodríguez ($4,200.50)
- Laura Martínez ($3,800.75)
- Miguel Torres ($4,500)
- Sofia López ($3,200.25)
- Pedro Silva ($3,000)
- Elena Ruiz ($3,900)

### 👔 **3 Gerentes**
- Roberto Silva (roberto.silva@empresa.com)
- Carmen Delgado (carmen.delgado@empresa.com)
- Fernando López (fernando.lopez@empresa.com)

### 🏢 **4 Departamentos**
- **Desarrollo**: "Innovación y Tecnología"
- **Marketing**: "Conectando con el cliente"
- **Ventas**: "Crecimiento y resultados"
- **Recursos Humanos**: "Gestionando el talento"

---

## 🔧 Configuración

### 🗄️ MongoDB

```javascript
// Configuración por defecto
const MONGODB_URI = 'mongodb://localhost:27017/graphql_empresa'

// Variables de entorno soportadas
MONGODB_URI=mongodb://tu-host:puerto/tu-database
PORT=4000
```

### 🌐 Servidor

```javascript
// Puerto por defecto: 4000
// GraphiQL habilitado en desarrollo
// CORS configurado para frontend
```

---

## 🐛 Debugging

### 📝 Logs Detallados

El servidor incluye logging detallado para todas las operaciones:

```bash
🔄 Conectando a MongoDB...
✅ MongoDB conectado exitosamente: localhost
📋 Obteniendo todos los departamentos desde MongoDB
✅ Encontrados 4 departamentos
```

### ❌ Manejo de Errores

- Validaciones de esquema Mongoose
- Errores de conexión MongoDB
- Validaciones GraphQL
- Mensajes de error descriptivos

---

## 🚦 Testing con GraphiQL

1. **Iniciar servidor**: `npm start`
2. **Abrir GraphiQL**: http://localhost:4000/graphql
3. **Explorar schema**: Click en "Docs" (panel derecho)
4. **Ejecutar queries**: Pega ejemplos del README
5. **Ver respuestas**: Panel derecho muestra resultados JSON

---

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

---

## 📝 Notas de Desarrollo

### 🔄 Hot Reload
- Nodemon reinicia automáticamente el servidor
- Babel transpila ES6+ en tiempo real
- Cambios reflejados instantáneamente

### 🗄️ Base de Datos
- MongoDB local requerido
- Colecciones creadas automáticamente
- Índices y validaciones aplicadas via Mongoose

### 🛡️ Validaciones
- Nombres requeridos y límites de caracteres
- Emails únicos y formato válido
- Sueldos no negativos
- Departamentos con nombres únicos

---

## 📜 Licencia

Este proyecto está bajo la Licencia ISC.

---

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@brayantaday](https://github.com/brayantaday)

---

<div align="center">

**¡Hecho con ❤️ y mucho ☕!**

[⬆ Volver arriba](#-graphql-empresa-api)

</div>