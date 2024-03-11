import React, {useState} from 'react';
import {Outlet, Link} from 'react-router-dom';
import css from './App.module.scss';
import AvatarPng from '@/assets/avatar.png';
import AvatarJpg from '@/assets/avatar.jpg';
import CalendarSvg from '@/assets/calendar.svg';

export const App = () => {
  const [count, setCount] = useState<number>(0);

  // if (__ENV__ == 'development') {
  //   // TODO: some devtools
  // }

  const increment = () => {
      setCount(prev => prev + 1);
      // TODO();
  }

  return (
      <div data-testid={'App.DataTestId'}>
        <h1>{__PLATFORM__}</h1>
        <img src={AvatarPng} width='100' height='100'/>
        <img src={AvatarJpg} width='100' height='100'/>
        <CalendarSvg fill='red' width={'50'} height={'50'} />
        <Link to='/about'>About</Link>
        <br />
        <Link to='/shop'>Shop</Link>
          <h1 className={css.value} data-testid={'Platform'}>{count}</h1>
          <button className={css.button} onClick={increment}><span>
              asfasf
          </span></button>
          <Outlet />
      </div>
  );
};