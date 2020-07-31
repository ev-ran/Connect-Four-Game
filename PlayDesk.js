class Playdesk {

    constructor(row, column) {
        this.row = row;
        this.column = column;

    }

    createArray() {
        var deskArray = [];
        for (var i = 0; i < this.row; ++i) {
            deskArray[i] = [];
            for (var j = 0; j < this.column; ++j) {
                deskArray[i][j] = 0; // a[i] is now an array so this works.
            }
        }

        return deskArray;
    }

    playBalls() {

        for (let i = 0; i < 7; i++) {
            let column = document.querySelector("#col_" + i);

            let random_num = Math.floor(Math.random() * (7 - 2)) + 2;
            for (let j = 0; j < random_num; j++) {
                let color;
                if (Math.random() < 0.5) {
                    color = 'red'
                } else {
                    color = 'black'
                }


                let ball = document.createElement('div');
                ball.className = color;

                console.log("*/*/* " + column)
                column.append(ball)
                this.resetAnimation(ball);

            }
        }
    }

    resetAnimation(element) {
        return element.animate([
            // keyframes

            { transform: 'translateY(27px)' },
            { transform: 'scale(1.00)' },
            { transform: 'translateY(-10px)' },
            { transform: 'scale(0.95)' },
            { transform: 'scale(1)' },
        ], {
            // timing options
            duration: 1000
        });
    }
   
}