class SnakePoint {
  constructor(snake, eat) {
    this.snake = snake || false;
    this.eat = eat || false;
  }
}

const app = new Vue({
    el: '#app',
    data: {
      points: new Array(8000).fill({ snake: false, eat: false }),
      path: +1,
      snake: [0],
      oldSnake: [],
      eat: null,
      direction: null,
      finish: false,
      intervalId: null
    }, 
    methods: {
      startGame() {
        this.points.splice(0, 1, { snake: true })
      },
      step() {
        this.oldSnake = this.snake;
        const newSnake = this.snake.slice();
        newSnake[0] = newSnake[0] + this.path;
        this.snake = newSnake;
        this.snake = this.snake.map((item, index) => {
          if (index === 0) {
            return item;
          }

          return this.oldSnake[index - 1];
        })
        this.points = this.points.map((item, index) => this.snake.find(item => index === item) ? new SnakePoint(true) : index === this.eat ?  new SnakePoint(false, true) :  new SnakePoint());

        if (this.snake[0] === this.eat) {
          this.eatGenerate();
          this.snake.push(this.snake[this.snake.length -1] - 1);
        }
        
        if (typeof this.points[this.snake[0]] !== 'object' ||this.points[this.snake[0] + this.path].snake) {
          this.finish = true;
          clearInterval(this.intervalId);
        }

        // localStorage.setItem('data', JSON.stringify(this._data));
      },
      changeDirection(event) {
        if (event.code === 'ArrowUp') {
          if (this.direction === 'ArrowDown') {
            return;
          }
          this.path = -100;
          this.direction = event.code;
        }

        if (event.code === 'ArrowDown') {
          if (this.direction === 'ArrowUp') {
            return;
          }
          this.path = 100;
          this.direction = event.code;
        }

        if (event.code === 'ArrowLeft') {
          if (this.direction === 'ArrowRight') {
            return;
          }
          this.path = -1;
          this.direction = event.code;
        }
        if (event.code === 'ArrowRight') {
          if (this.direction === 'ArrowLeft') {
            return;
          }
          this.path = 1;
          this.direction = event.code;
        }
      },
      eatGenerate() {
        this.eat = +(Math.random() * 8000).toFixed();
        // this.eat = 10;
      }
    },
    mounted() {
      this.startGame();
      this.intervalId = setInterval(this.step, 75);
      this.eatGenerate();
      document.addEventListener('keydown', this.changeDirection);
    }
})
