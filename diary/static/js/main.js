$('.post-load-btn').on('click', function (event) {
    $.ajax({
        url: 'api/post',
        success: function (post) {
            $('.post-list-item-header:first').html(post.title);
            $('.post-list-item-body:first').html(post.content);
        }
    });
});