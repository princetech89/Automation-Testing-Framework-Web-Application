
import { LayerType, Phase, Layer } from './types';

export const PHASES: Phase[] = [
  {
    id: 1,
    title: "Language & Stack Selection",
    description: "Setting the foundation with Java, Selenium, and TestNG.",
    details: ["Java JDK 17+", "Maven/Gradle dependency management", "Selenium WebDriver 4.x"],
    tools: ["Java", "Selenium", "Maven"]
  },
  {
    id: 2,
    title: "Framework Structure",
    description: "Designing the folder structure and package hierarchy.",
    details: ["Modular structure", "Separation of source and test code", "Config resource management"],
    tools: ["IntelliJ IDEA", "Package Explorer"]
  },
  {
    id: 3,
    title: "BDD Implementation",
    description: "Bridging business intent and technical execution.",
    details: ["Gherkin syntax", "Feature file organization", "Cucumber hooks"],
    tools: ["Cucumber", "Gherkin"]
  },
  {
    id: 4,
    title: "Page Object Model (POM)",
    description: "Abstracting UI elements from test logic.",
    details: ["Encapsulation of locators", "Fluent interface design", "Dynamic locators"],
    tools: ["PageFactory", "By Locators"]
  },
  {
    id: 5,
    title: "Utility Development",
    description: "Building the engine: Waits, Browsers, and Screenshots.",
    details: ["Explicit/Fluent waits", "WebDriver Manager", "Cross-browser setup"],
    tools: ["WebDriverManager", "Robot Class"]
  }
];

export const LAYERS: Layer[] = [
  {
    id: LayerType.BUSINESS,
    description: "Feature files written in plain business language (Gherkin).",
    purpose: "Allow non-technical stakeholders to understand and validate tests.",
    designRule: "Strictly NO UI details, NO locators, NO code logic.",
    content: ["Feature Files", "Scenarios", "Backgrounds", "Scenario Outlines"],
    example: "Scenario: Verify successful login\n  Given I am on the login page\n  When I enter valid credentials\n  Then I should see the dashboard"
  },
  {
    id: LayerType.LOGIC,
    description: "The glue between business language and POM actions.",
    purpose: "Translate high-level steps into actionable sequences.",
    designRule: "Minimal logic; strictly calls Page methods. No hardcoded locators.",
    content: ["Step Definitions", "Hooks", "Cucumber Transformers"],
    example: "@When(\"I enter valid credentials\")\npublic void enterCredentials() {\n    loginPage.login(config.getUsername(), config.getPassword());\n}"
  },
  {
    id: LayerType.PAGE,
    description: "Java classes representing application screens.",
    purpose: "Centralized location for UI element management.",
    designRule: "No assertions (except for navigation checks). Only actions.",
    content: ["Locators", "Element Actions", "Page Initialization"],
    example: "public class LoginPage {\n    private By usernameField = By.id(\"user\");\n    public void typeUsername(String user) {\n        driver.findElement(usernameField).sendKeys(user);\n    }\n}"
  },
  {
    id: LayerType.UTILITY,
    description: "Reusable core functions and technical helpers.",
    purpose: "Centralize complex Selenium logic and shared resources.",
    designRule: "Independent of specific test cases; globally accessible.",
    content: ["Browser Factory", "Wait Helpers", "Prop Reader", "Screenshot Utils"],
    example: "public static void waitForElement(By locator) {\n    wait.until(ExpectedConditions.visibilityOfElementLocated(locator));\n}"
  },
  {
    id: LayerType.EXECUTION,
    description: "Configuration for running tests and generating output.",
    purpose: "Control parallelization, test sets, and reporting.",
    designRule: "Execution control only. No test logic implementation.",
    content: ["TestNG XML", "Cucumber Runner", "Extent Reports", "CI/CD Yaml"],
    example: "<test name=\"Regression\">\n    <classes>\n        <class name=\"runner.TestRunner\" />\n    </classes>\n</test>"
  }
];
