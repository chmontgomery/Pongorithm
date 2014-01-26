db = connect("pongorithm");
printjson("Dropping Local Database " +db.getName());
db.dropDatabase();