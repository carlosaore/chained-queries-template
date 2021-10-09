import SimpleQuery from "./SimpleQuery";
import ChainedQueries from "./ChainedQueries";
import MutationAndChainedQuery from "./MutationAndChainedQuery";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React queries templates</h1>
      </header>
      <main>
        <SimpleQuery />
        <ChainedQueries />
        <MutationAndChainedQuery />
      </main>
    </div>
  );
}

export default App;
