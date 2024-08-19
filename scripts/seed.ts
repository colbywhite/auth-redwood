import {db} from 'api/src/lib/db'
import type {User} from ".prisma/client";

export default async () => {
  try {
    const users = [
      {name: 'Alice', email: 'alice@redwoodjs.com', id: 'alice'},
      {name: 'Bob', email: 'bob@redwoodjs.com', id: 'bob'},
    ] satisfies User[]

    await db.user.createMany({data: users})
  } catch (error) {
    console.error(error)
  }
}
