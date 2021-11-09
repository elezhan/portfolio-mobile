/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Prices from '../screens/Prices';
import Home from '../screens/Home';
import Waitlist from '../screens/Waitlist';
import Referrals from '../screens/Referrals';

import Spiceslist from '../screens/SpicesList';
import SpiceDetail from '../screens/SpiceDetail';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Курс"
        component={PricesStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bar-chart" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Главная"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Обучение"
        component={LessonsStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="book-open" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Купить"
        component={WaitlistStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="dollar-sign" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={25} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const PricesStack = createStackNavigator<PriceStackParamList>();

function PricesStackNavigator() {
  return (
    <PricesStack.Navigator>
      <PricesStack.Screen
        name="PriceScreen"
        component={Prices}
        options={{ headerTitle: 'Prices' }}
      />
    </PricesStack.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#fff' } }}>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerTitle: '' }}
      />
    </HomeStack.Navigator>
  );
}


const LessonsStack = createStackNavigator();

function LessonsStackNavigator() {
  return (
    <LessonsStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#fff' } }}>
      <LessonsStack.Screen
        name="LessonsScreen"
        component={Spiceslist}
        options={{ headerTitle: 'Lessons' }}
      />
      <LessonsStack.Screen name="SpiceDetail" component={SpiceDetail} options={{ headerTitle: 'Lesson' }}/>
    </LessonsStack.Navigator>
  );
}

const WaitlistStack = createStackNavigator();

function WaitlistStackNavigator() {
  return (
    <WaitlistStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#fff' } }}>
      <WaitlistStack.Screen
        name="WaitlistScreen"
        component={Waitlist}
        options={{ headerTitle: 'Waitlist' }}
      />
      <WaitlistStack.Screen name="Referrals" component={Referrals} options={{ headerTitle: 'Referrals' }}/>
    </WaitlistStack.Navigator>
  );
}
