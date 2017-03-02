import {externalOption2value} from './externalOption2value';
export function internalOption2value(option, optionsExpParsed) {
  return externalOption2value(option.model, optionsExpParsed);
}
