function toggleServiceType(serviceId) {
      
    $('.service-type').hide();
    console.log(serviceId)
    $('#' + serviceId).show();
    console.log(serviceId)
}

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
            'rockRepair-Toggle': 'rockRepair',
            'programming-Toggle': 'programming',
        };

        toggleServiceType(serviceMap[$(this).attr('id')]);
    });

    $('#calibration-Toggle').addClass('active');
    toggleServiceType('calibration');

    $('.back').hide();
});
