import { RgbColorPicker } from './components/color-pickers/RgbColorPicker';
import { OkColor } from './domain/color';

const App = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <RgbColorPicker
          initialColor={new OkColor({ r: 1, g: 0, b: 0 })}
          onColorChange={(color) => console.log('Selected color:', color)}
        />
      </div>
    </div>
  );
};

export default App;
