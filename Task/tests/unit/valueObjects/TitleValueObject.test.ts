import { describe, it } from "mocha";
import { expect } from "chai";
import { ValidationError } from "@codebricks/typebricks";
import { TitleValueObject } from "shared/domain/valueObjects/TitleValueObject";

const validValues: string[] = ['', ''];
const invalidValues = [''];

describe('TitleValueObject',
    /** @overwrite-protection-body false */
    async function() {
        it('test construct.', function() {
            validValues.forEach((validValue: string) => {
                const titleValueObject: TitleValueObject = new TitleValueObject(validValue);
                expect(titleValueObject.value).equal(validValue);
            });
        });
        it('test construct (negative).', function() {
            invalidValues.forEach((invalidValue: any) => {
                expect(() => new TitleValueObject(invalidValue)).to.throw(ValidationError);
            });
        });
        it('test equals.', function() {
            const titleValueObject0: TitleValueObject = new TitleValueObject(validValues[0]);
            const titleValueObject1: TitleValueObject = new TitleValueObject(validValues[0]);
            expect(titleValueObject0.equals(titleValueObject1)).to.be.true;
        });
        it('test equals (negative).', function() {
            const titleValueObject0: TitleValueObject = new TitleValueObject(validValues[0]);
            const titleValueObject1: TitleValueObject = new TitleValueObject(validValues[1]);
            expect(titleValueObject0.equals(titleValueObject1)).to.be.false;
        });
    });

