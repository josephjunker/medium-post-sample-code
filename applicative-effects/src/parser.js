
// @flow

import { curry2, curry3, curry5 } from "./utils";

type ParseResult<A> = {
  parsed: A,
  remaining: string
} | null;

type Parser<A> = string => ParseResult<A>;

const numerals = new Set([
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

function number(str: string) : ParseResult<number> {
  let i = 0,
      found = "";

  while(numerals.has(str[i])) {
    found = found.concat(str[i]);
    i++;
  };

  if (!found.length) return null;

  return {
    parsed: parseInt(found),
    remaining: str.slice(found.length)
  };
}

console.log(number("123"));
console.log(number("123abc"));
console.log(number(" 123"));

function string(sought: string) : Parser<string> {
  return input => {
    if (!input.startsWith(sought)) return null;

    return {
      parsed: sought,
      remaining: input.slice(sought.length)
    };
  };
};

console.log(string("a")("abc"));
console.log(string("abc")("abc"));
console.log(string("bc")("abc"));

function numberDashNumber(str: string) : ParseResult<[number, number]> {
  const first = number(str);
  if (!first) return null;

  const second = string("-")(first.remaining);
  if (!second) return null;

  const third = number(first.remaining);
  if (!third) return null;

  return {
    parsed: [first.parsed, third.parsed],
    remaining: third.remaining
  };
}

console.log(numberDashNumber("1-23"));

function map<A, B>(fn: A => B, a: Parser<A>) : Parser<B> {
  return str => {
    const parseResult = a(str);
    if (parseResult === null) return null;

    return {
      parsed: fn(parseResult.parsed),
      remaining: parseResult.remaining
    };
  }
};

function ap<A, B>(fnParser: Parser<A => B>, aParser: Parser<A>) : Parser<B> {
  return str => {
    const firstParse = fnParser(str);

    if (firstParse === null) return null;

    const secondParse = aParser(firstParse.remaining);

    if (secondParse === null) return null;
  
    return {
      parsed: firstParse.parsed(secondParse.parsed),
      remaining: secondParse.remaining
    };
  };
}

function pure<A>(a: A) : Parser<A> {
  return str => ({
    parsed: a,
    remaining: str
  });
}

function collectNumbers(n1: number, dash: string, n2: number) {
  return [n1, n2];
}

function liftA3<A, B, C, R>(
  fn: (A, B) => R,
  p1: Parser<A>,
  p2: Parser<B>,
  p3: Parser<C>) : Parser<R> {
    return ap(ap(ap(pure(curry3(fn)), p1), p2), p3);
  }

const numberDashNumberAgain =
  liftA3(
    curry3(collectNumbers),
    number, string("-"), number);

console.log(numberDashNumberAgain("1-23"));



