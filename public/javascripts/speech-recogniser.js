(function($) {

    $(document).ready(function() {

        try {
            var recognition = new webkitSpeechRecognition();
        } catch(e) {
            var recognition = Object;
        }
        recognition.continuous = true;
        recognition.interimResults = true;
        interimResult = '';


        $( ".speech-mic" ).toggle(function() {
            textAreaID = this.getAttribute('data-dictation-id');
            textArea = $("#" + textAreaID);
            $(this).removeClass('speech-mic').addClass('speech-mic-works');
            startRecognition(textArea);
        }, function() {
            $(this).removeClass('speech-mic-works').addClass('speech-mic');
            recognition.stop();
        });

        var startRecognition = function(textArea) {
            $('.speech-content-mic').removeClass('speech-mic').addClass('speech-mic-works');
            textArea.focus();
            recognition.start();
        };

        recognition.onresult = function (event) {
            var pos = textArea.getCursorPosition() - interimResult.length;
            textArea.val(textArea.val().replace(interimResult, ''));
            interimResult = '';
            textArea.setCursorPosition(pos);
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    insertAtCaret(textArea.attr('id'), event.results[i][0].transcript);
                } else {
                    isFinished = false;
                    insertAtCaret(textArea.attr('id'), event.results[i][0].transcript + '\u200B');
                    interimResult += event.results[i][0].transcript + '\u200B';
                }
            }
        };

        recognition.onend = function() {
            $('.speech-content-mic').removeClass('speech-mic-works').addClass('speech-mic');
        };
        
    });
})(jQuery);