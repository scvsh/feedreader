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

        /* Test that ensures that every feed in allFeeds has a defined and not empty name.
          */
        it('name is defined', function() {
            allFeeds.forEach(feed => (
                expect(feed.name).toBeDefined(),
                expect(feed.name).not.toBe(0)
            ));
        });
        
        /* Test that ensures that every feed in allFeeds has a defined and not empty URL.
          */
        it('url is defined', function() {
            allFeeds.forEach(feed => (
                expect(feed.url).toBeDefined(),
                expect(feed.url).not.toBe(0)
            ));
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

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('contain at least a single .entry element within .feed container', function(done) {
            expect($('.feed .entry').length > 0).toBe(true);
            done();
        });
    });

    describe('New Feed Selection', function() {
        let post1, post2;
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                post1 = $('.entry').first().html();
                loadFeed(1, function() {
                    post2 = $('.entry').first().html();
                    done();
                });
            });
        });

        it('content changes after a new feed is loaded', function() {
            expect(post1).not.toBe(post2);
        });
    });
}());
