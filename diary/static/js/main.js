$('.post-load-btn').on('click', function (event) {
    $.ajax({
        url: 'api/post',
        success: function (post) {
            $('.post-list-item-header').html(post.header);
            $('.post-list-item-body').html(post.body);
        }
    });
})