import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import './Const'
import { Header } from './Header/Header';
import { SplashScreen } from './AppControl/SplashScreen';
import { AppWindow } from './AppControl/AppWindow';

function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  // 画面が表示されたら、1秒後に isLoaded を true にする
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  // isLoaded が true になったら、AppWindow を表示する
  if (isLoaded) {
    return (
      <ChakraProvider theme={theme}>
        <Header />
        <AppWindow />
      </ChakraProvider>
    );
  }

  // isLoaded が false の場合は、SplashScreen を表示する
  return (
    <ChakraProvider theme={theme}>
      <SplashScreen />
    </ChakraProvider>
  );
}
export default App;
