
//SECTION 1, MANAGEMENT OF INPUTS


//Local storage to save and load the information in the text fields once the user gets out of the app
//This will allow the user to copy and paste and keep the previous information at the moment to get out of the app.

// save inputs, the input is checked when the user stops to use it, at that point it saves its content..


function saveDataFromInputs(){
    if (document.getElementById("ticketNumber")){
        document.getElementById("ticketNumber").addEventListener("blur", function() {
               var ticketRtNumber = document.getElementById("ticketNumber").value;
               localStorage.setItem("ticketRtNumber", ticketRtNumber);    
             });
    };
    
    if (document.getElementById("scriptName")){
        document.getElementById("scriptName").addEventListener("blur", function() {
        var scriptName = document.getElementById("scriptName").value;
        localStorage.setItem("scriptName", scriptName);  
      });

    };

    if (document.getElementById("SQLtextarea")){
        document.getElementById("SQLtextarea").addEventListener("blur", function() {
        var query = document.getElementById("SQLtextarea").value;
        localStorage.setItem("query", query); 
      });
    };


    if (document.getElementById("GITtextarea")){
        document.getElementById("GITtextarea").addEventListener("blur", function() {
        var gitCommands = document.getElementById("GITtextarea").value;
        localStorage.setItem("gitCommands", gitCommands);       
      });
    };
}


// load inputs
function loadInputsData(){

    loadTodaysDate();

    if(localStorage.getItem("ticketRtNumber") !== undefined ){
    var ticketRtNumber = localStorage.getItem("ticketRtNumber");
    }else{
    var ticketRtNumber =  "";
    };

    if(localStorage.getItem("scriptName") !== undefined ){
    var scriptName = localStorage.getItem("scriptName");
    }else{
    var scriptName =  "";
    };

    if(localStorage.getItem("query") !== undefined ){
    var query = localStorage.getItem("query");
    }else{
    var query  = "";
    };

    if(localStorage.getItem("gitCommands") !== undefined ){
        var gitCommands = localStorage.getItem("gitCommands");
    }else{
    var gitCommands =  "";
    };

    document.getElementById("ticketNumber").value = ticketRtNumber;
    document.getElementById("scriptName").value = scriptName;
    document.getElementById("SQLtextarea").value = query;
    document.getElementById("GITtextarea").value = gitCommands;


}

// This method adds the current date in the datafield. will be executed inside the loadInputsData function.
function loadTodaysDate(){
let todaysDate = new Date();
let year = todaysDate.getFullYear();
let month = ('0'+ (todaysDate.getMonth() + 1)).slice(-2);
let day = ('0'+(todaysDate.getDate())).slice(-2);
let completedDate = year+"-"+month+"-"+day;
document.getElementById("scriptDate").value = completedDate;
}





// both event listener are active while the user uses the app, also they start after the content in the app is working.
// eventListener to load the information in the fieldtexts "if there used to be" (the only way to execute window.onload functions in chrome extensions...)
document.addEventListener("DOMContentLoaded", function(){ loadInputsData(); }, false);

// method that saves the information from the inputs once the it loses focus
document.addEventListener("DOMContentLoaded", function(){ saveDataFromInputs(); }, false);







// SECTION 2, CLASS AND FUNCTIONALITY (BUTTONS, DOWNLOAD ITEM, ETC..)
class SQLquery {

// atributes
static ticketRtNumber = "";
static ticketDate = "";
static scriptName ="";
static query = "";
// constructor
constructor (ticketRtNumber,ticketDate,scriptName,query){
this.ticketRtNumber = ticketRtNumber;
this.ticketDate = ticketDate;
this.scriptName = scriptName;
this.query = query;
}; 

}


// creating a new download with the SQLquery data
function downloadQueryData(){
//finding the values added by user
var ticketRtNumber = document.getElementById("ticketNumber").value;
var ticketDate = document.getElementById("scriptDate").value;
var scriptName = document.getElementById("scriptName").value;
var query = document.getElementById("SQLtextarea").value;
//creating a new object type SQLquery and adding its attributes.
var newQuery = new SQLquery(ticketRtNumber,ticketDate,scriptName,query);
    
//creating the downloadable object
const link = document.createElement("a");
const content = newQuery.query;
const file = new Blob([content], { type: 'text/plain' });
link.href = URL.createObjectURL(file);
// creating the downloadable object "name"
var normalizedScriptName = scriptName.replaceAll(' ','_');
link.download = ticketDate+"_"+"RT#"+ticketRtNumber+"_"+normalizedScriptName+".sql";
link.click();
URL.revokeObjectURL(link.href);
// calling method that generates the Git commands
generateGitCommands();


}

//creating method that generates the git commands
function generateGitCommands(){

    var ticketRtNumber = document.getElementById("ticketNumber").value;
    var ticketDate = document.getElementById("scriptDate").value;
    var scriptName = document.getElementById("scriptName").value;
    var normalizedScriptName = scriptName.replaceAll(' ','_');
    // merging variables
    var gitCheckoutMaster = "git checkout master && git pull --rebase ";
    var gitcheckout = "git checkout -b "+ticketRtNumber+"_"+normalizedScriptName+" ";
    var gitAdd = "git add "+ticketDate+"_RT#"+ticketRtNumber+"_"+normalizedScriptName+".sql";
    var gitCommit ="git commit -am"+'"[RT#'+ticketRtNumber+"]_"+normalizedScriptName+'" ';
    var gitPush = "git push -u origin "+ticketRtNumber+"_"+normalizedScriptName+" ";
    // updating git command template
    var gitCommands =
     gitCheckoutMaster+"\n"
    +gitcheckout+"\n"
    +gitAdd+"\n"
    +gitCommit+"\n"
    +gitPush;
    //assinging value to the text area with the git commands
    document.getElementById("GITtextarea").value = gitCommands;
}

// eventListener to execute everything related to git commands (the only way to execute onclick functions in chrome extensions...)
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('btnGeneratePr');
    // onClick's logic below:
    link.addEventListener('click', function() {
        downloadQueryData();
        document.getElementById("GITtextarea").focus();
    });
});



// creating method that clear all the textfields:
function clearData(){

    document.getElementById("ticketNumber").value = "";
    document.getElementById("scriptName").value = "";
    document.getElementById("SQLtextarea").value = "";
    document.getElementById("GITtextarea").value = "";

    localStorage.removeItem("ticketRtNumber");
    localStorage.removeItem("scriptName");
    localStorage.removeItem("query");
    localStorage.removeItem("gitCommands");

}

// eventListener to execute the above code to reset the textfields(the only way to execute onclick functions in chrome extensions...)
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('btnClearData');
    // onClick's logic below:
    link.addEventListener('click', function() {
        clearData();
    });
});


