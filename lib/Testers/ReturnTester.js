import FunctionTester from "./FunctionTester.js";
import { arraysEqual, jsonsEqual } from "../utils.js";

export default class ReturnTester extends FunctionTester {

    constructor(name, description, func, inputOutputSamples) {
        // inherits from FunctionTester and Tester constructors
        super(name, description, func, inputOutputSamples);
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