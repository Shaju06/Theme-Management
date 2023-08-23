import AppRoutes from './route';
import { BrowserRouter } from 'react-router-dom';
import AppContextWrapper from './ContextStore';

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
