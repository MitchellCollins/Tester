const FunctionTester = require("./FunctionTester.cjs");
const { arraysEqual, jsonsEqual } = require("../utils.cjs");

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
    test: null
}

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
class LogTester extends FunctionTester {

    /**
     * Holds the original console.log function so that it can log the information during the test.
     */
    #originalLogFunction = console.log;
    
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
     * @param {FunctionTesterSample[]} inputOutputSamples an array of sample inputs and output that are used to test the `function`
     * 
     * @extends {FunctionTester}
     */
    constructor(name, description, func, inputOutputSamples) {
        super(name, description, func, inputOutputSamples);
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
        const expectedOutput = this.getInputOutputSamples()[testNumber].output;

        if (output === expectedOutput || jsonsEqual(output, expectedOutput) || arraysEqual(output, expectedOutput)) {
            this.#originalLogFunction(`   - Passed Test ${testNumber + 1} ✅`);
        } else {
            this.#originalLogFunction(`   - Failed Test ${testNumber + 1} ❌`);
            this.#originalLogFunction("       Expected Output:", expectedOutput);
            this.#originalLogFunction("       Actual Output:", output);
        }   
    }
}

module.exports = {
    LogTester,
    logTestMapper
}