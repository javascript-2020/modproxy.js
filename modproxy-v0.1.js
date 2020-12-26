
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
                  var v;
                  if(lname in mem){
                        v=mem[lname];
                                                console.log(`rd : ${lname} - ${v}`);
                        
                  }
                                                console.log(`rd (not found) : ${lname}`);
                  return v;
            }
            
            return newproxy(()=>{},lname);
      
      }//getter
      
      function setter(obj,prop,newval,lname){
      
            lname+='.'+prop;
            lname=lname.slice(1);
                                                console.log(`wt : ${lname} - ${newval}`);
            mem[lname]=newval;
                      
      }//setter
      
      function applyer(target,thisArg,args,lname){
            
            lname=lname.slice(1);
            
            if(lname in mem){
                  var v=mem[lname];
                  if(typeof v==='function'){
                                                console.log(`fn : ${lname} - [${args}]`);
                        return v.call(thisArg,args);
                  }
                  return v;
            }
                                                console.log(`fn (not found): ${lname} - [${args}]`);                              
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

}//modproxy
