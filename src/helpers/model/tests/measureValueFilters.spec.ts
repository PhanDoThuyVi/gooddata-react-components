// (C) 2019 GoodData Corporation
import { AFM } from "@gooddata/typings";
import { measureValueFilter } from "../measureValueFilters";
import * as Operator from "../../../constants/measureValueFilterOperators";
import { InvalidTypeGuardInputTestCases } from "./invalid_type_guard_mocks";

const comparisonValue = {
    value: 200,
};

const rangeValue = {
    from: 100,
    to: 300,
};

const afmComparisonFilter: AFM.IMeasureValueFilter = {
    measureValueFilter: {
        measure: {
            localIdentifier: "m1",
        },
        condition: {
            comparison: {
                operator: Operator.EQUAL_TO,
                value: 200,
            },
        },
    },
};

const afmRangeFilter: AFM.IMeasureValueFilter = {
    measureValueFilter: {
        measure: {
            localIdentifier: "m2",
        },
        condition: {
            range: {
                operator: Operator.BETWEEN,
                from: 100,
                to: 300,
            },
        },
    },
};

describe("measureValueFilters", () => {
    describe("getFilter", () => {
        it("should build comparison filter", () => {
            const comparisonFilter = measureValueFilter.getFilter("m1", Operator.EQUAL_TO, comparisonValue);
            expect(comparisonFilter).toStrictEqual(afmComparisonFilter);
        });
        it("should build range filter", () => {
            const rangeFilter = measureValueFilter.getFilter("m2", Operator.BETWEEN, rangeValue);
            expect(rangeFilter).toStrictEqual(afmRangeFilter);
        });
    });

    describe("isComparisonCondition", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidTypeGuardInputTestCases,
            [
                true,
                "comparison measure value filter condition",
                afmComparisonFilter.measureValueFilter.condition,
            ],
            [false, "range measure value filter condition", afmRangeFilter.measureValueFilter.condition],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(measureValueFilter.isComparisonCondition(input)).toBe(expectedResult);
        });
    });

    describe("isRangeCondition", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidTypeGuardInputTestCases,
            [
                false,
                "comparison measure value filter condition",
                afmComparisonFilter.measureValueFilter.condition,
            ],
            [true, "range measure value filter condition", afmRangeFilter.measureValueFilter.condition],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(measureValueFilter.isRangeCondition(input)).toBe(expectedResult);
        });
    });

    describe("isMeasureValueComparisonFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidTypeGuardInputTestCases,
            [true, "comparison measure value filter", afmComparisonFilter],
            [false, "range measure value filter", afmRangeFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(measureValueFilter.isMeasureValueComparisonFilter(input)).toBe(expectedResult);
        });
    });

    describe("isMeasureValueRangeFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidTypeGuardInputTestCases,
            [false, "comparison measure value filter", afmComparisonFilter],
            [true, "range measure value filter", afmRangeFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(measureValueFilter.isMeasureValueRangeFilter(input)).toBe(expectedResult);
        });
    });

    describe("getOperator", () => {
        it("should return operator of the comparison filter", () => {
            const operator = measureValueFilter.getOperator(afmComparisonFilter);
            expect(operator).toBe("EQUAL_TO");
        });
        it("should return operator of the range filter", () => {
            const operator = measureValueFilter.getOperator(afmRangeFilter);
            expect(operator).toBe("BETWEEN");
        });
        it("should return null if doesn't receive filter object", () => {
            const operator = measureValueFilter.getOperator(undefined);
            expect(operator).toBe(null);
        });
    });

    describe("getValue", () => {
        it("should return object with value key from comparison filter", () => {
            const value = measureValueFilter.getValue(afmComparisonFilter);
            expect(value).toEqual({ value: 200 });
        });
        it("should return object with from and to keys from range filter", () => {
            const value = measureValueFilter.getValue(afmRangeFilter);
            expect(value).toEqual({ from: 100, to: 300 });
        });
        it("should return null if doesn't receive filter object", () => {
            const value = measureValueFilter.getValue(undefined);
            expect(value).toBe(null);
        });
    });

    describe("isComparisonOperator", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidTypeGuardInputTestCases,
            [false, "ALL", Operator.ALL],
            [true, "GREATER_THAN", Operator.GREATER_THAN],
            [true, "GREATER_THAN_OR_EQUAL_TO", Operator.GREATER_THAN_OR_EQUAL_TO],
            [true, "LESS_THAN", Operator.LESS_THAN],
            [true, "LESS_THAN_OR_EQUAL_TO", Operator.LESS_THAN_OR_EQUAL_TO],
            [true, "EQUAL_TO", Operator.EQUAL_TO],
            [true, "NOT_EQUAL_TO", Operator.NOT_EQUAL_TO],
            [false, "BETWEEN", Operator.BETWEEN],
            [false, "NOT_BETWEEN", Operator.NOT_BETWEEN],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(measureValueFilter.isComparisonOperator(input)).toBe(expectedResult);
        });
    });

    describe("isRangeOperator", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidTypeGuardInputTestCases,
            [false, "ALL", Operator.ALL],
            [false, "GREATER_THAN", Operator.GREATER_THAN],
            [false, "GREATER_THAN_OR_EQUAL_TO", Operator.GREATER_THAN_OR_EQUAL_TO],
            [false, "LESS_THAN", Operator.LESS_THAN],
            [false, "LESS_THAN_OR_EQUAL_TO", Operator.LESS_THAN_OR_EQUAL_TO],
            [false, "EQUAL_TO", Operator.EQUAL_TO],
            [false, "NOT_EQUAL_TO", Operator.NOT_EQUAL_TO],
            [true, "BETWEEN", Operator.BETWEEN],
            [true, "NOT_BETWEEN", Operator.NOT_BETWEEN],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(measureValueFilter.isRangeOperator(input)).toBe(expectedResult);
        });
    });
});
