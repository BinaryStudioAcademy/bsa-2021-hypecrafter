import classnames from 'classnames';
import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ProjectPrivilege } from '../../../common/types';
import ProjectPrivilegeComponent from '../../../components/ProjectPrivilege';
import Tag from '../../../components/Tag';
import classes from '../styles.module.scss';

interface StoryProps {
  story: string;
  privileges: ProjectPrivilege[];
  tags: string[];
}

const Story: FC<StoryProps> = ({ story, privileges = [], tags = [] }) => (
  <Row className={classes['project-story']}>
    <Col xs={12} lg={8} xl={9}>
      {story}
    </Col>
    <Col xs={12} lg={4} xl={3}>
      <div className={classes['tag-wrapper']}>
        {tags?.map((el) => (
          <div key={el} className={classes['tag-item']}>
            <Tag key={el} text={el} />
          </div>
        ))}
      </div>
      {privileges.length > 0 && (
        <p className={classes['privilege-title']}>Privileges</p>
      )}
      <Row className={classes['privilege-wrapper']}>
        {privileges?.map((el) => (
          <Col
            xs={12}
            md={6}
            lg={12}
            key={`${el.amount} + ${el.bakersAmount} + ${el.title}`}
            className={classnames(classes['privilege-item'])}
          >
            <ProjectPrivilegeComponent
              value={el.amount}
              title={el.title}
              content={el.content}
              includes={el.includes}
              backers={el.bakersAmount}
            />
          </Col>
        ))}
      </Row>
    </Col>
  </Row>
);

export default Story;
