const PubNub = require('pubnub');

const credentials = {
    publishKey: 'pub-c-6fb0d3b8-6754-409b-ba48-0363c1ebe208',
    subscribeKey: 'sub-c-cfa78414-de30-4cb7-b31d-57a8df74bcc6',
    secretKey: 'sec-c-NGFhODI0NTEtMDYzNS00ZDZlLThmYjctYzliMGY1ZmZjYjdk'
}; 

const CHANNELS = {
    TEST: 'TEST',
};

class PubSub {
    constructor() {
        this.pubnub = new PubNub(credentials);
        this.pubnub.subscribe({ channels: Object.values(CHANNELS) });

        this.pubnub.addListener(this.lishten());
    }

    lishten() {
        return {
              message: messageObject => {
                const { channel, message } = messageObject;
                console.log(`Message received. Channel: ${channel}. Message: ${message}`);  
            }
        };
    }

    publish({ channel, message }) {
        this.pubnub.publish({ channel, message });
    }
}

const testPubSub = new PubSub();

testPubSub.publish({ channel: CHANNELS.TEST, message: 'hello world' });

module.exports = PubSub;