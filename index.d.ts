import { AxiosRequestConfig, HttpStatusCode } from "axios";

export {
    AxiosRequestConfig,
    HttpStatusCode
}

/**
 * Is a whole number.
 */
type int = number;

/**
 * The `Tester` constructor is used to define a tester which is used to test code that it outputs the expected output.
 * 
 * The `Tester` constructor is the super class of multiple children Tester classes that have different attrtributes and methods as 
 * they are design to test different types of codes. The child constructors of the `Tester` constructor include:
 * - `FunctionTester` - used to test a function
 * - `RouteTester` - used to test the route of a server
 * 
 * The `FunctionTester` constructor have children Testers of its own.
 * 
 * `FunctionTester` has multiple children constructors these include:
 * - `ReturnTester` - tests the value that is returned by a function
 * - `LogTester` - tests the value that is logged to the console by a function
 * 
 * The attributes that this `Tester` constructor defines include:
 * - `name` - the name of the tester
 * - `description` - a description of what the tester is testing
 * 
 * @extends SuperClass
 */
export class Tester {

    /**
     * The `Tester` constructor is used to define a tester which is used to test code that it outputs the expected output.
     * 
     * The `Tester` constructor is the super class of multiple children Tester classes that have different attrtributes and methods as 
     * they are design to test different types of codes. The child constructors of the `Tester` constructor include:
     * - `FunctionTester` - used to test a function
     * - `RouteTester` - used to test the route of a server
     * 
     * The `FunctionTester` constructor have children Testers of its own.
     * 
     * `FunctionTester` has multiple children constructors these include:
     * - `ReturnTester` - tests the value that is returned by a function
     * - `LogTester` - tests the value that is logged to the console by a function
     * 
     * The attributes that this `Tester` constructor defines include:
     * - `name` - the name of the tester
     * - `description` - a description of what the tester is testing
     * 
     * @param name the name of the tester
     * @param description a description of what the tester is testing
     * 
     * @extends SuperClass
     */
    constructor(name: string, description: string);

    /**
     * Returns the `name` of this tester.
     * @returns the name of the tester
     */
    getName(): string;

    /**
     * Returns the `description` of this tester.
     * @returns a description of what the tester is testing
     */
    getDescription(): string;

    /**
     * Used to set a new value for the `name` attribute of this tester.
     * @param newName the new `name` of the tester
     */
    setName(newName: string): void;

    /**
     * Used to set a new value for the `description` attribute of this tester.
     * @param newDescription the new `description` of what the tester is testing
     */
    setDescription(newDescription: string): void;
}

/**
 * The `FunctionTester` constructor is used to define a object that is designed to test functions. 
 * 
 * The `FunctionTester` constructor is a child of the `Tester` constructor which defines the attributes:
 * - name - the name of the tester
 * - description - a description of what the tester is testing
 * 
 * The `FunctionTester` constructor defines more attributes these include:
 * - `function` - which is the `function` that is going to be tested
 * 
 * @extends Tester
 */
export class FunctionTester extends Tester {

    /**
     * The `FunctionTester` constructor is used to define a object that is designed to test functions. 
     * 
     * The `FunctionTester` constructor is a child of the `Tester` constructor which defines the attributes:
     * - name - the name of the tester
     * - description - a description of what the tester is testing
     * 
     * The `FunctionTester` constructor defines more attributes these include:
     * - `function` - the `function` that is going to be tested
     * 
     * @param name the name of the tester
     * @param description a description of what the tester is testing
     * @param func the `function` that is going to be tested
     * 
     * @extends Tester
     */
    constructor(name: string, description: string, func: Function);

    /**
     * Returns the `function` that is going to be tested.
     * @returns the `function` that is going to be tested
     */
    getFunction(): Function;

    /**
     * Used to set the `function` that is going to be tested.
     * @param newFunction the new `function` that is going to be tested
     */
    setFunction(newFunction: Function): void;
}

/**
 * The `ReturnTesterSample` is an object that defines an array of inputs and an array outputs that is used to test a function.
 */
export type ReturnTesterSample = {
    inputs: any[],
    output: any
}

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
export class ReturnTester extends FunctionTester {

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
     * @param name the name of the tester
     * @param description a description of what the tester is testing
     * @param func the function that is tested by the tester
     * @param inputOutputSamples an array of sample inputs and output that are used to test the `function`
     * 
     * @extends FunctionTester
     */
    constructor(name: string, description: string, func: Function, inputOutputSample: ReturnTesterSample[]);

    /**
     * Used to get the attribute `inputOutputSamples`.
     * @returns the value of the attribute `inputOutputSamples`.
     */
    getInputOutputSamples(): ReturnTesterSample[];

    /**
     * Used to get a `ReturnTesterSample` from `inputOutputSamples` array at the specified `index`.
     * @param index specifies which `ReturnTesterSample` to get from `inputOutputSamples` array
     * @returns the `ReturnTesterSample` at the specified `index` in the `inputOutputSamples` array
     */
    getInputOutputSample(index: int): ReturnTesterSample;

    /**
     * Used to set a new value of the attribute `inputOutputSamples`.
     * @param newInputOutputSamples the new value that is set to the attribute `inputOutputSamples`
     */
    setInputOutputSamples(newInputOutputSamples: ReturnTesterSample[]): void;

    /**
     * Used to set a new value of `ReturnTesterSample` at the specified `index` of the attribute `inputOutputSamples` array.
     * @param index specifies which `ReturnTesterSample` from the attribute `inputOutputSamples` array is assigned a new value 
     * @param newInputOutputSample the new value that is assigned to the `ReturnTesterSample` at the specified `index` of the attribute `inputOutputSamples` array
     */
    setInputOutputSample(index: int, newInputOutputSample: ReturnTesterSample): void;

    /**
     * Used to add a new `ReturnTesterSample` to the attribute `inputOutputSamples` array.
     * @param inputOutputSample the new `ReturnTesterSample` that is added to the end of the attribute `inputOutputSamples` array
     */
    addInputOutputSample(inputOutputSample: ReturnTesterSample): void;

    /**
     * Used to remove a `ReturnTesterSample` from the attribute `inputOutputSamples` array at the specified `index`.
     * @param index specifies which `ReturnTesterSample` is removed from the attribute `inputOutputSamples` array
     * @returns the `ReturnTesterSample` that is removed from the attribute `inputOutputSamples` array 
     */
    removeInputOutputSample(index: int): ReturnTesterSample;

    /**
     * Used to run the sample inputs and expected outputs on the given `function`.
     * 
     * Information on the tests will be logged into the console and the method will also run the time method to provide the duration 
     * of the given `function`'s process.
     */
    run(): Promise<void>;
}

/**
 * The `LogTesterSample` is an object that defines an array of inputs and a array of outputs that is used to test a function.
 */
export type LogTesterSample = {
    inputs: any[],
    outputs: any[]
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
 *          console.log(num1);
 *          console.log(num2);
 *      }
 * 
 *      const sumTester = new ReturnTester(
 *          "Sum Tester",
 *          "tests the addNumbers function",
 *          addNumbers,
 *          [
 *              { inputs: [2, 5], output: [7, 2, 5] },
 *              { inputs: [7, 3], output: [10, 7, 3] },
 *              { inputs: [12, 7], output: [19, 12, 7] }
 *          ]
 *      );
 * 
 *      sumTester.run();
 * 
 * @extends {FunctionTester}
 */
export class LogTester extends FunctionTester {

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
     *          console.log(num1);
     *          console.log(num2);
     *      }
     * 
     *      const sumTester = new ReturnTester(
     *          "Sum Tester",
     *          "tests the addNumbers function",
     *          addNumbers,
     *          [
     *              { inputs: [2, 5], outputs: [7, 2, 5] },
     *              { inputs: [7, 3], outputs: [10, 7, 3] },
     *              { inputs: [12, 7], outputs: [19, 12, 7] }
     *          ]
     *      );
     * 
     *      sumTester.run();
     * 
     * @param name the name of the tester
     * @param description a description of what the tester is testing
     * @param func the function that is tested by the tester
     * @param inputOutputSamples an array of sample inputs and an array of outputs that are used to test the `function`
     * 
     * @extends {FunctionTester}
     */
    constructor(name: string, description: string, func: Function, inputOutputSamples: LogTesterSample[]);

    /**
     * Used to get the attribute `inputOutputSamples`.
     * @returns the value of the attribute `inputOutputSamples`.
     */
    getInputOutputSamples(): LogTesterSample[];

    /**
     * Used to get a `LogTesterSample` from `inputOutputSamples` array at the specified `index`.
     * @param index specifies which `LogTesterSample` to get from `inputOutputSamples` array
     * @returns the `LogTesterSample` at the specified `index` in the `inputOutputSamples` array
     */
    getInputOutputSample(index: int): LogTesterSample;

    /**
     * Used to set a new value of the attribute `inputOutputSamples`.
     * @param newInputOutputSamples the new value that is set to the attribute `inputOutputSamples`
     */
    setInputOutputSamples(newInputOutputSamples: LogTesterSample[]): void;

    /**
     * Used to set a new value of `LogTesterSample` at the specified `index` of the attribute `inputOutputSamples` array.
     * @param index specifies which `LogTesterSample` from the attribute `inputOutputSamples` array is assigned a new value 
     * @param newInputOutputSample the new value that is assigned to the `LogTesterSample` at the specified `index` of the attribute `inputOutputSamples` array
     */
    setInputOutputSample(index: int, newInputOutputSample: LogTesterSample): void;

    /**
     * Used to add a new `LogTesterSample` to the attribute `inputOutputSamples` array.
     * @param inputOutputSample the new `LogTesterSample` that is added to the end of the attribute `inputOutputSamples` array
     */
    addInputOutputSample(inputOutputSample: LogTesterSample): void;

    /**
     * Used to remove a `LogTesterSample` from the attribute `inputOutputSamples` array at the specified `index`.
     * @param index specifies which `LogTesterSample` is removed from the attribute `inputOutputSamples` array
     * @returns the `LogTesterSample` that is removed from the attribute `inputOutputSamples` array 
     */
    removeInputOutputSample(index: int): LogTesterSample;

    /**
     * Used to run the sample inputs and expected outputs on the given `function`.
     * 
     * Information on the tests will be logged into the console and the method will also run the time method to provide the duration 
     * of the given `function`'s process.
     */
    run(): Promise<void>;

    /**
     * Is used by the custom log function to pass the results to the tester
     * @param testNumber identifies which test the output must go to
     * @param output the output of the `function` 
     */
    result(testNumber: int, output: any): Promise<void>;
}

/**
 * The request methods that the route tester is capable of performing.
 */
export type RouteTesterMethods = "get" | "post" | "put" | "patch" | "delete";

/**
 * The `RouteTesterOutput` is an object that is used to define the expected output that is returned from a route that is tested
 * by an instance of the `RouteTester` constructor. The expected output is defined and is compared against the actual output returned 
 * by the tester to determine if the route pasted the test. 
 * 
 * There are two key information that is checked to determine if the route works as it is intended to do, these information include:
 * - data - the expected data that the route response with to the request
 * - status - the expected status of the response
 * 
 * The `data` property can have the value of anything, but the `status` property must have a value of `HttpStatusCode`.
 */
export type RouteTesterOutput = {
    data: any,
    status: HttpStatusCode
}

/**
 * The `RouteTest` is an object that defines various information that is used to test a route by a instance of the `RouteTester`
 * constructor.
 * 
 * The information that it defines include:
 * - `output` - the expected output from the tested route
 * - `body` - a object that is passed through the body during a request to the route
 * - `config` - a object that is passed through the config during a request to the route
 * - `querys` - a object that is passed through the querys during a request to the route
 * - `params` - a object that is passed through the params during a request to the route
 */
export type RouteTest = {
    output: RouteTesterOutput,
    body?: object | null,
    config?: AxiosRequestConfig | null,
    params?: object | null,
    querys?: object | null
}

/**
 * The `RouteTester` constructor is used to create objects that can run tests on a route of
 * a server. It has an array of tests that are instances of the `RouteTest` that are used to test a route.
 * 
 * The `RouteTester` is a child class of the `Tester` class that defined the attributes:
 * - `name` - the name of the tester
 * - `description` - a description of what the tester tests
 * 
 * The `RouteTester` defines the attributes:
 * - `url` - the url of the route the tester is testing
 * - `method` - the HTTP request method 
 * - `tests` - an array of route tests
 * 
 * The `RouteTester` defines the methods:
 * - getter methods
 * - setter methods
 * - run - which runs the tests on the route
 * 
 * When constructing a `RouteTester` you define the attributes `name`, `description`,
 * `url`, `method` and `tests`.
 * 
 * @example
 * 
 *      const routeTester = new RouteTester(
 *          "Route Tester", 
 *          "Tests the route",
 *          "http://example.url.com/:id/:name",
 *          RouteTesterMethods.GET,
 *          [
 *              { 
 *                  output: { 
 *                      data: {
 *                          id: 1,
 *                          name: "Jack",
 *                          age: 56
 *                      },
 *                      status: 200
 *                  },
 *                  body: { age: 56 },
 *                  config: { 
 *                      headers: { apiKey: "exampleKey" }
 *                  },
 *                  params: { 
 *                      id: 1,
 *                      name: "Jack"
 *                  },
 *                  querys: { name: "Jack" }
 *              },
 *              {
 *                  output: {
 *                      data: {
 *                          id: 2,
 *                          name: "John",
 *                          age: 34
 *                      },
 *                      status: 200
 *                  },
 *                  body: { age: 34 },
 *                  config: {
 *                      headers: { apiKey: "exampleKey" }
 *                  },
 *                  params: {
 *                      id: 2,
 *                      name: "John"
 *                  },
 *                  querys: { name: "John" }
 *              }
 *          ]
 *      );
 * 
 *      routeTester.run();
 * 
 * @extends Tester
 */
export class RouteTester extends Tester {

    /**
     * The `RouteTester` constructor is used to create objects that can run tests on a route of
     * a server. It has an array of tests that are instances of the `RouteTest` that are used to test a route.
     * 
     * The `RouteTester` is a child class of the `Tester` class that defined the attributes:
     * - `name` - the name of the tester
     * - `description` - a description of what the tester tests
     * 
     * The `RouteTester` defines the attributes:
     * - `url` - the url of the route the tester is testing
     * - `method` - the HTTP request method 
     * - `tests` - an array of route tests
     * 
     * The `RouteTester` defines the methods:
     * - getter methods
     * - setter methods
     * - run - which runs the tests on the route
     * 
     * When constructing a `RouteTester` you define the attributes `name`, `description`,
     * `url`, `method` and `tests`.
     * 
     * @example
     * 
     *      const routeTester = new RouteTester(
     *          "Route Tester", 
     *          "Tests the route",
     *          "http://example.url.com/:id/:name",
     *          RouteTesterMethods.GET,
     *          [
     *              { 
     *                  output: { 
     *                      data: {
     *                          id: 1,
     *                          name: "Jack",
     *                          age: 56
     *                      },
     *                      status: 200
     *                  },
     *                  body: { age: 56 },
     *                  config: { 
     *                      headers: { apiKey: "exampleKey" }
     *                  },
     *                  params: { 
     *                      id: 1,
     *                      name: "Jack"
     *                  },
     *                  querys: { name: "Jack" }
     *              },
     *              {
     *                  output: {
     *                      data: {
     *                          id: 2,
     *                          name: "John",
     *                          age: 34
     *                      },
     *                      status: 200
     *                  },
     *                  body: { age: 34 },
     *                  config: {
     *                      headers: { apiKey: "exampleKey" }
     *                  },
     *                  params: {
     *                      id: 2,
     *                      name: "John"
     *                   },
     *                  querys: { name: "John" }
     *              }
     *          ]
     *      );
     * 
     *      routeTester.run();
     * 
     * @param name a name given to the tester for identication
     * @param description describes what the tester is testing
     * @param url the url of the route that the tester is testing
     * @param method the HTTP request method that the tester will make to the route
     * @param tests an array of route tests
     * 
     * @extends Tester
     */
    constructor(name: string, description: string, url: string, method: RouteTesterMethods, tests: RouteTest[]);

    /**
     * Returns the `url` that is being tested.
     * @returns the url of the route that the tester is testing
     */
    getURL(): string;

    /**
     * Returns the HTTP request `method`.
     * @returns the HTTP request method that the tester will make to the route
     */
    getMethod(): RouteTesterMethods;

    /**
     * Returns an array of route tests.
     * @returns an array of route tests
     */
    getTests(): RouteTest[];

    /**
     * Returns the route test in array of `tests` at specified `index`.
     * @param index specifies which route test to get from the array of tests
     * @returns the route test at the specified index
     */
    getTest(index: int): RouteTest;

    /**
     * Sets a new `url` that is going to be tested.
     * @param newURL the new url of the route that will be tested by the tester
     */
    setURL(newURL: string): void;

    /**
     * Sets a new HTTP request `method` for the test. 
     * @param newMethod the new HTTP request method that the tester will make to the route
     */
    setMethod(newMethod: RouteTesterMethods): void;

    /**
     * Used to set an new array of route tests.
     * @param newTests the new array of route tests
     */
    setTests(newTests: RouteTest[]): void;

    /**
     * Used to set a new route test at specified `index`.
     * @param index specifies which route test will be set a new value
     * @param newTest the new route test at the specified index
     */
    setTest(index: int, newTest: RouteTest): void;

    /**
     * Used to add a new route test to the array of `tests`.
     * @param test the route test that will be pushed to the end of the array of `tests`
     */
    addTest(test: RouteTest): void;


    /**
     * Used to remove a route test from the array of `tests` at the specified `index`.
     * @param index specifies which route test will be removed from the array of `tests`
     * @returns the route test that was removed from the array of `tests`
     */
    removeTest(index: int): RouteTest;

    /**
     * The `run` method goes through the arrays of defined information using them to test the route defined by the `url` attribute using the define `method`.
     * 
     * Information of the test is logged into the console determining if the test resulted the expected output and if not it logs what the expected and actual
     * output was.
     * 
     * The `run` method also calls the `time` method that logs the duration to get a response from the route.
     */
    run(): Promise<void>;
}

/**
 * Used to specify whether to override an existing `Tester` that has the same name, if there is one.
 */
export type TesterManagerOptions = {
    override?: boolean | null
}

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
export class TesterManager {
    /**
     * Holds all the testers that are used to test code.
     */
    testers: object

    /**
     * Used to create a instance of the `RouteTester` constructor that is than pushed into the `testers` object.
     * @param name the name of the tester
     * @param description a description of what the tester tests
     * @param url the url of the route thet tester is testing
     * @param method the http request method the tester makes to the route
     * @param tests an array of the route tests
     * @param options a object that is used to specify if user wants to override an existing `Tester` with the same name in `testers` object
     */
    createRouteTester(name: string, description: string, url: string, method: RouteTesterMethods, tests: RouteTest[], options: TesterManagerOptions | undefined | null): void;

    /**
     * Used to create a instance of the `ReturnTester` constructor that is than pushed into the `testers` object.
     * @param name the name of the tester
     * @param description a description of what the tester tests
     * @param func the function that the tester is testing
     * @param inputOutputSamples an array of sample inputs and output used to test the `function`
     * @param options a object that is used to specify if user wants to override an existing `Tester` with the same name in `testers` object
     */
    createReturnTester(name: string, description: string, func: Function, inputOutputSamples: ReturnTesterSample[], options: TesterManagerOptions | undefined | null): void;

    /**
     * Used to create a instance of the `LogTester` constructor that is than pushed into the `testers` object.
     * @param name the name of the tester
     * @param description a description of what the tester tests
     * @param func the function that the tester is testing
     * @param inputOutputSamples an array of sample inputs and output used to test the `function`
     * @param options a object that is used to specify if user wants to override an existing `Tester` with the same name in `testers` object
     */
    createLogTester(name: string, description: string, func: Function, inputOutputSamples: LogTesterSample[], options: TesterManagerOptions | undefined | null): void;

    /**
     * Used to get a tester from the `testers` object using its name.
     * @param name the name of the tester to get
     */
    getTester(name: string): ReturnTester | ReturnTester | LogTester | undefined; 

    /**
     * Used to override an existing Tester with a `newTester` in the `testers` object.
     * @param newTester the new `Tester` which will override the existing `Tester`
     */
    override(newTester: RouteTester | ReturnTester | LogTester): void;

    /**
     * Used to push a tester into the `testers` object.
     * @param tester is pushed into the `testers` object
     */
    push(tester: RouteTester | ReturnTester | LogTester): void;

    /**
     * Used to remove a `Tester` from the `testers` object.
     * @param name the name of the `Tester` that will be removed
     */
    remove(name: string): RouteTester | ReturnTester | LogTester | undefined;

    /**
     * Holds the `console.log` function, used to reset the value of the `console.log` function.
     */
    originalLog(...data: any[]): void;

     /**
     * A custom log function used to replace the `console.log` function for the log testers.
     * @param output the output of a function that is logged to the console
     */
    log(...output: any[]): Promise<void>;

    /**
     * Loops through the `testers` running their tests, also handles the replacing and reseting of the `console.log` function.
     */
    run(): Promise<void>;
}

const testerManager: TesterManager = new TesterManager();

export default testerManager;