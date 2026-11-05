/* Sections: show one top section of a long page at a time, with a rebuilt side nav */
function sbSections() {
    var $main = $('div[role="main"]');
    var $side = $('#aside-dock .bs-sidebar');
    if (!$main.length || !$side.length) {
        return;
    }

    var h1Count = $main.children('h1').length;
    var secTag = h1Count > 1 ? 'h1' : 'h2';
    var secLevel = parseInt(secTag.charAt(1), 10);
    var subSelector = 'h' + (secLevel + 1) + ', h' + (secLevel + 2);

    var kids = $main.children().detach().toArray();
    var title = null;
    var groups = [];
    var current = null;

    $.each(kids, function (i, el) {
        var tag = el.tagName.toLowerCase();
        if (tag === secTag) {
            current = {heading: el, title: $(el).text(), nodes: [el]};
            groups.push(current);
        } else if (!current) {
            if (!title && tag === 'h1' && secTag === 'h2') {
                title = el;
            } else {
                current = {heading: null, title: 'Introduction', nodes: [el]};
                groups.push(current);
            }
        } else {
            current.nodes.push(el);
        }
    });

    var pinned = [];
    if (groups.length && (!groups[0].heading || groups[0].heading.tagName.toLowerCase() === 'h1')) {
        var intro = groups[0];
        var heavy = intro.nodes.length > 6;
        $.each(intro.nodes.slice(intro.heading ? 1 : 0), function (ni, node) {
            if (/^h[1-6]$/i.test(node.tagName)) {
                heavy = true;
            }
        });
        if (!heavy) {
            pinned = intro.nodes;
            groups.shift();
        }
    }

    if (groups.length < 2) {
        $main.append(kids);
        return;
    }

    if (title) {
        $main.append(title);
    }
    if (pinned.length) {
        $main.append($('<div class="sb-lead"></div>').append(pinned));
    }

    var $nav = $('<ul class="nav sb-sections"></ul>');
    $.each(groups, function (gi, group) {
        var $section = $('<section class="sb-section" data-index="' + gi + '"></section>').append(group.nodes);
        group.$el = $section;
        $main.append($section);

        var $li = $('<li class="sb-sec"></li>');
        var firstId = group.heading ? group.heading.id : '';
        var $link = $('<a href="#' + firstId + '" data-index="' + gi + '"></a>').text(group.title);
        $li.append($link);

        var $subs = $('<ul class="sb-subs"></ul>');
        $section.find(subSelector).each(function () {
            if (!this.id) {
                return;
            }
            var depth = this.tagName.toLowerCase() === 'h' + (secLevel + 1) ? 1 : 2;
            $subs.append($('<li class="sb-sub sb-depth-' + depth + '"></li>')
                .append($('<a href="#' + this.id + '" data-index="' + gi + '"></a>').text($(this).text())));
        });
        if ($subs.children().length) {
            $li.append($subs);
        }
        group.$li = $li;
        $nav.append($li);

        var $pager = $('<div class="sb-pager"></div>');
        if (gi > 0) {
            $pager.append($('<a class="sb-prev" href="#"></a>').attr('data-go', gi - 1)
                .html('<i class="fa fa-arrow-left"></i> ' + $('<i>').text(groups[gi - 1].title).html()));
        }
        $section.data('pager', $pager);
    });
    $.each(groups, function (gi, group) {
        var $pager = group.$el.data('pager');
        if (gi < groups.length - 1) {
            $pager.append($('<a class="sb-next" href="#"></a>').attr('data-go', gi + 1)
                .html($('<i>').text(groups[gi + 1].title).html() + ' <i class="fa fa-arrow-right"></i>'));
        }
        group.$el.append($pager);
    });

    var $toggle = $('<a href="#" class="sb-fullpage"><i class="fa fa-list"></i> Show full page</a>');
    $side.find('ul.nav').first().replaceWith($nav);
    $side.prepend($toggle);

    function show(index, hashTarget, noScroll) {
        $.each(groups, function (gi, group) {
            var on = gi === index;
            group.$el.toggleClass('active', on);
            group.$li.toggleClass('active', on);
        });
        if (hashTarget && document.getElementById(hashTarget)) {
            document.getElementById(hashTarget).scrollIntoView();
        } else if (!noScroll) {
            var top = ($main.offset() || {top: 0}).top - 20;
            $(window).scrollTop(Math.max(0, top));
        }
        spy();
    }

    function groupOf(id) {
        var el = id ? document.getElementById(id) : null;
        if (!el) {
            return -1;
        }
        var $s = $(el).closest('.sb-section');
        return $s.length ? parseInt($s.attr('data-index'), 10) : -1;
    }

    var firstRun = true;
    function fromHash() {
        var id = decodeURIComponent((location.hash || '').replace(/^#/, ''));
        var gi = groupOf(id);
        show(gi >= 0 ? gi : 0, gi >= 0 ? id : '', firstRun && gi < 0);
        firstRun = false;
    }

    function spy() {
        var $active = $main.find('.sb-section.active');
        var found = '';
        $active.find(subSelector + ', ' + secTag).each(function () {
            if (this.id && this.getBoundingClientRect().top < 140) {
                found = this.id;
            }
        });
        $nav.find('a').removeClass('current');
        if (found) {
            $nav.find('a[href="#' + found + '"]').addClass('current');
        }
    }

    $nav.on('click', 'a', function (e) {
        e.preventDefault();
        var gi = parseInt($(this).attr('data-index'), 10);
        var id = $(this).attr('href').replace(/^#/, '');
        history.replaceState(null, '', '#' + id);
        show(gi, $(this).closest('.sb-sub').length ? id : '');
    });
    $main.on('click', '.sb-pager a', function (e) {
        e.preventDefault();
        var gi = parseInt($(this).attr('data-go'), 10);
        var h = groups[gi].heading;
        history.replaceState(null, '', h && h.id ? '#' + h.id : location.pathname);
        show(gi, '');
    });
    $toggle.on('click', function (e) {
        e.preventDefault();
        var full = $('body').toggleClass('sb-full').hasClass('sb-full');
        $toggle.html(full ? '<i class="fa fa-columns"></i> Show one section' : '<i class="fa fa-list"></i> Show full page');
    });
    $(window).on('hashchange', fromHash).on('scroll', spy);

    fromHash();
}
/* Folder trees: turn "raw" code blocks drawn with box characters into icon trees */
function sbTrees() {
    var fileTypes = {
        php: ['fa-file-text-o', 'php'], js: ['fa-file-text-o', 'js'], json: ['fa-file-text-o', 'json'],
        html: ['fa-file-text-o', 'html'], xml: ['fa-file-text-o', 'html'], phtml: ['fa-file-text-o', 'html'],
        css: ['fa-file-text-o', 'css'], scss: ['fa-file-text-o', 'css'], po: ['fa-file-text-o', 'po'],
        sql: ['fa-file-text-o', 'po'], md: ['fa-file-text-o', 'plain'], txt: ['fa-file-text-o', 'plain'],
        png: ['fa-picture-o', 'img'], jpg: ['fa-picture-o', 'img'], jpeg: ['fa-picture-o', 'img'],
        gif: ['fa-picture-o', 'img'], svg: ['fa-picture-o', 'img'], zip: ['fa-archive', 'plain']
    };

    function esc(text) {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    $('pre code').each(function () {
        var $code = $(this);
        var text = $code.text();
        if (!/[├└]/.test(text)) {
            return;
        }

        var rows = [];
        $.each(text.replace(/\s+$/, '').split('\n'), function (i, line) {
            var m = line.match(/^([│ ]*)([├└]─+ ?)?(.*)$/);
            var prefix = m[1];
            var connector = m[2] || '';
            var rest = m[3];
            var split = rest.match(/^(.*?)(\s+(?:\/\/|\/\*).*)?$/);
            rows.push({
                guides: prefix,
                depth: Math.floor(prefix.length / 3) + (connector ? 1 : 0),
                last: connector.charAt(0) === '└',
                branch: !!connector,
                name: $.trim(split[1]),
                comment: $.trim(split[2] || '')
            });
        });

        var html = '';
        $.each(rows, function (i, row) {
            var next = rows[i + 1];
            var isEllipsis = /^\[?\.\.\.\]?$/.test(row.name);
            var isArchive = /\.(zip|tar|gz)$/i.test(row.name);
            var isFolder = !isArchive && (next && next.depth > row.depth) || /\/$/.test(row.name) || (!isEllipsis && !/\.[A-Za-z0-9]+$/.test(row.name));
            var name = row.name.replace(/\/$/, '');
            var ext = (name.match(/\.([a-z0-9]+)$/i) || [])[1];
            var kind = fileTypes[ext ? ext.toLowerCase() : ''] || ['fa-file-o', 'plain'];
            var ellipsis = /^\[?\.\.\.\]?$/.test(name);
            var icon = ellipsis ? '' : (isFolder ? 'fa-folder' : kind[0]);
            var iconClass = isFolder ? 'folder' : kind[1];

            html += '<div class="tree-row' + (row.depth === 0 ? ' tree-root' : '') + '">';
            for (var d = 0; d < row.depth - (row.branch ? 1 : 0); d++) {
                html += '<span class="tree-guide' + (row.guides.charAt(d * 3) === '│' ? ' on' : '') + '"></span>';
            }
            if (row.branch) {
                html += '<span class="tree-branch' + (row.last ? ' last' : '') + '"></span>';
            }
            if (icon) {
                html += '<i class="fa ' + icon + ' tree-icon tree-' + iconClass + '"></i>';
            }
            html += '<span class="tree-name' + (isFolder ? ' is-folder' : '') + (ellipsis ? ' is-ellipsis' : '') + '">' + esc(name) + '</span>';
            if (row.comment) {
                html += '<span class="tree-comment">' + esc(row.comment) + '</span>';
            }
            html += '</div>';
        });

        $code.html(html).addClass('tree no-highlight');
    });
}
/* Highlight */
$( document ).ready(function() {
    sbSections();
    sbTrees();
    hljs.initHighlightingOnLoad();
    $('table').addClass('table table-striped table-hover');
});


$(".bs-sidebar li").on("click", function() {
    $(".bs-sidebar li").removeClass("active");
    $(this).addClass("active");
});

/* Prevent disabled links from causing a page reload */
$("li.disabled a").click(function() {
    event.preventDefault();
});

/* jQuery scroll */
/**var aside_top = $('#aside-dock').offset().top - 20;
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
    if($(window).scrollTop() + $(".bs-sidebar").outerHeight() > $(".footer").position().top) {
        var bottom = $(window).scrollTop() + $(".bs-sidebar").outerHeight() - $(".footer").position().top + $(".footer").outerHeight();
        $('#aside-dock').css({
            bottom: bottom,
            top: 'initial',
            width: aside_width,
            position: 'fixed'
        });
    } else if ($(window).scrollTop() > aside_top) {
        $('#aside-dock').css({
            top: 0,
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
}*/