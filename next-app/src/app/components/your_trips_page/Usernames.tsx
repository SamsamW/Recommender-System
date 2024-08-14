import React from 'react';

interface UsernameProps {
  votedBy?: string[];
}

const Usernames: React.FC<UsernameProps> = ({ votedBy }) => {
  return (
    <div style={{ display:"flex", alignItems:"center"}}>
      {votedBy?.map((votedBy) => (
        <div style={{padding:"8px"}} key={votedBy}>
          <h6>{votedBy}</h6>
        </div>
      ))}
    </div>
  );
};

export default Usernames;
