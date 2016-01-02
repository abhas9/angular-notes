import angular from 'angular';
import uiRouter from 'angular-ui-router';
import previewComponent from './preview.component';

let previewModule = angular.module('preview', [
  uiRouter
])

.component('preview', previewComponent);

export default previewModule;
