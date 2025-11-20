const validator = require("@mitchell-collins/validator");
const FunctionTester = require("./FunctionTester.cjs");
const { arraysEqual, jsonsEqual, defineElementNames } = require("../utils.cjs");

/**
 * The `ReturnTester` constructor is used to create an object that tests functions that return a value.
 * 
 * The `ReturnTester` runs the function that is saved in the function attribute using the sample inputs and output.
 * 
 * The inputs are passed through the parameters when running the function an the returned value is compared against the sample output.
 * 
 * The `ReturnTester` defines the attributes:
 * - name - the name of the tester
 * - description - a description of what the tester is testing
 * - function - the function that is tested by the tester
 * - inputOutputSamples - an array of sample inputs and output that are used to test the `function`
 * 
 * The `ReturnTester` defines the methods:
 * - getter methods
 * - setter methods
 * - run - used to run the function with the sample inputs and outputs
 * 
 * Information on the tests are logged into the console, if a test fails it logs what the actual output was and what the expected 
 * output was.
 * 
 * Example:
 * 
 *      function addNumbers(num1, num2) {
 *          return num1 + num2;
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
 * @extends FunctionTester
 */
module.exports = class ReturnTester extends FunctionTester {

    /**
     * Holds an array of `ReturnTesterSample` that has the properties:
     * - inputs: any[]
     * - output: any
     */
    #inputOutputSamples;

    /**
     * The `ReturnTester` constructor is used to create an object that tests functions that return a value.
     * 
     * The `ReturnTester` runs the function that is saved in the function attribute using the sample inputs and output.
     * 
     * The inputs are passed through the parameters when running the function an the returned value is compared against the sample output.
     * 
     * The `ReturnTester` defines the attributes:
     * - name - the name of the tester
     * - description - a description of what the tester is testing
     * - function - the function that is tested by the tester
     * - inputOutputSamples - an array of sample inputs and output that are used to test the `function`
     * 
     * The `ReturnTester` defines the methods:
     * - getter methods
     * - setter methods
     * - run - used to run the function with the sample inputs and outputs
     * 
     * Information on the tests are logged into the console, if a test fails it logs what the actual output was and what the expected 
     * output was.
     * 
     * Example:
     * 
     *      function addNumbers(num1, num2) {
     *          return num1 + num2;
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
     * @param {ReturnTesterSample[]} inputOutputSamples an array of sample inputs and output that are used to test the `function`
     * 
     * @extends FunctionTester
     */
    constructor(name, description, func, inputOutputSamples) {
        // inherits from FunctionTester and Tester constructors
        super(name, description, func, inputOutputSamples);

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

    /**
     * Used to get the attribute `inputOutputSamples`.
     * @returns {ReturnTesterSample[]} the value of the attribute `inputOutputSamples`.
     */
    getInputOutputSamples() {
        return this.#inputOutputSamples;
    }

    /**
     * Used to get a `ReturnTesterSample` from `inputOutputSamples` array at the specified `index`.
     * @param {Int} index specifies which `ReturnTesterSample` to get from `inputOutputSamples` array
     * @returns {ReturnTesterSample} the `ReturnTesterSample` at the specified `index` in the `inputOutputSamples` array
     */
    getInputOutputSample(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        return this.#inputOutputSamples[index];
    }

    /**
     * Used to set a new value of the attribute `inputOutputSamples`.
     * @param {ReturnTesterSample[]} newInputOutputSamples the new value that is set to the attribute `inputOutputSamples`
     */
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

    /**
     * Used to set a new value of `ReturnTesterSample` at the specified `index` of the attribute `inputOutputSamples` array.
     * @param {Int} index specifies which `ReturnTesterSample` from the attribute `inputOutputSamples` array is assigned a new value 
     * @param {ReturnTesterSample} newInputOutputSample the new value that is assigned to the `ReturnTesterSample` at the specified `index` of the attribute `inputOutputSamples` array
     */
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

    /**
     * Used to add a new `ReturnTesterSample` to the attribute `inputOutputSamples` array.
     * @param {ReturnTesterSample} inputOutputSample the new `ReturnTesterSample` that is added to the end of the attribute `inputOutputSamples` array
     */
    addInputOutputSample(inputOutputSample) {
        // validates the input and output sample
        validator.checkUndefined(inputOutputSample, "inputOutputSample");

        validator.checkObjectStructure(inputOutputSample, "inputOutputSample", {
            inputs: new Array,
            output: "*"
        });

        this.#inputOutputSamples.push(inputOutputSample);
    }

    /**
     * Used to remove a `ReturnTesterSample` from the attribute `inputOutputSamples` array at the specified `index`.
     * @param {Int} index specifies which `ReturnTesterSample` is removed from the attribute `inputOutputSamples` array
     * @returns {ReturnTesterSample} the `ReturnTesterSample` that is removed from the attribute `inputOutputSamples` array 
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