import SuperClass from "@mitchell-collins/superclass";
import validator from "@mitchell-collins/validator";


export default class Tester extends SuperClass {
    /**
     * Is the name of the tester.
     */
    #name;

    /**
     * Is a description of what the tester tests.
     */
    #description;

    constructor(name, description) {
        validator.checkUndefinedArray([name, description], ["name", "description"]);
        validator.checkDataTypeArray([name, description], ["name", "description"], "string");

        super("Tester");
        this.#name = name;
        this.#description = description;
    }

    getName() {
        return this.#name;
    }

    getDescription() {
        return this.#description;
    }

    setName(newName) {
        validator.checkUndefined(newName, "newName");
        validator.checkDataType(newName, "newName", "string");
        this.#name = newName;
    }

    setDescription(newDescription) {
        validator.checkUndefined(newDescription, "newDescription");
        validator.checkDataType(newDescription, "newDescription", "string");
        this.#description = newDescription;
    }
}