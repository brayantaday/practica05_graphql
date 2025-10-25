import mongoose from 'mongoose';

// Configuración de la conexión a MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/graphql_empresa';

// Configuración de opciones de conexión
const connectionOptions = {
  // Usar el nuevo motor de análisis de URL
  useNewUrlParser: true,
  // Usar el nuevo motor de monitoreo de topología de servidor
  useUnifiedTopology: true,
  // Configuración adicional para desarrollo
  maxPoolSize: 10, // Mantener hasta 10 conexiones de socket
  serverSelectionTimeoutMS: 5000, // Mantener intentando enviar operaciones por 5 segundos
  socketTimeoutMS: 45000, // Cerrar conexiones después de 45 segundos de inactividad
  family: 4 // Usar IPv4, omitir IPv6
};

// Función para conectar a MongoDB
export const connectDB = async () => {
  try {
    console.log('🔄 Conectando a MongoDB...');
    console.log(`📍 URI: ${MONGODB_URI}`);
    
    const conn = await mongoose.connect(MONGODB_URI, connectionOptions);
    
    console.log(`✅ MongoDB conectado exitosamente: ${conn.connection.host}`);
    console.log(`📋 Base de datos: ${conn.connection.name}`);
    console.log(`🔌 Puerto: ${conn.connection.port}`);
    
    return conn;
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    
    // Información adicional para debugging
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 Asegúrate de que MongoDB esté ejecutándose en tu sistema local');
      console.error('💡 Puedes iniciarlo con: mongod o brew services start mongodb/brew/mongodb-community');
    }
    
    process.exit(1);
  }
};

// Función para desconectar de MongoDB
export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  } catch (error) {
    console.error('❌ Error desconectando de MongoDB:', error.message);
  }
};

// Eventos de conexión de Mongoose
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('🔴 Error de conexión de Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🟡 Mongoose desconectado de MongoDB');
});

// Cerrar conexión al terminar el proceso
process.on('SIGINT', async () => {
  console.log('\n🛑 Cerrando aplicación...');
  await disconnectDB();
  process.exit(0);
});

// Exportar la conexión por defecto
export default mongoose;