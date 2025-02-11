import validator from "@mitchell-collins/validator";
import FunctionTester from "./FunctionTester.js";
import { arraysEqual, jsonsEqual } from "../utils.js";
import { defineElementNames } from "../utils.cjs";

/**
 * The `logTestMapper` is used by the custom log function to determine which tester and test is being runned and where the logged
 * information needs to go.
 *
 * @property {TesterManager} `manager` determines which tester manager is running the tester
 * @property {String} `tester` determine which tester is being runned
 * @property {Number} `test` determine which test is being runned
 */
let logTestMapper = {
    manager: null,
    tester: null,
    test: null,
    index: null
}

class LogTester extends FunctionTester {

    /**
     * Holds the original console.log function so that it can log the information during the test.
     */
    #originalLogFunction = console.log;

    /**
     * Holds the previous test number whos result is passed through the result method.
     */
    #previousTestNumber;

    /**
     * Used to track if a test has already failed.
     */
    #failedTest = false;

    /**
     * Holds an array of `LogTesterSample` that has the properties:
     * - inputs: any[]
     * - output: any[]
     */
    #inputOutputSamples;
    
    constructor(name, description, func, inputOutputSamples) {
        super(name, description, func);

        // validates samples
        validator.checkUndefined(inputOutputSamples, "inputOutputSamples");
        validator.checkIsArray(inputOutputSamples, "inputOutputSamples");

        const sampleNames = defineElementNames("inputOutputSamples", inputOutputSamples.length);

        validator.checkObjectStructureArray(inputOutputSamples, sampleNames, {
            inputs: new Array,
            outputs: new Array
        });

        this.#outputsCallsAlign(inputOutputSamples);

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
            outputs: new Array
        });

        this.#outputsCallsAlign(newInputOutputSamples);

        this.#inputOutputSamples = newInputOutputSamples;
    }

    setInputOutputSample(index, newInputOutputSample) {
        // validates inputs
        validator.checkUndefinedArray([index, newInputOutputSample], ["index", "newInputOutputSample"]);
        validator.checkDataType(index, "index", "number");

        validator.checkObjectStructure(newInputOutputSample, "newInputOutputSample", {
            inputs: new Array,
            outputs: new Array
        });

        this.#outputsCallsAlign([newInputOutputSample]);

        this.#inputOutputSamples[index] = newInputOutputSample;
    }

    addInputOutputSample(inputOutputSample) {
        // validates the input and output sample
        validator.checkUndefined(inputOutputSample, "inputOutputSample");

        validator.checkObjectStructure(inputOutputSample, "inputOutputSample", {
            inputs: new Array,
            outputs: new Array
        });

        this.#outputsCallsAlign([inputOutputSample]);

        this.#inputOutputSamples.push(inputOutputSample);
    }

    removeInputOutputSample(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        return this.#inputOutputSamples.splice(index, 1);
    }

    async run() {
        // logs information
        this.#originalLogFunction(`\nRunning ${this.getName()} used to ${this.getDescription()}:`);

        const inputOutputSamples = this.getInputOutputSamples();

        for (let i = 0; i < inputOutputSamples.length; i++) {
            // updates tester mapper 
            logTestMapper.tester = this.getName()
            logTestMapper.test = i;

            const inputs = inputOutputSamples[i].inputs;
            const startTime = new Date().getTime();

            // calls the function and passing inputs
            await this.getFunction()(...inputs);

            // calculates and logs duration of function
            if (i === inputOutputSamples.length - 1) {
                const endTime = new Date().getTime();
                this.#originalLogFunction("   - Duration: " + (endTime - startTime) + "ms");
            }
        }
    }

    async result(testNumber, output) {
        // checks if the test has already failed with previous log call
        if (this.#failedTest) 
            if (this.#previousTestNumber !== testNumber) {
                this.#failedTest = false;
                logTestMapper.index = 0;
            } else {
                logTestMapper.index++;
                return;
            }
        
        // updates values every interation
        this.#previousTestNumber = testNumber;
        logTestMapper.index = logTestMapper.index === null ? 0 : logTestMapper.index;
        const expectedOutput = this.#inputOutputSamples[testNumber].outputs[logTestMapper.index];
        const sample = this.#inputOutputSamples[testNumber];
        
        // checks if it is the last log of the test
        if (sample.outputs.length > logTestMapper.index + 1) {
            if (!this.#checkOutput(output, expectedOutput))
                this.#failLog(testNumber, output, expectedOutput);

            // updates index for next interation
            logTestMapper.index++;
            
        // for the logs except the last one
        } else {
            if (this.#checkOutput(output, expectedOutput))
                this.#originalLogFunction(`   - Passed Test ${testNumber + 1} ✅`);
            else
                this.#failLog(testNumber, output, expectedOutput);

            // updates index for next interation
            logTestMapper.index = 0;
        }   
    }

    /**
     * Used to check if the expected output and actual output are equal.
     * @param {*} output the actual output
     * @param {*} expectedOutput the expected output
     * @returns {Boolean} if `output` and `expectedOutput` are equal
     */
    #checkOutput(output, expectedOutput) {
        return output === expectedOutput || jsonsEqual(output, expectedOutput) || arraysEqual(output, expectedOutput);
    }

    /**
     * Used to log information into the console that the test failed.
     * @param {Int} testNumber 
     * @param {*} output 
     * @param {*} expectedOutput 
     */
    #failLog(testNumber, output, expectedOutput) {
        this.#failedTest = true;
        this.#originalLogFunction(`   - Failed Test ${testNumber + 1} ❌`);
        this.#originalLogFunction(`       Failded Console.log ${logTestMapper.index + 1}`);
        this.#originalLogFunction("         Expected Output:", expectedOutput);
        this.#originalLogFunction("         Actual Output:", output);
    }

    /**
     * Used to check if the number of expected outputs and number of console.log calls in tested function align.
     * @param {LogTesterSample[]} samples 
     */
    #outputsCallsAlign(samples) {
        // check that the number of expected outputs align with the number of console.log calls from function
        let numberOfCalls = 0;
        const originalLog = console.log;
        console.log = () => { numberOfCalls++; }

        // loops through each test
        for (let i = 0; i < samples.length; i++) {
            this.getFunction()(...samples[i].inputs);

            if (numberOfCalls !== samples[i].outputs.length)
                throw new Error(`Number of expected outputs don't align with number of console.log calls for log test ${i + 1}`);

            numberOfCalls = 0;
        }

        console.log = originalLog;
    }
}

export {
    LogTester as default,
    logTestMapper
}