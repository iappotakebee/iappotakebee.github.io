function construstTable(timeTable, achievementData, flg_showamount) {
  var cnt = 0;
  return Object.keys(timeTable)
    .filter(function (k) {return timeTable[k];})
    .reverse()
    .map(function (time, id) {
      var name = timeTable[time];
      var index = 0;
      var tmp_comment = "";
      var tmp_type = "";
      var tmp_availability = "";
      var item = achievementData.filter(function (t) { 
        return t.name.indexOf(name) == 0; 
      })[index];
      if (
        time.indexOf("9999") > 1
      ) 
      {
        return {
          idx: "", affiliation: "", month: name, title: "", 
          endperiod: "", year: "",
          comment:"", type: "", url: ""
        };
      } 
      else if (
        time.indexOf("0000") > 1
      ) 
      {
        return {
          idx: "", affiliation: "", month: "\xa0", title: "", 
          endperiod: "", year: "",
          comment:"", type: "", url: ""
        };
      } 
      else {
        cnt++;
        // create temporary comment
        if (flg_showamount != false)
        {
          if (item.amount !== ""){
            tmp_comment = item.amount;
          }
        }
        if (item.period !== ""){
          if (tmp_comment !== ""){
            tmp_comment = tmp_comment+", "+item.period;
          }
          else{
            tmp_comment = item.period;
          }
        }
        if (item.comment !== ""){
          if (tmp_comment !== ""){
            tmp_comment = tmp_comment+", "+item.comment;
          }
          else{
            tmp_comment = item.comment;
          }
        }
        if (tmp_comment !== ""){
          tmp_comment = "("+tmp_comment+")";
        }
        // create temporary type
        if (item.type != "")
        {
          tmp_type = "["+item.type+"]";
        }
        // create temporary url
        if (item.url != "")
        {
          return { 
            idx: cnt+".", affiliation: item.affiliation, month: item.month, 
            title_link: item.title,
            endperiod: item.endperiod, year: item.year, 
            comment: tmp_comment, type: tmp_type,  url: item.url ,
            availability: tmp_availability
          };
        }
        else
        {
          return { 
            idx: cnt+".", affiliation: item.affiliation, month: item.month, 
            title: item.title,
            endperiod: item.endperiod, year: item.year, 
            comment: tmp_comment, type: tmp_type,  url: item.url ,
            availability: tmp_availability
          };
        }
      }
    });
}


$(function () {
  var table_awards = construstTable(time_awards, data_awards);
  var table_resgrnt= construstTable(time_resgrnt, data_resgrnt);
  var table_synchroradleader= 
    construstTable(time_synchroradleader, data_synchroradleader);
  var table_synchroradmember= 
    construstTable(time_synchroradmember, data_synchroradmember);
  var table_resflw = construstTable(time_resflw, data_resflw);
  var table_scholarships = construstTable(time_scholarships, data_scholarships, false);
  var template = $('#template').html();
  Mustache.parse(template);

  var rendered_awards = Mustache.render(template, {table: table_awards, header: "Awards and honors", tag:"Award"});
  var rendered_resgrnt = Mustache.render(template, {table: table_resgrnt, header: "Research grants", tag:"ResGrn"});
  var rendered_synchroradleader = Mustache.render(template, {table: table_synchroradleader, header: "SR experiment proposals as a project leader", tag:"SRExpL"});
  var rendered_synchroradmember = Mustache.render(template, {table: table_synchroradmember, header: "SR experiment proposals as a project member", tag:"SRExpM"});
  var rendered_resflw = Mustache.render(template, {table: table_resflw, header: "Research fellowships", tag:"ResFll"});
  var rendered_scholarships = Mustache.render(template, {table: table_scholarships, header: "Scholarships etc.", tag:"Schlrs"});
  $('.article-headline').html(
    rendered_awards + "<br />" + 
    rendered_resgrnt + "<br />" + 
    rendered_synchroradleader + "<br />" + 
    rendered_synchroradmember + "<br />" + 
    rendered_resflw + "<br />" + 
    rendered_scholarships 
  );
});

