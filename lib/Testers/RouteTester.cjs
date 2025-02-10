const axios = require("axios");
const validator = require("@mitchell-collins/validator");
const Tester = require("./Tester.cjs");
const { arraysEqual, jsonsEqual, validateDefinedObject } = require("../utils.cjs"); 

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
module.exports = class RouteTester extends Tester {

    /**
     * The `url` of the route that is being tested.
     */
    #url;

    /**
     * The HTTP request `method` to the tested route.
     */
    #method;

    /**
     * An array of route tests.
     */
    #tests = [];
    
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
     * @param {String} name a name given to the tester for identication
     * @param {String} description describes what the tester is testing
     * @param {String} url the url of the route that the tester is testing
     * @param {RouteTesterMethods} method the HTTP request method that the tester will make to the route
     * @param {RouteTest[]} tests an array of route tests
     * 
     * @extends Tester
     */
    constructor(name, description, url, method, tests) {
        super(name, description);

        // validates inputs
        validator.checkUndefinedArray([url, method, tests], ["url", "method", "tests"]);
        validator.checkDataTypeArray([url, method], ["url", "method"], "string");
        this.#checkHTTPMethod(method);
        validator.checkIsArray(tests, "tests");

        this.#checkIsRouteTests(tests, "tests");

        this.#url = url;
        this.#method = method;
    
        // gives the tests properties a default value of {} if undefined or null
        for (let i = 0; i < tests.length; i++) {
            let { output, body, config, params, querys } = tests[i];

            body = body === undefined || body === null ? {} : body;
            config = config === undefined || config === null ? {} : config;
            params = params === undefined || params === null ? {} : params;
            querys = querys === undefined || querys === null ? {} : querys;

            this.#tests.push({
                output: output,
                body: body,
                config: config,
                params: params,
                querys: querys
            });
        }
    }

    /**
     * Returns the `url` that is being tested.
     * @returns {String} the url of the route that the tester is testing
     */
    getURL() {
        return this.#url;
    }

    /**
     * Returns the HTTP request `method`.
     * @returns {RouteTesterMethods} the HTTP request method that the tester will make to the route
     */
    getMethod() {
        return this.#method;
    }

    /**
     * Returns an array of route tests.
     * @returns {RouteTest[]} an array of route tests
     */
    getTests() {
        return this.#tests;
    }

    /**
     * Returns the route test in array of `tests` at specified `index`.
     * @param {Int} index specifies which route test to get from the array of tests
     * @returns {RouteTest} the route test at the specified index
     */
    getTest(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#tests, "tests", index);

        return this.#tests[index];
    }

    /**
     * Sets a new `url` that is going to be tested.
     * @param {String} newURL the new url of the route that will be tested by the tester
     */
    setURL(newURL) {
        validator.checkUndefined(newURL, "newURL");
        validator.checkDataType(newURL, "newURL", "string");
        this.#url = newURL;
    }

    /**
     * Sets a new HTTP request `method` for the test. 
     * @param {RouteTesterMethods} newMethod the new HTTP request method that the tester will make to the route
     */
    setMethod(newMethod) {
        validator.checkUndefined(newMethod, "newMethod");
        validator.checkDataType(newMethod, "newMethod", "string");
        this.#checkHTTPMethod(newMethod);

        this.#method = newMethod;
    }

    /**
     * Used to set an new array of route tests.
     * @param {RouteTest[]} newTests the new array of route tests
     */
    setTests(newTests) {
        validator.checkUndefined(newTests, "newTests");
        validator.checkIsArray(newTests, "newTests");
        this.#checkIsRouteTests(newTests, "newTests");

        this.#tests = newTests;
    }

    /**
     * Used to set a new route test at specified `index`.
     * @param {Int} index specifies which route test will be set a new value
     * @param {RouteTest} newTest the new route test at the specified index
     */
    setTest(index, newTest) {
        validator.checkUndefinedArray([index, newTest], ["index", "newTest"]);
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#tests, "tests", index);
        this.#checkIsRouteTest(newTest, "newTest");

        this.#tests[index] = newTest;
    }

    /**
     * Used to add a new route test to the array of `tests`.
     * @param {RouteTest} test the route test that will be pushed to the end of the array of `tests`
     */
    addTest(test) {
        validator.checkUndefined(test, "test");
        this.#checkIsRouteTest(test, "test");
        this.#tests.push(test);
    }

    /**
     * Used to remove a route test from the array of `tests` at the specified `index`.
     * @param {Int} index specifies which route test will be removed from the array of `tests`
     * @returns {RouteTest} the route test that was removed from the array of `tests`
     */
    removeTest(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#tests, "tests", index);
        
        return this.#tests.splice(index, 1)[0];
    }

    /**
     * Checks if defined `method` is a HTTP method. If not a error is thrown.
     * @param {String} method the define method that will be check is a HTTP request method
     */
    #checkHTTPMethod(method) {
        if (!["get", "post", "put", "patch", "delete"].includes(method)) throw new Error(
            "The method must be either a get, post, put, patch or delete method"
        );
    }

    /**
     * Used to check if a provided test fulfills the requirements to be a `RouteTest`.
     * @param {object} object the object that is check to be the a `RouteTest`
     * @param {String} objectName the name of the `object` used when throwing an error
     */
    #checkIsRouteTest(object, objectName) {
        const { output, body, config, params, querys } = object;

        if (output === undefined)
            throw new Error(`${objectName} argument is missing property .output: RouteTesterOutput`);

        if (output.data === undefined) 
            throw new Error(`${objectName} argument is missing property .output.data: any`);

        if (output.status === undefined)
            throw new Error(`${objectName} argument is missing property .output.status: HttpStatusCode`);

        validator.checkIsHttpStatusCode(output.status, `${objectName}.output.status`);

        validateDefinedObject(body, `${objectName}.body`);
        validateDefinedObject(config, `${objectName}.config`);
        validateDefinedObject(params, `${objectName}.params`);
        validateDefinedObject(querys, `${objectName}.querys`);
    }

    /**
     * Used to check a array of objects fulfill the requirements to be a `RouteTest`.
     * @param {object[]} objects an array of objects that are check if they fulfill being a `RouteTest`
     * @param {String[]} argumentName the name of the argument where the array of `objects` was provided, used when error is thrown
     */
    #checkIsRouteTests(objects, argumentName) {
        // checks if each test has the structure of type RouteTest
        objects.forEach((object, index) => {
            this.#checkIsRouteTest(object, `${argumentName}[${index}]`);
        });
    }

    /**
     * Replaces the param placeholders in a `url` with the define value of that param and returns the modified url.
     * @param {String} url the url of the route that the tester is testing
     * @param {object} params the object that will be passed through the params during the test request
     * @returns {String} the modified url with the placeholders being replaced with the values
     */
    #replaceParamPlaceHolders(url, params) {
        // loops through each query in the querys object
        Object.entries(params).forEach(([key, value]) => {

            // checks if query was in url
            if (!this.#url.includes(":" + key)) throw new Error(
                `${this.getName()} test url doesn't contain query: ${key}`
            );

            // gets the start index of query in url string
            const queryStartIndex = url.indexOf(":" + key);

            // gets the substring before the query placeholder
            let tempURL = url.slice(0, queryStartIndex);

            // switches placeholder with value
            tempURL += value;
            
            // gets the substring after the query placeholder
            tempURL += url.slice(queryStartIndex + key.length + 1, url.length);

            url = tempURL;
        });

        return url;
    }

    /**
     * Used to add `querys` to the end of a defined `url` and returns the modified url.
     * @param {String} url the url of the route that the tester is testing
     * @param {object} querys a object that will be passed through the querys during the test request
     * @returns {String} the modified url with the querys intergrated into the url
     */
    #intergrateQueryURL(url, querys) {
        Object.entries(querys).forEach(([key, value], index) => {
            // checks if it is the first param
            url += (index === 0 ? "?" : "&");

            url += key + "=" + value;
        });

        return url;
    }

    /**
     * The `run` method goes through the arrays of defined information using them to test the route defined by the `url` attribute using the define `method`.
     * 
     * Information of the test is logged into the console determining if the test resulted the expected output and if not it logs what the expected and actual
     * output was.
     * 
     * The `run` method also calls the `time` method that logs the duration to get a response from the route.
     */
    async run() {
        // logs information
        console.log(`\nRunning ${this.getName()} used to ${this.getDescription()}:`);
        
        // loops through each test
        for (let i = 0; i < this.#tests.length; i++) {
            let requestURL = this.#url;
            const currentTest = this.#tests[i];

            // checks if there are params
            if (Object.keys(currentTest.params).length > 0) {
                requestURL = this.#replaceParamPlaceHolders(requestURL, currentTest.params);
            }

            // checks if there are querys
            if (Object.keys(currentTest.querys).length > 0) {
                requestURL = this.#intergrateQueryURL(requestURL, currentTest.querys);
            }

            // makes test request
            let response;
            const startTime = new Date().getTime();

            // checks if it is a get or delete request 
            // this is done as the get and delete requests don't have a data argument
            if (this.#method === "get" || this.#method === "delete") {
                response = await axios[this.#method](requestURL, currentTest.config);

            } else {
                response = await axios[this.#method](requestURL, currentTest.body, currentTest.config);
            }

            const { data, status } = response;
            const { data: expectedData, status: expectedStatus } = currentTest.output;

            // checks if the actual output was equal to the expected output
            if (
                data === expectedData || jsonsEqual(data, expectedData) || arraysEqual(data, expectedData) &&
                status === expectedStatus
            ) {
                console.log(`   - Passed Test ${i + 1} ✅`);

            } else {
                console.log(`   - Failed Test ${i + 1} ❌`);

                // logs data info if expected data and actual data aren't equal
                if (data !== expectedData && !jsonsEqual(data, expectedData) && !arraysEqual(data, expectedData)) {
                    console.log("       Expected Data Output: " , expectedData);
                    console.log("       Actual Data Output: " , data);
                } 
                
                // logs status info if expected status and actual status aren't equal
                if (status !== expectedStatus) {
                    console.log("       Expected Status Output: " , expectedStatus);
                    console.log("       Actual Status Output: " , status);
                }
            }

            // calculates and logs duration of route
            if (i === this.#tests.length - 1) {
                const endTime = new Date().getTime();
                console.log("   - Duration: " + (endTime - startTime) + "ms");
            }
        }  
    }
}