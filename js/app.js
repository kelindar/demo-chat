var channel = "presence-demo/" + Math.random().toString(16).substr(2, 8) ; 
var client0 = emitter.connect({ secure: true, clientId: "Myself" });
var client1 = null;
var client2 = null; 

var key = 'X4-nUeHjiAygHMdN8wst82S3c2KcCMn7';
var vue = new Vue({
    el: '#app',
    data: {
        users: [],
        occupancy: 0,
        device1: "login",
        device2: "login"
    },
    methods: {
        toggleDevice1: function () {
            client1 = toggleConnection(client1, "Margaret H.");
            vue.$data.device1 = (client1) ? "logout" : "login";
        },

        toggleDevice2: function() {
            client2 = toggleConnection(client2, "Alan K.");
            vue.$data.device2 = (client2) ? "logout" : "login";
        },

        getPresence: function() {
            // Query the presence state
            client0.presence({
                key: key,
                channel: channel
            })
        }
    }
});


/**
 * Function that togggles the connection on a particular emitter client.
 */
function toggleConnection(client, name) {
    if(client) {
        // If client is already connected, disconnect it
        client.disconnect();
        return null;
    } else {
        // If client is not yet connected, connect and subscribe to the channel
        client = emitter.connect({ secure: true, clientId: name });
        client.on('connect', function(){
            client.subscribe({
                key: key,
                channel: channel
            });
        });
        return client;
    }
}

client0.on('connect', function(){
    // once we're connected, subscribe to the 'chat' channel
    console.log('emitter: connected');
    client0.subscribe({
        key: key,
        channel: channel,
        presence: true
    });
})

// on every presence event, print it out
client0.on('presence', function(msg){
    console.log(msg);    
    var users = vue.$data.users;
    if (msg.action){
        // We've received a presence state change notification, when
        // someone joins or leaves the channel.
        if(msg.action == 'join'){
            users.push({ 
                name: msg.client
            })
        } else if(msg.action == 'leave') {
            vue.$data.users = users.filter(function( obj ) {
                return obj.name !== msg.client;
            });
        }
    } 
    
    if(msg.clients){
        // We've received a full response with a complete list of clients
        // that are currently subscribed to this channel. 
        for(var i=0; i<msg.clients.length;++i){
            users.push({
                name: msg.clients[i]
            });
        }
    }

    // Also, set the occupancy
    vue.$data.occupancy = msg.occupancy;
});