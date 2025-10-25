import { connectDB } from './database.js';
import { Empleado, Gerente, Departamento } from './models/index.js';

// Datos iniciales para poblar la base de datos
const seedData = async () => {
  try {
    console.log('🌱 Iniciando población de datos...');
    
    // Conectar a la base de datos
    await connectDB();
    
    // Limpiar colecciones existentes
    await Empleado.deleteMany({});
    await Gerente.deleteMany({});
    await Departamento.deleteMany({});
    console.log('🧹 Base de datos limpiada');
    
    // Crear empleados
    const empleados = await Empleado.insertMany([
      { nombre: "Ana García", sueldo: 3500.00 },
      { nombre: "Carlos Rodríguez", sueldo: 4200.50 },
      { nombre: "Laura Martínez", sueldo: 3800.75 },
      { nombre: "Miguel Torres", sueldo: 4500.00 },
      { nombre: "Sofia López", sueldo: 3200.25 },
      { nombre: "Pedro Silva", sueldo: 3000.00 },
      { nombre: "Elena Ruiz", sueldo: 3900.00 }
    ]);
    console.log(`👥 ${empleados.length} empleados creados`);
    
    // Crear gerentes
    const gerentes = await Gerente.insertMany([
      { nombre: "Roberto Silva", email: "roberto.silva@empresa.com" },
      { nombre: "Carmen Delgado", email: "carmen.delgado@empresa.com" },
      { nombre: "Fernando López", email: "fernando.lopez@empresa.com" }
    ]);
    console.log(`👔 ${gerentes.length} gerentes creados`);
    
    // Crear departamentos con empleados asignados
    const departamentos = await Departamento.insertMany([
      {
        nombre: "Desarrollo",
        slogan: "Innovación y Tecnología",
        empleados: [empleados[0]._id, empleados[1]._id], // Ana García, Carlos Rodríguez
        gerente: gerentes[0]._id // Roberto Silva
      },
      {
        nombre: "Marketing",
        slogan: "Conectando con el cliente", 
        empleados: [empleados[2]._id, empleados[4]._id], // Laura Martínez, Sofia López
        gerente: gerentes[1]._id // Carmen Delgado
      },
      {
        nombre: "Ventas",
        slogan: "Crecimiento y resultados",
        empleados: [empleados[3]._id], // Miguel Torres
        gerente: gerentes[2]._id // Fernando López
      },
      {
        nombre: "Recursos Humanos",
        slogan: "Gestionando el talento",
        empleados: [empleados[5]._id, empleados[6]._id], // Pedro Silva, Elena Ruiz
        gerente: gerentes[0]._id // Roberto Silva
      }
    ]);
    console.log(`🏢 ${departamentos.length} departamentos creados`);
    
    console.log('✅ Datos iniciales poblados exitosamente');
    console.log('\n📊 Resumen:');
    console.log(`   👥 Empleados: ${empleados.length}`);
    console.log(`   👔 Gerentes: ${gerentes.length}`);
    console.log(`   🏢 Departamentos: ${departamentos.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error poblando datos:', error);
    process.exit(1);
  }
};

// Ejecutar si es llamado directamente
if (process.argv[1].endsWith('seedData.js')) {
  seedData();
}

export default seedData;