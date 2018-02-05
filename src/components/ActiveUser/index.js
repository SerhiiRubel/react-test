import React from 'react';

export default  (props) => {
  const user = props.activeUser;
  return (
    <div className="activeUser">
      <div>
        {user.name}
      </div>
      <div>
        {user.age}
      </div>
      <div>
        {user.phone}
      </div>
      <div> { user.image } </div>
      <div>
        { props.isRepeat &&
          <p> Выберите другого пользователя! </p>
        }
      </div>
    </div>
  );
}
