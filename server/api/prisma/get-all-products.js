import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// endpoint
export default defineEventHandler(async (event) => {
    let products = await prisma.products.findMany()
    return products
});