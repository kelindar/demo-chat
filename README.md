# Serverless Chat with emitter.io
* Source-Code: https://github.com/Kelindar/demo-chat
* Tutorial: http://www.codeproject.com/Articles/1113531/Serverless-HTML-Chat-with-Emitter-Vue-and-Bootstra

![screen](https://github.com/emitter-io/demo-chat/raw/master/demo.gif) 

This article presents a group chat tutorial, allowing multiple participants to chat together. It also features things such [identicons](https://jdenticon.com/), two-way data binding using [vue.js](https://vuejs.org/), [bootstrap css](https://getbootstrap.com/css/) and CSS animations with help of [ani
mate.css](https://daneden.github.io/animate.css/). Below is a code-snipped from the source code.

```javascript
emitter.on('connect', function(){
    // once we're connected, subscribe to the 'chat' channel
    console.log('emitter: connected');
    emitter.subscribe({
        key: key,
        channel: "article1",
        last: 5
    });

    jdenticon.update(".img-circle");
})

// on every message, print it out
emitter.on('message', function(msg){
    console.log('emitter: received ' + msg.asString() );
    vue.$data.messages.push(msg.asObject());
    setTimeout(function(){ 
        jdenticon.update(".img-circle");
    },5);
});
```
