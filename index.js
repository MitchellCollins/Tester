import validator from "@mitchell-collins/validator";

class Tester {
    #name;
    #description;
    #function;
    #sampleInputsAndOutputs;

    constructor(name, description, funtion, sampleInputsAndOutputs) {
        this.#name = name;
        this.#description = description;
        this.#function = funtion;
        this.#sampleInputsAndOutputs = sampleInputsAndOutputs;
    }

    getName() {
        return this.#name;
    }

    getDescription() {
        return this.#description;
    }

    getFunction() {
        return this.#function;
    }

    getSampleInputsAndOutputs() {
        return this.#sampleInputsAndOutputs;
    }

    setName(newName) {
        validator.checkUndefined(newName);
        validator.checkDataType(newName, "string");
        this.#name = newName;
    }

    setDescription(newDescription) {
        validator.checkUndefined(newDescription);
        validator.checkDataType(newDescription, "string");
        this.#description = newDescription;
    }

    setFunction(newFunction) {
        validator.checkUndefined(newFunction);
        validator.checkDataType(newFunction, "function");
        this.#function = newFunction;
    }

    setSampleInputsAndOutputs(newSampleInputsAndOutputs) {
        validator.checkUndefined(newSampleInputsAndOutputs);
        validator.checkDataType(newSampleInputsAndOutputs, "array");
        validator.checkDataTypeArray(newSampleInputsAndOutputs, "object");
        this.#sampleInputsAndOutputs = newSampleInputsAndOutputs;
    }

    addSampleInputsAndOutputs(addedSampleInputsAndOutputs) {
        validator.checkUndefined(addedSampleInputsAndOutputs);
        validator.checkDataType(addedSampleInputsAndOutputs, "object");
        this.#sampleInputsAndOutputs.push(addedSampleInputsAndOutputs);
    }

    removeSampleInputsAndOutputs(index) {
        validator.checkUndefined(index);
        validator.checkDataType(index, "number");
        if (index > this.#sampleInputsAndOutputs.length - 1) throw new Error("Index exceeds size of array");
        return this.#sampleInputsAndOutputs.splice(index, 1);
    }

    async run() {
        console.log(`Running ${this.#name} used to ${this.#description}`);

        for (let i = 0; i < this.#sampleInputsAndOutputs.length; i++) {
            const { inputs, expectedOutput } = this.#sampleInputsAndOutputs[i];

            const output = await this.#function(...inputs);

            if (output === expectedOutput) {
                console.log(`Passed Test ${i + 1} ✅`);
            } else {
                console.log(`Failed Test ${i + 1} ❌`);
                console.log(`Expected Output: ${expectedOutput}`);
                console.log(`Actual Output: ${output}`);
            }
        }

        this.time();
    }

    async time() {
        const startTime = new Date().getTime();

        const { inputs } = this.#sampleInputsAndOutputs[0];
        await this.#function(...inputs);

        const endTime = new Date().getTime();

        console.log("Duration: " + (endTime - startTime) + "ms");
    }
}