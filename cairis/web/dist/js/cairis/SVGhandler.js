/*  Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.

    Authors: Raf Vandelaer, Shamal Faily */

$( document ).ajaxComplete(function() {
  $("svg > g > g .node > a ").on('click', function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    var link = $(this).attr("xlink:href");

    if(link.indexOf("assets") > -1) {
      $.ajax({
        type: "GET",
        dataType: "json",
        accept: "application/json",
        data: {
          session_id: String($.session.get('sessionID'))
        },
        crossDomain: true,
        url: serverIP + link.replace(" ", "%20"),
        success: function (data) {
        /*
        Explanation: Because the options menu is used in multiple cases, I read in the used HTML from a template.
        Then, because the reading of this html goes Async (as with every jQuery method), I give my data and the ID's so I can fill it after
        the read of the template is done.
        */
        //forceOpenOptions();
        var dataArr = [];
        dataArr["#theName"] = String(data.theName);
        dataArr["#theDescription"] = String(data.theDescription);
        dataArr["#theSignificance"] = String(data.theSignificance);
        var theTableArr =[];

        $.ajax({
          type:"GET",
          dataType: "json",
          accept:"application/json",
          data: {
            session_id: String($.session.get('sessionID'))
          },
          crossDomain: true,
          url: serverIP + "/api/assets/name/"+ data.theName,
          success: function(data2){
            var jsonObj = eval(data2);
            var theTableArr = [];
            for (var key in jsonObj) {
              if (jsonObj.hasOwnProperty(key)) {
                if(key == window.assetEnvironment){
                  var goodData =  eval(jsonObj[key]);
                  for (var ky in goodData) {
                    //goodData[ky] = Availibility  + intgr
                    for (var k in goodData[ky]) {
                      if(k == "value"){
                        theTableArr[String(ky)] = String(goodData[ky][k]);
                        debugLogger(String(ky) + " " + String(goodData[ky][k]));
                      }
                      //console.log(goodData[ky][k] + " " + k);
                    }
                  }
                }
              }
            }
            dataArr["assetproptable"] = theTableArr;
            fillOptionMenu("fastTemplates/AssetOptions.html", "#optionsContent", dataArr,false,true,function(){
              // Get asset properties for name and environment here and fill assetproptable
              //$('#assetproptable').find("tbody").empty();
              //$('#assetproptable').append('<tr><td>Confidentiality</td><td>High</td>')
            });
          },
          error: function(xhr, textStatus, errorThrown) {
            console.log(this.url);
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
          }
        });
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log(String(this.url));
          debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
      });
    } else if(link.indexOf("personas") > -1) {
        forceOpenOptions();

        $.ajax({
          type: "GET",
          dataType: "json",
          accept: "application/json",
          data: {
            session_id: String($.session.get('sessionID'))
          },
          crossDomain: true,
          url: serverIP + link.replace(" ", "%20"),
          success: function (data) {
            //forceOpenOptions();
            var dataArr = [];
            dataArr["#theName"] = String(data.theName);
            dataArr["#theActivities"] = String(data.theActivities);
            dataArr["#theAttitudes"] = String(data.theAttitudes);
            dataArr["#theAptitudes"] = String(data.theAptitudes);
            dataArr["#theMotivations"] = String(data.theMotivations);
            dataArr["#theMotivations"] = String(data.theSkills);
            dataArr["#theInstrinsic"] = String(data.theIntrinsic);
            dataArr["#theContextual"] = String(data.theContextual);
            dataArr["#theImage"] = String(data.theImage);
            dataArr["#isAssumption"] = String(data.isAssumption);
            dataArr["#thePersonaType"] = String(data.thePersonaType);
            var theTableArr =[];

            $.ajax({
              type:"GET",
              dataType: "json",
              accept:"application/json",
              data: {
                session_id: String($.session.get('sessionID'))
              },
              crossDomain: true,
              url: serverIP + "/api/personas/name/"+ data.theName,
              success: function(data2){
                var jsonObj = eval(data2);
                var theTableArr = [];
                  for (var key in jsonObj) {
                    if (jsonObj.hasOwnProperty(key)) {
                      if(key == window.personaEnvironment){
                        var goodData =  eval(jsonObj[key]);
                        for (var ky in goodData) {
                          //goodData[ky] = Availibility  + intgr
                          for (var k in goodData[ky]) {
                            if(k == "value"){
                              theTableArr[String(ky)] = String(goodData[ky][k]);
                              debugLogger(String(ky) + " " + String(goodData[ky][k]));
                            }
                            //console.log(goodData[ky][k] + " " + k);
                          }
                        }
                      }
                    }
                  }
                  dataArr["narrative"] = theTableArr;
                  fillOptionMenu("fastTemplates/PersonaOptions.html", "#optionsContent", dataArr,false,true,function(){
                    // Get environment specific narrative here and populate table
                    //$('#narrativeField').value("Some narrative");
                  });
                },
                error: function(xhr, textStatus, errorThrown) {
                  console.log(this.url);
                  debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
                }
              });
            },
          error: function (xhr, textStatus, errorThrown) {
            console.log(String(this.url));
            debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
          }
        });
      }
 
  });
});
