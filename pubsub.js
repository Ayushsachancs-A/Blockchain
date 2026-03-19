const PubNub = require('pubnub');
const Block = require('./block');

const credentials = {
    publishKey: 'pub-c-6fb0d3b8-6754-409b-ba48-0363c1ebe208',
    subscribeKey: 'sub-c-cfa78414-de30-4cb7-b31d-57a8df74bcc6',
    secretKey: 'sec-c-NGFhODI0NTEtMDYzNS00ZDZlLThmYjctYzliMGY1ZmZjYjdk'
}; 

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub {
  constructor({ blockchain }) {
    this.blockchain = blockchain;

    this.pubnub = new PubNub(credentials);
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    this.pubnub.addListener(this.listener());
  }

  handleMessage(channel, message) {
    console.log(`Message received. Channel: ${channel}. Message: ${message}`);

    const parsedMessage = JSON.parse(message);

    if (channel === CHANNELS.BLOCKCHAIN) {
        this.blockchain.replaceChain(parsedMessage);
    }
  }


  listener() {
    return {
      message: messageObject => {
        const { channel, message } = messageObject;

        this.handleMessage(channel, message);
      }
    };
  }

  publish({ channel, message}) {
    this.pubnub.publish({ channel, message });
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    });
  }
}

module.exports = PubSub;