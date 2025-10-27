// Datos mock actualizados según el schema de Prisma
export const mockUsers = [
  {
    id: '1',
    full_name: 'María García López',
    email: 'maria.teacher@escuela.edu',
    password: 'Teacher123!',
    role: 'TEACHER',
    createdAt: new Date(),
    teacher: {
      id: 't1',
      specialty: 'Matemáticas',
      assignedGrade: 10,
      user_id: '1',
      enrollments: []
    }
  },
  {
    id: '2',
    full_name: 'Carlos Rodríguez Méndez',
    email: 'carlos.teacher@escuela.edu',
    password: 'Teacher123!',
    role: 'TEACHER',
    createdAt: new Date(),
    teacher: {
      id: 't2',
      specialty: 'Ciencias',
      assignedGrade: 9,
      user_id: '2',
      enrollments: []
    }
  },
  {
    id: '3',
    full_name: 'Ana Martínez Silva',
    email: 'ana.student@escuela.edu',
    password: 'Student123!',
    role: 'STUDENT',
    createdAt: new Date(),
    student: {
      id: 's1',
      nickname: 'Anita',
      age: 15,
      grade: 10,
      risk_score: 0,
      user_id: '3',
      classroom_id: 'c1',
      interactions: []
    }
  },
  {
    id: '4',
    full_name: 'Luis Hernández Castro',
    email: 'luis.student@escuela.edu',
    password: 'Student123!',
    role: 'STUDENT',
    createdAt: new Date(),
    student: {
      id: 's2',
      nickname: 'Lucho',
      age: 14,
      grade: 9,
      risk_score: 2,
      user_id: '4',
      classroom_id: 'c2',
      interactions: []
    }
  },
  {
    id: '5',
    full_name: 'Elena Torres Ríos',
    email: 'elena.student@escuela.edu',
    password: 'Student123!',
    role: 'STUDENT',
    createdAt: new Date(),
    student: {
      id: 's3',
      nickname: 'Elenita',
      age: 16,
      grade: 11,
      risk_score: 1,
      user_id: '5',
      classroom_id: 'c1',
      interactions: []
    }
  },
  {
    id: '6',
    full_name: 'Jore Enrique Condorios Yllapuma',
    email: 'jcondorios@unsa.edu.pe',
    password: 'Martinez777@',
    role: 'STUDENT',
    createdAt: new Date(),
    student: {
      id: 's3',
      nickname: 'Elenita',
      age: 16,
      grade: 11,
      risk_score: 1,
      user_id: '5',
      classroom_id: 'c1',
      interactions: []
    }
  }
]

// Datos mock adicionales para testing
export const mockClassrooms = [
  {
    id: 'c1',
    name: '10mo Grado - Matemáticas',
    students: [],
    enrollments: []
  },
  {
    id: 'c2', 
    name: '9no Grado - Ciencias',
    students: [],
    enrollments: []
  }
]

export const mockCourses = [
  {
    id: 'course1',
    name: 'Matemáticas Avanzadas',
    createdAt: new Date(),
    enrollments: []
  },
  {
    id: 'course2',
    name: 'Ciencias Naturales',
    createdAt: new Date(),
    enrollments: []
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
    }, 1000)
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

      // Determinar el rol basado en el email o datos
      const role = userData.role === 'docente' ? 'TEACHER' : 'STUDENT'
      
      // Crear nuevo usuario según el schema
      const newUser = {
        id: Date.now().toString(),
        full_name: `${userData.nombres} ${userData.apellidos}`,
        email: userData.email,
        password: userData.password,
        role: role,
        createdAt: new Date(),
        ...(role === 'TEACHER' ? {
          teacher: {
            id: `t${Date.now()}`,
            specialty: 'Por definir',
            assignedGrade: 0,
            user_id: Date.now().toString(),
            enrollments: []
          }
        } : {
          student: {
            id: `s${Date.now()}`,
            nickname: userData.nombres,
            age: 0,
            grade: 0,
            risk_score: 0,
            user_id: Date.now().toString(),
            classroom_id: 'c1', // Classroom por defecto
            interactions: []
          }
        })
      }

      // Agregar a la lista (en memoria)
      mockUsers.push(newUser)

      // No devolver la contraseña
      const { password, ...userWithoutPassword } = newUser
      resolve(userWithoutPassword)
    }, 1500)
  })
}

// Función para obtener todos los usuarios (sin contraseñas)
export const getMockUsers = () => {
  return mockUsers.map(({ password, ...user }) => user)
}