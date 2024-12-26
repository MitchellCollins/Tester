import validator from "@mitchell-collins/validator";
import Tester from "./Tester.js";

/**
 * The `FunctionTester` constructor is used to define a object that is designed to test functions. 
 * 
 * The `FunctionTester` constructor is a child of the `Tester` constructor which defines the attributes:
 * - name - the name of the tester
 * - description - a description of what the tester is testing
 * 
 * The `FunctionTester` constructor defines more attributes these include:
 * - `function` - which is the `function` that is going to be tested
 * - `sampleInputsOutputs` - which is an array of test that that will be runned on the `function`
 */
export default class FunctionTester extends Tester {
    /**
     * Holds the function that is going to be tested.
     */
    #function;

    /**
     * Is an array of sample inputs and outputs that will be tested on the `function`.
     */
    #sampleInputsOutputs;
    
    /**
     * The `FunctionTester` constructor is used to define a object that is designed to test functions. 
     * 
     * The `FunctionTester` constructor is a child of the `Tester` constructor which defines the attributes:
     * - name - the name of the tester
     * - description - a description of what the tester is testing
     * 
     * The `FunctionTester` constructor defines more attributes these include:
     * - `function` - which is the `function` that is going to be tested
     * - `sampleInputsOutputs` - which is an array of test that that will be runned on the `function`
     * 
     * @param {String} name
     * @param {String} description
     * @param {Function} func
     * @param {Array<object>} sampleInputsOutputs
     */
    constructor(name, description, func, sampleInputsOutputs) {
        // inherits from Tester constructor
        super(name, description);
        
        // validates other inputs
        validator.checkDataType(func, "func", "function");
        validator.checkIsArray(sampleInputsOutputs, "sampleInputsOutputs");
        
        // defines names for each sample inputs and outputs
        const objectNames = this.#defineSampleNames(sampleInputsOutputs.length);

        // validates the structure of the sample inputs and outputs
        validator.checkObjectStructureArray(sampleInputsOutputs, objectNames, {
            inputs: new Array,
            output: "*"
        });

        // defines the attributes
        this.#function = func;
        this.#sampleInputsOutputs = sampleInputsOutputs;
    }

    /**
     * Returns the `function` that is going to be tested.
     * @returns {Function}
     */
    getFunction() {
        return this.#function;
    }

    /**
     * Returns the `sampleInputsOutputs` that are going to be used to test the `function`.
     * @returns {Array<object>}
     */
    getSampleInputsOutputs() {
        return this.#sampleInputsOutputs;
    }

    /**
     * Used to set the `function` that is going to be tested.
     * @param {Function} newFunction 
     */
    setFunction(newFunction) {
        // validates inputs
        validator.checkUndefined(newFunction, "newFunction");
        validator.checkDataType(newFunction, "newFunction", "function");

        this.#function = newFunction;
    }

    /**
     * Used to set the `sampeInputsOutputs` that is used to test the `function`.
     * @param {Array<object>} newSampleInputsOutputs 
     */
    setSampleInputsOutputs(newSampleInputsOutputs) {
        // validates inputs
        validator.checkUndefined(newSampleInputsOutputs, "newSampleInputsOutputs");
        validator.checkIsArray(newSampleInputsOutputs, "newSampleInputsOutputs");

        // defines names for each sample inputs and outputs
        const objectNames = this.#defineSampleNames(newSampleInputsOutputs.length);

        // validates the structure of the sample inputs and outputs
        validator.checkObjectStructureArray(newSampleInputsOutputs, objectNames, {
            inputs: new Array,
            output: "*"
        });

        this.#sampleInputsOutputs = newSampleInputsOutputs;
    }

    /**
     * Used to add a new sample of inputs and output to an array of `sampleInputsOutputs`.
     * @param {object} addedSampleInputsOutputs 
     */
    addSampleInputsOutputs(addedSampleInputsOutputs) {
        // validates inputs
        validator.checkUndefined(addedSampleInputsOutputs, "addedSampleInputsOutputs");
        validator.checkDataType(addedSampleInputsOutputs, "addedSampleInputsOutputs", "object");

        // validates structure of sample inputs and output
        validator.checkObjectStructure(addedSampleInputsOutputs, "addedSampleInputsOutputs", {
            inputs: new Array,
            output: "*"
        });

        this.#sampleInputsOutputs.push(addedSampleInputsOutputs);
    }

    /**
     * Used to remove a sample of inputs and output from the array of `sampleInputsOutputs` at the specified `index`.
     * @param {Number} index 
     * @returns {object}
     */
    removeSampleInputsOutputs(index) {
        // validates inputs
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        if (index > this.#sampleInputsOutputs.length - 1) throw new Error("Index exceeds size of array");

        // removes and returns sample inputs and output
        return this.#sampleInputsOutputs.splice(index, 1);
    }

    /**
     * Used to define an array of names for each sample of inputs and output.
     * @param {Number} arrayLength 
     * @returns {Array<String>}
     */
    #defineSampleNames(arrayLength) {
        // creates an array of names for each sample inputs and outputs
        let sampleNames = [];

        for (let i = 0; i < arrayLength; i++) {
            sampleNames.push(`sampleInputsOutputs${i}`);
        }

        return sampleNames;
    }
}