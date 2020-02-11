export default function(fn, delay) {
  let timer;
  return function () { 
    let context = this;
    let args = arguments;
    console.log('args', args);
    clearTimeout(timer);
    timer = setTimeout(function () {
        fn.apply(context, args);
    }, delay);
  }
}