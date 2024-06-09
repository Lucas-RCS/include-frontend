interface IFriends {
  User: {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    skills: string[];
    jobs: string[];
    imageIconProfile: string;
    friends: string[];
  };
}

function Friends({ User }: IFriends) {
    return (
      <div>
        <h1 style={{color: 'var(--primary)'}}>Friends</h1>
      </div>
    );
  }
  
  export default Friends;
  