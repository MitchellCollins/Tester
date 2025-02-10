const validator = require("@mitchell-collins/validator");
const Tester = require("./Tester.cjs");
const { defineElementNames } = require("../utils.cjs");

/**
 * The `FunctionTester` constructor is used to define a object that is designed to test functions. 
 * 
 * The `FunctionTester` constructor is a child of the `Tester` constructor which defines the attributes:
 * - name - the name of the tester
 * - description - a description of what the tester is testing
 * 
 * The `FunctionTester` constructor defines more attributes these include:
 * - `function` - which is the `function` that is going to be tested
 * - `inputOutputSamples` - which is an array of test that that will be runned on the `function`
 * 
 * @extends Tester
 */
module.exports = class FunctionTester extends Tester {
    /**
     * Holds the function that is going to be tested.
     */
    #function;

    /**
     * Is an array of sample inputs and outputs that will be tested on the `function`.
     */
    #inputOutputSamples;
    
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
     * @param {FunctionTesterSample} inputOutputSamples an array of sample inputs and outputs that will be runned on the `function` as a test
     * 
     * @extends Tester
     */
    constructor(name, description, func, inputOutputSamples) {
        // inherits from Tester constructor
        super(name, description);
        
        // validates other inputs
        validator.checkDataType(func, "func", "function");
        validator.checkIsArray(inputOutputSamples, "inputOutputSamples");
        
        // defines names for each sample inputs and outputs
        const sampleNames = defineElementNames("inputOutputSamples", inputOutputSamples.length);

        // checks if it has the structure of a FunctionTesterSample
        validator.checkObjectStructureArray(inputOutputSamples, sampleNames, {
            inputs: new Array,
            output: "*"
        });

        // defines the attributes
        this.#function = func;
        this.#inputOutputSamples = inputOutputSamples;
    }

    /**
     * Returns the `function` that is going to be tested.
     * @returns {Function} the `function` that is going to be tested
     */
    getFunction() {
        return this.#function;
    }

    /**
     * Returns the `inputOutputSamples` that are going to be used to test the `function`.
     * @returns {FunctionTesterSample[]} an array of sample inputs and outputs that will be runned on the `function` as a test
     */
    getInputOutputSamples() {
        return this.#inputOutputSamples;
    }

    /**
     * Returns the `FunctionTesterSample` that is in the `inputOutputSamples` array at the specified `index`.
     * @param {Int} index specifies which `FunctionTesterSample` to get from `inputOutputSamples` array 
     * @returns {FunctionTesterSample} the `FunctionTesterSample` at specified `index`
     */
    getInputOutputSample(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#inputOutputSamples, "inputOutputSamples", index);
        return this.#inputOutputSamples[index];
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

    /**
     * Used to set the `inputOutputSamples` that is used to test the `function`.
     * @param {FunctionTesterSample[]} newInputOutputSamples the new array of sample inputs and outputs that will be runned on the `function` as a test
     */
    setInputOutputSamples(newInputOutputSamples) {
        // validates inputs
        validator.checkUndefined(newInputOutputSamples, "newInputOutputSamples");
        validator.checkIsArray(newInputOutputSamples, "newInputOutputSamples");

        // defines names for each sample inputs and outputs
        const sampleNames = defineElementNames("newInputOutputSamples", newInputOutputSamples.length);

        // checks if it has the structure of a FunctionTesterSample
        validator.checkObjectStructureArray(newInputOutputSamples, sampleNames, {
            inputs: new Array,
            output: "*"
        });

        this.#inputOutputSamples = newInputOutputSamples;
    }

    /**
     * Used to set a new value to a `FunctionTesterSample` at the specified `index` in the `inputOutputSamples` array.
     * @param {Int} index specifies which `FunctionTesterSample` in the `inputOutputSamples` array will have its value changed
     * @param {FunctionTesterSample} newInputOutputSample the new value for the `FunctionTesterSample` in the `inputOutputSamples` array
     */
    setInputOutputSample(index, newInputOutputSample) {
        validator.checkUndefinedArray([index, newInputOutputSample], ["index", "newInputOutputSample"]);
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#inputOutputSamples, "inputOutputSamples", index);

        // checks if it has the structure of a FunctionTesterSample
        validator.checkObjectStructure(newInputOutputSample, "newInputOutputSample", {
            inputs: new Array,
            output: "*"
        });

        this.#inputOutputSamples[index] = newInputOutputSample;
    }

    /**
     * Used to add a new sample of inputs and output to an array of `sampleInputsOutputs`.
     * @param {FunctionTesterSample} inputOutputSample a sample of inputs and output that is added to the `inputOutputSamples` array
     */
    addInputOutputSample(inputOutputSample) {
        // validates inputs
        validator.checkUndefined(inputOutputSample, "addedInputOutputSample");
        validator.checkDataType(inputOutputSample, "addedInputOutputSample", "object");

        // checks if it has the structure of a FunctionTesterSample
        validator.checkObjectStructure(inputOutputSample, "addedInputOutputSample", {
            inputs: new Array,
            output: "*"
        });

        this.#inputOutputSamples.push(inputOutputSample);
    }

    /**
     * Used to remove a sample of inputs and output from the array of `inputOutputSamples` at the specified `index`.
     * @param {Int} index specifies which sample of inputs and output to remove
     * @returns {FunctionTesterSample} the removed sample of inputs and output
     */
    removeInputOutputSample(index) {
        // validates inputs
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#inputOutputSamples, "inputOutputSamples", index);

        // removes and returns sample inputs and output
        return this.#inputOutputSamples.splice(index, 1);
    }
}