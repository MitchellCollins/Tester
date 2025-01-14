import validator from "@mitchell-collins/validator";
import Tester from "./Tester.js";

/**
 * The `FunctionTesterSample` is an object that defines an array of inputs and an output that is used to test a function.
 * 
 * ```
 * FunctionTesterSample = {
 *  inputs: Array<*>,
 *  output: *
 * }
 * ```
 * 
 * @param {Array<*>} inputs an array of inputs that are passed through the params of the `function`
 * @param {*} output the expected output of the `function`
 * @returns {FunctionTesterSample} is an object that defines an array of inputs and an output that is used to test a function
 */
function FunctionTesterSample(inputs, output) {
    validator.checkUndefinedArray([inputs, output], ["inputs", "output"]);
    validator.checkIsArray(inputs, "inputs");
    
    this.inputs = inputs;
    this.output = output;
}

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
class FunctionTester extends Tester {
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
     * @param {Array<FunctionTesterSample>} inputOutputSamples an array of sample inputs and outputs that will be runned on the `function` as a test
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
        const sampleNames = this.#defineSampleNames(inputOutputSamples.length);

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
     * @returns {Array<FunctionTesterSample>} an array of sample inputs and outputs that will be runned on the `function` as a test
     */
    getInputOutputSamples() {
        return this.#inputOutputSamples;
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
     * @param {Array<FunctionTesterSample>} newInputOutputSamples the new array of sample inputs and outputs that will be runned on the `function` as a test
     */
    setInputOutputSamples(newInputOutputSamples) {
        // validates inputs
        validator.checkUndefined(newInputOutputSamples, "newInputOutputSamples");
        validator.checkIsArray(newInputOutputSamples, "newInputOutputSamples");

        // defines names for each sample inputs and outputs
        const sampleNames = this.#defineSampleNames(newInputOutputSamples.length);

        // checks if it has the structure of a FunctionTesterSample
        validator.checkObjectStructureArray(newInputOutputSamples, sampleNames, {
            inputs: new Array,
            output: "*"
        });

        this.#inputOutputSamples = newInputOutputSamples;
    }

    /**
     * Used to add a new sample of inputs and output to an array of `sampleInputsOutputs`.
     * @param {FunctionTesterSample} addedInputOutputSample a sample of inputs and output that is added to the `inputOutputSamples` array
     */
    addSampleInputsOutputs(addedInputOutputSample) {
        // validates inputs
        validator.checkUndefined(addedInputOutputSample, "addedInputOutputSample");
        validator.checkDataType(addedInputOutputSample, "addedInputOutputSample", "object");

        // checks if it has the structure of a FunctionTesterSample
        validator.checkObjectStructure(addedInputOutputSample, "addedInputOutputSample", {
            inputs: new Array,
            output: "*"
        });

        this.#inputOutputSamples.push(addedInputOutputSample);
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

    /**
     * Used to define an array of names for each sample of inputs and output.
     * @param {Int} arrayLength specifies how many sample names to create
     * @returns {Array<String>} an array of names for each sample
     */
    #defineSampleNames(arrayLength) {
        // creates an array of names for each sample inputs and outputs
        let sampleNames = [];

        for (let i = 0; i < arrayLength; i++) {
            sampleNames.push(`inputOutputSample${i}`);
        }

        return sampleNames;
    }
}

export { 
    FunctionTester as default, 
    FunctionTesterSample 
}