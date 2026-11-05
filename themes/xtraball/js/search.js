/* Search: prefix + typo tolerant lunr query, highlighted snippets, breadcrumbs, keyboard navigation */
(function () {
    var $modal = $('#mkdocs_search_modal');
    var $input = $('#sb-search-query');
    var $results = $('#sb-search-results');
    if (!$modal.length || typeof lunr === 'undefined') {
        return;
    }

    var docs = null;
    var index = null;
    var loading = false;
    var active = -1;

    var pageNames = {
        '': 'Home', 'documentation': 'Getting started', 'layout': 'Layouts', 'module': 'Modules', 'api': 'API',
        'contribute': 'Contribute', 'cli': 'CLI', 'stack': 'Stack', 'customization': 'Customization'
    };

    function decode(text) {
        return $('<textarea>').html(text).text();
    }

    function prettify(slug) {
        var name = slug.replace(/[-_]+/g, ' ');
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    function breadcrumb(location) {
        var path = location.split('#')[0].replace(/\/$/, '');
        var parts = path ? path.split('/') : [''];
        var out = [];
        $.each(parts, function (i, part) {
            out.push(i === 0 && pageNames.hasOwnProperty(part) ? pageNames[part] : prettify(part));
        });
        return out;
    }

    function load(done) {
        if (index) {
            return done();
        }
        if (loading) {
            return;
        }
        loading = true;
        $.getJSON(base_url + '/search/search_index.json', function (data) {
            docs = data.docs;
            lunr.tokenizer.separator = /[\s\-\/\.]+/;
            index = lunr(function () {
                this.ref('i');
                this.field('title', {boost: 12});
                this.field('text');
                this.metadataWhitelist = ['position'];
                var builder = this;
                $.each(docs, function (i, doc) {
                    builder.add({i: String(i), title: decode(doc.title), text: decode(doc.text)});
                });
            });
            loading = false;
            done();
        });
    }

    function terms(query) {
        var list = [];
        $.each(query.toLowerCase().split(/[^a-z0-9_$]+/), function (i, t) {
            if (t.length > 1) {
                list.push(t);
            }
        });
        return list;
    }

    function escapeHtml(value) {
        return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function escapeRegex(value) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function highlight(text, list) {
        var html = escapeHtml(text);
        if (!list.length) {
            return html;
        }
        var re = new RegExp('((?:' + $.map(list, escapeRegex).join('|') + ')[a-z0-9_$]*)', 'gi');
        return html.replace(re, '<mark>$1</mark>');
    }

    function snippet(text, list) {
        var lower = text.toLowerCase();
        var at = -1;
        $.each(list, function (i, t) {
            var found = lower.indexOf(t);
            if (found >= 0 && (at < 0 || found < at)) {
                at = found;
            }
        });
        var start = Math.max(0, at - 70);
        var piece = text.substr(start, 190);
        if (start > 0) {
            piece = '…' + piece.replace(/^\S*\s/, '');
        }
        if (start + 190 < text.length) {
            piece = piece.replace(/\s\S*$/, '') + '…';
        }
        return piece;
    }

    function run() {
        var query = $.trim($input.val());
        var list = terms(query);
        $results.empty();
        active = -1;
        if (!list.length) {
            $results.html('<p class="sb-search-hint">Type at least two letters. Try <code>push</code>, <code>hook</code>, <code>Dialog</code> or <code>feature.json</code>.</p>');
            return;
        }

        var hits;
        try {
            hits = index.query(function (q) {
                $.each(list, function (i, t) {
                    q.term(t, {boost: 100});
                    q.term(t, {boost: 20, wildcard: lunr.Query.wildcard.TRAILING});
                    if (t.length > 3) {
                        q.term(t, {boost: 2, editDistance: 1});
                    }
                });
            });
        } catch (e) {
            hits = [];
        }

        if (!hits.length) {
            $results.html('<p class="sb-search-hint">No result for <strong>' + escapeHtml(query) + '</strong>. Try fewer or shorter words.</p>');
            return;
        }

        var html = '';
        $.each(hits.slice(0, 15), function (i, hit) {
            var doc = docs[parseInt(hit.ref, 10)];
            var title = decode(doc.title);
            var text = decode(doc.text).replace(/\s+/g, ' ');
            html += '<a class="sb-result" href="' + base_url + '/' + doc.location + '">' +
                '<span class="sb-crumb">' + $.map(breadcrumb(doc.location), escapeHtml).join(' <i class="fa fa-angle-right"></i> ') + '</span>' +
                '<span class="sb-rtitle">' + highlight(title, list) + '</span>' +
                '<span class="sb-rtext">' + highlight(snippet(text, list), list) + '</span>' +
                '</a>';
        });
        html += '<p class="sb-search-count">' + Math.min(hits.length, 15) + ' of ' + hits.length + ' results</p>';
        $results.html(html);
    }

    function move(step) {
        var $items = $results.find('.sb-result');
        if (!$items.length) {
            return;
        }
        active = (active + step + $items.length) % $items.length;
        $items.removeClass('active').eq(active).addClass('active')[0].scrollIntoView({block: 'nearest'});
    }

    var timer = null;
    $input.on('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            load(run);
        }, 90);
    });

    $input.on('keydown', function (e) {
        if (e.which === 40) {
            e.preventDefault();
            move(1);
        } else if (e.which === 38) {
            e.preventDefault();
            move(-1);
        } else if (e.which === 13) {
            e.preventDefault();
            var $items = $results.find('.sb-result');
            var $target = active >= 0 ? $items.eq(active) : $items.first();
            if ($target.length) {
                $target[0].click();
            }
        }
    });

    $results.on('click', '.sb-result', function () {
        var target = this.getAttribute('href').split('#');
        var samePage = target[0].replace(/\/$/, '') === location.pathname.replace(/\/$/, '');
        $modal.modal('hide');
        if (samePage && target[1]) {
            location.hash = target[1];
            return false;
        }
    });

    $modal.on('shown.bs.modal', function () {
        $input.focus().select();
        load(function () {
            if ($.trim($input.val())) {
                run();
            }
        });
    });

    /* The navbar field is always visible: focusing or typing in it opens the modal */
    var $nav = $('#sb-nav-search');
    $nav.on('focus click', function () {
        $modal.modal('show');
    });
    $nav.on('input', function () {
        $input.val($nav.val()).trigger('input');
        $nav.val('');
        $modal.modal('show');
    });
    $modal.on('hidden.bs.modal', function () {
        $nav.blur();
    });

    /* "/" opens the search from anywhere */
    $(document).on('keydown', function (e) {
        if (e.which === 191 && !/^(input|textarea|select)$/i.test(e.target.tagName)) {
            e.preventDefault();
            $modal.modal('show');
        }
    });
})();
