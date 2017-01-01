import test from 'tape';
import { spy } from 'sinon';
import Start from 'start';

import concurrent from '../../lib/';

const noopReporter = () => {};
const start = Start(noopReporter);

test('export', (t) => {
  t.equal(
    typeof concurrent,
    'function',
    'must be a function'
  );

  t.end();
});

test('concurrent tasks + resolve', (t) => {
  const testSpy1 = spy();
  const testSpy2 = spy();

  start(
    concurrent(
      () => {
        return function testTask1() {
          return new Promise((resolve) => {
            setTimeout(() => {
              testSpy1();
              resolve();
            }, 200);
          });
        };
      },
      () => {
        return function testTask1() {
          return new Promise((resolve) => {
            setTimeout(() => {
              testSpy2();
              resolve();
            }, 100);
          });
        };
      }
    )
  ).then(() => {
    t.true(
      testSpy1.calledOnce,
      'task 1 must been called once'
    );

    t.true(
      testSpy2.calledOnce,
      'task 2 must been called once'
    );

    t.true(
      testSpy2.calledBefore(testSpy1),
      'task 2 must be called before task 1'
    );

    t.end();
  });
});

test('concurrent tasks + first reject', (t) => {
  const testSpy1 = spy();
  const testSpy2 = spy();

  start(
    concurrent(
      () => {
        return function testTask1() {
          return new Promise((resolve) => {
            setTimeout(() => {
              testSpy1();
              resolve();
            }, 200);
          });
        };
      },
      () => {
        return function testTask1() {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              testSpy2();
              reject();
            }, 100);
          });
        };
      },
    )
  ).catch(() => {
    t.equal(
      testSpy1.callCount,
      0,
      'task 1 must not been called'
    );

    t.true(
      testSpy2.calledOnce,
      'task 2 must been called once'
    );

    t.end();
  });
});

test('concurrent tasks + last reject', (t) => {
  const testSpy1 = spy();
  const testSpy2 = spy();

  start(
    concurrent(
      () => {
        return function testTask1() {
          return new Promise((resolve) => {
            setTimeout(() => {
              testSpy1();
              resolve();
            }, 100);
          });
        };
      },
      () => {
        return function testTask1() {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              testSpy2();
              reject();
            }, 200);
          });
        };
      }
    )
  ).catch(() => {
    t.true(
      testSpy1.calledOnce,
      'task 1 must been called once'
    );

    t.true(
      testSpy2.calledOnce,
      'task 2 must been called once'
    );

    t.true(
      testSpy1.calledBefore(testSpy2),
      'task 1 must be called before task 2'
    );

    t.end();
  });
});
