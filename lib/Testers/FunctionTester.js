import validator from "@mitchell-collins/validator";
import Tester from "./Tester.js";

export default class FunctionTester extends Tester {
    /**
     * Holds the function that is going to be tested.
     */
    #function;
    
    constructor(name, description, func) {
        // inherits from Tester constructor
        super(name, description);
        
        // validates other inputs
        validator.checkDataType(func, "func", "function");

        // defines the attributes
        this.#function = func;
    }

    getFunction() {
        return this.#function;
    }

    setFunction(newFunction) {
        // validates inputs
        validator.checkUndefined(newFunction, "newFunction");
        validator.checkDataType(newFunction, "newFunction", "function");

        this.#function = newFunction;
    }
}