import { usePalette } from '@/stores/palette/usePalette';
import { InitialColor } from './features/initial-setup/InitialColor';

const App = () => {
  const { isInitialized } = usePalette();
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        {!isInitialized && <InitialColor />}
        {isInitialized && <Colors />}
      </div>
    </div>
  );
};

const Colors = () => {
  const { generatedPalette } = usePalette();

  if (!generatedPalette) return null;

  return (
    <div className="flex gap-2">
      {generatedPalette.allColors.map((color) => (
        <div
          key={color.id}
          className="h-6 w-6 rounded-full"
          style={{ backgroundColor: color.color.css }}
        />
      ))}
    </div>
  );
};

export default App;
