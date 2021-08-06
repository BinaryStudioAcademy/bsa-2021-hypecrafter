import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks';
import { fetchUserProfileAction } from './actions';
import Body from './components/Body';
import Header from './components/Header';
import './styles.module.scss';

const UserPage = () => {
  const dispatch = useDispatch();
  const store = useTypedSelector(({ userProfile: { item, isLoading } }) => ({
    user: item,
    isLoading
  }));

  const { user, isLoading } = store;

  useEffect(() => {
    dispatch(fetchUserProfileAction('1'));
  }, []);

  // Mocked Data
  const userData = {
    firstName: 'Anakin',
    secondName: 'Skywalker',
    location: 'Kyiv, Ukraine',
    speciality: 'Sith apprentice',
    // eslint-disable-next-line max-len
    aboutMe: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima numquam ipsa nobis pariatur similique eveniet maiores tempora itaque nihil, aspernatur eligendi aperiam cumque odio temporibus molestiae.',
    rating: 4.5,
    instagramUrl: 'https://www.instagram.com/robertdowneyjr/',
    facebookUrl: 'https://www.facebook.com/robmooreprogressive'
  };
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
      <Row>
        <Header user={userData} />
      </Row>
      <Row>
        <Body projects={projects} achievements={achievements} activities={activities} />
      </Row>
    </Container>
  );
};

export default UserPage;
