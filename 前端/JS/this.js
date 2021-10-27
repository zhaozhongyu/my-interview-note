function test() {
  function getName() {
    console.log(1)
  }
  return this
}

test.getName = function() {
  console.log(2);
}

test.prototype.getName = function () {
  console.log(3);
}

var getName = function () {
  console.log(4);
}

function getName () {
  console.log(5);
}
getName()
test.getName();
test().getName();
getName()
new test.getName()
new test().getName()
new new test().getName();
