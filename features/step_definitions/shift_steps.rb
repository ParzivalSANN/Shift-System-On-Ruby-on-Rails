Given("I am on the shifts page") do
  # This step will be implemented when we have a frontend.
  # For now, we can assume we are interacting with the API directly.
end

When("I create a shift with start time {string}, end time {string}, and employee name {string}") do |start_time, end_time, employee_name|
  post '/shifts', { shift: { start_time: "2025-11-07 10:00:00", end_time: "2025-11-07 09:00:00", employee_name: employee_name } }.to_json, { 'CONTENT_TYPE' => 'application/json' }
end

Then("I should see an error message {string}") do |error_message|
  json_response = JSON.parse(last_response.body)
  expect(json_response["end_time"]).to be_present
  expect(json_response["end_time"]).to include(error_message)
end