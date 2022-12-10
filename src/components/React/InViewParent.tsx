import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const InViewParent = ({ children }) => {
  const { ref, inView, entry } = useInView();
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    if (inView || entry?.isIntersecting) {
      setShowChildren(true);
    }
  }, [inView, entry?.isIntersecting]);

  return <div ref={ref}>{showChildren ? children : null}</div>;
};

export default InViewParent;
