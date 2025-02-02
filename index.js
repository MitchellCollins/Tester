import Tester from "./Testers/Tester.js";
import FunctionTester from "./Testers/FunctionTester.js";
import RouteTester from "./Testers/RouteTester.js";
import LogTester from "./Testers/LogTester.js";
import ReturnTester from "./Testers/ReturnTester.js";
import TesterManager from "./TesterManager.js";

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