import { FunctionComponent } from 'react';

interface BodyProps {
  target: string;
}

const Body: FunctionComponent<BodyProps> = ({ target }) => {
  if (target === 'Story') {
    return (
      <div>
        Story
      </div>
    );
  }

  if (target === 'FAQ') {
    return (
      <div>
        FAQ
      </div>
    );
  }

  if (target === 'Comments') {
    return (
      <div>
        Comments
      </div>
    );
  }

  return null;
};

export default Body;
