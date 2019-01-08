import Stats from './components/Stats';
import SplashScreen from './components/SplashScreen';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';

const NavigateApp = createBottomTabNavigator({
  Stats: {screen: Stats},
  Posts:{screen: SplashScreen},
},{
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'blue',
    inactiveBackgroundColor:'white',
    labelStyle: {
      fontSize: 20,
      fontFamily :"times-new-roman",
      fontWeight: "bold",
      marginBottom :12
    },
    style: {
      backgroundColor: '#E8E8E8',
      borderRadius : 3,
      borderColor: '#E8E8E8',
      borderEndWidth : 2
      
    }
  },
  }
);

const AppContainer = createAppContainer(NavigateApp);

  
  export default AppContainer;
