import React from 'react';

import Background from './../../assets/background.jpg';
import './Users.css';

const Users = () => {
  const items = { ...localStorage };
  return (
    <div className='users'>
      <img src={Background} className='image' alt='background' />
      {(Object.keys(items).length) ? (
        <div className='user'>
          <h3 className='heading'>Users in the local Storage are:</h3>
          <ul className='list'>
            {
              Object.keys(items).map(item => {
                const value = JSON.parse(items[item]).email;
                return <li key={item}><span>{item}</span> - {value}</li>;
              })
            }
          </ul>
        </div>
      ) : (
        <div className='user'>
          <h3 className='heading'>No users is present in local Storage.</h3>
        </div>
      )}
    </div>
  )
}

export default Users;