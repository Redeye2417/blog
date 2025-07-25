import { Link } from "react-router-dom";

interface BlogCardProps{
    authorName:string;
    title:string;
    content: string;
    publishedDate:string;
    id:number
}
export const BlogCard = ({authorName,title,content,publishedDate,id}:BlogCardProps) =>
{
    return <Link to={`/blog/${id}`}>
    <div className="border-b-2 border-blue-900 p-4  w-screen max-w-screen-lg cursor-pointer">
        <div className="flex">
            <div className="flex justify-center flex-col"> 
                <Avatar  name={authorName}/>
            </div>
             <div className="font-extralight pl-2 text-sm flex justify-center flex-col" >
                {authorName}
            </div>
            <div className="flex justify-center flex-col pl-2">
                <Circle/>
            </div>
            
            <div className="pl-2 font-thin text-slate-400 text-sm flex justify-center flex-col">
                {publishedDate}
            </div>
              
        </div>
        <div className="text-xl font-semibold">
            {title}
        </div>
        <div className="text-md font-thin ">
            {content.slice(0,100)+"..."}
        </div>
        <div className="text-slate-400 text-sm font-thin pt-4">
            {`${Math.ceil(content.length/100)}mintues`}
        </div>
    </div>
    </Link>
}

export function Avatar({name,size="small"}:{name:string,size?:"small"| "big"}) {
    return <div className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600  ${size==="small" ?"h-6 w-6":"h-8 w-8"} `}>
    <span className="text-sm text-gray-600 dark:text-gray-300">{name[0]}</span>
  </div>
}
export function Circle()
{
    return <div className="h-1 w-1 rounded-full bg-slate-400"></div>
}