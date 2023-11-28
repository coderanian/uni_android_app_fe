import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Screens from "../screens/index"
import ProfileNavigator from "./ProfileNavigator";
import StockNavigator from "./StockNavigator";

/**
 * Main app navigation via bottom tabs with respective icons
 * @author Konstantin K.
 */
const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName={"Suche"}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    switch (route.name) {
                        case 'Suche':
                            iconName = focused ? 'md-search' : 'md-search-outline';
                            break;
                        case 'Reservierungen':
                            iconName = focused ? 'md-alarm' : 'md-alarm-outline';
                            break;
                        case 'Meine Angebote':
                            iconName = focused ? 'md-pricetag' : 'md-pricetag-outline';
                            break;
                        default:
                            iconName = focused ? 'md-person' : 'md-person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: '#016400',
                tabBarInactiveTintColor: 'gray',
                //Show specific submenu header in each sub-navigation route instead
                headerShown: false,
                tabBarHideOnKeyboard: true,
            })}
        >
            <Tab.Screen name={"Suche"} component={Screens.SearchScreen}/>
            <Tab.Screen name={"Reservierungen"} component={Screens.ReservedScreen}/>
            <Tab.Screen name={"Meine Angebote"} component={StockNavigator}/>
            <Tab.Screen name={"Mein Profil"} component={ProfileNavigator}/>
        </Tab.Navigator>
    );
}

export default MainNavigator;