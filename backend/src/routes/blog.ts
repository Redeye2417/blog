import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SECERT:string
  }
  Variables:{
    userId:string
  }
}>()

blogRouter.use('/*',async (c,next) =>{
  const header = c.req.header("authorization")|| "";
  //Bearer token=> ["Bearer","token"]
  try {
  const response =await verify(header,c.env.JWT_SECERT);
  if(response){
   
    //@ts-ignore
   c.set("userId",response.id);
   await next()
  }else {
    c.status(403)
    return c.json({error:"Unauthorized"})
  }
} catch(e) {
  c.status(403)
  return c.json({error:"you are not logged in"})

}
})
blogRouter.get('/bulk',async (c) => {
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const blogs = await prisma.post.findMany({
    select:{
      content:true,
      title:true,
      id:true,
      author:{
        select:{
          name:true,
        }
      }
    }
  });
  return c.json({
    blogs
  })
})
blogRouter.get('/:id',async (c) => {
  const id = await c.req.param("id");  
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
try {
  const blog = await prisma.post.findFirst({
    where:{
        id:id

    },
    select:{
      id:true,
      title:true,
      content:true,
      author:{
        select:{
          name:true
        }
      }
    }
  })
  return c.json({
    blog
  })
}
catch(e){
    c.status(411);
    return c.json({
        message:"Error while fetching blog post"
    })
}
  return c.text('Hello Hono!')
})



blogRouter.post('/',async (c) => {
  const body = await c.req.json(); 
  const userId = c.get("userId");
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.post.create({
    data:{
        title:body.title,
        content:body.content,
        authorId:userId

    }
  })
  return c.json({
    id:blog.id
  })
  
})


blogRouter.put('/',async (c) => {
  const body = await c.req.json(); 
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.post.update({
    where:{
        id:body.id
    },
    data:{
        title:body.title,
        content:body.content,

    }
  })
  return c.json({
    id:blog.id
  })
})
