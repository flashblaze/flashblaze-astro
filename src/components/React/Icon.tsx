import {
  SiTwitter,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiGumroad,
  SiYoutube,
  SiUnsplash,
} from 'react-icons/si/index';
import { TbSun, TbMoonStars } from 'react-icons/tb/index';

const Icon = ({ name }) => {
  const renderContent = () => {
    const size = 22;
    const baseClass = 'inline-flex ml-5';
    switch (name) {
      case 'twitter':
        return (
          <a
            target='_blank'
            className='inline-flex'
            href='https://twitter.com/neeraj_artx'
          >
            <SiTwitter className='fill-blue-400' size={size} title='Twitter' />
          </a>
        );

      case 'github':
        return (
          <a
            target='_blank'
            className={baseClass}
            href='https://github.com/flashblaze'
          >
            <SiGithub
              className='dark:fill-white fill-black'
              size={size}
              title='GitHub'
            />
          </a>
        );

      case 'instagram':
        return (
          <a
            target='_blank'
            className={baseClass}
            href='https://instagram.com/neeraj_artx'
          >
            <SiInstagram
              className='fill-rose-500'
              size={size}
              title='Instagram'
            />
          </a>
        );

      case 'gumroad':
        return (
          <a
            target='_blank'
            className={baseClass}
            href='https://neeraj-artx.gumroad.com/'
          >
            <SiGumroad className='fill-pink-400' size={size} title='Gumroad' />
          </a>
        );

      case 'linkedin':
        return (
          <a
            target='_blank'
            className={baseClass}
            href='https://www.linkedin.com/in/neeraj-lagwankar/'
          >
            <SiLinkedin
              className='fill-blue-500'
              size={size}
              title='LinkedIn'
            />
          </a>
        );

      case 'youtube':
        return (
          <a
            target='_blank'
            className={baseClass}
            href='https://www.youtube.com/channel/UCQKfDFA1cCAB1Oq5B6Vr7ew'
          >
            <SiYoutube className='fill-red-500' size={size} title='YouTube' />
          </a>
        );

      case 'unsplash':
        return (
          <a
            target='_blank'
            className={baseClass}
            href='https://unsplash.com/@neeraj_artx/'
          >
            <SiUnsplash
              className='dark:fill-slate-200 fill-black'
              size={size}
              title='Unsplash'
            />
          </a>
        );

      case 'sun':
        return (
          <TbSun className='dark:stroke-yellow-300' size={size} title='Sun' />
        );

      case 'moon':
        return (
          <TbMoonStars className='stroke-sky-500' size={size} title='Moon' />
        );

      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default Icon;
