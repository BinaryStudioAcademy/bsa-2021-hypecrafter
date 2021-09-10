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
  const store = useTypedSelector(({ userProfile: { id: userProfileId, item, isLoading, isEditing } }) => ({
    userProfile: item,
    isLoading,
    isEditing,
    userProfileId
  }));

  const { fetchUserProfileAction, setEditingAction, updateUserProfileAction } = useAction();

  const { userProfile, isLoading, isEditing, userProfileId } = store;
  const userId = id || userProfileId;

  useEffect(() => {
    fetchUserProfileAction(userId);
  }, [fetchUserProfileAction, userId]);

  // Mocked Data
  const projects = [
    {
      id: '1',
      name: 'Mendi: Real Brain Training - Anytime, Anywhere.',
      description: 'Ride without limits on a 100-mile range, all-terrain eBike with regenerative braking.',
      category: 'Transport',
      url: '#',
      imageUrl: 'https://i.pinimg.com/originals/17/cb/d8/17cbd834c8d80da7827506d9d1cdbbed.jpg',
      tags: ['Bike', 'Transportation', 'Speed'],
      donated: 5200,
      goal: 12000
    },
    {
      id: '2',
      name: 'Mendi: Real Brain Training - Anytime, Anywhere.',
      description: 'Ride without limits on a 100-mile range, all-terrain eBike with regenerative braking.',
      category: 'Transport',
      url: '#',
      imageUrl: 'https://i.pinimg.com/originals/17/cb/d8/17cbd834c8d80da7827506d9d1cdbbed.jpg',
      tags: ['Bike', 'Transportation', 'Speed'],
      donated: 11200,
      goal: 12000
    },
    {
      id: '3',
      name: 'Mendi: Real Brain Training - Anytime, Anywhere.',
      description: 'Ride without limits on a 100-mile range, all-terrain eBike with regenerative braking.',
      category: 'Transport',
      url: '#',
      imageUrl: 'https://i.pinimg.com/originals/17/cb/d8/17cbd834c8d80da7827506d9d1cdbbed.jpg',
      tags: ['Bike', 'Transportation', 'Speed'],
      donated: 3400,
      goal: 12000
    }
  ];

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
