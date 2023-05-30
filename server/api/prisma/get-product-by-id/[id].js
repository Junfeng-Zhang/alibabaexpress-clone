import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    let product = await prisma.products.findFirst({
      // where the ID is equal to ID we're passing 【id等于我们传递的id】
        where: { id: Number(event.context.params.id) }
    })
    return product
})