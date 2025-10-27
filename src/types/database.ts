export enum Role {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export enum Emotion {
  POSITIVO = 'POSITIVO',
  NEUTRAL = 'NEUTRAL',
  NEGATIVO = 'NEGATIVO'
}

export interface User {
  id: string
  full_name: string
  email: string
  password: string
  role: Role
  createdAt: Date
  student?: Student
  teacher?: Teacher
}

export interface Student {
  id: string
  nickname?: string
  age: number
  grade: number
  risk_score: number
  user_id: string
  classroom_id: string
  user: User
  classroom: Classroom
  interactions: Interaction[]
}

export interface Teacher {
  id: string
  specialty: string
  assignedGrade: number
  user_id: string
  user: User
  enrollments: Enrollment[]
}

export interface Classroom {
  id: string
  name: string
  students: Student[]
  enrollments: Enrollment[]
}

export interface Course {
  id: string
  name: string
  createdAt: Date
  enrollments: Enrollment[]
}

export interface Enrollment {
  id: string
  teacher_id: string
  classroom_id: string
  course_id: string
  teacher: Teacher
  classroom: Classroom
  course: Course
  activities: Activity[]
}

export interface Activity {
  id: string
  title: string
  description: string
  hasIntroduction: boolean
  enrollment_id: string
  enrollment: Enrollment
  createdAt: Date
  end_time: Date
  flashcards: Flashcard[]
  cardsMemory: CardsMemory[]
  playRelations: PlayRelation[]
  extraMaterials: ExtraMaterial[]
  quiz?: Quiz
  interactions: Interaction[]
}

export interface Flashcard {
  id: string
  question: string
  answer: string
  createdAt: Date
  activity_id: string
  activity: Activity
}

export interface CardsMemory {
  id: string
  card1: string
  card2: string
  isMatched: boolean
  createdAt: Date
  activity_id: string
  activity: Activity
}

export interface PlayRelation {
  id: string
  item1: string
  item2: string
  isRelated: boolean
  createdAt: Date
  activity_id: string
  activity: Activity
}

export interface ExtraMaterial {
  id: string
  title: string
  url: string
  createdAt: Date
  activity_id: string
  activity: Activity
}

export interface Quiz {
  id: string
  createdAt: Date
  activity_id: string
  activity: Activity
  questions: Question[]
  questionsOpen: QuestionOpen[]
  questionsAudio: QuestionAudio[]
}

export interface Question {
  id: string
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctOption: string
  quiz_id: string
  quiz: Quiz
}

export interface QuestionOpen {
  id: string
  question: string
  answer: string
  quiz_id: string
  quiz: Quiz
}

export interface QuestionAudio {
  id: string
  question: string
  audioUrl: string
  answer: string
  quiz_id: string
  quiz: Quiz
}

export interface Interaction {
  id: string
  emotion: Emotion
  engagement: number
  createdAt: Date
  student_id: string
  activity_id: string
  student: Student
  activity: Activity
}