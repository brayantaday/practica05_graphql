import { Empleado, Gerente, Departamento } from './models/index.js';

// Resolvers organizados por tipo
const resolvers = {
  // Resolvers para Queries
  Query: {
    // Consultas básicas
    hello: () => "¡Hola desde GraphQL con MongoDB!",
    
    // Función saludar como se muestra en la imagen
    saludar: (root, { name }, context) => {
      console.log('📝 Context:', context);
      return `Hola ${name}!`;
    },
    
    // Resolvers para empleados
    empleados: async () => {
      try {
        console.log('📋 Obteniendo todos los empleados desde MongoDB');
        const empleados = await Empleado.find();
        console.log(`✅ Encontrados ${empleados.length} empleados`);
        return empleados;
      } catch (error) {
        console.error('❌ Error obteniendo empleados:', error);
        throw new Error('Error al obtener empleados');
      }
    },

    // Resolvers para departamentos
    departamentos: async () => {
      try {
        console.log('📋 Obteniendo todos los departamentos con empleados desde MongoDB');
        const departamentos = await Departamento.find().populate('empleados');
        console.log(`✅ Encontrados ${departamentos.length} departamentos`);
        return departamentos;
      } catch (error) {
        console.error('❌ Error obteniendo departamentos:', error);
        throw new Error('Error al obtener departamentos');
      }
    },

    departamento: async (root, { nombre }, context) => {
      try {
        console.log('📝 Context:', context);
        console.log(`🔍 Buscando departamento: ${nombre}`);
        const departamento = await Departamento.findByNombre(nombre);
        if (!departamento) {
          return `Departamento ${nombre} no encontrado!`;
        }
        return `${departamento.nombre}!`;
      } catch (error) {
        console.error('❌ Error buscando departamento:', error);
        return `Error buscando departamento ${nombre}!`;
      }
    },

    // Resolvers para gerentes
    gerentes: async () => {
      try {
        console.log('� Obteniendo todos los gerentes desde MongoDB');
        const gerentes = await Gerente.find();
        console.log(`✅ Encontrados ${gerentes.length} gerentes`);
        return gerentes;
      } catch (error) {
        console.error('❌ Error obteniendo gerentes:', error);
        throw new Error('Error al obtener gerentes');
      }
    }
  },

  // Resolvers para Mutations
  Mutation: {
    // Mutations para empleados
    createEmpleado: async (_, { input }) => {
      try {
        console.log('➕ Creando nuevo empleado en MongoDB:', input);
        
        const newEmpleado = new Empleado(input);
        const savedEmpleado = await newEmpleado.save();
        
        console.log(`✅ Empleado creado: ${savedEmpleado.nombre} con ID: ${savedEmpleado._id}`);
        return savedEmpleado;
      } catch (error) {
        console.error('❌ Error creando empleado:', error);
        throw new Error(`Error al crear empleado: ${error.message}`);
      }
    },

    // Mutations para gerentes
    createGerente: async (_, { input }) => {
      try {
        console.log('➕ Creando nuevo gerente en MongoDB:', input);
        
        // Verificar si ya existe un gerente con ese email
        const existingGerente = await Gerente.findOne({ email: input.email });
        if (existingGerente) {
          throw new Error(`Ya existe un gerente con el email: ${input.email}`);
        }
        
        const newGerente = new Gerente(input);
        const savedGerente = await newGerente.save();
        
        console.log(`✅ Gerente creado: ${savedGerente.nombre} con ID: ${savedGerente._id}`);
        return savedGerente;
      } catch (error) {
        console.error('❌ Error creando gerente:', error);
        throw new Error(`Error al crear gerente: ${error.message}`);
      }
    },

    // Mutations para departamentos
    createDepartamento: async (_, { input }) => {
      try {
        console.log('➕ Creando nuevo departamento en MongoDB:', input);
        
        // Verificar si ya existe un departamento con ese nombre
        const existingDepartamento = await Departamento.findOne({ nombre: input.nombre });
        if (existingDepartamento) {
          throw new Error(`Ya existe un departamento con el nombre: ${input.nombre}`);
        }
        
        // Crear empleados primero si se proporcionan
        let empleadosIds = [];
        if (input.empleados && input.empleados.length > 0) {
          console.log(`📝 Creando ${input.empleados.length} empleados para el departamento`);
          
          for (const empleadoData of input.empleados) {
            const nuevoEmpleado = new Empleado(empleadoData);
            const empleadoGuardado = await nuevoEmpleado.save();
            empleadosIds.push(empleadoGuardado._id);
          }
        }
        
        // Crear el departamento con los IDs de empleados
        const departamentoData = {
          nombre: input.nombre,
          slogan: input.slogan,
          empleados: empleadosIds
        };
        
        const newDepartamento = new Departamento(departamentoData);
        const savedDepartamento = await newDepartamento.save();
        
        // Poblar con los empleados para la respuesta
        await savedDepartamento.populate('empleados');
        
        console.log(`✅ Departamento creado: ${savedDepartamento.nombre} con ${savedDepartamento.empleados.length} empleados`);
        return savedDepartamento;
      } catch (error) {
        console.error('❌ Error creando departamento:', error);
        throw new Error(`Error al crear departamento: ${error.message}`);
      }
    }
  }
};

export default resolvers;