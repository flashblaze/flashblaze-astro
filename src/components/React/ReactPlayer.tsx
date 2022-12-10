import RP from 'react-player';
import InViewParent from './InViewParent';

const ReactPlayer = ({ url }) => (
  <InViewParent>
    <RP url={url} controls light width='100%' />;
  </InViewParent>
);

export default ReactPlayer;
