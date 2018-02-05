import React from 'react';

export default (props) => {

  return (
    <div className='itemUser' onClick={() => props.updateApp({
      activeUser: props.id,
      // activeUser: 10
    })}>
      <div className="itemUser__image">
        {props.image}
      </div>
      <div>
        <p>{props.name}</p>
      </div>
      <div>
        <p>{props.age}</p>
      </div>
      <div>
        <p>{props.phone}</p>
      </div>
    </div>
  );
}
