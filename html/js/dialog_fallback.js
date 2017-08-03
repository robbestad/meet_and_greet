dialog_fallback = (function(self, $) {

/***********************

$dialog_fallback/question="et spørsmål?"
$dialog_fallback/answers="svar1;text1;;svar2;text2;;svar3;text3;;svar4;text4"
$dialog_fallback/show_fallback=1

************************/

    self._dialog_fallback_displayed = false;
    self.audio = new Audio('change_screen.ogg');
    multipleClick_clickTime = null;
    multipleClick_target = null;
    function preventMultipleClick(id) {
        sameTarget = false;
        if(id==multipleClick_target) {
            sameTarget = true;
        }
        multipleClick_target = id;
        fastClick = false;
        var currentClickTime = new Date();
        if (currentClickTime - multipleClick_clickTime < 200) {
            fastClick = true;
        }
        multipleClick_clickTime = currentClickTime;
        return (sameTarget && fastClick);
    }


    function _makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    function _add_element(button_title, dialog_text) {
        var element = "dialog_fallback_answers_"+_makeid()
        $('#dialog_fallback_answers').append("<button id='"+element+"'>"+button_title+"</button>");
        $('body').on('touchdown touchmove click', '#'+element, function(){
            if (preventMultipleClick(element)) return;
            $("#"+element).blur();
            self.audio.play();
            session.service("ALTextToSpeech").then( function(tts) { 
                tts.stopAll();
            });
            session.service("ALDialog").then( function(dialog) { 
                dialog.forceInput(dialog_text); 
            });
            self.hide();
        });
    }
    self.parse_answers = function(answers) {
        var l1 = answers.split(";;");
        if (l1.length % 2) {
            $.each(l1, function(element, value) {
                var l2 = value.split(";");
                _add_element(l2[0], l2[1]);
            });
        } else {
            var index=0;
            jQuery.each(l1, function(element, value) {
                var l2 = value.split(";");
                _add_element(l2[0], l2[1]);
                if (index++ % 2) { $('#dialog_fallback_answers').append("<br/>"); }
            });
        }
    }

    self.update = function() {
        $('#dialog_fallback_container').html('<div id="dialog_fallback_question"></div><div id="dialog_fallback_answers"></div>');
        session.getData("dialog_fallback/question").then(function(question) {
            $('#dialog_fallback_question').text(question);
        });
      $('#dialog_fallback_answers').replace("Say Hocus Pocus");
        // session.getData("dialog_fallback/answers").then(function(answers) {
        //     self.parse_answers(answers);
        // });
    }
    self.show = function() {
        $('#dialog_fallback_container').show();
        self._dialog_fallback_displayed = true;
    }
    self.hide = function() {
        $('#dialog_fallback_container').hide();
        self._dialog_fallback_displayed = false;
    }
    session.subscribeToEvent("dialog_fallback/show_fallback", function() {
        if(self._dialog_fallback_displayed) {
            self.hide();
        }
        self.update();
        setTimeout(function (){self.show();}, 1000); 
        
    });
    session.subscribeToEvent("dialog_fallback/hide_fallback", function() {
        self.hide();
    });
    
    $(document).ready(function(){
        $("body").append('<div id="dialog_fallback_container"></div>');
        console.log("Dialog Fallback is active");
        if( $("#dialog_fallback_container").length != 1) {
            console.warn(" You should have ONE div #dialog_fallback_container in your page!");
        }
    });
    return self;


})({}, jQuery);