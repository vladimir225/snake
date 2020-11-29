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
      eat: null,
      snakeLenght: 1
    }, 
    methods: {
      startGame() {
        this.points.splice(0, 1, { snake: true })
      },
      test: () => console.log(1),
      // step() {
      //   console.log(1)
      //   let isSnake = null;
      //   this.points = this.points.map(item => {
      //     if (isSnake) {
      //       isSnake = false;
      //       return { snake: true }
      //     }
      //     if (item.snake) {
      //       isSnake = true;
      //       return { snake: false }
      //     } else {
      //       return item
      //     }
      //   })
      // }
      step() {
        // this.snake[0] = this.snake[0] + this.path;
        this.snake = this.snake.map(item => item + this.path);
        this.points = this.points.map((item, index) => this.snake.find(item => index === item) ? new SnakePoint(true) : index === this.eat ?  new SnakePoint(false, true) :  new SnakePoint());

        if (this.snake[0] === this.eat) {
          this.eatGenerate();
          this.snakeLenght = this.snakeLenght + 1;
          this.snake.push(this.snake[this.snake.length -1] - 1);
        }
      },
      changeDirection(event) {
        if (event.code === 'ArrowUp') {
          this.path = -100;
        }

        if (event.code === 'ArrowDown') {
          this.path = 100;
        }

        if (event.code === 'ArrowLeft') {
          this.path = -1;
        }
        if (event.code === 'ArrowRight') {
          this.path = 1;
        }
      },
      eatGenerate() {
        this.eat = +(Math.random() * 8000).toFixed();
        // this.eat = 10;
      }
    },
    mounted() {
      this.startGame();
      setInterval(this.step, 100);
      this.eatGenerate();
      document.addEventListener('keydown', this.changeDirection);
    }
})