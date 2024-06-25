const BlogItem = ({ blog }) => {
    const truncateContent = (content,wordlimit)=>{
        const words = content.split(' ');
        return (words.length > wordlimit)?words.slice(0,wordlimit).join(' ')+'...':words.join(' ');
    }
    return (
      <div className="m-4 p-4 rounded-lg w-[300px] shadow-md hover:shadow-lg">
        <div className="img mt-4">
            <img src={blog.img_url} alt={blog.title} className="rounded-lg" />
        </div>
        <h1 className="font-semibold text-xl mt-4">{blog.title}</h1>
        <p className="mt-4">{truncateContent(blog.content,20)}</p>
      </div>
    );
  };
  
export default BlogItem;
  