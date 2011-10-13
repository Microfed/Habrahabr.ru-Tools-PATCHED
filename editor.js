if (document.getElementsByClassName('habra-chrome-toolbar').length == 0) {
//    window.onload = function() {
    function tag (TXT, startTag, endTag) {
        TXT.focus();
        if (document.selection) with (document.selection.createRange ())
        {
            var t = text;
            text = startTag + text + endTag;
            if (!t.length) moveEnd ('character', endTag.length * (-1));
            select ();
        } else if (TXT.selectionStart >= 0) with (TXT) {
            var sT = scrollTop, sL = scrollLeft, t = value,
            stS = selectionStart, leS = selectionEnd - stS,
            w = (startTag + t.substr (stS, leS) + endTag).length;
            value = t.substr (0, stS) + startTag + t.substr (stS, leS) + endTag + t.substr (stS + leS);
            if (leS) selectionStart = selectionEnd = stS + w;
            else selectionStart = selectionEnd = stS + startTag.length;
            scrollTop = sT, scrollLeft = sL;
        } else {
            TXT.value += startTag + endTag;
        }
        return false;
    }

    var list = '<ul class="habra-chrome-toolbar">'
        + '<li><a class="habra-toolbar-bold" href="#"><img src="/i/panel/bold_ru.gif" alt="B" title="Жирный" /></a></li>'
        + '<li><a class="habra-toolbar-italic" href="#"><img src="/i/panel/italic_ru.gif" alt="I" title="Курсив" /></a></li>'
        + '<li><a class="habra-toolbar-underline" href="#"><img src="/i/panel/underline_ru.gif" alt="U" title="Подчеркнутый" /></a></li>'
        + '<li><a class="habra-toolbar-strike" href="#"><img src="/i/panel/strikethrough.gif" alt="S" title="Зачеркнутый" /></a></li>'
        + '<li></li>'
        + '<li style="width: 30px"><a class="habra-toolbar-code" style="width: 30px" href="#"><img src="/i/panel/code.gif" alt="Code" title="Код" /></a></li>'
        + '<li></li>'
        + '<li><a class="habra-toolbar-user" href="#"><img src="/i/panel/user.gif" alt="User" title="Хабраюзер" /></a></li>'
        + '<li><a class="habra-toolbar-link" href="#"><img src="/i/panel/link.gif" alt="Link" title="Ссылка" /></a></li>'
        + '<li><a class="habra-toolbar-image" href="#"><img src="/i/panel/image.gif" alt="Image" title="Изображение" /></a></li>'
        + '<li></li>'
        + '<li><a class="habra-toolbar-ul" title="Ненумерованный список" href="#">UL</a></li>'
        + '<li><a class="habra-toolbar-ol" title="Нумерованный список" href="#">OL</a></li>'
        + '<li><a class="habra-toolbar-li" title="Элемент списка" href="#">LI</a></li>'
        + '<li><a class="habra-toolbar-blockquote" title="Цитата" href="#">&laquo;&raquo;</a></li></ul>';

    $('textarea#comment_text').before(list);

    $(".habra-toolbar-bold").click(function(){
        tag($(this).parent().parent().next()[0],'<strong>','</strong>')
        return false;
    })
    $(".habra-toolbar-italic").click(function(){
        tag($(this).parent().parent().next()[0],'<em>','</em>')
        return false;
    })
    $(".habra-toolbar-underline").click(function(){
        tag($(this).parent().parent().next()[0],'<u>','</u>')
        return false;
    })
    $(".habra-toolbar-strike").click(function(){
        tag($(this).parent().parent().next()[0],'<s>','</s>')
        return false;
    })
    $(".habra-toolbar-image").click(function(){
        var temp = prompt('Введите URL изображения','http://')
        if (temp != null) {
            tag($(this).parent().parent().next()[0], '<img src="' + temp + '" />', '')
            }
        return false;
    })
    $(".habra-toolbar-link").click(function(){
        var temp = prompt('Введите URL','http://')
        if (temp != null) {
            tag($(this).parent().parent().next()[0], '<a href="' + temp + '">', '</a>')
            }
        return false;
    })
    $(".habra-toolbar-user").click(function(){
        var temp = prompt('Введите никнейм хабраюзера')
        if (temp != null) {
            tag($(this).parent().parent().next()[0], '<hh user="' + temp + '" />', '')
            }
        return false;
    })
    $(".habra-toolbar-code").click(function(){
        var temp = prompt('bash, cpp, cs, xml, html, java, javascript, lisp, lua, php, perl, python, ruby, sql, scala, tex')
        if (temp != null) {
            tag($(this).parent().parent().next()[0], '<source lang="' + temp + '">', '</source>')
        }
        return false;
    })
    $(".habra-toolbar-ul").click(function(){
        tag($(this).parent().parent().next()[0],'<ul>','</ul>')
        return false;
    })
    $(".habra-toolbar-ol").click(function(){
        tag($(this).parent().parent().next()[0],'<ol>','</ol>')
        return false;
    })
    $(".habra-toolbar-li").click(function(){
        tag($(this).parent().parent().next()[0],'<li>','</li>')
        return false;
    })
    $(".habra-toolbar-blockquote").click(function(){
        tag($(this).parent().parent().next()[0],'<blockquote>','</blockquote>')
        return false;
    })
//    }
}