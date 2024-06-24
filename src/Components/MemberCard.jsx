const MemberCard = ({name,photo,position})=>{
    return(
        <div className="m-4 p-4 flex flex-col rounded-lg w-[350px] bg-slate-50 shadow-md hover:shadow-lg item-center justify-center ">
            <img src={photo} className='h-[40vh] rounded-lg' alt={`${name}`}></img>
            <div className="p-4">
                <h2 className="text-xl text-center">{name}</h2>
                <h2 className="text-xl text-center">{position}</h2>
            </div>
        </div>
    )
};
export default MemberCard;