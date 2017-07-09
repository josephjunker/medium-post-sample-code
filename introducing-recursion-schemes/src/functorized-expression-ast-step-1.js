
// @flow

export type ExprI<A>
  = Plus<A>
  | Times<A>
  | Paren<A>
  | Num<A>;

export class Plus<A> {
  left: A;
  right: A;
  constructor(left: A, right: A) {
    this.left = left;
    this.right = right;
  }
};

export class Times<A> {
  left: A;
  right: A;
  constructor(left: A, right: A) {
    this.left = left;
    this.right = right;
  }
};

export class Paren<A> {
  contents: A;
  constructor(contents: A) {
    this.contents = contents;
  }
};

export class Num<A> {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
};

