import React from 'react';
import Avatar from "@mui/material/Avatar";

interface VotedByProps {
  votedBy?: string[];
}

const VotedByIcons: React.FC<VotedByProps> = ({ votedBy }) => {
  return (
    <div style={{ display:"flex", alignItems:"center"}}>
      {votedBy?.map((voter) => (
        <div style={{padding:"10px"}} key={voter}>
          <Avatar />
        </div>
      ))}
    </div>
  );
};

export default VotedByIcons;
