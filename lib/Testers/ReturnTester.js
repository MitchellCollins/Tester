import validator from "@mitchell-collins/validator";
import FunctionTester from "./FunctionTester.js";
import { arraysEqual, jsonsEqual, defineElementNames } from "../utils.js";

export default class ReturnTester extends FunctionTester {

    /**
     * Holds an array of `ReturnTesterSample` that has the properties:
     * - inputs: any[]
     * - output: any
     */
    #inputOutputSamples;

    constructor(name, description, func, inputOutputSamples) {
        // inherits from FunctionTester and Tester constructors
        super(name, description, func);

        // validates the input and output samples
        validator.checkUndefined(inputOutputSamples, "inputOutputSamples");
        validator.checkIsArray(inputOutputSamples, "inputOutputSamples");

        const sampleNames = defineElementNames("inputOutputSamples", inputOutputSamples.length);
        validator.checkObjectStructureArray(inputOutputSamples, sampleNames, {
            inputs: new Array,
            output: "*"
        });

        this.#inputOutputSamples = inputOutputSamples;
    }

    getInputOutputSamples() {
        return this.#inputOutputSamples;
    }

    getInputOutputSample(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        return this.#inputOutputSamples[index];
    }

    setInputOutputSamples(newInputOutputSamples) {
        // validates the input and output samples
        validator.checkUndefined(newInputOutputSamples, "newInputOutputSamples");
        validator.checkIsArray(newInputOutputSamples, "newInputOutputSamples");

        const sampleNames = defineElementNames("newInputOutputSamples", newInputOutputSamples.length);
        validator.checkObjectStructureArray(newInputOutputSamples, sampleNames, {
            inputs: new Array,
            output: "*"
        });

        this.#inputOutputSamples = newInputOutputSamples;
    }

    setInputOutputSample(index, newInputOutputSample) {
        // validates inputs
        validator.checkUndefinedArray([index, newInputOutputSample], ["index", "newInputOutputSample"]);
        validator.checkDataType(index, "index", "number");

        validator.checkObjectStructure(newInputOutputSample, "newInputOutputSample", {
            inputs: new Array,
            output: "*"
        });

        this.#inputOutputSamples[index] = newInputOutputSample;
    }

    addInputOutputSample(inputOutputSample) {
        // validates the input and output sample
        validator.checkUndefined(inputOutputSample, "inputOutputSample");

        validator.checkObjectStructure(inputOutputSample, "inputOutputSample", {
            inputs: new Array,
            output: "*"
        });

        this.#inputOutputSamples.push(inputOutputSample);
    }

    removeInputOutputSample(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        return this.#inputOutputSamples.splice(index, 1);
    }

    async run() {
        // logs information on tester
        console.log(`\nRunning ${this.getName()} used to ${this.getDescription()}:`);

        const inputOutputSamples = this.getInputOutputSamples();

        // loops through sample inputs and outputs testing the function
        for (let i = 0; i < inputOutputSamples.length; i++) {
            
            const { inputs, output: expectedOutput } = inputOutputSamples[i];
            const startTime = new Date().getTime();

            const output = await this.getFunction()(...inputs);

            if (output === expectedOutput || jsonsEqual(output, expectedOutput) || arraysEqual(output, expectedOutput)) {
                console.log(`   - Passed Test ${i + 1} ✅`);
            } else {
                console.log(`   - Failed Test ${i + 1} ❌`);
                console.log("       Expected Output:", expectedOutput);
                console.log("       Actual Output:", output);
            }

            // calculates and logs duration of function
            if (i === inputOutputSamples.length - 1) {
                const endTime = new Date().getTime();
                console.log("   - Duration: " + (endTime - startTime) + "ms");
            }
        }
    }
}