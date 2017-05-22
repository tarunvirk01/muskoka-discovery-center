/**
 * Created by Manoj on 04-Apr-17.
 */
$('.confirmation').on('click', function() {
    return confirm('Are you sure you want to delete this item?');
});


$(window).load(function(){
    var checkvalue= window.location.pathname;
    //alert(checkvalue);
    $(".mainNavLink").each(function(){
        if($(this).attr('href')== checkvalue)
        { $(this).addClass("active");}
    });
});