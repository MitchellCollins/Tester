import validator from "@mitchell-collins/validator";
import Tester from "./Tester.js";
import { defineElementNames } from "../utils.js";

export default class FunctionTester extends Tester {
    /**
     * Holds the function that is going to be tested.
     */
    #function;

    /**
     * Is an array of sample inputs and outputs that will be tested on the `function`.
     */
    #inputOutputSamples;
    
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

    getFunction() {
        return this.#function;
    }

    getInputOutputSamples() {
        return this.#inputOutputSamples;
    }

    getInputOutputSample(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#inputOutputSamples, "inputOutputSamples", index);
        return this.#inputOutputSamples[index];
    }

    setFunction(newFunction) {
        // validates inputs
        validator.checkUndefined(newFunction, "newFunction");
        validator.checkDataType(newFunction, "newFunction", "function");

        this.#function = newFunction;
    }

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

    removeInputOutputSample(index) {
        // validates inputs
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#inputOutputSamples, "inputOutputSamples", index);

        // removes and returns sample inputs and output
        return this.#inputOutputSamples.splice(index, 1);
    }
}