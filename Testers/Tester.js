import SuperClass from "@mitchell-collins/superclass";
import validator from "@mitchell-collins/validator";

/**
 * The `Tester` constructor is used to define a `Tester` which is used to test code that it outputs the expected output.
 * 
 * The `Tester` constructor is the super class of multiple children Tester classes that have different attrtributes and methods as 
 * they are design to test different types of codes. The child constructors of the `Tester` constructor include:
 * - `FunctionTester` - used to test a function
 * - `RouteTester` - used to test the route of a server
 * 
 * The `FunctionTester` constructor have children Testers of its own.
 * 
 * `FunctionTester` has multiple children constructors these include:
 * - `ReturnTester` - tests the value that is returned by a function
 * - `LogTester` - tests the value that is logged to the console by a function
 * 
 * The attributes that this `Tester` constructor defines include:
 * - `name` - the name of the `Tester`
 * - `description` - a description of what the `Tester` is testing
 */
export default class Tester extends SuperClass {
    /**
     * Is the name of the `Tester`.
     */
    #name;

    /**
     * Is a description of what the `Tester` tests.
     */
    #description;

    /**
     * The `Tester` constructor is used to define a `Tester` which is used to test code that it outputs the expected output.
     * 
     * The `Tester` constructor is the super class of multiple children Tester classes that have different attrtributes and methods as 
     * they are design to test different types of codes. The child constructors of the `Tester` constructor include:
     * - `FunctionTester` - used to test a function
     * - `RouteTester` - used to test the route of a server
     * 
     * The `FunctionTester` constructor have children Testers of its own.
     * 
     * `FunctionTester` has multiple children constructors these include:
     * - `ReturnTester` - tests the value that is returned by a function
     * - `LogTester` - tests the value that is logged to the console by a function
     * 
     * The attributes that this `Tester` constructor defines include:
     * - `name` - the name of the `Tester`
     * - `description` - a description of what the `Tester` is testing
     * 
     * @param {String} name 
     * @param {String} description
     */
    constructor(name, description) {
        validator.checkUndefinedArray([name, description], ["name", "description"]);
        validator.checkDataTypeArray([name, description], ["name", "description"], "string");

        super("Tester");
        this.#name = name;
        this.#description = description;
    }

    /**
     * Returns the `name` of this `Tester`.
     * @returns {String}
     */
    getName() {
        return this.#name;
    }

    /**
     * Returns the `description` of this `Tester`.
     * @returns {String}
     */
    getDescription() {
        return this.#description;
    }

    /**
     * Used to set a new value for the `name` attribute of this `Tester`.
     * @param {String} newName 
     */
    setName(newName) {
        validator.checkUndefined(newName, "newName");
        validator.checkDataType(newName, "newName", "string");
        this.#name = newName;
    }

    /**
     * Used to set a new value for the `description` attribute of this `Tester`.
     * @param {String} newDescription
     */
    setDescription(newDescription) {
        validator.checkUndefined(newDescription, "newDescription");
        validator.checkDataType(newDescription, "newDescription", "string");
        this.#description = newDescription;
    }
}