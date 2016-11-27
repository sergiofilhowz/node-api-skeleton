var testHelper = require('./test.helper'),
    expect = testHelper.expect,
    acqua = testHelper.acqua,
    models = acqua.get('models'),
    Sample = models.Sample,
    sampleModel = acqua.get('sampleModel');

describe('sampleModel', () => {
    'use strict';

    beforeEach(() => testHelper.sync());

    it('should list', () => {
        return Sample.create({ name : 'one sample' })
            .then(() => Sample.create({ name : 'another sample' }))
            .then(() => sampleModel.list())
            .then(result => {
                expect(result).with.length(2);
                expect(result[0]).to.have.property('id').equal('1');
                expect(result[0]).to.have.property('name').equal('one sample');

                expect(result[1]).to.have.property('id').equal('2');
                expect(result[1]).to.have.property('name').equal('another sample');
            });
    });

});