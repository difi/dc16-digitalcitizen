import React from 'react';

/**
 * Shallow renders only our component without touching the DOM.
 * Mount gives full DOM rendering.
 * Render renders react components to static HTML and analyze the resulting HTML structure.
 */
import { shallow } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import {RelationFormClass} from '../app/FormPages/RelationForm.js';

/**
 * Need the userData to be able to handle the requests from the different classes correctly.
 * This is the userData of the person we are logged in as.
 * @type {{pnr: string, name: string, submissionId: null}}
 */
var userData = {
    pnr: "01108019146",
    name: "TestPerson1",
    submissionId: null
};

/**
 * Describe is the start of the test-class. Since we want to test RelationFormClass, we
 * note this in quotation marks (this is the name of the test)
 */
describe("RelationFormClass", function() {
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        // the fields that are individual for each page
        const props = {
            fields: {
                relation: {value: "undefined"},
                typeOfRelation: "sibling",
                nameOfChild: "ss",
                isDependent: false,
                otherRelation: "sd",
                guardianFor: {
                    value: [{label: "", name: ""}],
                    onChange: function onChange () {}
                }
            },
            userData
        };
        //Renders the RelationFormClass with props
        wrapper = shallow(<RelationFormClass {...props}/>);
    });

    /**
     * A test is described with the text in the quotation marks, and this will also be
     * what the test is called when run in Karma. If you want to look at one particular test
     * you just find the description under the name of the test-class.
     *
     * In the following tests we look for the elements we expect to exists
     * (there exists one element when lenthg is 1 and two if the length is 2)
     */
    it('Should have header and container classnames for HTML-elements', function () {
        //Expect the rendered RelationFormClass to exist
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "form-header"
        expect (wrapper.find('.form-header')).to.have.length(1);
        expect(wrapper.find('.form-container')).to.have.length(1);
    });

    it('A HTML-element, with className = relation, exists', function () {
        //Expect the rendered RelationFormClass to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.relation')).to.have.length(1);
    });

    it('Three radio-buttons exists', function () {
        //Expect the rendered RelationFormClass to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('input[type="radio"]')).to.have.length(3);
    });

    it('Correct radio-button exists', function () {
        //Expect the rendered RelationFormClass to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('#guardian-radio')).to.have.length(1);
        expect(wrapper.find('#family-radio')).to.have.length(1);
        expect(wrapper.find('#other-radio')).to.have.length(1);
    });

    it('In case guardian-button is pressed, show label and dropdown-list', function () {
        //Need to redifine defaultProps because we need the relation value to be guardian, for this test only
        var defaultProps = {
            fields: {
                relation: {value: "guardian"},
                typeOfRelation: "sibling",
                nameOfChild: "ss",
                isDependent: false,
                otherRelation: "sd",
                guardianFor: {
                    value: [{label: "", name: ""}],
                    onChange: function onChange () {}
                }
            },
            userData
        };
        const wrapper = shallow(<RelationFormClass {...defaultProps}/>);

        expect(wrapper.find('.guardian-rel')).to.have.length(2);
        expect(wrapper.find('label.guardian-rel')).to.have.length(1);
        expect(wrapper.find('DropdownList.guardian-rel')).to.have.length(1);
    });

    it('In case family-button is pressed, show label, dropdown-list, and checkbox', function () {
        //Need to redifine defaultProps because we need the relation value to be family, for this test only
        var defaultProps = {
            fields: {
                relation: {value: "family"},
                typeOfRelation: "sibling",
                nameOfChild: "ss",
                isDependent: false,
                otherRelation: "sd",
                guardianFor: {
                    value: [{label: "", name: ""}],
                    onChange: function onChange () {}
                }
            },
            userData
        };
        const wrapper = shallow(<RelationFormClass {...defaultProps}/>);

        expect(wrapper.find('.family-rel')).to.have.length(2);
        expect(wrapper.find('label.family-rel')).to.have.length(1);
        expect(wrapper.find('DropdownList.family-rel')).to.have.length(1);
     });

    it('In case other-button is pressed, show label, text-fieds and checkbox', function () {
        //Need to redifine defaultProps because we need the relation value to be other, for this test only
        var defaultProps = {
            fields: {
                relation: {value: "other"},
                typeOfRelation: "sibling",
                nameOfChild: "ss",
                isDependent: false,
                otherRelation: "sd",
                guardianFor: {
                    value: [{label: "", name: ""}],
                    onChange: function onChange () {}
                }
            },
            userData
        };
        const wrapper = shallow(<RelationFormClass {...defaultProps}/>);
        expect(wrapper.find('.other-rel')).to.have.length(2);
        expect(wrapper.find('label.other-rel')).to.have.length(1);
        expect(wrapper.find('FormControl.other-rel')).to.have.length(1);
     });

    it('If none of the radio buttons are pressed, only the radiobuttons and the header is going to be shown', function () {
        //Expect the rendered RelationFormClass to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('label#guardian')).to.have.length(0);
        expect(wrapper.find('label#family')).to.have.length(0);
        expect(wrapper.find('label#other')).to.have.length(0);

        expect(wrapper.find('DropdownList')).to.have.length(0);
        expect(wrapper.find('Checkbox')).to.have.length(0);
        expect(wrapper.find('FormControl')).to.have.length(0);
    });
});
