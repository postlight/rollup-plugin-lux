// @flow
export function tap<T>(input: T): T {
  console.log(input); // eslint-disable-line no-console
  return input;
}

export function compose<T, U>(
  main: (input: any) => U,
  ...etc: Array<Function>
): (input: T) => U {
  return input => main(etc.reduceRight(
    (value, fn) => fn(value),
    input
  ));
}

export function composeAsync<T, U>(
  main: (input: any) => Promise<U>,
  ...etc: Array<Function>
): (input: T | Promise<T>) => Promise<U> {
  return input => etc.reduceRight(
    (value, fn) => Promise.resolve(value).then(fn),
    Promise.resolve(input)
  ).then(main);
}
