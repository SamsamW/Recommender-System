import React from 'react';

interface DateProps {
    date: Date;
  }

const Date: React.FC<DateProps> = ({date}) => {
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  return <span>{formattedDate}</span>;
};

export default Date;
