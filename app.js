

// All images from David Lynch Teaches Typing by RhinoStew
// https://rhinostew.itch.io/david-lynch-teaches-typing
// https://www.rhinostewproductions.com/
// images/david-lynch-teaches-typing-4-620x223 (2).jpg thumbs up
//images/david-lynch-teaches-typing-5-620x354 (2).jpg david sad
// images/david-lynch-teaches-typing-9-620x349 (2).jpg happy dead
// images/david-lynch-teaches-typing-1-620x320 (2).jpg nuetral 
$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = (function (el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    }
});


class Tomagotchi {
    constructor(name) {
        this.name = name;
        this.hunger = 0;
        //this.hungerText etc are functions which return text dependant on Davids current state, when time rolls on [idea was to make an array and randomize from a min of three state changes, buuuuuut feature creep]
        this.hungerText = () => {

            if (this.hunger <= 4) {
                return 'A low grumbling noise stiffens the air'
            } else if (this.hunger <= 7) {
                return `David Lynchia-mon ${this.name} dislocates his jaw`;
            } else {
                return `David Lynchia-mon ${this.name} corners you and sharpens his teeth with a file`
            }
        };


        this.sleepy = 0;
        this.sleepyText = () => {

            if (this.sleepy <= 4) {
                return 'Sleep deprivation is a one-way ticket to temporary psychosis'
            } else if (this.sleepy <= 7) {
                return `David Lynchia-mon ${this.name} lays in bed staring straight at the lightbulb`;
            } else {
                return `David Lynchia-mon ${this.name} shackingly sips his coffee `
            }
        };
        this.boredom = 0;
        this.boredomText = () => {

            if (this.boredom <= 4) {
                return `The ideas dictate everything, you have to be true to that or you're dead.`
            } else if (this.boredom <= 7) {
                return `David Lynchia-mon ${this.name} starts playing with napkins attempting to fold them into origami`;
            } else {
                return `David Lynchia-mon ${this.name} stares at you completly not blinking`
            }
        }
        this.dead = false;
        this.timeAlive = 0;
        this.eatingBind = $('.fa-utensils').on('click', this.eat.bind(this));
        this.sleepyBind = $('.fa-bed').on('click', this.sleep.bind(this));
        this.playBind = $('.fa-gamepad').on('click', this.play.bind(this));
        this.tomaButtons = $('.buttons').on('click', (e) => {
            // This allows us to move the selector from the Buttons rather than click
            const targetId = $(e.currentTarget).attr('id');
            switch (targetId) {
                case 'buttonLeft':
                    if ($('.iconSelected').prev().is('i')) {;
                        let currSelect1 = $('.iconSelected');
                        $('.iconSelected').prev().addClass('iconSelected');
                        currSelect1.removeClass('iconSelected')
                    } else {};

                    break;
                case 'buttonRight':
                    if ($('.iconSelected').next().is('i')) {
                        let currSelect2 = $('.iconSelected');
                        $('.iconSelected').next().addClass('iconSelected');
                        currSelect2.removeClass('iconSelected');
                    } else {}

                    break;
                case 'buttonSelect':
                    const selectedClass = $('.iconSelected');
                    if (selectedClass.hasClass('fa-bed')) {
                        this.sleep()
                    } else if (selectedClass.hasClass('fa-utensils')) {
                        this.eat();
                    } else if (selectedClass.hasClass('fa-gamepad')) {
                        this.play();
                    }
                default:



            }
        })
        // Timer sets the random negative tribute given to David, and evaluates if david dies
        this.timer = setInterval(() => {
            this.timeAlive++;
            $('.fa-skull').text(`: ${this.timeAlive}`);

            if (this.timeAlive % 10 === 0) {
                console.log(this);
                const randomNum = Math.floor(Math.random() * (2 + 1));
                console.log('random', randomNum);
                switch (randomNum) {
                    case 0:
                        $('.gameText').text(this.hungerText()).animateCss('shake');
                        this.hunger++;
                        $('img').attr('src',`images/david-lynch-teaches-typing-5-620x354 (2).jpg`);
                        break;
                    case 1:
                        $('.gameText').text(this.sleepyText()).animateCss('wobble');
                        this.sleepy++;
                        $('img').attr('src',`images/david-lynch-teaches-typing-5-620x354 (2).jpg`);
                        break;
                    case 2:
                        $('.gameText').text(this.boredomText()).animateCss('swing');
                        this.boredom++;
                        $('img').attr('src',`images/david-lynch-teaches-typing-5-620x354 (2).jpg`);
                        break;
                }
            }
            if (this.hunger >= 10 || this.sleepy >= 10 || this.boredom >= 10) {
                $('.gameText').text(`Your lynchia-mon ${this.name} has died`);
                this.dead = true;
                $('img').attr('src',`images/david-lynch-teaches-typing-9-620x349 (2).jpg`);
                clearInterval(this.timer)
            }
            if(this.timeAlive === 60){
            //    const test = new ErasureLynch('Penny');
            //    clearInterval(this.timer);
            //     test.timeAlive = 60;
            $('img').attr('src',`images/eraserhead-david-lynch-1200x520.jpg`);
            $('.gameText').text(`${this.name} has evolved to an eraser lynchia-mon`)
            }

        }, 1000);

    };
    //Sleep,play, eat are all functions called when the player wishes to reward David.
    // functions also handle the response text depending on the level of mistreatment
    eat() {
        $('.fa-utensils').animateCss('bounce', () => {
            $('.fa-utensils').removeClass('animated bounce');
        });

        if (this.dead) {
            $('.gameText').text(`You cram coffee beans down ${this.name}'s throat, but life does not return`)
        } else if (this.hunger <= 0) {
            $('.gameText').text('David spits out his food')
        } else {
            $('.gameText').text('David smokes a cigeratte and drinks coffee');
            this.hunger--;
            $('img').attr('src',`images/tumblr_p4xrzxpeYd1tbbfaeo1_500 (2).jpg`);
        }
    };

    sleep() {
        $('.fa-bed').animateCss('bounce', () => {
            $('.fa-bed').removeClass('animated bounce');
        });
        if (this.dead) {
            $('.gameText').text(`Your Lynchia-mon ${this.name} sleeps in his bed for weeks. It does not appear he is waking up`)
        } else if (this.sleepy <= 0) {
            $('.gameText').text('David refuses to sleep');
        } else {
            $('.gameText').text('david sleeps');
            this.sleepy--;
            $('img').attr('src',`images/david-lynch-teaches-typing-4-620x223 (2).jpg`);
        }
    };
    play() {
        $('.fa-gamepad').animateCss('bounce', () => {
            $('.fa-gamepad').removeClass('animated bounce');
        });
         if (this.dead) {
            $('.gameText').text(`Your Lynchia-mon ${this.name} meditates for a week vanishing slowly before your eyes`)
        }
        else if (this.boredom <= 0) {
            $('.gameText').text('David looks past you while meditating');
        }  else {
            $('.gameText').text('david plays');
            this.boredom--;
            $('img').attr('src',`images/david-lynch-teaches-typing-4-620x223 (2).jpg`);
        }
    };
}




// class ErasureLynch extends Tomagotchi {
//     constructor () {
//         super(name);
//         this.superLynch =  $('img').attr('src',`images/eraserhead-david-lynch-1200x520.jpg`);
//         this.evolText =  $('.gameText').text(`${this.name} has evolved to an eraser lynchia-mon`)
//     }
// }

// let name = prompt('What is the name of your lynchian-mon');

const david = new Tomagotchi('name');

$('i').on('mouseenter', (e)=>{
    $('i').removeClass('iconSelected')
    $(e.currentTarget).addClass('iconSelected');
})




 