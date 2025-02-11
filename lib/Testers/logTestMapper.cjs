/**
 * The `logTestMapper` is used by the custom log function to determine which tester and test is being runned and where the logged
 * information needs to go.
 *
 * @property {TesterManager} `manager` determines which tester manager is running the tester
 * @property {String} `tester` determine which tester is being runned
 * @property {Number} `test` determine which test is being runned
 */
let logTestMapper = {
    manager: null,
    tester: null,
    test: null,
    index: null
}

module.exports = logTestMapper;