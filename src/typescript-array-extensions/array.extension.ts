declare global {
  interface Array<T> {
    removeLast(): T;

    empty(): boolean;

    contains(e: T): boolean;

    findBy(e: Partial<T>): T[];

    filterBy(e: Partial<T>): T[];

    sortBy(e: Partial<{ [k in keyof T]: 'asc' | 'desc' }>): T[];

    ifFound(action: (first: T) => void): T[];

    ifEmpty(action: () => void): T[];

  }
}

export function enableArrayExtensions() {

  // prevent custom methods to be listed in the for.. in statement
  let methods = ['removeLast', 'empty', 'contains', 'findBy', 'filterBy', 'sortBy', 'ifFound', 'ifEmpty'];
  for (let m of methods)
    Object.defineProperty(Array.prototype, m, {
      enumerable: false,
      writable: true
    });

  if (!Array.prototype.removeLast) {
    Array.prototype.removeLast = function <T>(): T {
      if (this.length == 0)
        return null;
      else if (this.length > 0) {
        let last = this.splice(this.length - 1, 1);
        return last[0];
      }
    };
  }
  if (!Array.prototype.contains) {
    Array.prototype.contains = function <T>(e: T): boolean {
      return this.indexOf(e) >= 0;
    };
  }
  if (!Array.prototype.empty) {
    Array.prototype.empty = function <T>(): boolean {
      return this.length == 0;
    };
  }
  if (!Array.prototype.findBy) {
    Array.prototype.findBy = function <T>(e: Partial<T>): T[] {

      return this.filter(item => {
        let include = true;
        for (let k in e) {
          include = include && item[k] == e[k];
        }
        return include;
      });
    };
  }
  if (!Array.prototype.filterBy) {
    Array.prototype.filterBy = function <T>(e: Partial<T>): T[] {
      return this.findBy(e);
    };
  }
  if (!Array.prototype.ifFound) {
    Array.prototype.ifFound = function <T>(action: (first: T) => void): T[] {

      if (this.length > 0) {
        action(this[0]);
      }
      return this;
    };
  }
  if (!Array.prototype.ifEmpty) {
    Array.prototype.ifEmpty = function <T>(action: () => void): T[] {

      if (this.length == 0) {
        action();
      }
      return this;
    };
  }
  if (!Array.prototype.sortBy) {
    Array.prototype.sortBy = function <T>(e: Partial<{ [k in keyof T]: 'asc' | 'desc' }>): T[] {
      let key = '';
      let sorting = 1;
      for (let ekey in e) {
        key = ekey;
        sorting = e[ekey] == 'asc' ? 1 : -1;
      }
      return this.sort((a1, a2) => {

        if (!a1) return 1;
        if (!a1[key]) return 1;
        if (!a2) return -1;
        if (!a2[key]) return 1;
        if (isNumeric(a1[key]) && isNumeric(a2[key]))
          return (a1[key] - a2[key]) * sorting;
        if (isString(a1[key]) && isString(a2[key]))
          return a1[key].toLowerCase().localeCompare(a2[key].toLowerCase()) * sorting;

      });
    };
  }

}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isString(s) {
  return typeof s === 'string' || s instanceof String;
}

export {};


