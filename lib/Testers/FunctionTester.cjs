const validator = require("@mitchell-collins/validator");
const Tester = require("./Tester.cjs");

/**
 * The `FunctionTester` constructor is used to define a object that is designed to test functions. 
 * 
 * The `FunctionTester` constructor is a child of the `Tester` constructor which defines the attributes:
 * - name - the name of the tester
 * - description - a description of what the tester is testing
 * 
 * The `FunctionTester` constructor defines more attributes these include:
 * - `function` - which is the `function` that is going to be tested
 * 
 * @extends Tester
 */
module.exports = class FunctionTester extends Tester {
    /**
     * Holds the function that is going to be tested.
     */
    #function;
    
    /**
     * The `FunctionTester` constructor is used to define a object that is designed to test functions. 
     * 
     * The `FunctionTester` constructor is a child of the `Tester` constructor which defines the attributes:
     * - name - the name of the tester
     * - description - a description of what the tester is testing
     * 
     * The `FunctionTester` constructor defines more attributes these include:
     * - `function` - the `function` that is going to be tested
     * - `inputOutputSamples` - an array of sample inputs and outputs that will be runned on the `function` as a test
     * 
     * @param {String} name the name of the tester
     * @param {String} description a description of what the tester is testing
     * @param {Function} func the `function` that is going to be tested
     * 
     * @extends Tester
     */
    constructor(name, description, func) {
        // inherits from Tester constructor
        super(name, description);
        
        // validates other inputs
        validator.checkDataType(func, "func", "function");

        // defines the attributes
        this.#function = func;
    }

    /**
     * Returns the `function` that is going to be tested.
     * @returns {Function} the `function` that is going to be tested
     */
    getFunction() {
        return this.#function;
    }

    /**
     * Used to set the `function` that is going to be tested.
     * @param {Function} newFunction the new `function` that is going to be tested
     */
    setFunction(newFunction) {
        // validates inputs
        validator.checkUndefined(newFunction, "newFunction");
        validator.checkDataType(newFunction, "newFunction", "function");

        this.#function = newFunction;
    }
}