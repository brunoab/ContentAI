"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function deleteGeneration(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await db.generation.deleteMany({
    where: { id, userId: session.user.id },
  })

  revalidatePath("/history")
}
