
// @flow

export type Expr
  = Plus
  | Times
  | Paren
  | Num;

export class Plus {
  left: Expr;
  right: Expr;
  constructor(left: Expr, right: Expr) {
    this.left = left;
    this.right = right;
  }
};

export class Times {
  left: Expr;
  right: Expr;
  constructor(left: Expr, right: Expr) {
    this.left = left;
    this.right = right;
  }
};

export class Paren {
  contents: Expr;
  constructor(contents: Expr) {
    this.contents = contents;
  }
};

export class Num {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
};

export function plus(left: Expr, right: Expr) : Plus {
  return new Plus(left, right);
}

export function times(left: Expr, right: Expr) : Times {
  return new Times(left, right);
}

export function paren(contents: Expr) : Paren {
  return new Paren(contents);
}

export function num(value: number) : Num {
  return new Num(value);
}

