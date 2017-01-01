import Start from 'start';

export default (...tasks) => () => {
  return function concurrent(log, reporter) {
    const start = Start(reporter);

    return Promise.all(
      tasks.map((task) => start(task))
    );
  };
};
