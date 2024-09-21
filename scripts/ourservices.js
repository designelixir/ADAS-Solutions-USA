$(document).ready(function () {
    function applyBorders() {
        $('.calibration-block').removeClass('border-left border-right border-top border-bottom');

        let blocks = $('.calibration-block');
        let rows = [];
        let currentRow = [];
        let currentRowTop = $(blocks[0]).position().top;

        blocks.each(function () {
            let blockTop = $(this).position().top;

            if (blockTop !== currentRowTop) {
                rows.push(currentRow);
                currentRow = [];
                currentRowTop = blockTop;
            }
            currentRow.push($(this));
        });

        if (currentRow.length) rows.push(currentRow);

        rows.forEach(function (row, index) {
            let isLastRow = index === rows.length - 1;
            let isFirstRow = index === 0;

            row.forEach(function (block, i) {
                if (i > 0) block.addClass('border-left');
                if (i < row.length - 1) block.addClass('border-right');
            });

            row.forEach(function (block) {
                if (isFirstRow) block.addClass('border-bottom');
                if (isLastRow) block.addClass('border-top');
                if (!isFirstRow && !isLastRow) block.addClass('border-top border-bottom');
            });
        });
    }

    applyBorders();

    $(window).resize(applyBorders);

    $('.calibration-block').click(function () {
        $(this).find('.front, .back').toggle();
    });

    

    $('.services-header-title-item').click(function () {
        $('.services-header-title-item').removeClass('active');
        $(this).addClass('active');

        let serviceMap = {
            'calibration-Toggle': 'calibration',
            'windshields-Toggle': 'windshieldReplacement',
            'hailRepair-Toggle': 'hailRepair',
        };

        toggleServiceType(serviceMap[$(this).attr('id')]);
    });

    $('#calibration-Toggle').addClass('active');
    toggleServiceType('calibration');

    $('.back').hide();
});
