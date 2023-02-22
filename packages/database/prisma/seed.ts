import { PrismaClient } from '@prisma/client'
import { seed } from '../mock'

const prismaClient = new PrismaClient()

seed(prismaClient)
