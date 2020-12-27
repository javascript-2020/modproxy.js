
/*

modproxy.js

26-12-20

*/


function modproxy(notfound){
      
      var mem     = {};          
      return newproxy();
      
      function getter(target,name,receiver,lname){
            
            if(name==='valueOf'){
                  lname=lname.slice(1);
                  if(lname in mem){
                        var v=mem[lname];
                                                log(`rd : ${lname} - ${v}`);
                        return v;
                  }
                                                log(`rd (not found) : ${lname}`);
                  return;
            }
            
            lname+='.'+name;
            return newproxy(()=>{},lname);
      
      }//getter
      
      function setter(target,name,newval,lname){
      
            lname+='.'+name;
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
                      set:(target,name,newval)=>{return setter(target,name,newval,lname);},
                      apply:(target,thisArg,args)=>{return applyer(target,thisArg,args,lname);}
            });
      
      }//proxy

      
      function log(){
            
            if(typeof modproxy.log==='function')return modproxy.log.apply(null,arguments);
            if(modproxy.log!==undefined)return;
            console.log.apply(null,arguments);
      }//log
      
}//modproxy
