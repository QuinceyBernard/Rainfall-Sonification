<?php
# your database credentials
$db = new mysqli('localhost', 'q2lawren_creatin', 'Lemonade21!', 'q2lawren_sem1project');
# check our connection to the database and return error if broken
if($db->connect_errno > 0){
  die('Unable to connect to database [' . $db->connect_error . ']');
}

# select all the data from the table my_table
$sql = "SELECT * FROM semester2";

# check our query will actually run
if(!$result = $db->query($sql)){
  die('There was an error running the query [' . $db->error . ']');
}

# loop through all the rows in the table and add to array
while($row = mysqli_fetch_assoc($result)){
      $resultArray[] = $row;
}

# Create temperary file
$handle = fopen('php://temp', 'r+');

# put headers 
fputcsv($handle, array_keys(current($resultArray)));

# loop through array and add to temperary file
foreach ($resultArray as $line) {
       fputcsv($handle, $line, ',', '"');
}

# go to beginging of the teperary file
rewind($handle);

# write completed file into variable
while (!feof($handle)) {
       $contents .= fread($handle, 8192);
}

# close file
fclose($handle);

# output csv string
echo $contents;

# close the connection to your database
$db->close();
?>