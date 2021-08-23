import classnames from 'classnames';
import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import ProjectPrivilege from '../../../components/ProjectPrivilege';
import Tag from '../../../components/Tag';
import classes from '../styles.module.scss';

interface StoryProps {
  story: string;
  privileges: { amount: number; privilege: string }[];
  tags: string[];
}

const Story: FC<StoryProps> = ({ story, privileges, tags }) => (
  <Row className={classes['project-story']}>
    <Col xs={12} lg={8} xl={9}>
      {story}
      Some text.
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industrys standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.s
    </Col>
    <Col xs={12} lg={4} xl={3}>
      <div className={classes['tag-wrapper']}>
        {tags?.map((el) => (
          <div key={el} className={classes['tag-item']}>
            <Tag key={el} text={el} />
          </div>
        ))}
      </div>
      <p className={classes['privilege-title']}>Privileges</p>
      <Row className={classes['privilege-wrapper']}>
        {privileges?.map((el) => (
          <Col
            xs={12}
            md={6}
            lg={12}
            key={el.amount}
            className={classnames(
              classes['privilege-item'],
              'justify-content-center'
            )}
          >
            <ProjectPrivilege
              value={3}
              title={el.privilege}
              content="some text"
              includes={['test1', 'test2']}
              backers={el.amount}
            />
          </Col>
        ))}
      </Row>
    </Col>
  </Row>
);

export default Story;
