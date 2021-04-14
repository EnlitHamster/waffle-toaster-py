var canvasDragListener = function(e) {
    e.stopPropagation();
    e.preventDefault();

    var offset = $(this).offset();
    var dx = (e.clientX - offset.left) / $(this).width();
    var dy = (e.clientY - offset.top) / $(this).height();
    startDrag($(this), $('#canvas-wrapper'), dx, dy, (p, a, q) => min(max(q, a), p));
}

var addComponent = function (comp, posX, posY) {
    var id = $(comp).attr('id');

    $(comp).css({
        position: 'absolute',
        display: 'block'
    });
    setMode('#' + id);

    // Creating the card on server already
    drag({ x: posX, y: posY }, $(comp), $('#canvas'), HorizPosition.CENTER, VertPosition.CENTER, (p, a, q) => min(q, max(a, p)));
    if (requestNewCard(id)) {
        $('#canvas').append($(comp));
        components.push(id);
        startDrag($(comp), $('#canvas'), HorizPosition.CENTER, VertPosition.CENTER, (p, a, q) => min(q, max(a, p)));
    }
    //  else $('#canvas').remove($(comp));
}

var saveEditComb = function () {
    var cardId = '#' + $('#edit-comb-form').attr('data-id');
    var cardTitle = $('input[name=edit-comb-card-title]').val();
    var cardText = $('textarea#edit-comb-card-text').val();
    var img = $('#edit-comb-display').attr('data-img');

    var $cardImg = $(cardId).find('.card-img-top');
    if (img != undefined && img != 'none') {
        $cardImg.removeClass('disabled');
        $cardImg.attr('src', img);
    } else $cardImg.addClass('disabled');

    $(cardId).find('.card-title').text(cardTitle);
    $(cardId).find('.card-text').text(cardText);
}

var canvasWidth = function () {
    return min($('#canvas').width() + $('#canvas').offset().left, $('#canvas-wrapper').width());
}

var canvasHeight = function () {
    console.log(($('#canvas').height() + $('#canvas').offset().top) + ' ' + $('#canvas-wrapper').height());
    return min($('#canvas').height() + $('#canvas').offset().top, $('#canvas-wrapper').height());
}

var resizeCanvasViewport = function () {
    var width = $(window).width() - $('#sidebar').outerWidth();
    var height = $(window).height() - $('#navbar').outerHeight();

    $('#canvas-wrapper').css({
        'width': width,
        'min-width': width,
        'max-width': width,
        'height': height,
        'min-height': height,
        'max-height': height,
    });

    console.log('X: ' + ($('#canvas-wrapper').width() - $('#canvas').outerWidth()) + ' < ' + $('#canvas').offset().left + ' < 0');
    console.log('Y: ' + ($('#canvas-wrapper').height() - $('#canvas').outerHeight()) + ' < ' + $('#canvas').offset().top + ' < 0');

    $('#canvas').css({
        left: min(max($('#canvas-wrapper').width() - $('#canvas').outerWidth(), $('#canvas').offset().left), 0) + 'px',
        top: min(max($('#canvas-wrapper').height() - $('#canvas').outerHeight(), $('#canvas').offset().top), 0) + 'px',
    });
}

var positionCanvas = function () {
    resizeCanvasViewport()

    var xPos = ($('#canvas-wrapper').width() - $('#canvas').width()) / 2;
    var yPos = ($('#canvas-wrapper').height() - $('#canvas').height()) / 2;

    $('#canvas').css({
        left: xPos + 'px',
        top: yPos + 'px'
    });
}
