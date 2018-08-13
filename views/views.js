var intro = {
    name: 'intro',
    // introduction title
    "title": "Добро пожаловать!",
    // introduction text
    "text": "Спасибо за участие в исследовании. Пожалуйста, опишите картинки, которые вы увидите.",
    // introduction's slide proceeding button text
    "buttonText": "Начать эксперимент",
    // render function renders the view
    render: function() {

        viewTemplate = $('#intro-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    // for how many trials should this view be repeated?
    trials: 1
};

var instructions = {
    name: 'instructions',
    // instruction's title
    "title": "Интструкции",
    // instruction's text
    "text": "Дополните одно из предложений описанием количества красных точек. Пожалуйста, используйте только количественные местоимения.",
    // instuction's slide proceeding button text
    "buttonText": "Пробный эксперимент",
    render: function() {

        viewTemplate = $("#instructions-view").html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    trials: 1
};

var practice = {
    name: 'practice',
    "title": "Practice trial",
    // render function renders the view
    render: function (CT) {

        viewTemplate = $("#practice-view").html();
        $('#main').html(Mustache.render(viewTemplate, {
        title: this.title,
        question: exp.trial_info.practice_trials[CT].question,
        picture: exp.trial_info.practice_trials[CT].picture,
        questionRightPart: exp.trial_info.practice_trials[CT].questionRightPart,
        questionRightPart2: exp.trial_info.practice_trials[CT].questionRightPart2
        }));
        startingTime = Date.now();
        var next = $('#next');
        var textInput = $('textarea');
        var textInput2 = $('#second');
        textInput.on('keyup', function() {
            // if the text is longer than (in this case) 10 characters without the spaces
            // the 'next' button appears
            if (textInput.val().trim().length > 2) {
                next.removeClass('nodisplay');
            } else if (textInput2.val().trim().length > 2) {
                next.removeClass('nodisplay');
            } else {
                next.addClass('nodisplay');
            }
        });
        next.on('click', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "practice",
                trial_number: CT+1,
                question: exp.trial_info.practice_trials[CT].question,
                text_input: textInput.val().trim(),
                text_input2: textInput2.val().trim(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

//        return view;
    },
    trials: 2
};

var beginMainExp = {
    name: 'beginMainExp',
    "text": "Вы ознакомились с заданием. Далее начинается основной эксперимент.",
    // render function renders the view
    render: function() {

        viewTemplate = $('#begin-exp-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            text: this.text
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    trials: 1
};

var main = {
    name: 'main',
    // render function renders the view
    render : function(CT) {

        // fill variables in view-template
        var viewTemplate = $('#main-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            question: exp.trial_info.main_trials[CT].question,
            picture:  exp.trial_info.main_trials[CT].picture,
            questionRightPart: exp.trial_info.main_trials[CT].questionRightPart,
            questionRightPart2: exp.trial_info.main_trials[CT].questionRightPart2
        }));

//        // update the progress bar based on how many trials there are in this round
//        var filled = exp.currentTrialInViewCounter * (180 / exp.views_seq[exp.currentViewCounter].trials);
//        $('#filled').css('width', filled);

        // event listener for buttons; when an input is selected, the response
        // and additional information are stored in exp.trial_info
        var next = $('#next');
        var textInput = $('textarea');
        var textInput2 = $('#second');
        textInput.on('keyup', function() {
            // if the text is longer than (in this case) 10 characters without the spaces
            // the 'next' button appears
            if (textInput.val().trim().length > 2) {
                next.removeClass('nodisplay');
            } else if (textInput2.val().trim().length > 2) {
                next.removeClass('nodisplay');
            } else {
                next.addClass('nodisplay');
            }
        });
        next.on('click', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "main",
                trial_number: CT+1,
                question: exp.trial_info.main_trials[CT].question,
                text_input: textInput.val().trim(),
                text_input2: textInput2.val().trim(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });
        startingTime = Date.now();

//        return view;
    },

	trials : 10
};

var postTest = {
    name: 'postTest',
    "title": "Additional Info",
    "text": "Answering the following questions is optional, but will help us understand your answers.",
    "buttonText": "Continue",
    // render function renders the view
    render : function() {

        viewTemplate = $('#post-test-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            buttonText: this.buttonText
        }));

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.age = $('#age').val();
            exp.global_data.gender = $('#gender').val();
            exp.global_data.education = $('#education').val();
            exp.global_data.languages = $('#languages').val();
            exp.global_data.comments = $('#comments').val().trim();
            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent = (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // moves to the next view
            exp.findNextView();
        })

    },
    trials: 1
};

var thanks = {
    name: 'thanks',
    "message": "Thank you for taking part in this experiment!",
    render: function() {

        viewTemplate = $('#thanks-view').html();

        // what is seen on the screen depends on the used deploy method
		//    normally, you do not need to modify this
        if ((config_deploy.is_MTurk) || (config_deploy.deployMethod === 'directLink')) {
            // updates the fields in the hidden form with info for the MTurk's server
            $('#main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
            }));
        } else if (config_deploy.deployMethod === 'Prolific') {
            var prolificURL = 'https://prolific.ac/submissions/complete?cc=' + config_deploy.prolificCode;

            $('main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
                extraMessage: "Please press the button below<br />" + '<a href=' + prolificURL +  ' class="prolific-url">Finished!</a>'
            }));
        } else if (config_deploy.deployMethod === 'debug') {
            $('main').html(Mustache.render(viewTemplate, {}));
        } else {
            console.log('no such config_deploy.deployMethod');
        }

        exp.submit();

    },
    trials: 1
};
