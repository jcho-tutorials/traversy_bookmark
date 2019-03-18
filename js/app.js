// Listen for Form Submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

/*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
*/

    // Check if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        // Initiate Array
        var bookmarks = [];
        // Add bookmark in Array
        bookmarks.push(bookmark);
        // Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        // console.log(localStorage.getItem('bookmarks'));
    } else {
        //Get bookmarks from Local Storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark in Array
        bookmarks.push(bookmark);
        // Re-set to local Storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();

    // Prevent form from submitting
    e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url) {
    // Get bookmark from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for(i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url === url) {
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set to local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();

}

// Fetch bookmark
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    // Get Output Results
    var bookmarksResults = document.getElementById('bookmarksResults');
    // Printing bookmarks
    bookmarksResults.innerHTML =  '';
    // Loop through local storage
    for (i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="card-header" class="mx-auto">'+'<h3>'+name+'</h3>'+
                                      '<a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a>'+
                                      '<a class="btn btn-danger" onclick="deleteBookmark(\''+url+'\')" href="#">Delete</a>'+
                                      '</div>';

    }
}

// Validate Form
function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl) {
        alert('Please fill in the Form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}