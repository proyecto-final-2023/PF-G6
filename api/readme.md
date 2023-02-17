# Routes to test 16/02

## activity

- **/filter/:type/:parameter** : GET exercise by type (arm, leg, etc)
  - type : [bodyPart | equipement | target]
  - parameter : depends on type...
- **/:id** : GET exercise by id (NUMBER)

## trainer

- **/confirm/:token** : POST... Confirms the user's email
