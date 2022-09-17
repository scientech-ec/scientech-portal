import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  target: string;
  caption: string;
}

const NavButton: React.FC<Props> = ({ target, caption }) => {
  return (
    <NavLink className="" to={target}>
      {caption}
    </NavLink>
  );
};

export default NavButton;
