const baseurl = "https://wiki.magnilinux.org/search/?q="
// Get media query
// bulma desktop + (2 * $gap)
const mq = window.matchMedia( "(min-width: 1002px)" );

// Dropdowns
var $dropdowns = getAll('.dropdown:not(.is-hoverable)');

if ($dropdowns.length > 0) {
    $dropdowns.forEach(function ($el) {
        $el.addEventListener('click', function (event) {
            event.stopPropagation();
            $el.classList.toggle('is-active');
        });
    });

    document.addEventListener('click', function (event) {
        closeDropdowns();
    });
}

function closeDropdowns() {
    $dropdowns.forEach(function ($el) {
        $el.classList.remove('is-active');
    });
}

// Functions
function getAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}

function showSelected(item) {
    var selector = document.getElementById(item);
    var value = selector[selector.selectedIndex].value;
    //console.log(value);
    if (value === "any") {
        return '';
    } else {
        return item + "=" + value + "&";
    }
}

// Sidebar Anchor Menu Navigation
var quickLinks = document.querySelectorAll("#anchorMenu .menu-list a");
var positionArray = [], hashArray = [];

for (var i = 0; i < quickLinks.length; i++) {
    hashArray.push(quickLinks[i].href.substring(quickLinks[i].href.indexOf('#') + 1));
}

for (var i = 0; i < hashArray.length; i++) {
    positionArray.push(document.getElementById(hashArray[i]).getBoundingClientRect().top);
}

document.addEventListener("scroll", scrollHandler, true);

function scrollHandler() {
    currentScrollPosition = document.documentElement.scrollTop;
    //currentActivePosition = document.getElementsByClassName('toc-is-active')[0].getBoundingClientRect().top;

    for (var i = 1; i <= positionArray.length; i++) {

        if (currentScrollPosition >= positionArray[i - 1] && currentScrollPosition < positionArray[i]) {

            var currentActive = document.getElementsByClassName('toc-is-active')[0];

            if (currentActive != undefined) {
                currentActive.classList.remove('toc-is-active');
            }

            quickLinks[i - 1].classList.add('toc-is-active');

            break;

        }

        if (currentScrollPosition > positionArray[positionArray.length - 1]) {
            var currentActive = document.getElementsByClassName('toc-is-active');

            var currentActive = document.getElementsByClassName('toc-is-active')[0];

            if (currentActive != undefined) {
                currentActive.classList.remove('toc-is-active');
            }
            quickLinks[quickLinks.length - 1].classList.add('toc-is-active');

            break;

        }
    }
};

for (var i = 0; i < quickLinks.length; i++) {
    quickLinks[i].addEventListener('click', function (event) {
        document.removeEventListener('scroll', scrollHandler, true);

        isActive = document.getElementsByClassName('toc-is-active')[0];

        if (isActive != undefined) {
            isActive.classList.remove('toc-is-active');
        }

        this.classList.add('toc-is-active');

        setTimeout(function () {
            document.addEventListener("scroll", scrollHandler, true);
        }, 600);

    });
}
/*
// Perform search
document.getElementById('sbtn').addEventListener('click', e => {
    let filterValue = document.getElementById('sbr').value.toLowerCase();
    window.location.assign(baseurl + filterValue);
    e.preventDefault();
})

function addCopyButtons(clipboard) {
    document.querySelectorAll('pre.data-path').forEach(function (codeBlock) {
        var button = document.createElement('button');
        button.className = 'copy-code-button';
        button.type = 'button';
        button.innerText = 'Copy';

        button.addEventListener('click', function () {
            clipboard.writeText(codeBlock.innerText).then(function () {
                // Chrome doesn't seem to blur automatically,
                //   leaving the button in a focused state. 
                button.blur();

                button.innerText = 'Copied!';

                setTimeout(function () {
                    button.innerText = 'Copy';
                }, 2000);
            }, function (error) {
                button.innerText = 'Error';
            });
        });

        var pre = codeBlock;
        
        codeBlock.parentNode.insertBefore(button, pre);
        
    });
}

function sortTables() {
    document.querySelectorAll('table').forEach(function (table) {

        for (let i = 0; i < table.children[0].children[0].cells.length; i++) {
            table.children[0].children[0].cells[i].addEventListener('click', function () {
                sortTable(table, i)
            });
        }
    });
}

function sortTable(table, n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        // Loop through all table rows (except the
        // first, which contains table headers): 
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            // Get the two elements you want to compare,
            // one from current row and one from the next: 
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            // Check if the two rows should switch place,
            // based on the direction, asc or desc: 
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            // If a switch has been marked, make the switch
            // and mark that a switch has been done: 
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            // If no switching has been done AND the direction is "asc",
            // set the direction to "desc" and run the while loop again. 
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
*/

document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            }
            );
        }
        );
    }
    // if (mq.matches) {
    //   addCopyButtons(navigator.clipboard);
    //}
    //sortTables();
});

function copyright() {
    let yr = document.getElementsByTagName('yr')[0];
    //console.log(yr);
    //console.log(new Date().getFullYear());
    if (Number(yr.innerHTML) === new Date().getFullYear()) return
    yr.innerHTML = yr.innerHTML + '-' + new Date().getFullYear();
}

copyright();