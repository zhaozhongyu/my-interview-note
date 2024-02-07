/**
 * bind, apply, call的本质都是改变作用域. bind会返回一个新的函数
 * Function原型链中的this, 指的是function本身
 */

 // **************** bind *******************
 Function.prototype.myBind = function(context, ...args) {
  return (...newArgs) => { this.apply(context, [...args, ...newArgs]); };
}

const test = {
  name: "fy",
  showName: function (last) {
    console.log(this.name + " is " + last);
  },
};
test.showName.myBind({ name: "Mr.fy" })("handsome");

// ************** apply ********************
Function.prototype.myApply = function (context, args) {
  context.func = this;
  if (args) { // 避免undefined报错
    return context.func(...args);
  } else {
    return context.func();
  }
}

function testapply(arg1, arg2, arg3) { console.log('name: ', this.name, arg1, arg2, arg3);  }
testapply.apply({name: 'aaa'}, [111,222,333]);
testapply.myApply({name: 'aaa'}, [111,222,333]);

// ************ call ***********
Function.prototype.myCall = function (context, ...args) {
  context.func = this;
  if (args) { // 避免undefined报错
    return context.func(...args);
  } else {
    return context.func();
  }
}

testapply.call({name: 'aaa'}, [111,222,333]);
testapply.myCall({name: 'aaa'}, [111,222,333]);