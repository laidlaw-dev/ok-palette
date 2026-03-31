import { InitialColor } from './features/initial-setup/InitialColor';

const App = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <InitialColor />
      </div>
    </div>
  );
};

export default App;
