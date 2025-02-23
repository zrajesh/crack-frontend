// Implement Event Emitter

class Emitter {
  constructor() {
    this._subscriptions = new Map();
  }

  subscribe(eventName, callback) {
    if (!callback || typeof callback !== "function") {
      throw new Error("Callback should be a function");
    }

    if (!this._subscriptions.has(eventName)) {
      this._subscriptions.set(eventName, new Map());
    }

    // uuid -> always get unique key
    const subscriptionId = Symbol();

    const eventSubcription = this._subscriptions.get(eventName);
    eventSubcription.set(subscriptionId, callback);

    return {
      release: function () {
        if (!eventSubcription.has(subscriptionId)) {
          throw new Error("Subscription is already released");
        }
        eventSubcription.delete(subscriptionId);
      },
    };
  }

  emit(eventName, ...args) {
    const eventSubcription = this._subscriptions.get(eventName);
    if (!eventSubcription) {
      return;
    }
    eventSubcription.forEach((value) => value(...args));
  }
}

const emitter = new Emitter();

let channel = "";
console.log({ channel });

const subscription = emitter.subscribe("modify", (link) => {
  channel = link;
  console.log({ modifiedChannelLink: channel });
});

emitter.emit("modify", "https://rajeshbhattarai.com/");
subscription.release();
emitter.emit(
  "modify",
  "https://www.youtube.com/channel/UCgfW-cxlW7NlpbOscKJYkfA"
);

console.log({ afterRelease: channel });
