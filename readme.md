# start-concurrent

[![npm](https://img.shields.io/npm/v/start-concurrent.svg?style=flat-square)](https://www.npmjs.com/package/start-concurrent)
[![linux build](https://img.shields.io/travis/start-runner/concurrent/master.svg?label=linux&style=flat-square)](https://travis-ci.org/start-runner/concurrent)
[![windows build](https://img.shields.io/appveyor/ci/start-runner/concurrent/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/start-runner/concurrent)
[![coverage](https://img.shields.io/codecov/c/github/start-runner/concurrent/master.svg?style=flat-square)](https://codecov.io/github/start-runner/concurrent)
[![deps](https://img.shields.io/gemnasium/start-runner/concurrent.svg?style=flat-square)](https://gemnasium.com/start-runner/concurrent)

[Concurrent](https://bytearcher.com/articles/parallel-vs-concurrent/) tasks runner for [Start](https://github.com/start-runner/start).

:information_desk_person: See also [start-parallel](https://github.com/start-runner/parallel).

## Install

```sh
npm install --save-dev start-concurrent
# or
yarn add --dev start-concurrent
```

## Usage

```js
import Start from 'start';
import reporter from 'start-pretty-reporter';
import concurrent from 'start-concurrent';

const start = Start(reporter());

const task1 = () => {
  return function task1() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  };
};

const task2 = () => {
  return function task2() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  };
};

export const task12 = () => start(
  concurrent(
    task1,
    task2
  )
);
```

```
→ concurrent: start

→ task1: start

→ task2: start
→ task2: done

→ task1: done

→ concurrent: done
```

See [documentation](https://github.com/start-runner/start#readme) for details.
