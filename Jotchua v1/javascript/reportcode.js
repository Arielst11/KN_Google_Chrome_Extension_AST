//SECTION 1, MANAGEMENT OF INPUTS

//Local storage to save and load the information in the text fields once the user gets out of the app
//This will allow the user to copy and paste and keep the previous information at the moment to get out of the app.

// save inputs, the input is checked when the user stops to use it, at that point it saves its content..

function saveDataFromInputs(){

    if (document.getElementById("reportAuthor")){
        document.getElementById("reportAuthor").addEventListener("blur", function() {
        var reportAuthor = document.getElementById("reportAuthor").value;
        localStorage.setItem("reportAuthor", reportAuthor);    
             });
    };
    
    if (document.getElementById("ticketNumberReport")){
        document.getElementById("ticketNumberReport").addEventListener("blur", function() {
        var ticketNumber = document.getElementById("ticketNumberReport").value;
        localStorage.setItem("ticketNumberReport", ticketNumber);  
      });
    };

    if (document.getElementById("reportName")){
      document.getElementById("reportName").addEventListener("blur", function() {
      var reportName  = document.getElementById("reportName").value;
      localStorage.setItem("reportName", reportName ); 
    });
   };

    if (document.getElementById("reportDescription")){
      document.getElementById("reportDescription").addEventListener("blur", function() {
      var reportDescription  = document.getElementById("reportDescription").value;
      localStorage.setItem("reportDescription", reportDescription ); 
    });
    };
  /*
    if (document.getElementById("reportZone")){
        document.getElementById("reportZone").addEventListener("blur", function() {
        var reportZone = document.getElementById("reportZone").value;
        localStorage.setItem("reportZone", reportZone);       
      });
    };
  */
    if (document.getElementById("reportBranch")){
        document.getElementById("reportBranch").addEventListener("blur", function() {
        var reportBranch = document.getElementById("reportBranch").value;
        localStorage.setItem("reportBranch", reportBranch);       
      });
    };

    if (document.getElementById("emailsTextareaReport")){
        document.getElementById("emailsTextareaReport").addEventListener("blur", function() {
        var emailsTextareaReport = document.getElementById("emailsTextareaReport").value;
        localStorage.setItem("emailsTextareaReport", emailsTextareaReport);       
      });
    };

    if (document.getElementById("SQLtextareaReport")){
        document.getElementById("SQLtextareaReport").addEventListener("blur", function() {
        var SQLtextareaReport = document.getElementById("SQLtextareaReport").value;
        localStorage.setItem("SQLtextareaReport", SQLtextareaReport);       
      });
    };

}



function loadInputsData(){

  loadTodaysDate();

   if(localStorage.getItem("reportAuthor") !== undefined ){
    var reportAuthor = localStorage.getItem("reportAuthor");
    }else{
    var reportAuthor =  "";
    };


    if(localStorage.getItem("ticketNumberReport") !== undefined ){
    var ticketNumberReport = localStorage.getItem("ticketNumberReport");
    }else{
    var ticketNumberReport =  "";
    };


    if(localStorage.getItem("reportName") !== undefined ){
    var reportName = localStorage.getItem("reportName");
    }else{
    var reportName =  "";
    };

    if(localStorage.getItem("reportDescription") !== undefined ){
    var reportDescription = localStorage.getItem("reportDescription");
    }else{
    var reportDescription =  "";
    };
  
    /*
    if(localStorage.getItem("reportZone") !== undefined ){
    var reportZone = localStorage.getItem("reportZone");
    }else{
    var reportZone  = "";
    };
    */
    if(localStorage.getItem("reportBranch") !== undefined ){
        var reportBranch = localStorage.getItem("reportBranch");
    }else{
    var reportBranch =  "";
    };

    if(localStorage.getItem("emailsTextareaReport") !== undefined ){
      var emailsTextareaReport = localStorage.getItem("emailsTextareaReport");
    }else{
    var emailsTextareaReport =  "";
    };

    if(localStorage.getItem("SQLtextareaReport") !== undefined ){
      var SQLtextareaReport = localStorage.getItem("SQLtextareaReport");
    }else{
    var SQLtextareaReport =  "";
    };


    document.getElementById("reportAuthor").value = reportAuthor;
    document.getElementById("ticketNumberReport").value = ticketNumberReport;
    document.getElementById("reportName").value = reportName;
    document.getElementById("reportDescription").value = reportDescription;
   // document.getElementById("reportZone").value = reportZone;
    document.getElementById("reportBranch").value = reportBranch;
    document.getElementById("emailsTextareaReport").value = emailsTextareaReport;
    document.getElementById("SQLtextareaReport").value = SQLtextareaReport;
}


// creating a new method to load the date as soon as the user gets in the scripts section.
function loadTodaysDate(){
    let todaysDate = new Date();
    let year = todaysDate.getFullYear();
    let month = ('0'+ (todaysDate.getMonth() + 1)).slice(-2);
    let day = ('0'+(todaysDate.getDate())).slice(-2);
    let completedDate = year+"-"+month+"-"+day;
    document.getElementById("reportDate").value = completedDate;
    }
    
    // eventListener to execute the above code to load the date in the fieldtext(the only way to execute window.onload functions in chrome extensions...)
    document.addEventListener("DOMContentLoaded", function(){ loadInputsData(); }, false);
  

    // method that saves the information from the inputs once the it loses focus
    document.addEventListener("DOMContentLoaded", function(){ saveDataFromInputs(); }, false);

  
    // creating method that clear all the textfields:
function clearData(){

  document.getElementById("reportAuthor").value = "";
  document.getElementById("ticketNumberReport").value = "";
  document.getElementById("reportName").value = "";
  document.getElementById("reportDescription").value = "";
 // document.getElementById("reportZone").value ="";
  document.getElementById("reportBranch").value = "";
  document.getElementById("emailsTextareaReport").value = "";
  document.getElementById("SQLtextareaReport").value = "";

  localStorage.removeItem("reportAuthor");
  localStorage.removeItem("ticketNumberReport");
  localStorage.removeItem("reportName");
  localStorage.removeItem("reportDescription");
  //localStorage.removeItem("reportZone");
  localStorage.removeItem("reportBranch");
  localStorage.removeItem("emailsTextareaReport");
  localStorage.removeItem("SQLtextareaReport");

}

// eventListener to execute the above code to reset the textfields(the only way to execute onclick functions in chrome extensions...)
document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById('btnClearData');
  // onClick's logic below:
  link.addEventListener('click', function() {
      clearData();
  });
});


// eventListener to execute the creation of report files(the only way to execute onclick functions in chrome extensions...)
document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById('btnGenerateReportFiles');
  // onClick's logic below:
  link.addEventListener('click', function() {
    creatingReportFilesAndAssigningValues();
  });
});


    class Reportfiles {

        // atributes
        // used for .sh document
        static reportAuthor = "";
        static reportDate = "";
        static reportSystem ="";
        static ticketNumber = "";
        static reportName = "";
        static reportDescription = "";
        //static reportZone = "";
        static reportBranch =- "";
        static emails = "";
        static reportShContent = "";
        static reportDB = "";

        //used for src.sql document
        static query = "";

        
        // constructor
        constructor (reportAuthor,reportDate,reportSystem,ticketNumber,
        reportName,reportDescription, 
        //reportZone, 
        reportBranch, emails, reportShContent, reportDB,query){
        this.reportAuthor = reportAuthor;
        this.reportDate = reportDate;
        this.reportSystem = reportSystem;
        this.ticketNumber = ticketNumber;
        this.reportName = reportName;
        this.reportDescription = reportDescription;
        //this.reportZone = reportZone;
        this.reportBranch = reportBranch;
        this.emails = emails;
        this.reportShContent = reportShContent;
        this.reportDB = reportDB;
        this.query = query;
        }; 
        
        }




// creating a new download item for the report.sh
function creatingReportFilesAndAssigningValues(){
    //finding the values added by user and transforming the values according to the format the report should have.
    // 
    var reportAuthor = document.getElementById("reportAuthor").value;
    var reportDate = document.getElementById("reportDate").value;
    if (document.getElementById('radioSALOG').checked) {
      valueReportType = document.getElementById('radioSALOG').value;
    }else if(document.getElementById('radioBPA').checked)
    { valueReportType = document.getElementById('radioBPA').value; }
    var reportSystem = valueReportType;
    var ticketNumber = document.getElementById("ticketNumberReport").value;
    var reportBranch = document.getElementById("reportBranch").value;

    var reportName = (document.getElementById("reportName").value).replaceAll(' ','_');
    var normalizedReportName = 'AIR_RT'+ticketNumber+'_'+reportBranch+'_'+reportName;

    var reportDescription = document.getElementById("reportDescription").value;
    var emails = document.getElementById("emailsTextareaReport").value;

    if (document.getElementById('radioSR').checked) {
      selectedDB = document.getElementById('radioSR').value;
    }else if(document.getElementById('radioD1').checked)
    { selectedDB = document.getElementById('radioD1').value; }
    else if(document.getElementById('radioD2').checked)
    { selectedDB = document.getElementById('radioD2').value; }
    else if(document.getElementById('radioD3').checked)
    { selectedDB = document.getElementById('radioD3').value; }

    var reportDB = selectedDB;

    //used for .sql document
    var query = document.getElementById("SQLtextareaReport").value;
    // Method that includes the content of the SH document.  --> Method in document reportSHdata.js
    var reportShContent = editReportData (reportAuthor, reportDate,ticketNumber,reportDescription,normalizedReportName,reportSystem,reportBranch,reportDB,emails);
    
    ObjReportFiles = new Reportfiles(reportAuthor,reportDate,reportSystem,ticketNumber,normalizedReportName,reportDescription,reportBranch,emails,reportShContent,reportDB,query)
    
    //creating the downloadable object SH
    const link = document.createElement("a");
    const content = ObjReportFiles.reportShContent;
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    // creating the downloadable object "name" sh
    link.download = ObjReportFiles.reportName+".sh";
    link.click();
    URL.revokeObjectURL(link.href);

   //creating the downloadable object SQL
    const link2 = document.createElement("a");
    const content2 = ObjReportFiles.query;
    const file2 = new Blob([content2], { type: 'text/plain' });
    link2.href = URL.createObjectURL(file2);
    // creating the downloadable object "name" SQL
    link2.download = ObjReportFiles.reportName+".src.sql";
    link2.click();
    URL.revokeObjectURL(link2.href);
    // I just updated link to link2

    //creating the downloadable object Mobax-WinSCP instructions
    const link3 = document.createElement("a");
    const content3 = instructionsGenerator(ObjReportFiles.reportName,ObjReportFiles.reportSystem,ObjReportFiles.reportBranch)
    const file3 = new Blob([content3], { type: 'text/plain' });
    link3.href = URL.createObjectURL(file3);
    // creating the downloadable object "name" Instructions
    link3.download = "Mobax-WinSCP_Instructions.txt";
    link3.click();
    URL.revokeObjectURL(link3.href);




}

