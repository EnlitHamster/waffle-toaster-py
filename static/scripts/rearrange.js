var componentResizeListener = function(e) {
    e.stopPropagation();
}

var componentDragListener = function(e) {
    e.stopPropagation();
    e.preventDefault();

    var offset = $(this).offset();
    var dx = (e.clientX - offset.left) / $(this).width();
    var dy = (e.clientY - offset.top) / $(this).height();
    startDrag($(this), $('#canvas'), dx, dy, (p, a, q) => min(q, max(a, p)));
}

var moveMode = function() {
    $('#move-resize').attr('data-mode', 'move');
    $('#move-resize').addClass('active');
    $('#move-resize').css({'font-weight': '500'});
}

var resizeMode = function() {
    $('#move-resize').attr('data-mode', 'resize');
    $('#move-resize').removeClass('active');
    $('#move-resize').css({'font-weight': '400'});
}

var setMode = function(id) {
    if ($('#move-resize').attr('data-mode') == 'move') {
        $(id).css({resize: 'none'});
        $(id).on('mousedown touchstart', componentDragListener);
        $(id).off('mousedown touchstart', componentResizeListener);
    } else {
        if (id.startsWith('#card')) $(id).css({resize: 'both'});
        $(id).on('mousedown touchend', componentResizeListener);
        $(id).off('mousedown touchend', componentDragListener);
    }
}

var switchMode = function () {
    if ($('#move-resize').attr('data-mode') == 'move') resizeMode();
    else moveMode();

    components.forEach(function (entry) { setMode('#' + entry); });
}