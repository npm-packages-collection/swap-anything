import { expect } from 'chai';
import { swapAnything } from '../index.js';

describe('swapAnything - Standard Built-in Objects', () => {

  // Value properties tests
  describe('Value Properties', () => {
    it('should swap Infinity and NaN', () => {
      const [a, b] = swapAnything(Infinity, NaN);
      expect(a).to.be.NaN;
      expect(b).to.equal(Infinity);
    });

    it('should swap undefined and null', () => {
      const [a, b] = swapAnything(undefined, null);
      expect(a).to.be.null;
      expect(b).to.be.undefined;
    });
  });

  // Function properties tests
  describe('Function Properties', () => {
    it('should swap isFinite and parseInt', () => {
      const [a, b] = swapAnything(isFinite, parseInt);
      expect(a).to.equal(parseInt);
      expect(b).to.equal(isFinite);
    });

    it('should swap encodeURI and decodeURI', () => {
      const [a, b] = swapAnything(encodeURI, decodeURI);
      expect(a).to.equal(decodeURI);
      expect(b).to.equal(encodeURI);
    });
  });

  // Fundamental objects tests
  describe('Fundamental Objects', () => {
    it('should swap an Object and a Function', () => {
      const obj = { key: 'value' };
      const func = () => 'hello';
      const [a, b] = swapAnything(obj, func);
      expect(a).to.equal(func);
      expect(b).to.deep.equal(obj);
    });

    it('should swap Booleans and Symbols', () => {
      const [a, b] = swapAnything(true, Symbol('id'));
      expect(a).to.be.a('symbol');
      expect(b).to.be.a('boolean');
    });
  });

  // Error objects tests
  describe('Error Objects', () => {
    it('should swap Error and TypeError', () => {
      const err1 = new Error('error');
      const err2 = new TypeError('type error');
      const [a, b] = swapAnything(err1, err2);
      expect(a).to.be.instanceOf(TypeError);
      expect(b).to.be.instanceOf(Error);
    });

    it('should swap URIError and ReferenceError', () => {
      const err1 = new URIError('URI error');
      const err2 = new ReferenceError('reference error');
      const [a, b] = swapAnything(err1, err2);
      expect(a).to.be.instanceOf(ReferenceError);
      expect(b).to.be.instanceOf(URIError);
    });
  });

  // Numbers and dates tests
  describe('Numbers and Dates', () => {
    it('should swap Date and Number objects', () => {
      const date = new Date();
      const num = new Number(123);
      const [a, b] = swapAnything(date, num);
      expect(a).to.be.instanceOf(Number);
      expect(b).to.be.instanceOf(Date);
    });

    it('should swap BigInt and Number', () => {
      const bigInt = BigInt(1000);
      const num = 42;
      const [a, b] = swapAnything(bigInt, num);
      expect(a).to.equal(42);
      expect(b).to.equal(BigInt(1000));
    });
  });

  // Text processing objects
  describe('Text Processing Objects', () => {
    it('should swap a String and a RegExp', () => {
      const str = new String('hello');
      const regex = /world/;
      const [a, b] = swapAnything(str, regex);
      expect(a).to.equal(regex);
      expect(b).to.be.an.instanceOf(String);
    });
  });

  // Indexed collections
  describe('Indexed Collections', () => {
    it('should swap two Arrays', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [4, 5, 6];
      const [a, b] = swapAnything(arr1, arr2);
      expect(a).to.deep.equal([4, 5, 6]);
      expect(b).to.deep.equal([1, 2, 3]);
    });

    it('should swap two Typed Arrays (Uint8Array and Float32Array)', () => {
      const typedArr1 = new Uint8Array([1, 2, 3]);
      const typedArr2 = new Float32Array([4.0, 5.0, 6.0]);
      const [a, b] = swapAnything(typedArr1, typedArr2);
      expect(a).to.be.instanceOf(Float32Array);
      expect(b).to.be.instanceOf(Uint8Array);
    });
  });

  // Keyed collections tests
  describe('Keyed Collections', () => {
    it('should swap a Map and a Set', () => {
      const map = new Map([['key1', 'value1']]);
      const set = new Set([1, 2, 3]);
      const [a, b] = swapAnything(map, set);
      expect(a).to.be.instanceOf(Set);
      expect(b).to.be.instanceOf(Map);
    });

    it('should swap a WeakMap and a WeakSet', () => {
      const weakMap = new WeakMap();
      const weakSet = new WeakSet();
      const [a, b] = swapAnything(weakMap, weakSet);
      expect(a).to.be.instanceOf(WeakSet);
      expect(b).to.be.instanceOf(WeakMap);
    });
  });

  // Structured data tests
  describe('Structured Data', () => {
    it('should swap JSON and ArrayBuffer', () => {
      const buffer = new ArrayBuffer(8);
      const json = JSON.parse('{"key": "value"}');
      const [a, b] = swapAnything(json, buffer);
      expect(a).to.be.instanceOf(ArrayBuffer);
      expect(b).to.deep.equal({ key: 'value' });
    });

    it('should swap two SharedArrayBuffers', () => {
      const buf1 = new SharedArrayBuffer(8);
      const buf2 = new SharedArrayBuffer(16);
      const [a, b] = swapAnything(buf1, buf2);
      expect(a.byteLength).to.equal(16);
      expect(b.byteLength).to.equal(8);
    });
  });

  // Memory management objects tests
  describe('Memory Management', () => {
    it('should swap WeakRef and FinalizationRegistry', () => {
      const obj = {};
      const weakRef = new WeakRef(obj);
      const finalRegistry = new FinalizationRegistry(() => {});
      const [a, b] = swapAnything(weakRef, finalRegistry);
      expect(a).to.be.instanceOf(FinalizationRegistry);
      expect(b).to.be.instanceOf(WeakRef);
    });
  });

  // Control abstraction objects tests
  describe('Control Abstraction', () => {
    it('should swap a Promise and an Iterator', () => {
      const promise = new Promise((resolve) => resolve('done'));
      function* gen() { yield 1; }
      const iterator = gen();
      const [a, b] = swapAnything(promise, iterator);
      expect(a).to.have.property('next');
      expect(b).to.be.a('promise');
    });
  });

  // Reflection tests
  describe('Reflection', () => {
    it('should swap Reflect and Proxy', () => {
      const handler = {
        get: (target, prop) => {
          return prop in target ? target[prop] : 'default';
        },
      };
      const proxy = new Proxy({}, handler);
      const [a, b] = swapAnything(Reflect, proxy);
      expect(a).to.equal(proxy);
      expect(b).to.equal(Reflect);
    });
  });

  // Internationalization objects tests
  describe('Internationalization', () => {
    it('should swap Intl.Collator and Intl.NumberFormat', () => {
      const collator = new Intl.Collator();
      const numberFormat = new Intl.NumberFormat();
      const [a, b] = swapAnything(collator, numberFormat);
      expect(a).to.be.instanceOf(Intl.NumberFormat);
      expect(b).to.be.instanceOf(Intl.Collator);
    });

    it('should swap Intl.DateTimeFormat and Intl.PluralRules', () => {
      const dateTimeFormat = new Intl.DateTimeFormat();
      const pluralRules = new Intl.PluralRules();
      const [a, b] = swapAnything(dateTimeFormat, pluralRules);
      expect(a).to.be.instanceOf(Intl.PluralRules);
      expect(b).to.be.instanceOf(Intl.DateTimeFormat);
    });
  });
});
