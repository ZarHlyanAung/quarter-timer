import { Header } from './components/Header';
import MeditationTimer from './components/MeditationTimer';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      <MeditationTimer />
    </div>
  );
}

export default App;
