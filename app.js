//  let name = prompt('What is the name of your lynchian-mon');


class Tomagotchi {
    constructor(name) {
        this.name = name;
        this.hunger = 5;
        this.sleepy = 0;
        this.boredom = 0;
        this.timeAlive = 0;
        this.eatingBind = $('.fa-utensils').on('click', this.eat.bind(this));
        this.sleepyBind = $('.fa-bed').on('click', this.sleep.bind(this));
        this.playBind = $('.fa-gamepad').on('click', this.play.bind(this));

        this.timer = setInterval(() => {
            this.timeAlive++;
            console.log(this.timeAlive);

            if (this.timeAlive % 10 === 0) {
                console.log(this);
                const randomNum = Math.floor(Math.random() * (2 + 1));
                console.log('random', randomNum);
                switch (randomNum) {
                    case 0:
                        this.hunger++;
                        break;
                    case 1:
                        this.sleepy++;
                        break;
                    case 2:
                        this.boredom++;
                        break;
                }
            }
            if (this.hunger >= 10 || this.sleepy >= 10 || this.boredom >= 10) {
                console.log('David has died');
                clearInterval(this.timer)
            }

        }, 1000);

    };
    eat() {

        if (this.hunger <= 0) {
            console.log('David spits out the food')
        } else {
            console.log('David is eating', this.hunger);
            this.hunger--;
        }
    };
    sleep() {
        if (this.sleepy <= 0) {
            console.log('David refuses to sleep')
        } else {
            console.log('david sleeps');
            this.sleepy--;
        }
    };
    play() {
        if (this.boredom <= 0) {
            console.log('David looks past you while meditating')
        } else {
            console.log('david plays');
            this.play--;
        }
    };
}

const david = new Tomagotchi('david');