# Tester
A npm package that is used to create `Tester` objects that test a code.

Install Package:
```CLI
npm i @mitchell-collins/tester 
```
## Constructors
The are multiply different testers these include:
- `Tester` - the super class that defines the attributes `name` and `description`
- `FunctionTester` - a parent class whos children are used for testing functions, it defines the attributes `function` and `inputOutputSamples`
- `ReturnTester` - is a child class of `FunctionTester`, used to test functions that return a output
- `LogTester` - is a child class of `FunctionTester`, used to test functions that log an output to the console
- `RouteTester` - is used to test a route of a server
- `TesterManager` - is used to manager your testers

## TesterManager
A `TesterManager` is already constructor and exported as default and is used to manage all your testers. All the testers are stored into a object that is looped through to run each tester. The `TesterManager` is also exported which allows you to create multiple `TesterManager`s.

## Types
```Typescript 
type ReturnTesterSample = {
    inputs: any[],
    output: any
}
```
```Typescript
type LogTesterSample = {
    inputs: any[],
    outputs: any[]
}
```
```Typescript
type RouteTesterOutput = {
    data: any,
    status: HttpStatusCode
}
```
```Typescript
type RouteTesterMethods = "get" | "post" | "put" | "patch" | "delete";
```
```Typescript
type RouteTest = {
    output: RouteTesterOutput,
    body?: object | null,
    config?: AxiosRequestConfig<any> | null,
    params?: object | null,
    querys?: object | null
}
```

## Example
```JavaScript
testerManager.createReturnTester(
    "Sum Tester",
    "tests the addNumbers function",
    function addNumbers(num1, num2) {
        return num1 + num2;
    },
    [
        {
            inputs: [2, 5], 
            output: 7
        },
        {
            inputs: [7, 3], 
            output: 10
        },
        {
            inputs: [12, 7], 
            output: 19
        }
    ]
);

testerManager.createLogTester(
    "Subtract Tester",
    "tests the subtractNumbers function",
    function subtractNumbers(num1, num2) {
        console.log(num1);
        console.log(num2);
        console.log(num1 - num2);
    },
    [
        {
            inputs: [3, 1], 
            outputs: [3, 1, 2]
        },
        {
            inputs: [7, 4], 
            outputs: [7, 4, 3]
        },
        {
            inputs: [10, 5], 
            output: [10, 5, 5]
        }
    ]
);

testerManager.createRouteTester(
    "Route ID Tester",
    "tests the get name route",
    "example.url/name/:id",
    RouteTesterMethods.GET,
    [
        {
            output: { 
                data: { 
                    name: "Jack"
                },
                status: 200
            },
            params: { id: 1 }
        },
        {
            output: { 
                data: {
                    name: "John" 
                },
                status: 200
            },
            params: { id: 2 }
        },
        {
            output: { 
                data: {
                    name: "Ben" 
                },
                status: 200
            },
            params: { id: 3 }
        }
    ]
);

testerManager.run();
```

## Exports
### ESModule & CommonJS
- `.`
    - `testerManager` as default
    - `TesterManager`
    - `Tester`
    - `FunctionTester`
    - `FunctionTesterSample`
    - `RouteTester`
    - `RouteTest`
    - `RouteTesterMethods`
    - `RouteTesterOutput`
    - `HttpStatusCode`
    - `AxiosRequestConfig`
    - `LogTester`
    - `ReturnTester`

### Only CommonJS
- `./Tester`
    - `Tester` as default
- `./FunctionTester`
    - `FunctionTester` as default
- `./ReturnTester`
    - `ReturnTester` as default
- `./LogTester`
    - `LogTester` as default
- `./RouteTester`
    - `RouteTester` as default
- `./TesterManager`
    - `TesterManager` as default

## Dependencies
- axios
    - https://github.com/axios/axios
    - https://www.npmjs.com/package/axios
- @mitchell-collins/validator
    - https://github.com/MitchellCollins/validator
    - https://www.npmjs.com/package/@mitchell-collins/validator
- @mitchell-collins/superclass
    - https://github.com/MitchellCollins/SuperClass
    - https://www.npmjs.com/package/@mitchell-collins/superclass