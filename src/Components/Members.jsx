import MemberCard from "./MemberCard";
const k21members = [
    {name:'Gauri Sinha',photo:'./members/Gauri.jpg',position:'President'},
    {name:'Aman Kumar',photo:'./members/Aman.jpg',position:'Vice President'},
    {name:'Vaibhav Raj',photo:'./members/Vaibhav.jpg',position:'Treasurer'},
    {name:'Akshat Bhagat',photo:'./members/Akshat.png',position:'Event Management Head'},
    {name:'Ujjwal kumar',photo:'./members/Ujjwal.jpg',position:'Writing Head'},
    {name:'Needhi',photo:'./members/needhi.jpg',position:'Editing Head'},
    {name:'Shasank kumar',photo:'./members/Shasank.jpg',position:'Social Media Head'},
];
const k22members = [
    {name:'Aditi Rani',photo:'./members/Aditi.jpg'},
    {name:'Rakhi',photo:'./members/rakhi.png'},
    {name:'Adityam Raj',photo:'./members/adityam.jpg'},
    {name:'Anushka',photo:'./members/Anushka.jpg'},
    {name:'Sonam Kumari',photo:'./members/Sonam.jpg'},
    {name:'Aman kumar',photo:'./members/Amankumar.jpg'},
    {name:'Prakash Chandra',photo:'./members/PrakashChandra.jpg'},
    {name:'Sanya Sinha',photo:'./members/Sanya.jpg'},
    {name:'Ayushi Jaiswal',photo:'./members/Ayushi.HEIC'},
    {name:'Wajiha Muswi',photo:'./members/Wajiha.jpg'},
    {name:'Ekta Rani',photo:'./members/Ekta.jpg'},
    {name:'Megha kriti',photo:'./members/megha.jpg'},
    {name:'Akanksha Singh',photo:'./members/akanksha.jpg'},
    {name:'Shruti Sinha',photo:'./members/Shruti.jpg'},
    {name:'Anjali Kumari',photo:'./members/Anjali.jpg'},
    {name:'Vanya Prakash',photo:'./members/Vanya.jpg'},
    {name:'Rohit Poddar',photo:'./members/Rohit.jpg'},
    {name:'Abhisekh kumar',photo:'./members/abhisekh.jpg'},
];
const Members = ()=>{
    return<>
        <div className="flex flex-row flex-wrap justify-center">
            {
                k21members.map((member,index)=>{
                    return(
                        <MemberCard key={index} name={member.name} photo={member.photo} position={member.position}/>
                    )
                })
            }
        </div>
        <div className="my-12"><span className="text-3xl font-bold">K20 Members</span></div>
        <div className="flex flex-row flex-wrap justify-center my-4">
             {
                k22members.map((member,index)=>{
                    return(
                        <MemberCard key={index} name={member.name} photo={member.photo}/>
                    )
                })
            }
        </div> 
    </>
};
export default Members