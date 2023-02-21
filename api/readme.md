# Routes to test 16/02

## activity

- **/?name={exercise_name}** : _GET_ gives me all exercises that coincide in an arr of objects
- **/:id** : _GET_ exercise by id (number)
<!-- TODO: divide this in 3 -->
- **/filter/:type/:parameter** : GET exercise by type (arm, leg, etc)
  - type : [bodyPart | equipement | target]
  - parameter : depends on type...

## aliment

- **/** : _GET_ NOT USE returns 50k aliments

## trainer

- **/confirm/:token** : POST... Confirms the user's email
