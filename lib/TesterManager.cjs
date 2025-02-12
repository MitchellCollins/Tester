const validator = require("@mitchell-collins/validator");
const RouteTester = require("./Testers/RouteTester.cjs");
const ReturnTester = require("./Testers/ReturnTester.cjs");
const LogTester = require("./Testers/LogTester.cjs");
const logTestMapper = require("./Testers/logTestMapper.cjs");

/**
 * The `TesterManager` is used to help manage the testers. The testers are instances of constructors that are the child classes 
 * of the `Tester` constructor class. These instances are used to test code and information of the tests are logged into the console.
 * 
 * The testers are held in the property `testers` that is an object, the key is set to the name of the tester and the value 
 * holds the tester. The `TesterManager` has methods that construct the tester that are than automatically put into the `testers` object
 * using the `push` method.
 * 
 * The `TesterManager` has the property `log` which holds a custome log function used to replace the console.log, used for testing
 * `functions` that make outputs by logging to the console. The `TesterManager` automatically replaces the console.log function
 * when a instance of the `LogTester` constructor is being runned. The `testerManager` also has the property `originalLog` which holds
 * the original console.log function which it automatically uses to reset the console.log function.
 * 
 * To run the testers you call the property `run` which loops through the `testers`, running through their tests one by one and all
 * information on the test are logged into the console.
 * 
 * Example:
 * 
 *      const manager = new TesterManager();
 * 
 *      manager.createLogTester(
 *          "Add Tester",
 *          "test add function",
 *          function addNumbers(num1, num2) {
 *              console.log(num1 + num2);
 *          },
 *          [
 *              { inputs: [2, 6], output: 8 },
 *              { inputs: [1, 2], output: 3 },
 *              { inputs: [4, 6], output: 10 },
 *              { inputs: [2, 5], output: 7 }
 *          ]
 *      );
 * 
 *      manager.createLogTester(
 *          "Subtract Tester",
 *          "test substract function",
 *          function substractNumbers(num1, num2) {
 *              console.log(num1 - num2);
 *          },
 *          [
 *              { inputs: [2, 5], output: -3 },
 *              { inputs: [8, 4], output: 4 },
 *              { inputs: [9, 3], output: 6 }
 *          ]
 *      );
 *  
 *      manager.createReturnTester(
 *          "Multiply Tester",
 *          "test multiply function",
 *          function multiplyNumbers(num1, num2) {
 *              return num1 * num2;
 *          },
 *          [
 *              { inputs: [2, 4], output: 8 },    
 *              { inputs: [1, 4], output: 4 },
 *              { inputs: [7, 3], output: 21 }
 *          ]
 *      );
 * 
 *      manager.createRouteTester(
 *          "Id Checker",
 *          "Checks the get id route",
 *          "http://localhost:4000/name/:id",
 *          "get",
 *          [
 *              {
 *                  output: { data: { name: "Jack" }, status: 200 },
 *                  params: { id: 1 }
 *              },
 *              {
 *                  output: { data: { name: "John" }, status: 200 },
 *                  params: { id: 2 }
 *              }
 *          ]
 *      );
 * 
 *      await testerManager.run();
 */
module.exports = class TesterManager {

    /**
     * Holds all the testers that are used to test code.
     */
    testers = {};

    /**
     * Used to create a instance of the `RouteTester` constructor that is than pushed into the `testers` object.
     * @param {String} name the name of the tester
     * @param {String} description a description of what the tester tests
     * @param {String} url the url of the route thet tester is testing
     * @param {RouteTesterMethods} method the http request method the tester makes to the route
     * @param {RouteTest[]} tests an array of the route tests
     * @param {TesterManagerOptions | undefined | null} options a object that is used to specify if user wants to override an existing `Tester` with the same name in `testers` object
     */
    createRouteTester(name, description, url, method, tests, options) {
        this.#insertTester(new RouteTester(name, description, url, method, tests), options);
    }

    /**
     * Used to create a instance of the `ReturnTester` constructor that is than pushed into the `testers` object.
     * @param {String} name the name of the tester
     * @param {String} description a description of what the tester tests
     * @param {Function} func the function that the tester is testing
     * @param {FunctionTesterSample} inputOutputSamples an array of sample inputs and output used to test the `function`
     * @param {TesterManagerOptions | undefined | null} options a object that is used to specify if user wants to override an existing `Tester` with the same name in `testers` object
     */
    createReturnTester(name, description, func, inputOutputSamples, options) {
        this.#insertTester(new ReturnTester(name, description, func, inputOutputSamples), options);
    }

    /**
     * Used to create a instance of the `LogTester` constructor that is than pushed into the `testers` object.
     * @param {String} name the name of the tester
     * @param {String} description a description of what the tester tests
     * @param {Function} func the function that the tester is testing
     * @param {FunctionTesterSample} inputOutputSamples an array of sample inputs and output used to test the `function`
     * @param {TesterManagerOptions | undefined | null} options a object that is used to specify if user wants to override an existing `Tester` with the same name in `testers` object
     */
    createLogTester(name, description, func, inputOutputSamples, options) {
        this.#insertTester(new LogTester(name, description, func, inputOutputSamples), options);
    }

    /**
     * Used to get a tester from the `testers` object using its name.
     * @param {String} name the name of the tester to get
     */
    getTester(name) {
        validator.checkUndefined(name, "name");
        validator.checkDataType(name, "name", "string");
        return this.testers[name];
    }

    /**
     * Used to override an existing Tester with a `newTester` in the `testers` object.
     * @param {RouteTester | ReturnTester | LogTester} newTester the new `Tester` which will override the existing `Tester`
     */
    override(newTester) {
        validator.checkUndefined(newTester, "newTester");
        validator.checkSuperClass(newTester, "newTester", "Tester");

        this.testers[newTester.getName()] = newTester;
    }

    /**
     * Used to push a tester into the `testers` object.
     * @param {ReturnTester | LogTester | RouteTester} tester is pushed into the `testers` object
     */
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

    /**
     * Used to remove a `Tester` from the `testers` object.
     * @param {String} name the name of the `Tester` that will be removed
     */
    remove(name) {
        validator.checkUndefined(name, "name");
        validator.checkDataType(name, "name", "string");

        const removedTester = this.testers[name];
        delete this.testers[name];
       
        return removedTester;
    }

    /**
     * Holds the `console.log` function, used to reset the value of the `console.log` function.
     */
    originalLog = console.log;

    /**
     * A custom log function used to replace the `console.log` function for the log testers.
     * @param {any[]} output the output of a function that is logged to the console
     */
    async log(...output) {
        // updates value if only 1 argument was provided
        output = output.length === 1 ? output[0] : output;
        
        if (logTestMapper.tester !== null)
            // uses the logTestMapper to finds and pass the output to the correct test in the correct TesterManager
            await logTestMapper.manager.testers[logTestMapper.tester].result(logTestMapper.test, output);
    }

    /**
     * Loops through the `testers` running their tests, also handles the replacing and reseting of the `console.log` function.
     */
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