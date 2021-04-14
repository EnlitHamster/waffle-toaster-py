/* ===============================================
 * IMAGE GALLERY MODAL
 * =============================================== */

var lastImgId = 0;

var addImageToGallery = function ($container, $lgContainer, f) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    var img = document.createElement('img');
    var file = './pictures/' + f;
    var id = 'lg-gallery-img-' + lastImgId++;

    $(li).addClass('col-xs-6 col-sm-4 col-md-2 col-lg-2');
    $(li).attr({
        'data-responsive': file,
        'data-src': file
    });
    $(li).append($(a));

    $(a).attr({
        'href': '#',
        'id': id
    });
    $(a).append($(img));
    $(a).on('click', function (e) {
        e.preventDefault();
        var selected = $container.attr('data-selected-img');

        $(a).css({ border: 'solid 2px #00a2cf' });
        if (selected != 'none') $(selected).css({ border: 'none' });
        $container.attr('data-selected-img', '#' + id);
    });

    $(img).addClass('img-responsive');
    $(img).attr({
        'src': file,
        'id': id + "-src"
    });

    $lgContainer.append($(li));
}

var uploadFile = function () {
    var files = $('input[name=upload-new-file-chooser]').prop('files');
    if (files.length > 0) {
        var i;
        for (i = 0; i < files.length; i++) {
            var file = files[i].path.replaceAll('\\', '/');
            var fName = file.substring(file.lastIndexOf('/'));
            var newFile = './pictures/' + fName;
            if (files[i].type.match(/image.*/) && fs.existsSync(file) && !fs.existsSync(newFile)) fs.copyFile(file, newFile, (err) => {
                if (err) throw err;
                console.log('File copied');
                addImageToGallery($('#uploaded-files-gallery-container'), $('#lg-gallery-uploaded'), fName);
            }); else alert('File is not an image or a file with this name already exists.');
        }
    }
}

var updateChooser = function () {
    var files = $('input[name=upload-new-file-chooser]').prop('files');
    alert(files);
    if (files.length > 0) {
        var strFiles = files[0].path;
        var i;
        for (i = 1; i < files.length; i++) strFiles += files[i].path;
        $('label[for=\'upload-new-file-chooser\']').text(strFiles);
    }
}

/* ===============================================
 * SETTINGS MODAL
 * =============================================== */

var saveSettings = function () {
    parseSettings(
        $('input[name=show-grid]:checked').val(),
        $('input[name=settings-canvas-size]').val(),
        $('input[name=settings-grid-size]').val()
    );
    applySettings();
}

var loadSettings = function() {
    $('#show-grid-' + showGrid).prop('checked', true);
    $('#settings-canvas-size').val(canvasWidth + 'x' + canvasHeight);
    $('#settings-grid-size').val(em2cm(gridSize));
}

/* ===============================================
 * IMAGE EDIT MODAL
 * =============================================== */

var imgEditDelete = function () {
    var cardId = $('#edit-comb-form').attr('data-id');
    var cardTitle = $('#' + cardId).find('.card-title').text();

    $('#confirm-delete-target').text(cardTitle);
    $('#confirm-delete').attr('data-id', cardId);
}

var imgEditSelect = function () {
    var selectedImg = $('#uploaded-files-gallery-container').attr('data-selected-img');
    var img = $(selectedImg + '-src').attr('src');

    if (img != undefined && img != 'none') {
        $('#edit-comb-display').removeClass('disabled');
        $('#edit-comb-display').css({ 'background-image': 'url(\'' + img + '\')' });
        $('#edit-comb-display').attr('data-img', img);
    } else {
        $('#edit-comb-display').addClass('disabled');
        $('#edit-comb-display').attr('data-img', 'none');
    }
}

var imgEditClear = function () {
    $('#edit-comb-display').addClass('disabled');
    $('#edit-comb-display').attr('data-img', 'none');
}

/* ===============================================
 * DELETE MODAL
 * =============================================== */

var confirmDelete = function () {
    var cardId = $('#confirm-delete').attr('data-id');

    $('#' + cardId).remove();
    components = components.filter(id => id != cardId);
}