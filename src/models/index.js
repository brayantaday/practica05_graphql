import mongoose from 'mongoose';

// Schema para Empleado
const EmpleadoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del empleado es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  sueldo: {
    type: Number,
    required: [true, 'El sueldo es requerido'],
    min: [0, 'El sueldo no puede ser negativo']
  }
}, {
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  collection: 'empleados'
});

// Schema para Gerente
const GerenteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del gerente es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Formato de email inválido']
  }
}, {
  timestamps: true,
  collection: 'gerentes'
});

// Schema para Departamento
const DepartamentoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del departamento es requerido'],
    unique: true,
    trim: true,
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  slogan: {
    type: String,
    required: [true, 'El slogan es requerido'],
    trim: true,
    maxlength: [200, 'El slogan no puede exceder 200 caracteres']
  },
  empleados: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado'
  }],
  gerente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gerente'
  }
}, {
  timestamps: true,
  collection: 'departamentos'
});

// Métodos personalizados para el schema de Departamento
DepartamentoSchema.methods.agregarEmpleado = function(empleadoId) {
  if (!this.empleados.includes(empleadoId)) {
    this.empleados.push(empleadoId);
    return this.save();
  }
  return this;
};

DepartamentoSchema.methods.removerEmpleado = function(empleadoId) {
  this.empleados = this.empleados.filter(id => !id.equals(empleadoId));
  return this.save();
};

// Middleware para popular empleados automáticamente
DepartamentoSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'empleados',
    select: 'nombre sueldo'
  }).populate({
    path: 'gerente',
    select: 'nombre email'
  });
  next();
});

// Métodos estáticos
DepartamentoSchema.statics.findByNombre = function(nombre) {
  return this.findOne({ 
    nombre: new RegExp(nombre, 'i') 
  });
};

EmpleadoSchema.statics.findBySueldo = function(min, max) {
  return this.find({
    sueldo: { $gte: min, $lte: max }
  });
};

// Crear los modelos
export const Empleado = mongoose.model('Empleado', EmpleadoSchema);
export const Gerente = mongoose.model('Gerente', GerenteSchema);
export const Departamento = mongoose.model('Departamento', DepartamentoSchema);

// Exportar todos los modelos
export default {
  Empleado,
  Gerente,
  Departamento
};