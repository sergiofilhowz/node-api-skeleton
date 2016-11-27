var testHelper = require('./test.helper'),
    expect = testHelper.expect,
    acqua = testHelper.acqua,
    models = acqua.get('models'),
    Sample = models.Sample;

describe('sample router', () => {
    'use strict';

    beforeEach(() => {
        return testHelper.sync()
            .then(() => Sample.create({ name : 'one sample' }))
            .then(() => Sample.create({ name : 'another sample' }));
    });

    it('should list', () => {
        return testHelper.get('/sample').then(res => {
            res.should.have.status(200);

            expect(res.body).with.length(2);

            expect(res.body[0]).to.have.property('id').equal('1');
            expect(res.body[0]).to.have.property('name').equal('one sample');

            expect(res.body[1]).to.have.property('id').equal('2');
            expect(res.body[1]).to.have.property('name').equal('another sample');
        });
    });

});