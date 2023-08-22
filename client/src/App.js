import './App.css';
import ColorThemeMenu from './components/ColorThemeMenu';
import ThemeColorContext from './ContextStore';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ThemeColorContext.Consumer>
    {
      ({color, setColor}) => (
        <ColorThemeMenu />
      )
    }

        </ThemeColorContext.Consumer>
     
      </header>
    </div>
  );
}

export default App;
