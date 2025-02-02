import validator from "@mitchell-collins/validator";
import RouteTester from "./Testers/RouteTester.js";
import ReturnTester from "./Testers/ReturnTester.js";
import LogTester, { logTestMapper } from "./Testers/LogTester.js";

export default class TesterManager {

    testers = {};

    createRouteTester(name, description, url, method, tests) {
        this.push(new RouteTester(name, description, url, method, tests));        
    }

    createReturnTester(name, description, func, inputOutputSamples) {
        this.push(new ReturnTester(name, description, func, inputOutputSamples));
    }

    createLogTester(name, description, func, inputOutputSamples) {
        this.push(new LogTester(name, description, func, inputOutputSamples));
    }

    push(tester) {
        validator.checkUndefined(tester, "tester");
        validator.checkSuperClass(tester, "tester", "Tester");
        
        this.testers = {
            ...this.testers,
            [tester.getName()]: tester
        }
    }

    originalLog = console.log;

    async log(...output) {
        // updates value if only 1 argument was provided
        output = output.length === 1 ? output[0] : output;
        
        if (logTestMapper.tester !== null)
            // uses the logTestMapper to finds and pass the output to the correct test in the correct TesterManager
            await logTestMapper.manager.testers[logTestMapper.tester].result(logTestMapper.test, output);
    }

    async run() {
        logTestMapper.manager = this;
        
        // Use a for...of loop to handle async operations sequentially
        for (const tester of Object.values(this.testers)) {

            // updates the console.log value based off if the current tester is a log tester
            if (tester.constructor.name === "LogTester") 
                console.log = this.log;
            else
                console.log = this.originalLog;

            await tester.run(); // Ensure each tester finishes before starting the next
        }

        // resets the console.log function
        console.log = this.originalLog;
    }
}