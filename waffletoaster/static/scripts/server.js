var setBoard = function (_boardName) {
    $('#open-board').val(_boardName);
}

var getBoard = function () {
    return $('#open-board').val();
}

var requestNewMainBoard = function () {
    $.ajax({
        url: '/api/create/board',
        method: 'POST',
        data: {
            root: {
                name: $('#new-main-board-name').val(),
                size: $('#new-main-board-canvas-size').val(),
                bg: {
                    type: $('input[name=new-main-board-show-grid]:checked').val(),
                    cellsize: $('#new-main-board-grid-size').val()
                }
            }
        }
    }).done(function (data, textStatus, jqXHR) {
        setBoard(data.name);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(textStatus + "\n" + errorThrown);
    });
}

var requestNewCard = function (_id) {
    var card = $(_id);
    $.ajax({
        url: '/store/add',
        method: 'POST',
        data: {
            root: {
                name: getBoard(),
                type: 'card',
                object: {
                    position: {
                        left: card.css('left'),
                        top: card.css('top'),
                    },
                    size: {
                        width: card.width(),
                        height: card.height(),
                    },
                    content: {
                        title: card.find('.card-title').text(),
                        text: card.find('.card-text').text(),
                        image: card.find('.card-img-top').attr('src'),
                    }
                }
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(textStatus + "\n" + errorThrown);
        return false;
    });

    return true;
}

var login = function (_id, _pwd) {
    $.ajax({
        url: '/fetch/login',
        method: 'POST',
        ContentType: 'application/json',
        data: {
            usr: _id,
            pwd: _pwd
        }
    }).done(function (data, textStatus, errorThrown) {
        window.location.replace('index.php');
    }).fail(function (jqXHR, textStatus, errorThrown) {
        window.location.replace('401.html');
    });
}
