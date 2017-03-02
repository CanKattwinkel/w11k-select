/** @internal */
import {ng as angular} from './lib/angular';

export function w11kSelectHelper($parse, $document) {
  'ngInject';

  //                   value                 as    label                for       item              in    collection                    |  filter                        track by     tracking
  const OPTIONS_EXP = /^([a-zA-Z][\w\.]*)(?:\s+as\s+([a-zA-Z][\w\.]*))?\s+for\s+(?:([a-zA-Z][\w]*))\s+in\s+([$_a-zA-Z][\w\.\(\)]*(?:\s+\|\s[a-zA-Z][\w\:_\{\}']*)*)(?:\s+track\sby\s+([a-zA-Z][\w\.]*))?$/;

  function extendDeep(dst, ...otherArgs) {
    angular.forEach(otherArgs, function (obj) {
      if (obj !== dst) {
        angular.forEach(obj, function (value, key) {
          if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
            extendDeep(dst[key], value);
          } else {
            dst[key] = value;
          }
        });
      }
    });
    return dst;
  }

  function hashCode(value) {
    let string;
    if (typeof value === 'object') {
      string = angular.toJson(value);
    }
    else {
      string = value.toString();
    }

    let hash = 0;
    let length = string.length;
    for (let i = 0; i < length; i++) {
      hash = string.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
    }

    return hash.toString(36);
  }

  function parseOptions(input) {

    let match = input.match(OPTIONS_EXP);
    if (!match) {
      let expected = '"item.value" [as "item.label"] for "item" in "collection [ | filter ] [track by item.value.unique]"';
      throw new Error('Expected options in form of \'' + expected + '\' but got "' + input + '".');
    }

    let result: any = {
      value: $parse(match[1]),
      label: $parse(match[2] || match[1]),
      item: match[3],
      collection: $parse(match[4])
    };

    if (match[5] !== undefined) {
      result.tracking = $parse(match[5]);
    }

    return result;
  }

  function getParent(element, selector) {
    // with jQuery
    if (angular.isFunction(element.parents)) {
      let container = element.parents(selector);
      if (container.length > 0) {
        return container[0];
      }

      return;
    }

    // without jQuery
    let matchesSelector = 'MatchesSelector';
    let matchFunctions = [
      'matches',
      'matchesSelector',
      'moz' + matchesSelector,
      'webkit' + matchesSelector,
      'ms' + matchesSelector,
      'o' + matchesSelector
    ];

    for (let index in matchFunctions) {
      let matchFunction = matchFunctions[index];
      if (angular.isFunction(element[0][matchFunction])) {
        let parent1 = element[0].parentNode;
        while (parent1 !== $document[0]) {
          if (parent1[matchFunction](selector)) {
            return parent1;
          }
          parent1 = parent1.parentNode;
        }

        return;
      }
    }

    return;
  }


  return {
    parseOptions: parseOptions,
    hashCode: hashCode,
    extendDeep: extendDeep,
    getParent: getParent
  };
}
