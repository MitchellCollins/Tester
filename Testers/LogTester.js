import FunctionTester from "./FunctionTester.js";
import { arraysEqual, jsonsEqual } from "../utils.js";

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

class LogTester extends FunctionTester {

    /**
     * Holds the original console.log function so that it can log the information during the test.
     */
    #originalLogFunction = console.log;
    
    constructor(name, description, func, inputOutputSamples) {
        super(name, description, func, inputOutputSamples);
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

export {
    LogTester as default,
    logTestMapper
}