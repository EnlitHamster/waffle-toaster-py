$(function () {
    // Sidebar collapse ability
    $('#sidebar-collapse').on('click', () => $('#sidebar').toggleClass('active'));

    // Settings saving
    $('#save-settings').on('click', saveSettings);

    // Image editing delete button
    $('#delete-edit-comb').on('click', imgEditDelete);

    // Confirm delete button
    $('#confirm-delete').on('click', confirmDelete);

    // Rearrange/move mode switcher
    $('#move-resize').on('click', switchMode);

    // Combined generator
    $('#combined-generator').on('mousedown touchstart', addComb);

    // On file upload
    $('#upload-new-file').on('click', uploadFile);

    // Save card
    $('#save-edit-comb').on('click', saveEditComb);

    // Selecting image for card
    $('#select-uploaded-file').on('click', imgEditSelect);

    // Deselecting image for card
    $('#clear-img-comb').on('click', imgEditClear);

    // Updating file chooser with file name
    $('input[name=upload-new-file-chooser]').on('change', e => updateChooser());

    // Setting canvas' movement controller
    $('#canvas').on('mousedown touchstart', canvasDragListener);

    // Fixing canvas viewport
    $(window).on('resize', resizeCanvasViewport);

    $('#save-new-main-board').on('click', requestNewMainBoard);

    applySettings();
    loadSettings();
    resizeMode();
    positionCanvas();

    // Populating img gallery
    var files = fetchFiles();

    var $container = $('#uploaded-files-gallery-container');
    $container.attr('data-selected-img', 'none');

    var lgContainer = document.createElement('ul');
    $(lgContainer).addClass('list-unstyled row');
    $(lgContainer).attr('id', 'lg-gallery-uploaded');

    files.forEach(f => addImageToGallery($container, $(lgContainer), f));

    $container.append($(lgContainer));
});
