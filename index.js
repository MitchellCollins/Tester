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
}