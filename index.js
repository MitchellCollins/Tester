import Tester from "./lib/Testers/Tester.js";
import FunctionTester from "./lib/Testers/FunctionTester.js";
import RouteTester from "./lib/Testers/RouteTester.js";
import LogTester from "./lib/Testers/LogTester.js";
import ReturnTester from "./lib/Testers/ReturnTester.js";
import TesterManager from "./lib/TesterManager.js";

const testerManager = new TesterManager();

export {
    testerManager as default,
    TesterManager,
    Tester,
    FunctionTester,
    RouteTester,
    LogTester,
    ReturnTester
}