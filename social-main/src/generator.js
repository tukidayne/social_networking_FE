function* hello() {
  yield "xin chào";
  yield* printName();
  yield " . kết thúc .";
}

function* printName() {
  yield " redux saga ";
}

const results = hello();
console.log(results.next());
console.log(results.next());
console.log(results.next());
