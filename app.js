class Tomagotchi {
    constructor(name) {
        this.name = name;
        this.hunger = 0;
        this.sleepy = 0;
        this.boredom = 0;
    }
    eat(){
        console.log('David is eating')
    }
    sleep(){
        console.log('david sleeps')
    }
    play(){
        console.log('david plays')
    }
}

const david = new Tomagotchi('david');
