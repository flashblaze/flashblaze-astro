import Giscus from '@giscus/react';
import useThemeDetector from '../../hooks/useThemeDetector';
import InViewParent from './InViewParent';

const Comments = () => {
  const theme = useThemeDetector();

  console.log(theme, localStorage.getItem('theme'));

  return (
    <InViewParent>
      <Giscus
        id='comments'
        repo='flashblaze/flashblaze-website-comments'
        repoId='R_kgDOIl3tyw'
        category='General'
        categoryId='DIC_kwDOIl3ty84CTAMd'
        mapping='pathname'
        reactionsEnabled='1'
        emitMetadata='0'
        inputPosition='top'
        theme={theme}
        lang='en'
        loading='lazy'
      />
    </InViewParent>
  );
};

export default Comments;
