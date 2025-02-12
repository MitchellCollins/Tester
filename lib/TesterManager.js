import validator from "@mitchell-collins/validator";
import RouteTester from "./Testers/RouteTester.js";
import ReturnTester from "./Testers/ReturnTester.js";
import LogTester, { logTestMapper } from "./Testers/LogTester.js";

export default class TesterManager {

    testers = {};

    createRouteTester(name, description, url, method, tests, options) {
        this.#insertTester(new RouteTester(name, description, url, method, tests), options);
    }

    createReturnTester(name, description, func, inputOutputSamples, options) {
        this.#insertTester(new ReturnTester(name, description, func, inputOutputSamples), options);
    }

    createLogTester(name, description, func, inputOutputSamples, options) {
        this.#insertTester(new LogTester(name, description, func, inputOutputSamples), options);
    }

    getTester(name) {
        validator.checkUndefined(name, "name");
        validator.checkDataType(name, "name", "string");
        return this.testers[name];
    }

    override(newTester) {
        validator.checkUndefined(newTester, "newTester");
        validator.checkSuperClass(newTester, "newTester", "Tester");

        this.testers[newTester.getName()] = newTester;
    }

    push(tester) {
        validator.checkUndefined(tester, "tester");
        validator.checkSuperClass(tester, "tester", "Tester");

        const name = tester.getName();

        if (this.testers[name] !== undefined)
            throw new Error(`Already existing Tester with name: ${name}`);
        
        this.testers = {
            ...this.testers,
            [name]: tester
        }
    }

    remove(name) {
        validator.checkUndefined(name, "name");
        validator.checkDataType(name, "name", "string");

        const removedTester = this.testers[name];
        delete this.testers[name];
       
        return removedTester;
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

    /**
     * Used to check the override option.
     * @param {object} options a object with the property override that determine if the user wants to override
     * @returns {Boolean} wheather the user wants to override
     */
    #checkOptions(options) {
        const { override = false } = options;
        return override;
    }

    /**
     * Used to perform correct action where the user wants to override.
     * @param {ReturnTester | LogTester | RouteTester} tester 
     * @param {object | undefined | null} options 
     */
    #insertTester(tester, options) {
        if (!this.#checkOptions(options || {}))
            this.push(tester);    
        else
            this.override(tester);
    }
}