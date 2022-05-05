/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'moment';
import 'moment/locale/fr';

AppRegistry.registerComponent(appName, () => App);
