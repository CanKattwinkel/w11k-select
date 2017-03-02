'use strict';
/** @internal */
import {ng as angular} from './lib/angular';
import {w11kSelectConfig} from './model/w11k-select-config.model';
import {w11kSelectHelper} from './w11k-select-helper.factory';
import {w11kSelect} from './w11k-select.directive';
import {w11kSelectOptionDirektive} from './w11k-select-option/w11k-select-option.directive';
import {w11kSelectCheckbox} from './w11k-select-checkbox/w11k-checkbox.directive';
import {w11kSelectInfiniteScroll} from './w11k-select-infinite-scroll.directive';

angular.module('w11k.select', [
  'w11k.dropdownToggle',
  'w11k.select.template'
]);

angular.module('w11k.select')
    .constant('w11kSelectConfig', new w11kSelectConfig())
    .directive('w11kSelectInfiniteScroll', w11kSelectInfiniteScroll)
    .factory('w11kSelectHelper', w11kSelectHelper)
    .directive('w11kSelect', w11kSelect)
    .directive('w11kSelectOption', w11kSelectOptionDirektive)
    .directive('w11kSelectCheckbox', w11kSelectCheckbox.instance);
