import RP from 'react-player';
import InViewParent from './InViewParent';

const ReactPlayer = ({ url }: { url: string }) => (
  <InViewParent>
    <RP src={url} controls light width='100%' />
  </InViewParent>
);

export default ReactPlayer;
