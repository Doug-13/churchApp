import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../src/pages/Search';
import SignIn from '../src/pages/SignIn';
import SignUp from '../src/pages/SignUp';
import MainScreen from '../src/pages/MainScreen';
import ChurchDetails from '../src/pages/ChurchDetails/index';
import Birthdays from '../src/pages/Birthdays';
import Biblia from '../src/pages/Biblia';
import Profile from '../src/pages/Profile/index';
import Chapters from '../src/pages/Biblia/chapters';
import Versus from '../src/pages/Biblia/versus';
import Devotional from '../src/pages/Devotional';
import CultReport from '../src/pages/CultReport';
import Menu from '../src/Menu';
import HandleAddReport from '../src/pages/CultReport/handleAddReport';
import Peoples from '../src/pages/Peoples';
import Groups from '../src/pages/Groups';
import InsertGroups from '../src/pages/Groups/insertGoups';
import ChurchRegister from '../src/pages/ChurchRegister';
import CheckBox2 from '../src/components/CheckBox2/index';
import Condicoes from '../src/pages/politics/Condicoes';
import Politics from '../src/pages/politics/index';
import Financial from '../src/pages/Financial/index';
import CashFlow from '../src/pages/Financial/CashFlow';
import MyContributions from '../src/pages/Financial/MyContributions';
import TransactionHistory from '../src/pages/Financial/TransactionHistory';
import MainTabNavigator from '../src/pages/Groups/MainTabNavigator';
import Schedule from '../src/pages/Schedule';
import EventCreate from '../src/pages/Schedule/eventCreate';
import EventEdit from '../src/pages/Schedule/eventEdit';
import EventGroupEdit from '../src/pages/Schedule/eventGroupEdit';
import Permissions from '../src/pages/Permissions';
import EditGroup from '../src/pages/Groups/editGroup';

// import Drawer from './drawer';
// import Balance from '../src/pages/Financial/Balance';

const AuthStack = createNativeStackNavigator();


function AuthRoutes() {
    return (
        <AuthStack.Navigator>

            <AuthStack.Screen
                name='SignIn'
                component={SignIn}
                options={{ headerShown: false }}
            />
            
            <AuthStack.Screen
                name='Condicoes'
                component={Condicoes}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='Politics'
                component={Politics}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='Schedule'
                component={Schedule}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='EventCreate'
                component={EventCreate}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='EventEdit'
                component={EventEdit}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='EventGroupEdit'
                component={EventGroupEdit}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}

            />
            <AuthStack.Screen
                name="Search"
                component={Search}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="MainScreen"
                component={MainScreen}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="ChurchDetails"
                component={ChurchDetails}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Birthdays"
                component={Birthdays}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='Financial'
                component={Financial}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='CashFlow'
                component={CashFlow}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='MyContributions'
                component={MyContributions}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='TransactionHistory'
                component={TransactionHistory}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='MainTabNavigator'
                component={MainTabNavigator}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='Permissions'
                component={Permissions}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Biblia"
                component={Biblia}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Chapters"
                component={Chapters}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Versus"
                component={Versus}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Devotional"
                component={Devotional}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="CultReport"
                component={CultReport}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Menu"
                component={Menu}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="HandleAddReport"
                component={HandleAddReport}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Peoples"
                component={Peoples}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='Groups'
                component={Groups}
                options={{ headerShown: false }}

            />
            <AuthStack.Screen
                name='EditGroup'
                component={EditGroup}
                options={{ headerShown: false }}

            />
            <AuthStack.Screen
                name='InsertGroups'
                component={InsertGroups}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='ChurchRegister'
                component={ChurchRegister}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="CheckBox2"
                component={CheckBox2}
                options={{ headerShown: false }}
            />



        </AuthStack.Navigator>
    )
}

export default AuthRoutes;