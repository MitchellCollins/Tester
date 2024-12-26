import axios, { HttpStatusCode } from "axios";
import validator from "@mitchell-collins/validator";
import Tester from "./Tester.js";

/**
 * The `RouteTesterMethods` is an object that defines the methods that an instance of the `RouteTester` constructor is able to make to
 * a route for testing.
 * 
 * @typedef {object} RouteTesterMethods
 * @property {"get"} Get - the get request method
 * @property {"post"} POST - the post request method
 * @property {"patch"} PATCH - the patch request method
 * @property {"put"} PUT - the put request method
 * @property {"delete"} DELETE - the delete request method
 */
const RouteTesterMethods = {
    GET: "get",
    POST: "post",
    PATCH: "patch",
    PUT: "put",
    DELETE: "delete"
};

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
 * 
 * ```
 * RouteTesterOutput = {
 *  data: *,
 *  status: HttpStatusCode
 * }
 * ```
 * 
 * @param {*} data the expected data that the route response with to the request
 * @param {HttpStatusCode} status the expected status of the response
 * @returns {RouteTesterOutput} an object that is used to define the expected output that is returned from a route that is tested by an instance of the `RouteTester` constructor
 */
function RouteTesterOutput(data, status) {
    validator.checkUndefinedArray([data, status], ["data", "status"]);
    validator.checkDataType(status, "status", "number");
    validator.checkIsHttpStatusCode(status, "status");
    
    this.data = data;
    this.status = status;
}

/**
 * The `RouteTester` constructor is used to create objects that can run tests on a route of
 * a server. The objects make multiply tests to the route and for each test new values are
 * passed through the request with the new values being assigned at each index of the arrays 
 * for the multiply attributes, these include `outputs`, `bodys`, `configs`, `params` and 
 * `querys`. 
 * 
 * The `RouteTester` is a child class of the `Tester` class that defined the attributes:
 * - `name` - the name of the tester
 * - `description` - a description of what the tester tests
 * 
 * The `RouteTester` defines the attributes:
 * - `url` - the url of the route the tester is testing
 * - `method` - the HTTP request method 
 * - `outputs` - an array of the expected response from route for each test
 * - `bodys` - an array of objects that are passed through the body for each test
 * - `configs` - an array of objects that are passed through the config for each test
 * - `params` - an array of objects that are passed through the params for each test
 * - `querys` - an array of objects that are passed through the querys for each test
 * 
 * The `RouteTester` defines the methods:
 * - getter methods
 * - setter methods
 * - run - which runs the tests on the route
 * - time - which gets the duration of request to response from route
 * 
 * When constructing a `RouteTester` you define the attributes `name`, `description`,
 * `url`, `method` and `outputs`. You then define the other attributes through the use
 * of the setter methods.
 * 
 * Example:
 * 
 *      const routeTester = new RouteTester(
 *          "Route Tester", 
 *          "Tests the route",
 *          "http://example.url.com/:id/:name",
 *          "get",
 *          [
 *              {
 *                  data: {
 *                      id: 0,
 *                      name: "Jack",
 *                      age: 56
 *                  },
 *                  status: 200
 *              },
 *              {
 *                  data: {
 *                      id: 1,
 *                      name: "John",
 *                      age: 34
 *                  },
 *                  status: 200
 *              }
 *          ]
 *      );
 *      
 *      // defines bodys
 *      routeTester.setBodys([
 *          {
 *              age: 56
 *          },
 *          {
 *              age: 34
 *          }
 *      ]);
 * 
 *      // defines configs
 *      routeTester.setConfigs([
 *          {
 *              Header: {
 *                  apiKey: "exampleKey"
 *              }
 *          },
 *          {
 *              Header: {
 *                  apiKey: "exampleKey"
 *              }
 *          }
 *      ]);
 * 
 *      // defines params
 *      routeTester.setParams([
 *          {
 *              id: 0,
 *              name: "Jack"
 *          },
 *          {
 *              id: 1,
 *              name: "John"
 *          }
 *      ]);
 * 
 *      // defines querys
 *      routeTester.setQuerys([
 *          {
 *              name: "Jack"
 *          },
 *          {
 *              name: "John"
 *          }
 *      ]);
 * 
 *      routeTester.run();
 * 
 * @extends Tester
 */
class RouteTester extends Tester {

    /**
     * The `url` of the route that is being tested.
     */
    #url;

    /**
     * The HTTP request `method` to the tested route.
     */
    #method;

    /**
     * An array of the expected response from route for each test.
     */
    #outputs;

    /**
     * An array of objects that are passed through the body for each test.
     */
    #bodys = [];

    /**
     * An array of objects that are passed through the config for each test.
     */
    #configs = [];

    /**
     * An array of objects that are passed through the params for each test.
     */
    #params = [];

    /**
     * An array of objects that are passed through the querys for each test.
     */
    #querys = [];
    
    /**
     * The `RouteTester` constructor is used to create objects that can run tests on a route of
     * a server. The objects make multiply tests to the route and for each test new values are
     * passed through the request with the new values being assigned at each index of the arrays 
     * for the multiply attributes, these include `outputs`, `bodys`, `configs`, `params` and 
     * `querys`. 
     * 
     * The `RouteTester` is a child class of the `Tester` class that defined the attributes:
     * - `name` - the name of the tester
     * - `description` - a description of what the tester tests
     * 
     * The `RouteTester` defines the attributes:
     * - `url` - the url of the route the tester is testing
     * - `method` - the HTTP request method 
     * - `outputs` - an array of the expected response from route for each test
     * - `bodys` - an array of objects that are passed through the body for each test
     * - `configs` - an array of objects that are passed through the config for each test
     * - `params` - an array of objects that are passed through the params for each test
     * - `querys` - an array of objects that are passed through the querys for each test
     * 
     * The `RouteTester` defines the methods:
     * - getter methods
     * - setter methods
     * - run - which runs the tests on the route
     * - time - which gets the duration of request to response from route
     * 
     * When constructing a `RouteTester` you define the attributes `name`, `description`,
     * `url`, `method` and `outputs`. You then define the other attributes through the use
     * of the setter methods.
     * 
     * Example:
     * 
     *      const routeTester = new RouteTester(
     *          "Route Tester", 
     *          "Tests the route",
     *          "http://example.url.com/:id/:name",
     *          "get",
     *          [
     *              {
     *                  id: 0,
     *                  name: "Jack",
     *                  age: 56
     *              },
     *              {
     *                  id: 1,
     *                  name: "John",
     *                  age: 34
     *              }
     *          ]
     *      );
     *      
     *      // defines bodys
     *      routeTester.setBodys([
     *          {
     *              age: 56
     *          },
     *          {
     *              age: 34
     *          }
     *      ]);
     * 
     *      // defines configs
     *      routeTester.setConfigs([
     *          {
     *              Header: {
     *                  apiKey: "exampleKey"
     *              }
     *          },
     *          {
     *              Header: {
     *                  apiKey: "exampleKey"
     *              }
     *          }
     *      ]);
     * 
     *      // defines params
     *      routeTester.setParams([
     *          {
     *              id: 0,
     *              name: "Jack"
     *          },
     *          {
     *              id: 1,
     *              name: "John"
     *          }
     *      ]);
     * 
     *      // defines querys
     *      routeTester.setQuerys([
     *          {
     *              name: "Jack"
     *          },
     *          {
     *              name: "John"
     *          }
     *      ]);
     * 
     *      routeTester.run();
     * 
     * @param {String} name a name given to the tester for identication
     * @param {String} description describes what the tester is testing
     * @param {String} url the url of the route that the tester is testing
     * @param {RouteTesterMethods} method the HTTP request method that the tester will make to the route
     * @param {Array<RouteTesterOutput>} outputs an array of the expected response from the route for each test
     * 
     * @extends Tester
     */
    constructor(name, description, url, method, outputs) {
        validator.checkUndefinedArray([url, method, outputs], ["url", "method", "outputs"]);
        validator.checkDataTypeArray([url, method], ["url", "method"], "string");

        super(name, description);

        this.#checkHTTPMethod(method);
        validator.checkIsArray(outputs, "outputs");
        const outputNames = this.#createObjectNames("output", outputs.length);
        validator.checkDataTypeArray(outputs, outputNames, "object");
        validator.checkObjectStructureArray(outputs, outputNames, {
            data: "*",
            status: new Number
        });

        this.#url = url;
        this.#method = method;
        this.#outputs = outputs;
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
     * Returns an array of the expected `outputs` of the tests.
     * @returns {Array<RouteTesterOutput>} an array of the expected response from the route for each test
     */
    getOutputs() {
        return this.#outputs;
    }

    /**
     * Returns the expected output for the test at specified `index`.
     * @param {Int} index specifies which expected response to get from the array of outputs
     * @returns {RouteTesterOutput} the expected response from the route from the test at the specified index
     */
    getOutput(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#outputs, "outputs", index);

        return this.#outputs[index];
    }

    /**
     * Returns an array of the bodys for each test.
     * @returns {Array<object>} an array of objects that will be passed through the body for each test request
     */
    getBodys() {
        return this.#bodys;
    }

    /**
     * Returns the body for the test at specified `index`.
     * @param {Int} index specifies which body to get from the array of bodys
     * @returns {object} a object at the specified index that will be passed through the body during a test request
     */
    getBody(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#bodys, "bodys", index);

        return this.#bodys[index];
    }

    /**
     * Returns an array of the configs for each test.
     * @returns {Array<AxiosRequestConfig>} an array of objects that will be passed through the configs for each test request
     */
    getConfigs() {
        return this.#configs;
    }

    /**
     * Returns the config for the test at specified `index`.
     * @param {Int} index specifies which config to get from the array of configs
     * @returns {AxiosRequestConfig} a object at the specified index that will be passed through the config during a test request
     */
    getConfig(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#configs, "configs", index);

        return this.#configs[index];
    }

    /**
     * Returns an array of the params for each test.
     * @returns {Array<object>} an array of objects that will be passed through the params for each test request
     */
    getParams() {
        return this.#params;
    }

    /**
     * Returns the params for the test at specified `index`.
     * @param {Int} index specifies which params to get from the array of params 
     * @returns {object} a object at the specified index that will be passed through the params during a test request
     */
    getParam(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#params, "params", index);

        return this.#params[index];
    }

    /**
     * Returns an array of the querys for each test.
     * @returns {Array<object>} an array of objects that will be passed through the querys for each test request
     */
    getQuerys() {
        return this.#querys;
    }

    /**
     * Returns the querys for the test at specified `index`.
     * @param {Int} index specifies which querys to get from the array of querys
     * @returns {object} a object at the specified index that will be passed through the querys during a test request
     */
    getQuery(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#querys, "querys", index);

        return this.#querys[index];
    }

    /**
     * Sets a new `url` that is going to be tested.
     * @param {String} newURL the new url of the route that will be tested by the tester
     */
    setURL(newURL) {
        validator.checkUndefined(url, "url");
        validator.checkDataType(url, "url", "string");
        this.#url = newURL;
    }

    /**
     * Sets a new HTTP request `method` for the test. 
     * @param {RouteTesterMethods} newMethod the new HTTP request method that the tester will make to the route
     */
    setMethod(newMethod) {
        validator.checkUndefined(newMethod, "newMethod");
        validator.checkDataType(newMethod, "newMethod", "string");
        this.#checkHTTPMethod(method);

        this.#method = newMethod;
    }

    /**
     * Used to set an new array of expected `outputs` of each test.
     * @param {Array<RouteTesterOutput>} newOutputs the new array of expected response from the route for each test
     */
    setOutputs(newOutputs) {
        validator.checkUndefined(newOutputs, "newOutputs");
        validator.checkIsArray(newOutputs, "newOutputs");
        const outputNames = this.#createObjectNames("output", outputs.length);
        validator.checkDataTypeArray(outputs, outputNames, "object");
        validator.checkObjectStructureArray(outputs, outputNames, {
            data: "*",
            status: new Number
        });

        this.#outputs = newOutputs;
    }

    /**
     * Used to set a new value of expected `output` at specified `index`.
     * @param {Int} index specifies which expected response will be set a new value
     * @param {RouteTesterOutput} newOutput the new expected response from the route for the test at the specified index
     */
    setOutput(index, newOutput) {
        validator.checkUndefinedArray([index, newOutput], ["index", "newOutput"]);
        validator.checkDataType(index, "index", "number");
        validator.checkDataType(newOutput, "newOutput", "object");
        validator.checkIndexRange(this.#outputs, "outputs", index);
        validator.checkObjectStructure(newOutput, "newOutput", {
            data: "*",
            status: new Number
        });

        this.#outputs[index] = newOutput;
    }

    /**
     * Used to add a new expected output to the array of expected `outputs`.
     * @param {RouteTesterOutput} addedOutput the expected response that will be pushed to the end of the array of outputs
     */
    addOutput(addedOutput) {
        validator.checkUndefined(addedOutput, "addedOutput");
        this.#outputs.push(addedOutput);
    }

    /**
     * Used to remove a expected output from the array of expected `outputs` at the specified `index`.
     * @param {Int} index specifies which expected response from the route will be removed from the array of outputs
     * @returns {RouteTesterOutput} the expected response from the route that was removed from the array of outputs
     */
    removeOutput(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#outputs, "outputs", index);
        
        return this.#outputs.splice(index, 1)[0];
    }

    /**
     * Used to set a new array of `bodys` for each test.
     * @param {Array<object>} newBodys the new array of objects that will be passed through the body for each test request
     */
    setBodys(newBodys) {
        validator.checkUndefined(newBodys, "newBodys");
        validator.checkIsArray(newBodys, "newBodys");
        const bodyNames = this.#createObjectNames("Body", newBodys.length);
        validator.checkDataTypeArray(newBodys, bodyNames, "object");
        
        this.#bodys = newBodys;
    }

    /**
     * Used to set a new value of `body` at specified `index`.
     * @param {Int} index specifies which object in the array of bodys will have a new value set
     * @param {object} newBody the new object that will be passed through the body during a test request at the specified index
     */
    setBody(index, newBody) {
        validator.checkUndefinedArray([index, newBody], ["index", "newBody"]);
        validator.checkDataType(index, "index", "number");
        validator.checkDataType(newBody, "newBody", "object");
        validator.checkIndexRange(this.#bodys, "bodys", index);

        this.#bodys[index] = newBody;
    }

    /**
     * Used to add a new `body` to the array of `bodys`.
     * @param {object} addedBody a object that will be pushed to the end of the array of bodys
     */
    addBody(addedBody) {
        validator.checkUndefined(addedBody, "addedBody");
        validator.checkDataType(addedBody, "addedBody", "object");
        this.#bodys.push(addedBody);
    }

    /**
     * Used to add properties to the `body` at the specified `index`.
     * @param {Int} index specifies which object in the array of bodys will recieve the added properties
     * @param {object} addedProperties a object that defines properties that will be added to an existing object at the specified index
     */
    addBodyProperties(index, addedProperties) {
        validator.checkUndefinedArray([index, addedProperties], ["index", "addedProperties"]);
        validator.checkDataType(index, "index", "number");
        validator.checkDataType(addedProperties, "addedProperties", "object");
        validator.checkIndexRange(this.#bodys, "bodys", index);

        // adds properties to body object in array
        this.#bodys[index] = this.#combineObjects(this.#bodys[index], addedProperties);
    }

    /**
     * Used to remove a `body` at the specified `index`.
     * @param {Int} index specifies which object will be removed from the array of bodys
     * @returns {object} the object that was removed from the array of bodys
     */
    removeBody(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#bodys, "bodys", index);

        return this.#bodys.splice(index, 1)[0];
    }

    /**
     * Used to remove a property from a `body` at the specified `index`.
     * @param {Int} index specifies which object in the array of bodys will have a property removed 
     * @param {String} key specifies which property to be removed
     * @returns {object} a object with the property that was removed
     */
    removeBodyProperty(index, key) {
        validator.checkUndefinedArray([index, key], ["index", "key"]);
        validator.checkDataType(index, "index", "number");
        validator.checkDataType(key, "key", "string");
        validator.checkIndexRange(this.#bodys, "bodys", index);

        // saves property into variable so that it can be return after it is delete from the original object
        const removedProperty = {
            [key]: this.#bodys[index][key]
        }

        // deletes the property from the object at an index in array
        delete this.#bodys[index][key];

        return removedProperty;
    }

    /**
     * Used to set a new array of `configs` for each test.
     * @param {Array<AxiosRequestConfig>} newConfigs a new array of objects that are passed through the config for each test request
     */
    setConfigs(newConfigs) {
        validator.checkUndefined(newConfigs, "newConfigs");
        validator.checkIsArray(newConfigs, "newConfigs");
        const configNames = this.#createObjectNames("Config", newConfigs.length);
        validator.checkDataTypeArray(newConfigs, configNames, "object");
        
        this.#configs = newConfigs;
    }

    /**
     * Used to set a new value of `config` at the specified `index`.
     * @param {Int} index specifies which config in the array of configs will have a new value set
     * @param {AxiosRequestConfig} newConfig the new value that is set at the specified index of the configs array
     */
    setConfig(index, newConfig) {
        validator.checkUndefinedArray([index, newConfig], ["index", "newCofig"]);
        validator.checkDataType(index, "index", "number");
        validator.checkDataType(newConfig, "newConfig", "object");
        validator.checkIndexRange(this.#configs, "configs", index);

        this.#configs[index] = newConfig;
    }

    /**
     * Used to add a new `config` to the array of `configs`.
     * @param {AxiosRequestConfig} addedConfig the new object that is pushed to the end of the array of configs
     */
    addConfig(addedConfig) {
        validator.checkUndefined(addedConfig, "addedConfig");
        validator.checkDataType(addedConfig, "addedConfig", "object");
        this.#configs.push(addedConfig);
    }

    /**
     * Used to remove a `config` at the specified `index`.
     * @param {Int} index specifies which object is removed from the array of configs
     * @returns {AxiosRequestConfig} the object that was removed from the array of configs
     */
    removeConfig(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#configs, "configs", index);

        return this.#configs.splice(index, 1)[0];
    }

    /**
     * Used to set a new value for the array of `params`.
     * @param {Array<object>} newParams a new array of objects that are passed through the params for each test request
     */
    setParams(newParams) {
        validator.checkUndefined(newParams, "newParams");
        validator.checkIsArray(newParams, "newParams");
        const paramNames = this.#createObjectNames("Params", newParams.length);
        validator.checkDataTypeArray(newParams, paramNames, "object");
        
        this.#params = newParams;
    }

    /**
     * Used to set a new value for `params` at the specified `index`.
     * @param {Int} index specifies which object in the array of params will have a new value set
     * @param {object} newParam the new value that will be set to the specified index of the params array
     */
    setParam(index, newParam) {
        validator.checkUndefinedArray([index, newParam], ["index", "newParam"]);
        validator.checkDataType(index, "index", "number");
        validator.checkDataType(newParam, "newParam", "object");
        validator.checkIndexRange(this.#params, "params", index);

        this.#params[index] = newParam;
    }

    /**
     * Used to add new `params` to the array of `params`.
     * @param {object} addedParams a object that will be pushed to the end of the params array
     */
    addParams(addedParams) {
        validator.checkUndefined(addedParams, "addedParams");
        validator.checkDataType(addedParams, "addedParams", "object");
        this.#params.push(addedParams);
    }

    /**
     * Used to add properties to `params` at the specified `index`.
     * @param {Int} index specifies which object in the params array will recieve the added properties 
     * @param {object} addedProperties a object of the properties that will be combined with the existing object at the specified index
     */
    addParamProperties(index, addedProperties) {
        validator.checkUndefinedArray([index, addedProperties], ["index", "addedProperties"]);
        validator.checkDataType(index, "index", "number");
        validator.checkDataType(addedProperties, "addedProperties", "object");
        validator.checkIndexRange(this.#params, "params", index);

        this.#params[index] = this.#combineObjects(this.#params[index], addedProperties);
    }

    /**
     * Used to remove `params` at the specified `index`.
     * @param {Int} index specifies which object in the params array will be removed
     * @returns {object} the object that was removed from the params array
     */
    removeParams(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#params, "params", index);

        return this.#params.splice(index, 1)[0];
    }

    /**
     * Used to remove property from `params` at the specified `index`.
     * @param {Int} index specifies which object in the params array will have the property removed from
     * @param {String} key specifies which property that will be removed from the object
     * @returns {object} a object with the property that was removed
     */
    removeParamProperty(index, key) {
        validator.checkUndefinedArray([index, key], ["index", "key"]);
        validator.checkDataType(index, "index", "number");
        validator.checkDataType(key, "key", "string");
        validator.checkIndexRange(this.#params, "params", index);

        // saves property into variable so that it can be return after it is delete from the original object
        const removedProperty = {
            [key]: this.#params[index][key]
        }

        // deletes the property from the object
        delete this.#params[index][key];

        return removedProperty;
    }

    /**
     * Used to set a new array of `querys` for each test.
     * @param {Array<object>} newQuerys a new array of objects that will be passed through the querys for each test request
     */
    setQuerys(newQuerys) {
        validator.checkUndefined(newQuerys, "newQuerys");
        validator.checkIsArray(newQuerys, "newQuerys");
        const queryNames = this.#createObjectNames("Querys", newQuerys.length);
        validator.checkDataTypeArray(newQuerys, queryNames, "object");

        this.#querys = newQuerys;
    }

    /**
     * Used to set a new value of `querys` at the specified `index`.
     * @param {Int} index specifies which object in the querys array will have a new value set
     * @param {object} newQuery the new value that will be set at the specified index in the querys array
     */
    setQuery(index, newQuery) {
        validator.checkUndefinedArray([index, newQuery], ["index", "newQuery"]);
        validator.checkDataType(index, "index", "number");
        validator.checkDataType(newQuery, "newQuery", "object");
        validator.checkIndexRange(this.#querys, "querys", index);

        this.#querys[index] = newQuery;
    }

    /**
     * Used to add `querys` to the array of `querys`.
     * @param {object} addedQuery a object that will be pushed to the end of the querys array
     */
    addQuery(addedQuery) {
        validator.checkUndefined(addedQuery, "addedQuery");
        validator.checkDataType(addedQuery, "addedQuery", "object");
        this.#querys.push(addedQuery);
    }

    /**
     * Used to add properties to the `querys` at the specified `index`.
     * @param {Int} index specifies which object in the querys array will recieve the added properties
     * @param {object} addedProperties a object with properties that will be combined to an existing object at the specified index
     */
    addQueryProperties(index, addedProperties) {
        validator.checkUndefinedArray([index, addedProperties], ["index", "addedProperties"]);
        validator.checkDataType(index, "index", "number");
        validator.checkDataType(addedProperties, "addedProperties", "object");
        validator.checkIndexRange(this.#querys, "querys", index);

        this.#querys[index] = this.#combineObjects(this.#querys[index], addedProperties);
    }

    /**
     * Used to remove `querys` at the specified `index`.
     * @param {Int} index specifies which object in the querys array that will be removed
     * @returns {object} the object that was removed from the querys array
     */
    removeQuery(index) {
        validator.checkUndefined(index, "index");
        validator.checkDataType(index, "index", "number");
        validator.checkIndexRange(this.#querys, "querys", index);

        return this.#querys.splice(index, 1)[0];
    }

    /**
     * Used to remove a property from `querys` at the specified `index`.
     * @param {Int} index specifies which object in the querys array will have the property removed from
     * @param {String} key specifies which property that will be removed
     * @returns {object} a object with the property that was removed
     */
    removeQueryProperty(index, key) {
        validator.checkUndefinedArray([index, key], ["index", "key"]);
        validator.checkDataType(index, "index", "number");
        validator.checkDataType(key, "key", "string");
        validator.checkIndexRange(this.#querys, "querys", index);

        // saves property into variable so that it can be return after it is delete from the original object
        const removedProperty = {
            [key]: this.#querys[index][key]
        }

        // deletes the property from the object
        delete this.#querys[index][key];

        return removedProperty;
    }

    /**
     * Combines `object1` and `object2` and returns the combination of the two objects.
     * @param {object} object1 
     * @param {object} object2 
     * @returns {object} the combination of object1 and object2
     */
    #combineObjects(object1, object2) {
        return {
            ...object1,
            ...object2
        }
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
     * Creates an array of object names for each object in an array used to determine which object in array didn't fullfill requirements during validation.
     * @param {String} name a name that will be given to each object followed by their index
     * @param {Int} length the length of the array of objects
     * @returns {Array<String>} an array of object names
     */
    #createObjectNames(name, length) {
        let names = [];
        
        for (let i = 0; i < length; i++) {
            names.push(`${name}${i}`);
        }

        return names;
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
        for (let i = 0; i < this.#outputs.length; i++) {

            let requestURL = this.#url;

            // checks if there are params
            if (this.#params[i] !== undefined && Object.keys(this.#params[i]).length > 0) {
                requestURL  = this.#replaceParamPlaceHolders(requestURL, this.#params[i]);
            }

            // checks if there are query
            if (this.#querys[i] !== undefined && Object.keys(this.#querys[i]).length > 0) {
                requestURL = this.#intergrateQueryURL(requestURL, this.#querys[i]);
            }

            // makes test request
            let response;

            // checks if it is a get or delete request 
            // this is done as the get and delete requests don't have a data argument
            if (this.#method === "get" || this.#method === "delete") {
                response = await axios[this.#method](requestURL, this.#configs[i] || undefined);

            } else {
                response = await axios[this.#method](requestURL, this.#bodys[i] || {}, this.#configs[i] || undefined);
            }

            const { data, status } = response;
            const { data: expectedData, status: expectedStatus } = this.#outputs[i];

            // checks if the actual output was equal to the expected output
            if (
                data === expectedData || typeof data === "object" && JSON.stringify(data) === JSON.stringify(expectedData) &&
                status === expectedStatus
            ) {
                console.log(`   - Passed Test ${i + 1} ✅`);

            } else {
                console.log(`   - Failed Test ${i + 1} ❌`);

                // logs data info if expected data and actual data aren't equal
                if (data !== expectedData && typeof data === "object" && JSON.stringify(data) !== JSON.stringify(expectedData)) {
                    console.log("       Expected Data Output: " , expectedData);
                    console.log("       Actual Data Output: " , data);
                } 
                
                // logs status info if expected status and actual status aren't equal
                if (status !== expectedStatus) {
                    console.log("       Expected Status Output: " , expectedStatus);
                    console.log("       Actual Status Output: " , status);
                }
            }
        }  
        
        this.time();
    }

    /**
     * The `time` method logs the duration to get a response from the determined route in the console.
     */
    async time() {
        const startTime = new Date().getTime();

        let requestURL = this.#url;

        // checks if there are params
        if (this.#params[0] !== undefined && Object.keys(this.#params[0]).length > 0) {
            requestURL = this.#replaceParamPlaceHolders(requestURL, this.#params[0]);
        }

        // checks if there are params
        if (this.#querys[0] !== undefined && Object.keys(this.#querys[0]).length > 0) {
            requestURL = this.#intergrateQueryURL(requestURL, this.#querys[0]);
        }

        // checks if it is a get or delete request 
        // this is done as the get and delete requests don't have a data argument
        if (this.#method === "get" || this.#method === "delete") {
            await axios[this.#method](requestURL, this.#configs[0] || undefined);

        } else {
            await axios[this.#method](requestURL, this.#bodys[0] || {}, this.#configs[0] || undefined);
        }

        const endTime = new Date().getTime();

        console.log(`   - Duration: ${endTime - startTime}ms`);
    }
}

export {
    RouteTester as default,
    RouteTesterOutput,
    RouteTesterMethods
}