
import './App.css';
import Navabr from './componens/Navabr';
import News from './componens/News';

function App() {
  return (
    <>
      <Navabr />
      <News pageSize={3} />
    </>
  );
}

export default App;
