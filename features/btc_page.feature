Feature: Validate BTC-USD price in Google Finance

  Background: Common setup
    Given I get the current price from the API
    Given I get the current BTC-USD price from the UI

  @SmokeTest
  Scenario Outline: Validate average BTC-USD price within the given time interval (Smoke tests)
    When the BTC-USD price from the UI should not deviate by more than 1% from the API price
    Then the average BTC-USD price recorded every <M> seconds for <N> minutes does not vary by more than 1% from the initial recorded value
    Then there is no BTC-USD price recorded that varies by more than 2% from the initial recorded value

  Examples:
    | N  | M  |
    | 1  | 10 |

    Scenario Outline: Validate average BTC-USD price within the given time interval (All tests)
    When the BTC-USD price from the UI should not deviate by more than 1% from the API price
    Then the average BTC-USD price recorded every <M> seconds for <N> minutes does not vary by more than 1% from the initial recorded value
    Then there is no BTC-USD price recorded that varies by more than 2% from the initial recorded value

  Examples:
    | N  | M  |
    | 3  | 10 |
    | 5  | 10 |

