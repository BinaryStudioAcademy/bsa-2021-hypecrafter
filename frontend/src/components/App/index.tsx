import AppProvider from '../../providers';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';
import TranslateExample from '../TranslateExample';

const App = () => (
  <AppProvider>
    <Users />
    <TranslateExample />
    <BootstrapExample />
  </AppProvider>
);

export default App;
