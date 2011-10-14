function getUserInfo(data, type) {
    return parseInt($(data).find(type).text()).toString() === 'NaN' ? '' : $(data).find(type).text();
}
if (!document.getElementById('habratooltip')) {
////$(document).ready(function(){
    //
    // logged in user karma
    //
    var nickName = $('div.top a.username.dark');
    if (nickName.text() != '') {
        chrome.extension.sendRequest(
            {
                'action': 'getKarma',
                'user': nickName.text()
            },
            function(data) {
                var rating = getUserInfo(data, 'rating');
                var karma = getUserInfo(data, 'karma');
                nickName.after('&nbsp;<span style="color: #C6C">' + rating + '<span>');
                nickName.after('&nbsp;<span style="color: #6C6">' + karma + '<span>');
            }
        );
    }

    //
    //  authors karma
    //  appear only when visible to prevent multiple xhr to server
    //  server response 503 if more then 3-5 requests in one time
    //

    $(window).scroll(function() {
        if ($('div.author a').size() == $('.karmaloaded').size()) {
            $(window).unbind('scroll');
        }
        $('div.author a:not(.karmaloaded)').each(function() {
//            console.log($(window).scrollTop(), $(window).height(), $(window).scrollTop() + $(window).height(), $(this).offset().top, $(this).height());
//            console.log($(window).scrollTop() > ($(this).offset().top + $(this).height()));
            if ($(window).scrollTop() + $(window).height() > $(this).offset().top) {
                var nickName = $(this);
                nickName.addClass('karmaloaded');
                chrome.extension.sendRequest(
                    {'action': 'getKarma', 'user': nickName.text()},
                    function(data) {
                        var rating = getUserInfo(data, 'rating');
                        var karma = getUserInfo(data, 'karma');
                        nickName.after('&nbsp;<span style="color: #C6C; font-weight: 700;">' + rating + '<span>');
                        nickName.after('&nbsp;&nbsp;<span style="color: #6C6; font-weight: 700;">' + karma + '<span>');
                    });
            }
        });
    });
    $(window).scroll();


    //
    // all users on page tooltips with karma
    //
    $('body').append('<div id="habratooltip"><span id="htkarma" />&nbsp;<span id="htrating" /></div>');

    $('a.username, a.user_name, dt.who a').hover(function(ev) {
        var el = $(this);
        chrome.extension.sendRequest(
            {
                'action': 'getKarma',
                'user': el.text()
            },
            function(data) {
                $('#htkarma').html(getUserInfo(data, 'karma'));
                $('#htrating').html(getUserInfo(data, 'rating'));
                $('#habratooltip').css({
                    'left': ev.pageX ,
                    'top': ev.pageY - 30
                }).show();
            }
        );
    }, function() {
        $('#habratooltip').hide();
    });

//});

}