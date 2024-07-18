import MemberCard from "./MemberCard";
const mentors = [
    {name:'Dr. Kapla Pati Tiwary',photo:'./members/kpt.png',position:'Mentor'},
    {name:'Dr. Smita Pallavi',photo:'./members/Smita.png',position:'Mentor'}
]
const Mentors = ()=>{
    return(
        <div className="flex flex-row flex-wrap justify-center">
            {
                mentors.map((mentor,index)=>{
                
                    return(
                        <MemberCard key={index} name={mentor.name} photo={mentor.photo} position={mentor.position}/>
                    )
                })
            }
        </div>
    )
}

export default Mentors;