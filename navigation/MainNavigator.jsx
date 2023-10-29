import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Screens from "../screens/index"

/**
 * Main app navigation via bottom tabs with respective icons
 * @author Konstantin K.
 */
const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={"Search"}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Search':
              iconName = focused ? 'md-search' : 'md-search-outline';
              break;
            case 'Reserved':
              iconName = focused ? 'md-alarm' : 'md-alarm-outline';
              break;
            case 'My Offers':
              iconName = focused ? 'md-pricetag' : 'md-pricetag-outline';
              break;
            default:
              iconName = focused ? 'md-person' : 'md-person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color}/>;
        },
        tabBarActiveTintColor: '#016400',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name={"Search"}
        component={Screens.SearchScreen}
      />
      <Tab.Screen
        name={"Reserved"}
        component={Screens.ReservedScreen}
      />
      <Tab.Screen
        name={"My Offers"}
        component={Screens.StockScreen}
      />
      <Tab.Screen
        name={"My profile"}
        component={Screens.ProfileScreen}
      />
    </Tab.Navigator>
  );
}

export default MainNavigator;