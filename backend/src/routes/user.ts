import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupInput } from '@anishshetty2417/medium-common';
export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SECERT:string
  }
}>()


userRouter.post('/signup',async (c) => {
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
 
  const body =await c.req.json();
  const {success} = signupInput.safeParse(body);
  if(!success)
  {
    return c.json({
      message:"Input not correct"
    })
  }
try {
  const user = await prisma.user.create({
    data:{
      name:body.name,
      email:body.email,
      password:body.password
    }
  });

  const jwt = await sign({id:user.id},c.env.JWT_SECERT)

  return c.text(jwt)
  } catch (e) {
    c.status(411);
    return c.text('Invalid')
  }

})

userRouter.post('/signin',async (c) => {
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body =await c.req.json();
  const user = await prisma.user.findUnique({
    where:{
      email:body.email,
      password:body.password
      }
  })

  if(!user)
  {
    c.status(403);
		return c.json({ error: "user not found" });
  }
  
  const jwt = await sign({id:user.id},c.env.JWT_SECERT);
  return c.text(jwt)
  
})