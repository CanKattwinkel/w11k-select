import {internalOption2value} from './internalOption2value';
import {w11kSelectConfig} from '../model/w11k-select-config.model';
import {InternalOption} from '../model/internal-option.model';
import {OptionState} from '../model/option-state.enum';

export function internalOptions2externalModel(options, optionsExpParsed, config: w11kSelectConfig) {
  let arr = [];
  options.forEach(option => traverse(option, arr, optionsExpParsed));
  return arr;
}


function traverse(option: InternalOption, arr, optionsExpParsed) {
  if (option.state === OptionState.selected) {
    arr.push(internalOption2value(option, optionsExpParsed))
  }
  option.children.forEach(option => traverse(option, arr, optionsExpParsed))

}
