
let activeStateFilter = '';
let activeServiceFilter = '';

function filter(categoryOrTag) {
    
    if (categoryOrTag === 'reset'){
        activeStateFilter = '';
        activeServiceFilter = '';
        $('.location-tag').removeClass('active-filter-tag')
    }

    const tagElement = $('#' + categoryOrTag + '-filter-tag');

    if (tagElement.hasClass('active-filter-tag')) {
        tagElement.removeClass('active-filter-tag');

        if (tagElement.hasClass('state')) {
            activeStateFilter = '';
        } else if (tagElement.hasClass('service')) {
            activeServiceFilter = '';
        }
    } else {
        if (tagElement.hasClass('state')) {
            activeStateFilter = categoryOrTag;
            $('.location-tag.state').removeClass('active-filter-tag');
        } else if (tagElement.hasClass('service')) {
            activeServiceFilter = categoryOrTag;
            $('.location-tag.service').removeClass('active-filter-tag');
        }

        tagElement.addClass('active-filter-tag');
    }
    
     if (activeStateFilter === '' && activeServiceFilter === ''){
        $('#filterReset').css('display', 'none')
    } else {
        $('#filterReset').css('display', 'block')
    }


    gsap.to('.location-summary-card', {
    opacity: 0,
    duration: 0.5,
    onComplete: function () {
        // Hide all cards first
        $('.location-summary-card').hide();
        
        let selector = '.location-summary-card';

        // Apply state and service filters
        if (activeStateFilter) {
            selector += '.' + activeStateFilter;
        }
        if (activeServiceFilter) {
            selector += '.' + activeServiceFilter;
        }

        let matchingCards = $(selector);

        if (matchingCards.length > 0) {
            // Show matching cards
            matchingCards.show();
            
            // Animate showing of the matching cards
            gsap.fromTo(matchingCards, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        }

        // Check if all cards are hidden after filtering
        let allCardsHidden = $('.location-summary-card:visible').length === 0;
        if (allCardsHidden) {
            $('#noResults').css('display', 'block')
        } else {
            $('#noResults').css('display', 'none')
        }
    }
});

}

filter('')
