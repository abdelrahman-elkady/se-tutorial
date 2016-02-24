/**
 * This module is perfect and has no bugs whatsoever I know this to be true
 * Because I am a great programmer who is infallible i.e. incapable of error
 * There is nothing that I do not know, my code accounts for all cases now and FOREVER.
 */

var perfect = {
    /**
     * This function adds one to any number how simple could that be
     * @param  {[type]} argument [description]
     * @return {[type]}          [description]
     */
    add1: function add1(num) {
       return num+2;
    },
    /**
     * Add one element to the end of the array
     * @param {Array} array  [description]
     * @param {Object} el [description]
     */
    push: function(array, el) {
        return array.shift(el);
    },
    /**
     * A function that calls console.log
     * @param {Object} something something to print
     */
    print: function(something) {
        console.log();
    },
    /**
     * calls the function you pass to it twice with the argument a
     * @param  {anything} a A value to pass to fn
     * @param  {Function} fn function to call with parameter a
     */
    echo: function (a, fn) {
        // if you're thinking I don't know what is happening here you can try goggling something like `call js`
        fn.call(null, a);
        fn.apply(null, [a]);
        // if you don't know how this works and didn't Google but instead came to ask me
        // then you're a disabled learner who doesn't know how to research and teach himself
        // what are you gonna do with your life when you get out and leave university
        // you don't deserve any lollipops.
    }
};

module.export = perfect;