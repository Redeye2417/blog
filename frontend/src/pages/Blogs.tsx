import {BlogCard}  from "../components/Blogcard"
import {Appbar} from "../components/Appbar"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton"
export const Blogs = () =>
{
    const {loading,blogs} = useBlogs();
    
    if(loading){
        return <div> 
            <Appbar/>
            <div className="flex justify-center">
            
        <div><BlogSkeleton />
         <BlogSkeleton /> 
         <BlogSkeleton /></div></div></div>;
    }
    return <div >
        <Appbar/>
        <div className="flex justify-center">
        <div className="">
            {blogs.map(blog=><BlogCard
        key={blog.id}
       authorName={blog.author.name || "Unknown User"}
       title={blog.title}
       content={blog.content}
       publishedDate={"2 feb 2025"}
        id={blog.id}/>)}
         
       
        </div>
        </div>
       
    </div>
}