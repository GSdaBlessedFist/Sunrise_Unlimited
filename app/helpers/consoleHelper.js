const p = function (sourceName,data, hue=25, variableName="") {
    const color = `hsl(${hue},100%,50%)`;
    const dimmedColor = `hsl(${hue},80%,50%)`;
  

    //example::  const SOURCE = "Render Page";// "Render Page off";
    //the console.log is turned off
    
    if(sourceName.includes("off")){
      return;
    }else{
      if (typeof data === "object") {
        if (Array.isArray(data)) {
          console.log(
            `%c${sourceName}: %c${variableName}: %o`,
            `font-weight:bold;color:${color};
             font-size:1.15rem;`,
            `font-weight:normal;color:${dimmedColor};
             font-size:1.05rem;`,
            data
          );
        } else {
          console.log(
            `%c${sourceName}: %c${variableName}: %o`,
            `font-weight:bold;color:${color};
             font-size:1.15rem;`,
            `font-weight:normal;color:${dimmedColor};
             font-size:1.05rem;`,
            data
          );
        }
      } else {
        console.log(
          `%c${sourceName}: %c${variableName}: %s`,
          `font-weight:bold;color:${color};
           font-size:1.15rem;`,
          `font-weight:normal;color:${color};
          font-size:1.05rem;`,
          data
        );
      }
    }
    
  };

  module.exports = p;