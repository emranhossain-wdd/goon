import React, { useEffect, useState } from 'react';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('https://calm-citadel-62315.herokuapp.com/blogs')
            .then(res => res.json())
            .then(data => {
                const allBlogs = data.allBlogs.filter(blogs => blogs.status === 'approved');
                setBlogs(allBlogs);
            })
    }, []);
    return (
        <div>
            {
                blogs.map(blog => <div>
                    <h1>{blog?.blogTitle}</h1>
                </div>)
            }
        </div>
    );
};

export default Blogs;