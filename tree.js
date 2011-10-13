if (!document.getElementById('all-off')) {
//    $(document).ready(function() {
    var ratingSelector = "div.info. div.voting div.mark span.score";

    $(function() {
        $("div.comment").prepend("<div class='tree-button tree-on'></div>");
        $("div#comments.comments_list .title").after(
            "<div id='all-off' class='tree-off'></div>  "
                + "<div id='all-on' class='tree-on'></div>"
                + " минимальная оценка "
                + " <span id='current-max-rating'></span><br/><br/>");

        ratings = [];
        $(ratingSelector).each(function() {
            var intRating = getIntRating($(this));
            if (ratings[intRating] == null) ratings[intRating] = 0;
            ratings[intRating] = ratings[intRating] + 1;
        });

        ratingsText = "";
        for (var i = 0; i < ratings.length; i++) {
            if (ratings[i] != null)
                ratingsText += " <a class='rating-link' href='#' rel='" + i + "'>"
                    + "<span style='font:bold 1.08em/100% Arial,Helvetica,sans-serif; color:#339900;'>"
                    + (i == 0 ? "" : "+") + i + "</span></a> (" + ratings[i] + ")";
        }

        $("#current-max-rating").html(ratingsText);

        function processButton(button) {
            var comment = button.parent();
            button.toggleClass("tree-on");
            button.toggleClass("tree-off");
            comment.find(".message:first").toggleClass("hidden");
            comment.find(".reply:first").toggleClass("hidden");
        }

        $("div.tree-button").click(function() {
            processButton($(this));
            return false;
        });

        $("a.rating-link").click(function() {
            allOff();
            var minRating = parseInt($(this).attr("rel"));
            hideLowRating(minRating);
            return false;
        });


        function allOff() {
            $("div.tree-button.tree-on").each(function() {
                processButton($(this));
            });
        }

        $("#all-off").click(function() {
            allOff();
            return false;
        });

        $("#all-on").click(function() {
            $("div.tree-button.tree-off").each(function() {
                processButton($(this));
            });
            return false;
        });

        function getIntRating(span) {
            var rating = span.text();
            return parseInt(rating);
        }

        function hideLowRating(minRating) {
            $(".highlight").removeClass("highlight");
            $(ratingSelector).each(function() {
                if (getIntRating($(this)) >= minRating) {
                    var info = $(this).parent().parent().parent();
                    var comment = info.parent();
                    info.addClass("highlight");
                    var button = comment.find("div.tree-button.tree-off:first");
                    processButton(button);
                }
            });
        }

    });

//    })
}
