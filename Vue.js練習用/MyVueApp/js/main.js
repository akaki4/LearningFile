(function () {
  "use strict";

  let vm = new Vue({
    el: "#app",
    data: {
      newItem: "",
      todos: [],
    },
    watch: {
      todos: {
        handler() {
          localStorage.setItem("todos", JSON.stringify(this.todos));
        },
        deep: true
      }
    },
    mounted: function() {
      this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    },
    methods: {
      addItem(e) {
        let item = {
          title: this.newItem,
          isDone: false
        }
        if (item.title === "") return;
        this.todos.push(item);
        this.newItem = "";
      },
      deleteItem(index) {
        if (confirm("Are you sure?")) {
          this.todos.splice(index, 1);
        }
      },
      purge() {
        if (!confirm("delete finished?")) {
          return;
        }
        this.todos = this.remaining;
      }
    },
    computed: {
      remaining() {
      return this.todos.filter(function(todo) {
        return !todo.isDone;
      });
      }
    }
  });
})();
