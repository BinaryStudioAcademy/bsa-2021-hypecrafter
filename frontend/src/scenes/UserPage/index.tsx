import {
  ProjectsFilter,
  ProjectsSort
} from 'hypecrafter-shared/enums';
import { FC, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import LoaderWrapper from '../../components/LoaderWrapper';
import { useAction, useTypedSelector } from '../../hooks';
import Body from './components/Body';
import Header from './components/Header';

interface Props {
  userId?: string
}

const UserPage: FC<Props> = ({ userId: id }) => {
  const store = useTypedSelector(({ userProfile: { id: userProfileId, item, isLoading, isEditing },
    projects: { projects } }) => ({
    userProfile: item,
    isLoading,
    isEditing,
    userProfileId,
    projects
  }));
  const { fetchUserProfileAction, setEditingAction, updateUserProfileAction, fetchProjectsAction } = useAction();

  const { userProfile, isLoading, isEditing, userProfileId, projects } = store;
  const userId = id || userProfileId;

  useEffect(() => {
    fetchUserProfileAction(userId);
  }, [fetchUserProfileAction, userId]);

  useEffect(() => {
    fetchProjectsAction({ sort: ProjectsSort.DATE,
      filter: ProjectsFilter.OWN,
      categories: [],
      upcoming: false,
      userId });
  }, []);

  return (
    <Container>
      <LoaderWrapper isLoading={isLoading}>
        <Row>
          {!!userProfile
            && (
              <Header
                userProfile={userProfile}
                isEditing={isEditing}
                setEditing={setEditingAction}
                updateUser={updateUserProfileAction}
              />
            )}
        </Row>
        <Row>
          {!isEditing && <Body projects={projects} />}
        </Row>
      </LoaderWrapper>
    </Container>
  );
};

export default UserPage;
