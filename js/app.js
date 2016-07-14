var emitter = emitter.connect({
    secure: true
}); 
var key = 'vf2s1vw4xu4cSUUILDaRCNzBLt1I7Voq';
var vue = new Vue({
    el: '#app',
    data: {
        messages: [],
        message: '',
        emoji: [
            "😀", "😬", "😁", "😂", "😃", "😄", "😅", "😆", "😇", "😉", "😊",
            "🙂", "😋", "😌", "😍", "😘", "😗", "😙", "😚", "😜", "😝", "😛", 
            "😎", "😏", "😶", "😐", "😑", "😒", "😳", "😞", "😟", "😠", "😡",
            "😔", "😕", "🙁", "☹", "😣", "😖", "😫", "😩", "😤", "😮", "😱",
            "😨", "😰", "😯", "😦", "😧", "😢", "😥", "😪", "😓", "😭", "😵", 
            "😲", "😷"
        ]
    },
    methods: {
        sendMessage: function () {
            var message = this.$data.message;
            this.$data.message = '';

	        // publish a message to the chat channel
	        console.log('emitter: publishing');
	        emitter.publish({
                key: key,
                channel: "article1/" + getPersistentVisitorId(),
                ttl: 1200,
                message: JSON.stringify({
                    name: 'test',
                    hash: getPersistentVisitorId(),
                    text: message,
                    date: new Date()
                })
            });
        },

        append: function(emoji) {
            this.$data.message += ' ' + emoji + ' ';
        }
    }
});

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