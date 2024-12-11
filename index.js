import validator from "@mitchell-collins/validator";

/**
 * The `Tester` is a constructor used to create a `Tester` object that test a `function` off sample inputs and outputs.
 * 
 * Information on the test is logged into the console which includes whether the `function` passed the tests or not and the duration of 
 * the functions process.
 * 
 * The `Tester` object has many attributes these include:
 * - `name` - the name of the `Tester`
 * - `description` - a description of what the `Tester` tests
 * - `function` - the function that the `Tester` tests
 * - `sampleInputsAndOutputs` - an array of multiply tests that have sample inputs and expected output
 * 
 * The `Tester` object has many methods these include:
 * - getter methods
 * - setter methods
 * - run - which runs the given `function` with given samples of inputs and expected output and logs information of the tests results
 * - time - which runs the `function` and times the duration of the functions process
 * 
 * Example:
 * 
 *      function addNumbers(num1, num2) {
 *          return num1 + num2;
 *      }
 * 
 *      const sumTester = new Tester(
 *          "Sum Tester",
 *          "tests the addNumbers function",
 *          addNumbers,
 *          [
 *              {
 *                  inputs: [2, 5],
 *                  expectedOutput: 7
 *              },
 *              {
 *                  inputs: [7, 3],
 *                  expectedOutput: 10
 *              },
 *              {
 *                  inputs: [12, 7]
 *                  expectedOutput: 19
 *              }
 *          ]
 *      );
 * 
 *      sumTester.run();
 */
export default class Tester {
    #name;
    #description;
    #function;
    #sampleInputsAndOutputs;

    /**
     * @param {String} name 
     * @param {String} description 
     * @param {Function} funtion 
     * @param {Array<object>} sampleInputsAndOutputs 
     */
    constructor(name, description, func, sampleInputsAndOutputs) {
        validator.checkUndefinedArray([name, description, func, sampleInputsAndOutputs]);
        validator.checkDataTypeArray([name, description], "string");
        validator.checkDataType(func, "function");
        validator.checkDataTypeArray(sampleInputsAndOutputs, "object");
        
        this.#name = name;
        this.#description = description;
        this.#function = func;
        this.#sampleInputsAndOutputs = sampleInputsAndOutputs;
    }

    /**
     * Returns the `name` of this `Tester` object.
     * @returns {String}
     */
    getName() {
        return this.#name;
    }

    /**
     * Returns the `description` of this `Tester` object.
     * @returns {String}
     */
    getDescription() {
        return this.#description;
    }

    /**
     * Returns the tested `function` of this `Tester` object.
     * @returns {Function}
     */
    getFunction() {
        return this.#function;
    }

    /**
     * Returns an array of sampled inputs and expected outputs of this `Tester` object.
     * @returns {Array<object>}
     */
    getSampleInputsAndOutputs() {
        return this.#sampleInputsAndOutputs;
    }

    /**
     * Used to set a new value for the `name` attribute of this `Tester` object.
     * @param {String} newName 
     */
    setName(newName) {
        validator.checkUndefined(newName);
        validator.checkDataType(newName, "string");
        this.#name = newName;
    }

    /**
     * Used to set a new value for the `description` attribute of this `Tester` object.
     * @param {String} newDescription
     */
    setDescription(newDescription) {
        validator.checkUndefined(newDescription);
        validator.checkDataType(newDescription, "string");
        this.#description = newDescription;
    }

    /**
     * Used to set a new value for the `function` attribute of this `Tester` object.
     * @param {Function} newFunction
     */
    setFunction(newFunction) {
        validator.checkUndefined(newFunction);
        validator.checkDataType(newFunction, "function");
        this.#function = newFunction;
    }

    /**
     * Used to set a new value for the `sampleInputsAndOutputs` attribute of this `Tester` object.
     * @param {Array<object>} newSampleInputsAndOutputs 
     */
    setSampleInputsAndOutputs(newSampleInputsAndOutputs) {
        validator.checkUndefined(newSampleInputsAndOutputs);
        validator.checkDataTypeArray(newSampleInputsAndOutputs, "object");
        this.#sampleInputsAndOutputs = newSampleInputsAndOutputs;
    }

    /**
     * Used to add a new sample of inputs and expected output.
     * @param {object} addedSampleInputsAndOutputs 
     */
    addSampleInputsAndOutputs(addedSampleInputsAndOutputs) {
        validator.checkUndefined(addedSampleInputsAndOutputs);
        validator.checkDataType(addedSampleInputsAndOutputs, "object");
        this.#sampleInputsAndOutputs.push(addedSampleInputsAndOutputs);
    }

    /**
     * Used to remove a sample of inputs and expected output using the specified `index`.
     * @param {Number} index 
     * @returns {object}
     */
    removeSampleInputsAndOutputs(index) {
        validator.checkUndefined(index);
        validator.checkDataType(index, "number");
        if (index > this.#sampleInputsAndOutputs.length - 1) throw new Error("Index exceeds size of array");
        return this.#sampleInputsAndOutputs.splice(index, 1);
    }

    /**
     * Used to run the sample inputs and expected outputs on the given `function`.
     * 
     * Information on the tests will be logged into the console and the method will also run the time method to provide the duration 
     * of the given `function`'s process.
     */
    async run() {
        console.log(`\nRunning ${this.#name} used to ${this.#description}:`);

        for (let i = 0; i < this.#sampleInputsAndOutputs.length; i++) {
            const { inputs, expectedOutput } = this.#sampleInputsAndOutputs[i];

            const output = await this.#function(...inputs);

            if (output === expectedOutput) {
                console.log(`   - Passed Test ${i + 1} ✅`);
            } else {
                console.log(`   - Failed Test ${i + 1} ❌`);
                console.log(`       Expected Output: ${expectedOutput}`);
                console.log(`       Actual Output: ${output}`);
            }
        }

        this.time();
    }

    /**
     * Used to determine the duration of the provide `function`'s process which is logged into the console.
     */
    async time() {
        const startTime = new Date().getTime();

        const { inputs } = this.#sampleInputsAndOutputs[0];
        await this.#function(...inputs);

        const endTime = new Date().getTime();

        console.log("   - Duration: " + (endTime - startTime) + "ms");
    }
}