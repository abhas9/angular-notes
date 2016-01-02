import angular from 'angular';
import Navbar from './navbar/navbar';
import Preview from './preview/preview';

let commonModule = angular.module('app.common', [
  Navbar.name,
  Preview.name
]);

export default commonModule;
