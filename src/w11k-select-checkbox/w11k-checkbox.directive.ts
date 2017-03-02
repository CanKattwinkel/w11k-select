import {OptionState} from '../model/option-state.enum';
export interface scope extends ng.IScope {
  state: OptionState;
  toggle: Function;
  fromExternalSource: Function;
  sth: any;
  getClass: (OptionState) => string ;
}

export class w11kSelectCheckbox implements ng.IDirective {
  static $inject: Array<string> = [''];

  static instance(): ng.IDirective {
    return new w11kSelectCheckbox();
  }

  constructor() {
  }


  scope = {
    'state': '=',
  };

  template = `<a class="w11k-checkbox" ng-click="toggle()" ng-class="getClass(state)"></a>`;
  restrict: string = 'E';

  link = (scope: scope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
    scope.getClass = (state: OptionState): string => OptionState[state];
    // scope.toggle = () => {
    //   scope.state = scope.state == OptionState.selected ? OptionState.unselected : OptionState.selected;
    // };
    scope.fromExternalSource = () => {
      scope.state = OptionState.unselected;
    }
  };
}
