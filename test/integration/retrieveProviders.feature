Feature: Retrieve information of the Providers

  As a user
  I want to retrieve information about the providers stored when they where uploaded
  so that I can analyze the info

  Scenario: User can retrieve a list of providers
    Given the endpoint /v1/providers
    When the request is sent
    Then the server responds with a list of providers

  Scenario: User can retrieve a list of providers filtered
    Given the endpoint /v1/providers
    And the querystring is: ?like[name]=fit
    When the request is sent
    Then the server responds with a list of providers including autofit
  
  Scenario: User can retrieve a list of providers empty on not found
    Given the endpoint /v1/providers
    And the querystring is: ?like[name]=kkkk
    When the request is sent
    Then the server responds with a list of providers empty
  
  Scenario: User can get a single provider
    Given the endpoint /v1/providers
    And the provider is 1
    When the request is sent
    Then the server responds with a provider