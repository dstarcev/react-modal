import sinon from 'sinon';
import expect from 'expect';
import { renderModal, unmountModal } from './helper';
import tabbable from '../lib/helpers/tabbable';

describe('tabbable', function () {
    it('returns an empty array when there are no tabbable descendents', function () {
        var elem = document.createElement('div');
        expect(tabbable(elem)).toEqual([]);
    });

    describe('with tabbable descendents', function () {
        var elem;
        beforeEach(function () {
            elem = document.createElement('div');
            document.body.appendChild(elem);
        });

        afterEach(function () {
            document.body.removeChild(elem);
        });

        it('includes descendent tabbable inputs', function () {
            var input = document.createElement('input');
            elem.appendChild(input);
            expect(tabbable(elem)).toInclude(input);
        });

        it('includes tabbable non-input elements', function () {
            var div = document.createElement('div');
            div.tabIndex = 1;
            elem.appendChild(div);
            expect(tabbable(elem)).toInclude(div);
        });

        it('includes links with an href', function () {
            var a = document.createElement('a');
            a.href = 'foobar';
            elem.appendChild(a);
            expect(tabbable(elem)).toInclude(a);
        });

        it('excludes links without an href or a tabindex', function () {
            var a = document.createElement('a');
            elem.appendChild(a);
            expect(tabbable(elem)).toExclude(a);
        });

        it('excludes descendent inputs if they are not tabbable', function () {
            var input = document.createElement('input');
            input.tabIndex = -1;
            elem.appendChild(input);
            expect(tabbable(elem)).toExclude(input);
        });

        it('excludes descendent inputs if they are disabled', function () {
            var input = document.createElement('input');
            input.disabled = true;
            elem.appendChild(input);
            expect(tabbable(elem)).toExclude(input);
        });

        it('excludes descendent inputs if they are not displayed', function () {
            var input = document.createElement('input');
            input.style.display = 'none';
            elem.appendChild(input);
            expect(tabbable(elem)).toExclude(input);
        });

        it('excludes descendent inputs if they are hidden because their calculated width and height both equal zero.', function () {
            var input = document.createElement('input');
            input.style.width = '0';
            input.style.height = '0';
            input.style.border = '0';
            input.style.padding = '0';
            elem.appendChild(input);
            expect(tabbable(elem)).toExclude(input);
        });

        it('excludes descendents with hidden parents', function () {
            var input = document.createElement('input');
            elem.style.display = 'none';
            elem.appendChild(input);
            expect(tabbable(elem)).toExclude(input);
        });

        it('excludes inputs with parents that are hidden because of width and height both equal zero (and overflow !== visible)', function () {
            var input = document.createElement('input');
            elem.style.width = '0';
            elem.style.height = '0';
            elem.style.overflow = 'hidden';
            elem.appendChild(input);
            expect(tabbable(elem)).toExclude(input);
        });

        it('includes inputs with parents that have a width and height both equal zero (and overflow == visible)', function () {
            var input = document.createElement('input');
            elem.style.width = '0';
            elem.style.height = '0';
            elem.style.overflow = 'visible';
            elem.appendChild(input);
            expect(tabbable(elem)).toInclude(input);
        });
    });
});
