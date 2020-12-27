
/*

modproxy.js

26-12-20

*/


function modproxy(notfound){
      
      var mem     = {};          
      return newproxy();
      
      function getter(target,name,receiver,lname){

            lname+='.'+name;
            
            if(name==='valueOf'){
                  var i=lname.lastIndexOf('.');
                  lname=lname.slice(1,i);
                  if(lname in mem){
                        var v=mem[lname];
                                                log(`rd : ${lname} - ${v}`);
                        return v;
                  }
                                                log(`rd (not found) : ${lname}`);
                  return;
            }
            
            return newproxy(()=>{},lname);
      
      }//getter
      
      function setter(obj,prop,newval,lname){
      
            lname+='.'+prop;
            lname=lname.slice(1);
                                                log(`wt : ${lname} - ${newval}`);
            mem[lname]=newval;
                      
      }//setter
      
      function applyer(target,thisArg,args,lname){
            
            lname=lname.slice(1);
            
            if(lname in mem){
                  var v=mem[lname];
                  if(typeof v==='function'){
                                                log(`fn : ${lname} - [${args}]`);
                        return v.call(thisArg,args);
                  }
                  return v;
            }
                                                log(`fn (not found): ${lname} - [${args}]`);                              
      }//applyer
      
      function newproxy(target,lname){
      
            target=target||{};
            lname=lname||'';
            
            return new Proxy(target,{
                      get:(target,name,receiver)=>{return getter(target,name,receiver,lname);},
                      set:(obj,prop,newval)=>{return setter(obj,prop,newval,lname);},
                      apply:(target,thisArg,args)=>{return applyer(target,thisArg,args,lname);}
            });
      
      }//proxy

      
      function log(){
            
            if(typeof modproxy.log==='function')return modproxy.log.apply(null,arguments);
            if(modproxy.log===null)return;
            console.log.apply(null,arguments);
      }//log
      
}//modproxy
