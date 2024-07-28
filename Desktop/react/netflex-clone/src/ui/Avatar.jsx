function Avatar({ avatarImg }) {
    return (
      <div className="text-center grow flex justify-start  mr-3">
          <div>
              
          <img
          src={avatarImg||"/avatar3.jpg"}
          alt="Logo"
          className="circle h-[12rem] w-[12rem] rounded-full"
        />
          </div>
          
      </div>
    );
  }
  
  export default Avatar;
  