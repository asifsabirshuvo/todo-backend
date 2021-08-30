## notes

* Did not use validator libraries as the api is pretty small
* didn't write dto or response serializers
* for more security the primary keys or foreign key could be replaced by unique random keys but for time constraints I didn't do such sanitizations.


## create db and table

install dependency first

```
npm install
```

follow .env file. we have a db name test. you may change it. we are following as test.
create a postgres database with name: test
couldn't write test suites for time constraints.
run this command to generate tables or relation from backend app:

```
npm test

```


## getting seed test data

```
psql test < tododb.sql
```


## for running the app anytime at 3000 port

```
npm start

```
