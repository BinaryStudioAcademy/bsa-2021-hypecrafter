import AppProvider from '../../providers';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';

const App = () => (
  <AppProvider>
    <Users />
    <BootstrapExample />
  </AppProvider>
);

export default App;
