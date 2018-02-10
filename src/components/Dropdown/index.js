import React from 'react';

export default props => {
  const {
    name,
    phone,
    username,
    website,
  } = props;
  return (
    <div className='dropdown'>
      <button
        className='dropdown__head'
        onClick={props.isContentDropdown}
      >
        {props.title}
      </button>
      {
        props.isOpenDropdown.includes(props.id) &&
        <div className='dropdown__content'>
          <p className='dropdown__user'>{name}</p>
          <p className='dropdown__user'>{phone}</p>
          <p className='dropdown__user'>{username}</p>
          <p className='dropdown__user'>{website}</p>
        </div>
      }
    </div>
  );
}