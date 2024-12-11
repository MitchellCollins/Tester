# Tester
A npm package that is used to create `Tester` objects that test a provided `function` using an array of sample `inputs` and `expectedOutputs`.

Install Package:
```CLI
npm i @mitchell-collins/tester 
```
### Attributes
The `Tester` object has many attributes these include:
- `name` - the name of the `Tester`
- `description` - a description of what the `Tester` tests
- `function` - the function that the `Tester` tests
- `sampleInputsAndOutputs` - an array of multiply tests that have sample inputs and expected output

### Methods
The `Tester` object has many methods these include:
- getter methods
- setter methods
- run - which runs the given `function` with given samples of `inputs` and `expectedOutput` and logs information of the tests results
- time - which runs the `function` and times the duration of the `function`'s process

### Example
```JavaScript
function addNumbers(num1, num2) {
    return num1 + num2;
}

const sumTester = new Tester(
    "Sum Tester",
    "tests the addNumbers function",
    addNumbers,
    [
        {
            inputs: [2, 5],
            expectedOutput: 7
        },
        {
            inputs: [7, 3],
            expectedOutput: 10
        },
        {
            inputs: [12, 7]
            expectedOutput: 19
        }
    ]
);

sumTester.run();
```

### Dependencies
- @mitchell-collins/validator
    - https://github.com/MitchellCollins/validator
    - https://www.npmjs.com/package/@mitchell-collins/validator