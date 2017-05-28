var token;
var markers = [];
var markersMap = {};

function getCookie(name) { // helper function 
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

$(document).ready(function(event) { //guarantee HTML 已经ready
    // getMarkers();
    $("#save-btn").click(function(event) {
        event.preventDefault();
        window.location.href = "/{{user._id}}/recommendations";
    })

    $("#sign-up-btn").click(function(event) {
        event.preventDefault();
        window.location.href = "/{{user._id}}/recommendations";
    })
    $("#login-btn").click(function(event) {
        event.preventDefault();
        window.location.href = "/{{user._id}}/recommendations";
    })
});


function updateMapView() {
    if (getCookie('activity')) {
        var info = JSON.parse(getCookie('activity'));
        document.cookie = 'activity' + JSON.stringify(info);
    } else {
        info = [];
    }
}

function updateMarkersMap() {
    markers.forEach(function(marker) {
        //assume marker has a field called name
        markersMap[marker.name] = marker;
    });
}

function getMarkers() {
    $.ajax({
        // Need to change URL 
        url: "http://open-commerce.herokuapp.com/api/products",
        type: "GET",
        data: {
            'token': token
        },
        success: function(res) {
            markers = res; //markers is an JSON format array
            updateMarkersMap();
            updateMapView();
        },

    });
};

//     token = getCookie('x-access-token');
//     getProducts();
//     updateView();
//     $("#logoutNav").click(function(event) {
//     	event.preventDefault();
//     	deleteCookie('x-access-token');
//     	deleteCookie('cart');
//     	token = null; 
//     	updateView();
//     	window.location.href = "about.html";
//     })

//     $("#loginBtn").click(function(event) {
//             event.preventDefault();
//             alert("hello ");
//             var username = $("#username").val();
//             var password = $("#password").val();
//             if(username && password) {
//             	$.post("http://open-commerce.herokuapp.com/api/login",
//             	{
//             		username: username,
//                 	password: password	
//             	},
//             	function(res) {
//             		if(res.success) {
//             			alert("login success");
//             			var cookie = 'x-access-token=' + res.token; 
//             			document.cookie = cookie;
//             			window.location.href = "about.html";
//             			} else {
//             			alert(res.message);
//             			}
//             		}
// 				)}
//              else {
//             	alert("Please provide a username and password");
//             }

//     $("#signupBtn").click(function(event) {
//             // console.log(event);
//             event.preventDefault();
//             var username = $("#username").val();
//             var password = $("#password").val();
//             if (username && password) {
//                 $.post(" http://open-commerce.herokuapp.com/api/signup", 
//                 	{
//                         username: username,
//                         password: password
//                     },
//                     function(res) {
//                         if (res.success) {
//                             alert("signup success");
//                         } else {
//                             alert(res.message);
//                         }
//                     }
//                 )} else {
//             		alert("Enter username and password");
//         		}

//     });
// });
