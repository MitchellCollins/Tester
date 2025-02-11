import { AxiosRequestConfig, HttpStatusCode } from "axios";

declare global {
    /**
     * The `FunctionTesterSample` is an object that defines an array of inputs and an output that is used to test a function.
     */
    type ReturnTesterSample = {
        inputs: any[],
        output: any
    }

    /**
     * The `LogTesterSample` is an object that defines an array of inputs and a array of outputs that is used to test a function.
     */
    type LogTesterSample = {
        inputs: any[],
        outputs: any[]
    }

    /**
     * The request methods that the route tester is capable of performing.
     */
    type RouteTesterMethods = "get" | "post" | "put" | "patch" | "delete";

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
    type RouteTesterOutput = {
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
    type RouteTest = {
        output: RouteTesterOutput,
        body?: object | null,
        config?: AxiosRequestConfig | null,
        params?: object | null,
        querys?: object | null
    }
}