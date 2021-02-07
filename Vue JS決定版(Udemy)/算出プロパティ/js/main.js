(function () {
	"use strict";

  let app = new Vue({
    el: "#app",
    data: {
      message: "Hello Vue.js!"
    },
    computed: {
      reversedMessage() {
        return this.message.split('').reverse().join("");
        
      }
    },
    watch: {
      message(newValue, oldValue) {
        console.log('new: %s, old: %s', newValue, oldValue)
      }
    }
	});
})();