
function editReportData (author, date,ticketNumber,description,reportName,system,reportBranch,dataBase,reportEmails){


var content = 
"#!/bin/sh" +"\n"+
"#########################################" +"\n"+
"#Author: "+author +"\n"+
"#Date: "+date +"\n"+
"#Report requested by(Air BU): Air" +"\n"+
"#RT number: "+ticketNumber +"\n"+
"#Report description(what data it is generating): " +description+"\n"+
"#Output name(s) of the reports: "+reportName+".xlsx" +"\n"+
"#########################################"+"\n"+
"\n"+
"$echo date +%y-%m-%d/%H:%M:%S"+"\n"+
"\n"+
"# absolute path to the directory containing report files" +"\n"+
"scriptpath=/data/reporting/scripts/"+system+"/scheduled/AMER/"+reportBranch +"\n"+
"\n"+
'# filename of the "source SQL" file' +"\n"+
"srcscript=$scriptpath/"+reportName+".src.sql" +"\n"+
"# filename of the query to be sent to SQLWB (same name just without the .src extention)" +"\n"+
"script=$scriptpath/"+reportName+".sql" +"\n"+
"\n"+
"# path to the output file" +"\n"+
"# after the dash there's bash command which adds the date to the file name, if not necessary, remove, but then it will overwrite report file at each run" +"\n"+
"outxlsx=/data/reporting/reports/"+system+"/scheduled/AMER/"+reportBranch+"/"+reportName+"/"+reportName+"-$(date +%Y%m%d).xlsx" +"\n"+
"\n"+
"# this line is the SQLWB-specific setup string. It is written in the file to be sent to SQLWB before the actual SQL query to tell SQLWB what to do"+"\n"+
'echo -e "WbExport -file="$outxlsx" -type=xlsx -continueOnError=true -header=true;\\n" > $script' +"\n"+
"# writing the actual SQL query below the setup line" +"\n"+
"cat $srcscript >> $script" +"\n"+
"\n"+
"# executing the report" +"\n"+
dataBase+" $script" +"\n"+
"\n"+
"# distribute the generated report over email (most common). Look for other options at https://wiki.int.kn/display/gsctllit/Create+scheduled+report+from+scratch" +"\n"+
"echo -e "+'"'+reportName+' report for '+reportBranch+' has finished running. \\n\\n\\nBest Regards, \\nGlobal Service Desk \\ngsd.support@kuehne-nagel.com'+'"'+" | mailx -r "+'"'+"GSD.Support<GSD.support@kuehne-nagel.com>"+'" -s ' +'"'+reportName+" report has finished running $(date)"+'"'+" -a "+'"'+"$outxlsx"+'"'+' "'+reportEmails+'"'+ "\n"+
"\n"+
"# just make the logs more readable"+ "\n"+
"echo ====================================" +"\n"+
"echo" +"\n"

return content;
}


//Creating instructions

function instructionsGenerator(reportName,system,reportBranch){

var content = 
"1)" + "\n"+
"Insert the sh and src.sql documents in the following path (WinSCP app)" + "\n"+
"\n"+
"/data/reporting/scripts/"+system+"/scheduled/AMER/"+reportBranch+ "--------------------------------> Copy"+"\n"+
"\n"+
"2)" + "\n"+
"Create folder with name " +'"'+reportName+'"'+" in the below path  (WinSCP app)" + "\n"+
"\n"+
"/data/reporting/reports/"+system+"/scheduled/AMER/"+reportBranch+ "--------------------------------> Copy"+ "\n"+
"\n"+
"At this point the below path should be available to store the reports:" +"\n"+
"\n"+
"/data/reporting/reports/"+system+"/scheduled/AMER/"+reportBranch+"/"+reportName+ "\n"+
"3)" + "\n"+
"Instructions for Mobax" + "\n"+
"\n"+
"Get in the Crontab screen" +"\n"+
"\n"+
"sudo -u reporter crontab -e   --------------------------------> Copy"+ "\n"+
"\n"+
"Login, username and password" + "\n"+
"key Insert: get in edit mode"+ "\n"+
"key Escape: get in view mode, it is not possible to edit" + "\n"+
"Type :q! (in view mode):   get out of the system without saving changes" + "\n"+
"Type :wq (in view mode):   get out of the system and save the changes"  + "\n"+
"\n"+
"Installing the new report in the server"+ "\n"+
"\n"+
"Scroll down until you find the section "+reportBranch + "\n"+
"\n"+
"Get in the crontab web site and find the crontab format in order to set the schedule report, you have to modify only the * * * * * "+ "\n"+
"\n"+
"Crontab website  https://crontab.guru/#30_12_*_*_1 " +"\n"+
"\n"+
"you can copy and paste the below comand, the system will update the required sections automatically just remember to adjust the  * * * * * according to the time requested by the user" +"\n"+
"\n"+
"* * * * * bash /data/reporting/scripts/util/Connection_Check.sh /data/reporting/scripts/"+system+"/scheduled/AMER/"+reportBranch+"/"+reportName+".sh >> /var/log/gsd/reporting/"+reportName+".log" + " --------------------------------> Copy and edit ***** "+ "\n"+
"\n"+
"get out of the mobax-crontab section by saving the changes (:wq)" +"\n"+
"\n"+
"4)" + "\n"+
"Execute the test" + "\n"+
"\n"+
"sudo -u reporter bash /data/reporting/scripts/util/Connection_Check.sh /data/reporting/scripts/"+system+"/scheduled/AMER/"+reportBranch+"/"+reportName+".sh >> /var/log/gsd/reporting/"+reportName+".log" + " --------------------------------> Copy" + "\n"+
"\n"+
"5)" + "\n"+
"Change files group" + "\n"+
"\n"+
"chgrp -R GSD /data/reporting/scripts/"+system+"/scheduled/AMER/"+reportBranch+"/"+reportName+".sh" + " --------------------------------> Copy" + "\n"+
"chgrp -R GSD /data/reporting/scripts/"+system+"/scheduled/AMER/"+reportBranch+"/"+reportName+".src.sql" + " --------------------------------> Copy" + "\n"+
//"chgrp -R GSD /data/reporting/scripts/"+system+"/scheduled/AMER/"+reportBranch+"/"+reportName+".sql" + " --------------------------------> Copy" + "\n"+
"\n"+
"In case there is an error with the report, it is possible to check if the error in the below link" + "\n"+
"\n"+
"http://dehamsl3374.int.kn/tools/log_viewer/" + "\n"+
"\n"+
"6)" + "\n"+
"Please add the report to the wiki, link is below " + "\n"+
"\n"+
"https://wiki.int.kn/display/GSD/GSD1+scheduled+reports+catalogue" 

return content
}