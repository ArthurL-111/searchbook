import './App.css';
import Layout from './components/Layout/Layout';
import { Provider } from 'react-redux';
import store from './Redux/store.ts';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Layout/>
      </div>
    </Provider>
  );
}

export default App;
