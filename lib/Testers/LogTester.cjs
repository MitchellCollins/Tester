const validator = require("@mitchell-collins/validator");
const FunctionTester = require("./FunctionTester.cjs");
const logTestMapper = require("./logTestMapper.cjs");
const { arraysEqual, jsonsEqual, defineElementNames } = require("../utils.cjs");

/**
 * The `LogTester` creates an object that is used to test a function by passing inputs through the parameters and checking it the 
 * expected output is logged into the console.
 * 
 * The `LogTester` is a child class to the `FunctionTester` class and inherits the attributes:
 * - `name` - the name of the tester
 * - `description` - a description of what the tester tests
 * - `function` - the function that the tester tests
 * - `inputOutputSamples` - an array of sample inputs and output used to test the `function`
 * 
 * The `logTester` methods include:
 * - getter methods
 * - setter methods
 * - `run` - which runs the tests on the `function`
 * - `result` - which is used by the custom log function to pass the results to the tester
 * 
 * To get what is logged into the console by the tested `function` the `console.log` function is replaced with a custome log function 
 * that takes the given information and passes it to the correct tester and test using the `logTestMapper`. The `logTestMapper` is 
 * used to determine which tester and test is being runned and where the logged information needs to go.
 * 
 * Information on the tests are logged into the console, if a test fails it logs what the actual output was and what the expected 
 * output was.
 * 
 * Example:
 * 
 *      function addNumbers(num1, num2) {
 *          console.log(num1 + num2);
 *      }
 * 
 *      const sumTester = new ReturnTester(
 *          "Sum Tester",
 *          "tests the addNumbers function",
 *          addNumbers,
 *          [
 *              { inputs: [2, 5], output: 7 },
 *              { inputs: [7, 3], output: 10 },
 *              { inputs: [12, 7], output: 19 }
 *          ]
 *      );
 * 
 *      sumTester.run();
 * 
 * @extends {FunctionTester}
 */
module.exports = class LogTester extends FunctionTester {

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
    
    /**
     * The `LogTester` creates an object that is used to test a function by passing inputs through the parameters and checking it the 
     * expected output is logged into the console.
     * 
     * The `LogTester` is a child class to the `FunctionTester` class and inherits the attributes:
     * - `name` - the name of the tester
     * - `description` - a description of what the tester tests
     * - `function` - the function that the tester tests
     * - `inputOutputSamples` - an array of sample inputs and output used to test the `function`
     * 
     * The `logTester` methods include:
     * - getter methods
     * - setter methods
     * - `run` - which runs the tests on the `function`
     * - `result` - which is used by the custom log function to pass the results to the tester
     * 
     * To get what is logged into the console by the tested `function` the `console.log` function is replaced with a custome log function 
     * that takes the given information and passes it to the correct tester and test using the `logTestMapper`. The `logTestMapper` is 
     * used to determine which tester and test is being runned and where the logged information needs to go.
     * 
     * Information on the tests are logged into the console, if a test fails it logs what the actual output was and what the expected 
     * output was.
     * 
     * Example:
     * 
     *      function addNumbers(num1, num2) {
     *          console.log(num1 + num2);
     *      }
     * 
     *      const sumTester = new ReturnTester(
     *          "Sum Tester",
     *          "tests the addNumbers function",
     *          addNumbers,
     *          [
     *              { inputs: [2, 5], output: 7 },
     *              { inputs: [7, 3], output: 10 },
     *              { inputs: [12, 7], output: 19 }
     *          ]
     *      );
     * 
     *      sumTester.run();
     * 
     * @param {String} name the name of the tester
     * @param {String} description a description of what the tester is testing
     * @param {Function} func the function that is tested by the tester
     * @param {LogTesterSample[]} inputOutputSamples an array of sample inputs and an array of outputs that are used to test the `function`
     * 
     * @extends {FunctionTester}
     */
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

    /**
     * Used to get the attribute `inputOutputSamples`.
     * @returns {LogTesterSample[]} the value of the attribute `inputOutputSamples`.
     */
    getInputOutputSamples() {
        return this.#inputOutputSamples;
    }

    /**
     * Used to get a `LogTesterSample` from `inputOutputSamples` array at the specified `index`.
     * @param {Int} index specifies which `LogTesterSample` to get from `inputOutputSamples` array
     * @returns {LogTesterSample} the `LogTesterSample` at the specified `index` in the `inputOutputSamples` array
     */
    getInputOutputSample(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        return this.#inputOutputSamples[index];
    }

    /**
     * Used to set a new value of the attribute `inputOutputSamples`.
     * @param {LogTesterSample[]} newInputOutputSamples the new value that is set to the attribute `inputOutputSamples`
     */
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

    /**
     * Used to set a new value of `LogTesterSample` at the specified `index` of the attribute `inputOutputSamples` array.
     * @param {Int} index specifies which `LogTesterSample` from the attribute `inputOutputSamples` array is assigned a new value 
     * @param {LogTesterSample} newInputOutputSample the new value that is assigned to the `LogTesterSample` at the specified `index` of the attribute `inputOutputSamples` array
     */
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

    /**
     * Used to add a new `LogTesterSample` to the attribute `inputOutputSamples` array.
     * @param {LogTesterSample} inputOutputSample the new `LogTesterSample` that is added to the end of the attribute `inputOutputSamples` array
     */
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

    /**
     * Used to remove a `LogTesterSample` from the attribute `inputOutputSamples` array at the specified `index`.
     * @param {Int} index specifies which `LogTesterSample` is removed from the attribute `inputOutputSamples` array
     * @returns {LogTesterSample} the `LogTesterSample` that is removed from the attribute `inputOutputSamples` array 
     */
    removeInputOutputSample(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        return this.#inputOutputSamples.splice(index, 1);
    }

    /**
     * Used to run the sample inputs and expected outputs on the given `function`.
     * 
     * Information on the tests will be logged into the console and the method will also run the time method to provide the duration 
     * of the given `function`'s process.
     */
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

    /**
     * Is used by the custom log function to pass the results to the tester
     * @param {Int} testNumber identifies which test the output must go to
     * @param {*} output the output of the `function` 
     */
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
            if (!this.#checkOutput(output, expectedOutput)) {
                this.#failLog(testNumber, output, expectedOutput);
            }

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