import AppRoutes from './route';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import AppContextWrapper from './ContextStore';
import SignIn from './components/SignIn';

function App() {
  return (
    <AppContextWrapper>
    <BrowserRouter>
 <div className="App">
      <header className="App-header">
      <AppRoutes />
      </header>
    </div>
          </BrowserRouter>
          </AppContextWrapper>
  );
}

export default App;
