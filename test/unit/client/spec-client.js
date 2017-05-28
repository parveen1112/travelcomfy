define(['mainFile', 'chai'], function(mainFile){
    describe("Testing Flight Search Engine", function () {
        var activeTab,
            passengers,
            source,
            dest,
            departTime,
            arrivalTime;

        it("should check existence of main file, object, init function", function(){
            expect(mainFile).to.exist;
            expect(mainFile.init).to.exist;
            expect($).to.exist;
        });

        it("should check execute main function properly", function () {
            expect(function() {mainFile.init(); return true;}()).to.be.true;
        });

        it('should check existence of session and templates object and session functions', function(){
            expect(session).to.exist;
            expect(session.getSession).to.exist;
            expect(session.setSession).to.exist;
            expect(templates).to.exist;
        });

        it("should set variable in session storage properly", function () {
            expect(function(){ session.setSession('mx', '5000'); return true; }()).to.be.ok;
            expect(function(){ session.setSession('mn', '10'); return true;  }()).to.be.ok;
            expect(function(){ session.setSession('passengers', '2'); return true;  }()).to.be.ok;
            expect(function(){ session.setSession('arrivalTime', '2016-06-30'); return true;  }()).to.be.ok;
            expect(function(){ session.setSession('departTime', '2016-06-28'); return true;  }()).to.be.ok;
            expect(function(){ session.setSession('source', 'DEL'); return true;  }()).to.be.ok;
            expect(function(){ session.setSession('dest', 'PUN'); return true;  }()).to.be.ok;
            expect(function(){ session.setSession('tab-block-index', 1); return true; }()).to.be.ok;
        });

        it("should check UI Elements existence", function(){
            expect(function() {mainFile.init(); return true;}()).to.be.true;
            activeTab = $('.flight-tabs .tab-block.active');
            passengers = activeTab.find('.passengers select option:selected').text();
            source = activeTab.find('.source select option:selected').text();
            dest = activeTab.find('.destination select option:selected').text();
            departTime = activeTab.find('.depart-time input').val();
            arrivalTime = activeTab.find('.arrival-time input').val();
            expect(activeTab.length).to.be.equal(1);
            expect(activeTab.find('.passengers select option:selected').length).to.be.equal(1);
            expect(activeTab.find('.source select option:selected').length).to.be.equal(1);
            expect(activeTab.find('.destination select option:selected').length).to.be.equal(1);
            expect(activeTab.find('.depart-time input').length).to.be.equal(1);
            expect(activeTab.find('.arrival-time input').length).to.be.equal(1);
            expect($('ul.flight-results').length).to.be.equal(1);
        });

        it("should check UI Elements values after data is initialised from session", function() {
            expect(activeTab.attr('id')).to.be.equal('round-trip');
            expect($('.slider-min').text()).to.be.equal('10');
            expect($('.slider-max').text()).to.be.equal('5000');

            expect(passengers).to.be.equal('2');
            expect(source).to.be.equal('DEL');
            expect(dest).to.be.equal('PUN');
            expect(departTime).to.be.equal('2016-06-28');
            expect(arrivalTime).to.be.equal('2016-06-30');
        });
    });
});
