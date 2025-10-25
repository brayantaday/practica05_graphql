import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema.js';
import { connectDB } from './database.js';

// Función principal para iniciar el servidor
const startServer = async () => {
  try {
    // Conectar a MongoDB
    await connectDB();
    
    // Crear la aplicación Express
    const app = express();
    const PORT = process.env.PORT || 4000;

    // Configurar GraphQL endpoint
    app.use('/graphql', graphqlHTTP({
      schema: schema,
      graphiql: true, // Habilita GraphiQL para testing
    }));

    // Ruta básica para verificar que el servidor funciona
    app.get('/', (req, res) => {
      res.json({
        message: 'Servidor GraphQL funcionando con MongoDB!',
        database: 'MongoDB Local conectado',
        endpoints: {
          graphql: '/graphql',
          graphiql: '/graphql (en el navegador)'
        },
        examples: {
          queries: [
            'hello',
            'saludar(name: "Tu Nombre")',
            'empleados',
            'departamentos',
            'departamento(nombre: "Desarrollo")',
            'gerentes'
          ],
          mutations: [
            'createEmpleado(input: { nombre: "...", sueldo: 3000 })',
            'createGerente(input: { nombre: "...", email: "..." })',
            'createDepartamento(input: { nombre: "...", slogan: "...", empleados: [...] })'
          ]
        }
      });
    });

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`📊 GraphiQL disponible en http://localhost:${PORT}/graphql`);
      console.log(`📋 Documentación en http://localhost:${PORT}`);
      console.log(`🗄️  Base de datos: MongoDB Local`);
    });
    
  } catch (error) {
    console.error('❌ Error iniciando el servidor:', error);
    process.exit(1);
  }
};

// Iniciar el servidor
startServer();