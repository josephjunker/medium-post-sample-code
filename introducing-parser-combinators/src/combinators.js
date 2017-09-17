
// @flow

export type Char = string;

export type ParseInput = Array<Char>;
export type ParseResult<R> = Array<[R, ParseInput]>;
export type Parser<R> = ParseInput => ParseResult<R>;

export function success<R>(result: R, input: ParseInput) : ParseResult<R> {
  return [[result, input]];
}

export function fail<R>(input: ParseInput) : ParseResult<R> {
  return [];
}

export function satisfy(test: Char => boolean) : Parser<string> {
  return (input: ParseInput) =>
    input.length === 0 ? fail(input)
  : test(input[0])     ? success(input[0], input.slice(1))
  : /* doesn't match  */ fail(input);
}

const parseABCD = satisfy(x => ["a", "b", "c", "d"].includes(x));
console.log(parseABCD("asdf".split("")));
console.log(parseABCD([]));
console.log(parseABCD(["Z"]));

export function character(c: Char) : Parser<Char> {
  return satisfy(x => x === c);
}

function flatMap<A, B>(arr: Array<A>, fn: A => Array<B>) : Array<B> {
  return arr.reduce((arr, x) => arr.concat(fn(x)), []);
}

export function then<R, S>(first: Parser<R>, second: Parser<S>) : Parser<[R, S]> {
  return input =>
    flatMap(
      first(input),
      ([r, remainder]) =>
        second(remainder).map(
          ([s, secondRemainder]) => [[r, s], secondRemainder]));
}

export function lazyThen<R, S>(first: () => Parser<R>, second: () => Parser<S>) : Parser<[R, S]> {
  return input => then(first(), second())(input);
}


export function alt<R>(left: Parser<R>, right: Parser<R>) : Parser<R> {
  return input => left(input).concat(right(input));
}

export function map<A, B>(fn: A => B, p: Parser<A>) : Parser<B> {
  return input =>
    p(input).map(([result, remaining]) => [fn(result), remaining]);
}

class ParenPair {
  contents: ParenPair | One;
  constructor(contents: ParenPair | One) {
    this.contents = contents;
  }
}

class One {};

const parenOne : Parser<ParenPair | One> =
  alt(
    map(
      ([openParen, [contents, closeParen]]) => new ParenPair(contents),
      then(character("("), lazyThen(() => parenOne, () => character(")")))),
    map(
      _ => new One(),
      character("1")));

import { inspect } from "util";
console.log(inspect(parenOne("((1))".split("")), { depth: null }));

function bracket<R, S, T>(left: Parser<R>,
                          middle: Parser<S>,
                          right: Parser<T>) : Parser<[Array<[R, T]>, S]> {
  return input =>
    alt(
      map(
        m => [[], m],
        middle),
      map(
        ([l, [[lrs, m], r]]) => [[[l, r]].concat(lrs), m],
        then(left,
             then(bracket(left, middle, right), right))))(input);
}

const _parenOneBracketed =
  bracket(character("("), character("1"), character(")"));

console.log(inspect(_parenOneBracketed("((1))".split("")), { depth: null }));

const parenOneBracketed =
  map(
    (parens, one) => parens.reduce((acc, _) => new ParenPair(acc), new One()),
    bracket(character("("), character("1"), character(")")));

console.log(inspect(parenOneBracketed("((1))".split("")), { depth: null }));

export function many<R>(p: Parser<R>) : Parser<Array<R>> {
  return alt(
    map(
      ([r, rs]) => [r].concat(rs),
      then(p, input => many(p)(input))),
    input => success([], input));
}

export function some<R>(p: Parser<R>) : Parser<Array<R>> {
  return map(
    ([r, rs]) => [r].concat(rs),
    then(p, input => many(p)(input)));
}


