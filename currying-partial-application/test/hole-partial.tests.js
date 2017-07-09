
const { expect } = require("chai"),
      holePartialFactory = require("../lib/partial-application-hole-partial-factory").default;

describe("hole partial", () => {

  const {_, holePartial} = holePartialFactory();

  function testCombinations(w, x, y, z) {
    const firstTestFunction = (a, b, c, d) => {
      expect(a).to.deep.equal(w);
      expect(b).to.deep.equal(x);
      expect(c).to.deep.equal(y);
      expect(d).to.deep.equal(z);
    };

    holePartial(firstTestFunction, w, x, y, z)();
    holePartial(firstTestFunction, _, x, y, z)(w);
    holePartial(firstTestFunction, w, _, y, z)(x);
    holePartial(firstTestFunction, _, _, y, z)(w, x);
    holePartial(firstTestFunction, w, x, _, z)(y);
    holePartial(firstTestFunction, _, x, _, z)(w, y);
    holePartial(firstTestFunction, w, _, _, z)(x, y);
    holePartial(firstTestFunction, _, _, _, z)(w, x, y);
    holePartial(firstTestFunction, w, x, y, _)(z);
    holePartial(firstTestFunction, _, x, y, _)(w, z);
    holePartial(firstTestFunction, w, _, y, _)(x, z);
    holePartial(firstTestFunction, _, _, y, _)(w, x, z);
    holePartial(firstTestFunction, w, x, _, _)(y, z);
    holePartial(firstTestFunction, _, x, _, _)(w, y, z);
    holePartial(firstTestFunction, w, _, _, _)(x, y, z);
    holePartial(firstTestFunction, _, _, _, _)(w, x, y, z);
  };

  it("should work", () => {
    testCombinations(1, 2, 3, 4);
    testCombinations([1, 2], [3, 4], [5, 6], [7, 8]);
  });

});

