Feature: Manage Shifts
  As an employee
  I want to be able to view, create, update, and delete my shifts
  So that I can keep track of my work schedule

  Scenario: Creating a shift with invalid data
    Given I am on the shifts page
    When I create a shift with start time "2025-11-07 10:00:00", end time "2025-11-07 09:00:00", and employee name "John Doe"
    Then I should see an error message "End time must be after the start time"
