// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Prisma} from ".prisma/client"
import prisma from '../../lib/prisma';

// type Data = {
//   name: string
// }

// export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//   res.status(200).json({ name: 'John Doe' })
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method!=='POST'){
    res.status(405).json({ name: 'Method not allowed' })
  }
  
  try {
    const {user}=req.body;
   // const user:Prisma.UserCreateInput=JSON.parse(req.body);
   const savedUser=await prisma.user.create({
    data:user
   })
   res.status(200).json(savedUser)
  } catch (error) {
    res.status(400).json({message:'Something went wrong'})
  }
  
}
