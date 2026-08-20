import bcrypt from 'bcryptjs'
import { prisma } from './db'
import { UserSession } from '@/types'

export async function verifyUserCredentials(email: string, password: string): Promise<UserSession | null> {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  })

  if (!user) return null

  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
  }
}
