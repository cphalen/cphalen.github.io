/*

All plays courtesy of 'shakespeare.mit.edu'
we thank them for democratizing this
literature that has changed the world!

*/

$.ajax({
    url:'http://cphalen.github.io/Shakespeare/plays/Hamlet_ Entire Play.html',
        type:'GET',
        success: function(data){
            console.log(data);
           // $('#content').html($(data).find('#firstHeading').html());
        }
});
