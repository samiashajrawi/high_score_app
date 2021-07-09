import ScoreGetter from "./features/getter/scoreGetter"
import ScoresList from "./features/scores/scoresList"
import Header from "./features/atoms/header"

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <ScoreGetter />
        <ScoresList />
      </div>
    </div>
  );
}

export default App;
