/** @eden-module */

import { AbstractChart, CommandResult } from "@eden/o-spreadsheet";
import { ChartDataSource } from "../data_source/chart_data_source";

/**
 * @typedef {import("@web/search/search_model").SearchParams} SearchParams
 *
 * @typedef MetaData
 * @property {Array<Object>} domains
 * @property {Array<string>} groupBy
 * @property {string} measure
 * @property {string} mode
 * @property {string} [order]
 * @property {string} resModel
 * @property {boolean} stacked
 *
 * @typedef EdenChartDefinition
 * @property {string} type
 * @property {MetaData} metaData
 * @property {SearchParams} searchParams
 * @property {string} title
 * @property {string} background
 * @property {string} legendPosition
 * @property {boolean} cumulative
 *
 * @typedef EdenChartDefinitionDataSource
 * @property {MetaData} metaData
 * @property {SearchParams} searchParams
 *
 */

export class EdenChart extends AbstractChart {
    /**
     * @param {EdenChartDefinition} definition
     * @param {string} sheetId
     * @param {Object} getters
     */
    constructor(definition, sheetId, getters) {
        super(definition, sheetId, getters);
        this.type = definition.type;
        this.metaData = {
            ...definition.metaData,
            mode: this.type.replace("eden_", ""),
            cumulated: definition.cumulative,
            // if a chart is cumulated, the first data point should take into
            // account past data, even if a domain on a specific period is applied
            cumulatedStart: definition.cumulative,
        };
        this.searchParams = definition.searchParams;
        this.legendPosition = definition.legendPosition;
        this.background = definition.background;
        this.dataSource = undefined;
        this.actionXmlId = definition.actionXmlId;
        this.showValues = definition.showValues;
    }

    static transformDefinition(definition) {
        return definition;
    }

    static validateChartDefinition(validator, definition) {
        return CommandResult.Success;
    }

    static getDefinitionFromContextCreation() {
        throw new Error("It's not possible to convert an Eden chart to a native chart");
    }

    /**
     * @returns {EdenChartDefinitionDataSource}
     */
    getDefinitionForDataSource() {
        return {
            metaData: this.metaData,
            searchParams: this.searchParams,
        };
    }

    /**
     * @returns {EdenChartDefinition}
     */
    getDefinition() {
        return {
            //@ts-ignore Defined in the parent class
            title: this.title,
            background: this.background,
            legendPosition: this.legendPosition,
            metaData: this.metaData,
            searchParams: this.searchParams,
            type: this.type,
            actionXmlId: this.actionXmlId,
            showValues: this.showValues,
        };
    }

    getDefinitionForExcel() {
        // Export not supported
        return undefined;
    }

    /**
     * @returns {EdenChart}
     */
    updateRanges() {
        // No range on this graph
        return this;
    }

    /**
     * @returns {EdenChart}
     */
    copyForSheetId() {
        return this;
    }

    /**
     * @returns {EdenChart}
     */
    copyInSheetId() {
        return this;
    }

    getContextCreation() {
        return {};
    }

    getSheetIdsUsedInChartRanges() {
        return [];
    }

    setDataSource(dataSource) {
        if (dataSource instanceof ChartDataSource) {
            this.dataSource = dataSource;
        } else {
            throw new Error("Only ChartDataSources can be added.");
        }
    }
}
