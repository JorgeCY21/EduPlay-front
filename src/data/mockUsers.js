// Datos mock de usuarios - Temporal hasta que tengas el backend
export const mockUsers = [
  {
    id: 1,
    nombres: 'María',
    apellidos: 'García López',
    email: 'maria.docente@escuela.edu',
    password: 'Docente123!',
    rol: 'docente',
    especialidad: 'Matemáticas',
    cursos: ['Matemáticas 1A', 'Cálculo Avanzado']
  },
  {
    id: 2,
    nombres: 'Carlos',
    apellidos: 'Rodríguez Méndez',
    email: 'carlos.docente@escuela.edu',
    password: 'Docente123!',
    rol: 'docente',
    especialidad: 'Ciencias',
    cursos: ['Física', 'Química']
  },
  {
    id: 3,
    nombres: 'Ana',
    apellidos: 'Martínez Silva',
    email: 'ana.estudiante@escuela.edu',
    password: 'Estudiante123!',
    rol: 'estudiante',
    grado: '1er Año',
    cursosInscritos: ['Matemáticas 1A', 'Física']
  },
  {
    id: 4,
    nombres: 'Luis',
    apellidos: 'Hernández Castro',
    email: 'luis.estudiante@escuela.edu',
    password: 'Estudiante123!',
    rol: 'estudiante',
    grado: '2do Año',
    cursosInscritos: ['Cálculo Avanzado', 'Química']
  },
  {
    id: 5,
    nombres: 'Elena',
    apellidos: 'Torres Ríos',
    email: 'elena.estudiante@escuela.edu',
    password: 'Estudiante123!',
    rol: 'estudiante',
    grado: '1er Año',
    cursosInscritos: ['Matemáticas 1A', 'Historia']
  }
]

// Función para simular login
export const mockLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password)
      if (user) {
        // No devolver la contraseña por seguridad
        const { password, ...userWithoutPassword } = user
        resolve(userWithoutPassword)
      } else {
        reject(new Error('Credenciales incorrectas'))
      }
    }, 1000) // Simular delay de red
  })
}

// Función para simular registro
export const mockRegister = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Verificar si el email ya existe
      const existingUser = mockUsers.find(u => u.email === userData.email)
      if (existingUser) {
        reject(new Error('El email ya está registrado'))
        return
      }

      // Crear nuevo usuario
      const newUser = {
        id: Date.now(), // ID temporal
        ...userData,
        // Agregar datos adicionales según el rol
        ...(userData.rol === 'docente' ? {
          especialidad: 'Por definir',
          cursos: []
        } : {
          grado: 'Nuevo ingreso',
          cursosInscritos: []
        })
      }

      // Agregar a la lista (en memoria, no persistente)
      mockUsers.push(newUser)

      // No devolver la contraseña
      const { password, ...userWithoutPassword } = newUser
      resolve(userWithoutPassword)
    }, 1500)
  })
}

// Función para obtener todos los usuarios (útil para debugging)
export const getMockUsers = () => {
  return mockUsers.map(({ password, ...user }) => user) // No devolver contraseñas
}