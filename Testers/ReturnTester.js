import FunctionTester, { FunctionTesterSample } from "./FunctionTester.js";
import { arraysEqual, jsonsEqual } from "../utils.js";

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
 *              new FunctionTesterSample([2, 5], 7),
 *              new FunctionTesterSample([7, 3], 10),
 *              new FunctionTesterSample([12, 7], 19)
 *          ]
 *      );
 * 
 *      sumTester.run();
 * 
 * @extends FunctionTester
 */
export default class ReturnTester extends FunctionTester {

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
     *              new FunctionTesterSample([2, 5], 7),
     *              new FunctionTesterSample([7, 3], 10),
     *              new FunctionTesterSample([12, 7], 19)
     *          ]
     *      );
     * 
     *      sumTester.run();
     * 
     * @param {String} name the name of the tester
     * @param {String} description a description of what the tester is testing
     * @param {Function} func the function that is tested by the tester
     * @param {Array<FunctionTesterSample>} inputOutputSamples an array of sample inputs and output that are used to test the `function`
     * 
     * @extends FunctionTester
     */
    constructor(name, description, func, inputOutputSamples) {
        // inherits from FunctionTester and Tester constructors
        super(name, description, func, inputOutputSamples);
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