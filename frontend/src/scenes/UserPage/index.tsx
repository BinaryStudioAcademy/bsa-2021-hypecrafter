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
  const store = useTypedSelector(({ userProfile: { item, isLoading, isEditing } }) => ({
    userProfile: item,
    isLoading,
    isEditing
  }));
  const { fetchUserProfileAction, setEditingAction, updateUserProfileAction } = useAction();

  const { userProfile, isLoading, isEditing } = store;

  const userId = id || 'ac7a5b8f-7fc4-4d1e-81c9-1a9c49c9b529';
  useEffect(() => {
    console.log(userId);
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
  const achievements = [
    {
      id: '1111',
      name: 'Test Achievement',
      description: 'TODO: Maybe Make separate Card component for achievements',
      imageUrl: 'https://image.flaticon.com/icons/png/512/126/126455.png'
    },
    {
      id: '2222',
      name: 'Test Achievement',
      description: 'TODO: Maybe Make separate Card component for achievements',
      imageUrl: 'https://image.flaticon.com/icons/png/512/126/126455.png'
    },
    {
      id: '3333',
      name: 'Test Achievement',
      description: 'TODO: Maybe Make separate Card component for achievements',
      imageUrl: 'https://image.flaticon.com/icons/png/512/126/126455.png'
    },
    {
      id: '4444',
      name: 'Test Achievement',
      description: 'TODO: Maybe Make separate Card component for achievements',
      imageUrl: 'https://image.flaticon.com/icons/png/512/126/126455.png'
    },
    {
      id: '5555',
      name: 'Test Achievement',
      description: 'TODO: Maybe Make separate Card component for achievements',
      imageUrl: 'https://image.flaticon.com/icons/png/512/126/126455.png'
    }
  ];
  const activities = [
    {
      id: '11',
      name: 'Activity Example'
    },
    {
      id: '12',
      name: 'Activity Example'
    },
    {
      id: '13',
      name: 'Activity Example Activity Example Activity Example Activity Example'
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
          {!isEditing && <Body projects={projects} achievements={achievements} activities={activities} />}
        </Row>
      </LoaderWrapper>
    </Container>
  );
};

export default UserPage;
