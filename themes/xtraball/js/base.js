
/* Highlight */
$( document ).ready(function() {
    hljs.initHighlightingOnLoad();
    $('table').addClass('table table-striped table-hover');
});


$('body').scrollspy({
    target: '.bs-sidebar',
});


/* Prevent disabled links from causing a page reload */
$("li.disabled a").click(function() {
    event.preventDefault();
});

/* jQuery scroll */
var aside_top = $('#aside-dock').offset().top - 20;
var aside_width = $('#aside-dock').width();
$(window).scroll(function () {
    position();
});
$(window).resize(function() {
    $('#aside-dock').width('');
    $('#aside-dock').css('position', 'relative');
    aside_width = $('#aside-dock').width();
    position();
});

function position() {
    if ($(window).scrollTop() > aside_top) {
        $('#aside-dock').css({
            top: 20,
            width: aside_width,
            position: 'fixed'
        });
    } else {
        $('#aside-dock').css({
            top: 0,
            width: '',
            position: 'relative'
        });
    }
}