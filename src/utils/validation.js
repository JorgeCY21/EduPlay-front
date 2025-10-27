export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  return {
    isValid: hasMinLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    requirements: {
      hasMinLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar
    }
  }
}

export const validateRegister = (formData) => {
  const errors = {}

  // Cambiado de nombres/apellidos a full_name
  if (!formData.full_name?.trim()) {
    errors.full_name = 'El nombre completo es obligatorio'
  }

  if (!formData.email?.trim()) {
    errors.email = 'El correo es obligatorio'
  } else if (!validateEmail(formData.email)) {
    errors.email = 'El correo no es válido'
  }

  if (!formData.rol) {
    errors.rol = 'Debes seleccionar un rol'
  }

  const passwordValidation = validatePassword(formData.password)
  if (!formData.password) {
    errors.password = 'La contraseña es obligatoria'
  } else if (!passwordValidation.isValid) {
    errors.password = 'La contraseña no cumple con los requisitos'
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Debes confirmar la contraseña'
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden'
  }

  return errors
}

// Función para mapear el rol del formulario al valor del schema
export const mapRoleToSchema = (rolForm) => {
  const roleMap = {
    'docente': 'TEACHER',
    'estudiante': 'STUDENT'
  }
  return roleMap[rolForm] || 'STUDENT' // Valor por defecto
}

// Función para mapear el rol del schema al valor del formulario
export const mapRoleToForm = (roleSchema) => {
  const roleMap = {
    'TEACHER': 'docente',
    'STUDENT': 'estudiante'
  }
  return roleMap[roleSchema] || 'estudiante' // Valor por defecto
}