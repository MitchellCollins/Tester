import validator from "@mitchell-collins/validator";
import { FunctionTesterSample } from "./Testers/FunctionTester.js";
import RouteTester, { RouteTesterMethods, RouteTest } from "./Testers/RouteTester.js";
import ReturnTester from "./Testers/ReturnTester.js";
import LogTester, { logTestMapper } from "./Testers/LogTester.js";

/**
 * The `testerManager` is used to help manage the testers. The testers are instances of constructors that are the child classes 
 * of the `Tester` constructor class. These instances are used to test code and information of the tests are logged into the console.
 * 
 * The testers are held in the property `testers` that is an object, the key is set to the name of the tester and the value 
 * holds the tester. The `testerManager` has methods that construct the tester that are than automatically put into the `testers` object
 * using the `push` method.
 * 
 * The `testerManager` has the property `log` which holds a custome log function used to replace the console.log, used for testing
 * `functions` that make outputs by logging to the console. The `testerManager` automatically replaces the console.log function
 * when a instance of the `LogTester` constructor is being runned. The `testerManager` also has the property `originalLog` which holds
 * the original console.log function which it automatically uses to reset the console.log function.
 * 
 * To run the testers you call the property `run` which loops through the `testers`, running through their tests one by one and all
 * information on the test are logged into the console.
 * 
 * Example:
 * 
 *      testerManager.createLogTester(
 *          "Add Tester",
 *          "test add function",
 *          function addNumbers(num1, num2) {
 *              console.log(num1 + num2);
 *          },
 *          [
 *              new FunctionTesterSample([2, 6], 8),
 *              new FunctionTesterSample([1, 2], 3),
 *              new FunctionTesterSample([4, 6], 10),
 *              new FunctionTesterSample([2, 5], 7)
 *          ]
 *      );
 * 
 *      testerManager.createLogTester(
 *          "Subtract Tester",
 *          "test substract function",
 *          function substractNumbers(num1, num2) {
 *              console.log(num1 - num2);
 *          },
 *          [
 *              new FunctionTesterSample([2, 5], -3),
 *              new FunctionTesterSample([8, 4], 4),
 *              new FunctionTesterSample([9, 3], 6)
 *          ]
 *      );
 *  
 *      testerManager.createReturnTester(
 *          "Multiply Tester",
 *          "test multiply function",
 *          function multiplyNumbers(num1, num2) {
 *              return num1 * num2;
 *          },
 *          [
 *              new FunctionTesterSample([2, 4], 8),    
 *              new FunctionTesterSample([1, 4], 4),
 *              new FunctionTesterSample([7, 3], 21)
 *          ]
 *      );
 * 
 *      testerManager.createRouteTester(
 *          "Id Checker",
 *          "Checks the get id route",
 *          "http://localhost:4000/name/:id",
 *          RouteTesterMethods.GET,
 *          [
 *              new RouteTest({
 *                  output: new RouteTesterOutput({ name: "Jack" }, 200),
 *                  params: { id: 1 }
 *              }),
 *              new RouteTest({
 *                  output: new RouteTesterOutput({ name: "John" }, 200),
 *                  params: { id: 2 }
 *              })
 *          ]
 *      );
 * 
 *      await testerManager.run();
 */
const testerManager = {
    /**
     * Holds all the testers that are used to test code.
     */
    testers: {},

    /**
     * Used to create a instance of the `RouteTester` constructor that is than pushed into the `testers` object.
     * @param {String} name the name of the tester
     * @param {String} description a description of what the tester tests
     * @param {String} url the url of the route thet tester is testing
     * @param {RouteTesterMethods} method the http request method the tester makes to the route
     * @param {RouteTest[]} tests an array of the route tests
     */
    createRouteTester: function (name, description, url, method, tests) {
        this.push(new RouteTester(name, description, url, method, tests));        
    },

    /**
     * Used to create a instance of the `ReturnTester` constructor that is than pushed into the `testers` object.
     * @param {String} name the name of the tester
     * @param {String} description a description of what the tester tests
     * @param {Function} func the function that the tester is testing
     * @param {FunctionTesterSample[]} inputOutputSamples an array of sample inputs and output used to test the `function`
     */
    createReturnTester: function (name, description, func, inputOutputSamples) {
        this.push(new ReturnTester(name, description, func, inputOutputSamples));
    },

    /**
     * Used to create a instance of the `LogTester` constructor that is than pushed into the `testers` object.
     * @param {String} name the name of the tester
     * @param {String} description a description of what the tester tests
     * @param {Function} func the function that the tester is testing
     * @param {FunctionTesterSample[]} inputOutputSamples an array of sample inputs and output used to test the `function`
     */
    createLogTester: function (name, description, func, inputOutputSamples) {
        this.push(new LogTester(name, description, func, inputOutputSamples));
    },

    /**
     * Used to push a tester into the `testers` object.
     * @param {RouteTester | ReturnTester | LogTester} tester is pushed into the `testers` object
     */
    push: function (tester) {
        validator.checkUndefined(tester, "tester");
        validator.checkSuperClass(tester, "tester", "Tester");
        
        this.testers = {
            ...this.testers,
            [tester.getName()]: tester
        }
    },

    /**
     * Holds the `console.log` function, used to reset the value of the `console.log` function.
     */
    originalLog: console.log,

    /**
     * A custom log function used to replace the `console.log` function for the log testers.
     * @param  {...any} output the output of a function that is logged to the console
     */
    log: async function (...output) {
        // updates value if only 1 argument was provided
        output = output.length === 1 ? output[0] : output;
        
        if (logTestMapper.tester !== null)
            // uses the logTestMapper to finds and pass the output to the correct test
            await testerManager.testers[logTestMapper.tester].result(logTestMapper.test, output);
    },

    /**
     * Loops through the `testers` running their tests, also handles the replacing and reseting of the `console.log` function.
     */
    run: async function () {
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

export default testerManager;