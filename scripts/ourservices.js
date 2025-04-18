$(document).ready(function () {

    $('.calibration-block').click(function () {
        $(this).find('.front, .back').toggle();
    });

    

    $('.services-header-title-item').click(function () {
        $('.services-header-title-item').removeClass('active');
        $(this).addClass('active');

        let serviceMap = {
            'calibration-Toggle': 'calibration',
            'alignment-Toggle': 'alignment',
            'windshields-Toggle': 'windshieldReplacement',
            'rockRepair-Toggle': 'rockRepair',
        };

        toggleServiceType(serviceMap[$(this).attr('id')]);
    });

    $('#calibration-Toggle').addClass('active');
    toggleServiceType('calibration');

    $('.back').hide();
});
