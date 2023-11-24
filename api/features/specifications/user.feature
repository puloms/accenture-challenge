Feature: Create and authorize a User then rent a book and list this User's informations

    Scenario: Create and authorize User
        Given I create a User
        When generate a Token
        Then the User is authorized

    Scenario: List all books and rent two for the User
        Given I create a User and authorize it
        And I list all books
        When I rent two books
        Then the User rented the books