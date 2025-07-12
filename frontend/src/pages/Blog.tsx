import {useBlog} from '../hooks';
import { useParams } from 'react-router-dom';
import { FullBlogs } from '../components/FullBlog';
import { Appbar } from '../components/Appbar';
import { Spinner } from '../components/Spinner';
export const Blog =()=>{
    const {id} = useParams();
    const {loading,blog} = useBlog({id:id||""});

    if(loading){
        return <div className='h-screen flex flex-col justify-center'>
            <div className='flex justify-center'>
                  <Spinner/>
            </div>
        </div>;
    }

    if (loading || !blog) {
        return <div>
            <Appbar />
        
            <div className="h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
            
                </div>
            </div>
        </div>
    }
    return <div>
        <FullBlogs key={id} blog={blog} />
    </div>
}
