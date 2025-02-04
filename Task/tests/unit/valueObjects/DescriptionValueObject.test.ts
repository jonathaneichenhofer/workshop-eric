import { describe, it } from "mocha";
import { expect } from "chai";
import { ValidationError } from "@codebricks/typebricks";
import { DescriptionValueObject } from "shared/domain/valueObjects/DescriptionValueObject";

const validValues: string[] = ['', ''];
const invalidValues = [''];

describe('DescriptionValueObject',
    /** @overwrite-protection-body false */
    async function() {
        it('test construct.', function() {
            validValues.forEach((validValue: string) => {
                const descriptionValueObject: DescriptionValueObject = new DescriptionValueObject(validValue);
                expect(descriptionValueObject.value).equal(validValue);
            });
        });
        it('test construct (negative).', function() {
            invalidValues.forEach((invalidValue: any) => {
                expect(() => new DescriptionValueObject(invalidValue)).to.throw(ValidationError);
            });
        });
        it('test equals.', function() {
            const descriptionValueObject0: DescriptionValueObject = new DescriptionValueObject(validValues[0]);
            const descriptionValueObject1: DescriptionValueObject = new DescriptionValueObject(validValues[0]);
            expect(descriptionValueObject0.equals(descriptionValueObject1)).to.be.true;
        });
        it('test equals (negative).', function() {
            const descriptionValueObject0: DescriptionValueObject = new DescriptionValueObject(validValues[0]);
            const descriptionValueObject1: DescriptionValueObject = new DescriptionValueObject(validValues[1]);
            expect(descriptionValueObject0.equals(descriptionValueObject1)).to.be.false;
        });
    });

