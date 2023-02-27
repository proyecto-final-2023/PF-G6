# User Routes

- _GET_ : **/** : returns a list of users
  - Query parameters:
  - name (optional): filter the list by user name
- Responses:

  - 200 OK: successfully returns a list of users, with an optional filter by name
  - 400 Bad Request: an error occurred while processing the request

- _GET_ : **/confirm/:token** : confirms user email
  - Path parameters:
  - token: a unique token used to confirm the email
- Responses:

  - 200 OK: successfully confirms the user's email
  - 400 Bad Request: an error occurred while processing the request

- _GET_ : **/bot** : adds a bot user
- Responses:

  - 200 OK: successfully adds a bot user
  - 400 Bad Request: an error occurred while processing the request

- _GET_ : **/:id** : retrieves a specific user by ID
  - Path parameters:
    - id: the unique identifier of the user to retrieve
  - Responses:
    - 200 OK: successfully retrieves the specified user
    - 400 Bad Request: an error occurred while processing the request
