function addDates(startDate,endDate){
  var startRow = 1;
  var sheet = SpreadsheetApp.getActiveSheet();
  var currentDate = new Date(startDate);
  var endDateObj = new Date(endDate)
  var cell = sheet.getRange(startRow, 1);
  while (currentDate < endDateObj){
    var year = ('' + currentDate.getFullYear());
    year = year.substring(2,4)
    var month = '' + (currentDate.getMonth() + 1);
    var day = '' + currentDate.getDate();
    var currentDateString = month + '/' + day + '/' + year;
    cell.setValue(currentDateString);

    currentDate.setDate(currentDate.getDate()+1)
    startRow=startRow+1;
    cell=sheet.getRange(startRow, 1);
  }
  
}

// will add three empty rows in a row in between every current row of content--> Run this first from a sheet with only the dates. 
function addThreeRows() {
  var startRow = 1;
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();

  for (var i=numRows; i > -1; i=i-1) {
    sheet.insertRowsAfter(i + startRow, 3);
  } 
}

//insertData will add the sub headings. Just adjust the startRow and setValue() parameter. --> Run this 3 times for the desired headings
function insertData(heading,start){
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  // startRow is the row where you want to start inserting the text. 
  var startRow = start;
  var cell = sheet.getRange(startRow, 1);
  for (i=0;i<numRows/4;i++){
      cell.setValue(heading);
      startRow=startRow+4;
      cell=sheet.getRange(startRow, 1);
    }
}

// run this third
function addGroup(start){
  //We want the first element to be grouped to be "Lecture" so begin at row 3 (remember indexing at 0), where the first occurence of "Lecture" is
  var startRow = start;
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  //This is untested but I believe this should run the correct amount of times for the exact number of rows needing to be grouped, as it is a group for every 4 rows 
  for (i=0;i<numRows/4;i++){
    //selects the first to third row (starting at startRow) and groups them
    sheet.getRange(startRow,1,3).activate().shiftRowGroupDepth(1);
    // increment startRow to be the next ungrouped occurence of "Lecture," this is 4 rows after  
    startRow=startRow+4;
  }
}

// add the formulas to sum up work per each day
function addFormula(start){
  var startRow = start;
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  // set the starting cell to be the startrow, 10th column
  var cell=sheet.getRange(startRow, 10);
  for (i=0;i<numRows/4 && startRow<numRows;i++){
    // set the formula, increment to the next row and select the next cell
    cell.setFormula(`=SUM(B${startRow}:I${startRow})`);
    startRow+=4;
    cell=sheet.getRange(startRow, 10);
  }
}

// start from a spreadsheet with only a list of dates (no headings!)
function createSheet(){
  addDates("8/23/23","12/16/23");
  addThreeRows();
  insertData("Study",2);
  insertData("Lecture",3);
  insertData("HW",4);
  // start grouping right under the date
  addGroup(2);
  // add the total aligned with date
  addFormula(1);
}

