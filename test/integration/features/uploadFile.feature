Feature: Upload file functionality

  As a user
  I want to upload a file in csv format 
  so that it can be saved into an in-memory database

  Scenario: User gets OK after file is uploaded
    Given a dataset file
    When the file is uploaded
    Then the server responds with status 200

  Scenario: User gets OK on different sort of columns
    Given a dataset file
    And columns in dataset are: uuid,vin,make,model,year
    And columns in configuration are: model,make,year,uuid,vin
    When the file is uploaded
    Then the server responds with OK

  Scenario: User gets error on invalid columns
    Given a dataset file
    And columns in dataset are: uuid,vin,make,model,year
    And columns in configuration are: id,vin,make,model
    When the file is uploaded
    Then the server responds with error

  Scenario: User gets error on invalid provider
    Given a dataset file
    And provider name is empty
    When the file is uploaded
    Then the server responds with error
  
  Scenario: User gets error on invalid dataset
    Given a dataset file
    When the file is uploaded
    Then the server responds with error
  
  Scenario: User gets error on invalid configuration
    Given a dataset file
    And configuration is empty
    When the file is uploaded
    Then the server responds with error