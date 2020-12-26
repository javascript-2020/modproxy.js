# modproxy.js

developed for calling functions,using variables in different context




    var mod=modproxy();
    
    
    mod.callme.first.now('hello','world');
    
    mod.hello.world.plot=555;
    
    
    console.log(mod.peter.piper.lucky.john.valueOf);
    
    console.log(mod.hello.world.plot.valueOf);


    mod.hello.world=function(){alert(1);return 777;};
    
    console.log(mod.hello.world());

    
    mod.www.a(99);
    mod.www.b(98);
    
    
