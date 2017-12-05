/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*Test that ensures that every feed in allFeeds has an URL and a name is defined
        /* and is not empty.
          */
        it('name and url defined', function() {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe(0);

                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe(0);
            }
        });
    });

    describe('The menu', function() {
        /* Test that ensures the menu element 
         * is hidden by default.  
         */
        it('element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. 
         */
        it('changes visibility when the menu icon is clicked', function() {
            let menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        /*Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * */
        let container = $('.feed');
        let allFeeds = [{
            name: 'Udacity Blog',
            url: 'http://blog.udacity.com/feed'
        }];

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('contain at least a single .entry element within .feed container', function(done) {
            expect(container.children().length > 0).toBe(true);
            done();
        });
    });

    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                post1 = $('.entry').eq(0).html();
                loadFeed(1, function() {
                    post2 = $('.entry').eq(0).html();
                    done();
                });
            });
        });

        it('content changes after a new feed is loaded', function() {
            expect(post1).not.toMatch(post2);
        });
    });
}());
