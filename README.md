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

## testerManager
The `testerManager` is used to manage all your testers. All the testers are stored into a object that is looped through to run each tester.

## Example
```JavaScript
testerManager.createReturnTester(
    "Sum Tester",
    "tests the addNumbers function",
    function addNumbers(num1, num2) {
        return num1 + num2;
    },
    [
        new FunctionTesterSample([2, 5], 7),
        new FunctionTesterSample([7, 3], 10),
        new FnctionTesterSample([12, 7], 19)
    ]
);

testerManager.createLogTester(
    "Subtract Tester",
    "tests the subtractNumbers function",
    function subtractNumbers(num1, num2) {
        console.log(num1 - num2);
    },
    [
        new FunctionTesterSample([3, 1], 2),
        new FunctionTesterSample([7, 4], 3),
        new FunctionTesterSample([10, 5], 5)
    ]
);

testerManager.createRouteTester(
    "Route ID Tester",
    "tests the get name route",
    "example.url/name/:id",
    RouteTesterMethods.GET,
    [
        new RouteTest({
            output: new RouteTesterOutput({ name: "Jack" } 200),
            params: { id: 1 }
        }),
        new RouteTest({
            output: new RouteTesterOutput({ name: "John" }, 200),
            params: { id: 2 }
        }),
        new RouteTest({
            output: new RouteTesterOutput({ name: "Ben" }, 200),
            params: { id: 3 }
        })
        
    ]
);

testerManager.run();
```

## Exports
- `testerManager` as default
- `Tester`
- `FunctionTester`
- `FunctionTesterSample`
- `RouteTester`
- `RouteTest`
- `RouteTesterMethods`
- `RouteTesterOutput`
- `HttpStatusCode`
- `LogTester`
- `ReturnTester`

### Dependencies
- axios
    - https://github.com/axios/axios
    - https://www.npmjs.com/package/axios
- @mitchell-collins/validator
    - https://github.com/MitchellCollins/validator
    - https://www.npmjs.com/package/@mitchell-collins/validator
- @mitchell-collins/superclass
    - https://github.com/MitchellCollins/SuperClass
    - https://www.npmjs.com/package/@mitchell-collins/superclass