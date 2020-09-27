import React from 'react';
import { Image } from "semantic-ui-react"
import Img from '../images/E-Den_1.jpg'
import GlitchClip from 'react-glitch-effect/core/Clip';

function Header() {
  return (
    <GlitchClip iterationCount="3">
      <Image className="header" centered src={Img} />
    </GlitchClip>
  );
}

export default Header;
