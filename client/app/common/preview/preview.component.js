import template from './preview.html';
import controller from './preview.controller';
import './preview.styl';

let previewComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default previewComponent;
