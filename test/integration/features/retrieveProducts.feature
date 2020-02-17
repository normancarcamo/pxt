Feature: Retrieve information of the products

  As a user
  I want to retrieve information about the products stored when they where uploaded
  so that I can analyze the info

  Scenario: User can retrieve a list of products
    Given the endpoint /v1/products
    When the request is sent
    Then the server responds with a list of products

  Scenario: User can retrieve a list of products filtered
    Given the endpoint /v1/products
    And the querystring is: ?like[make]=yota
    When the request is sent
    Then the server responds with a list of products including Toyota
  
  Scenario: User can retrieve a list of products empty on not found
    Given the endpoint /v1/products
    And the querystring is: ?like[make]=kkkk
    When the request is sent
    Then the server responds with a list of products empty
  
  Scenario: User can get a single product
    Given the endpoint /v1/products
    And the product is 1
    When the request is sent
    Then the server responds with a product