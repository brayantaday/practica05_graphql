import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers.js';

// Definir los tipos GraphQL
const typeDefs = `
  # Tipo Empleado
  type Empleado {
    _id: ID!
    nombre: String!
    sueldo: Float!
  }

  # Tipo Gerente
  type Gerente {
    _id: ID!
    nombre: String!
    email: String!
  }

  # Tipo Departamento
  type Departamento {
    _id: ID!
    nombre: String!
    slogan: String!
    empleados: [Empleado!]!
  }

  # Input para crear empleado
  input EmpleadoInput {
    nombre: String!
    sueldo: Float!
  }

  # Input para crear gerente
  input GerenteInput {
    nombre: String!
    email: String!
  }

  # Input para crear departamento
  input DepartamentoInput {
    nombre: String!
    slogan: String!
    empleados: [EmpleadoInput!]!
  }

  # Queries
  type Query {
    # Consulta básica
    hello: String!
    
    # Consulta con parámetro que recibe nombre y envía respuesta personalizada
    saludar(name: String!): String!
    
    # Consultas para departamentos y empleados
    empleados: [Empleado!]!
    departamentos: [Departamento!]!
    departamento(nombre: String!): String!
    gerentes: [Gerente!]!
  }

  # Mutations
  type Mutation {
    # Crear departamento
    createDepartamento(input: DepartamentoInput!): Departamento!
    
    # Crear empleado
    createEmpleado(input: EmpleadoInput!): Empleado!
    
    # Crear gerente
    createGerente(input: GerenteInput!): Gerente!
  }
`;

// Crear y exportar el schema ejecutable
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;