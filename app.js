//  let name = prompt('What is the name of your lynchian-mon');


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
        this.hungerText = ()=>{
        
            if(this.hunger<=4){
                return 'A low grumbling noise stiffens the air'
            } else if (this.hunger<=7){
                return `David Lynchia-mon ${this.name} dislocates his jaw`;
            } else {
                return `David Lynchia-mon ${this.name} corners you and sharpens his teeth with a file`
        }
        }
        this.sleepy = 10;
        this.boredom = 10;
        this.timeAlive = 0;
        this.eatingBind = $('.fa-utensils').on('click', this.eat.bind(this));
        this.sleepyBind = $('.fa-bed').on('click', this.sleep.bind(this));
        this.playBind = $('.fa-gamepad').on('click', this.play.bind(this));
        this.tomaButtons = $('.buttons').on('click', (e) => {
            console.log($(e.currentTarget).attr('id'));
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
                        break;
                    case 1:
                        $('.gameText').text(`David yawn`).animateCss('wobble');
                        this.sleepy++;
                        break;
                    case 2:
                        $('.gameText').text(`David looks aimless`).animateCss('swing');
                        this.boredom++;
                        break;
                }
            }
            if (this.hunger >= 10 || this.sleepy >= 10 || this.boredom >= 10) {
                $('.gameText').text('David has died');
                clearInterval(this.timer)
            }

        }, 1000);

    };
    eat() {
        $('.fa-utensils').animateCss('bounce', () => {
            $('.fa-utensils').removeClass('animated bounce');
        });

        if (this.hunger <= 0) {
            $('.gameText').text('David spits out his food')
        } else if( this.hunger >= 10) { $('.gameText').text(`You cram coffee beans down ${this.name}'s throat, but life does not return`)}
        else {
            $('.gameText').text('David smokes a cigeratte and drinks coffee');
            this.hunger--;
        }
    };
    sleep() {
        $('.fa-bed').animateCss('bounce', () => {
            $('.fa-bed').removeClass('animated bounce');
        });
        if (this.sleepy <= 0) {
            $('.gameText').text('David refuses to sleep');
        } else if( this.sleepy >= 10) { $('.gameText').text(`Your Lynchia-mon ${this.name} sleeps in his bed for weeks. It does not appear he is waking up`)}
        else {
            $('.gameText').text('david sleeps');
            this.sleepy--;
        }
    };
    play() {
        $('.fa-gamepad').animateCss('bounce', () => {
            $('.fa-gamepad').removeClass('animated bounce');
        });
        if (this.boredom <= 0) {
            $('.gameText').text('David looks past you while meditating');
        } else if( this.boredom >= 10) { $('.gameText').text(`Your Lynchia-mon ${this.name} meditates for a week vanishing slowly before your eyes`)}else {
            $('.gameText').text('david plays');
            this.boredom--;
        }
    };
}

const david = new Tomagotchi('david');