// (C) 2007-2019 GoodData Corporation
import * as React from "react";
import * as classNames from "classnames";
import { FormattedMessage, WrappedComponentProps, injectIntl } from "react-intl";
import noop = require("lodash/noop");

import { ASC, DESC } from "../../../constants/sort";
import { OnSortChangeWithDir, SortDir } from "../../../interfaces/Table";

export interface ITableSortBubbleContentProps {
    activeSortDir?: SortDir;
    onClose?: () => void;
    onSortChange?: OnSortChangeWithDir;
    title: string;
}

export class TableSortBubbleContentClass extends React.Component<
    ITableSortBubbleContentProps & WrappedComponentProps
> {
    public static defaultProps: Partial<ITableSortBubbleContentProps & WrappedComponentProps> = {
        activeSortDir: null,
        onClose: noop,
        onSortChange: noop,
    };

    private sortAsc: () => void;
    private sortDesc: () => void;

    constructor(props: ITableSortBubbleContentProps & WrappedComponentProps) {
        super(props);

        this.sortAsc = this.handleSort.bind(this, ASC);
        this.sortDesc = this.handleSort.bind(this, DESC);
    }

    public render(): JSX.Element {
        const { title, onClose } = this.props;

        return (
            <div>
                <button
                    className="close-button gd-button-link gd-button-icon-only icon-cross"
                    onClick={onClose}
                />
                <div className="gd-dialog-header gd-heading-3">{title}</div>
                <FormattedMessage id="visualizations.sorting" />
                <div className="buttons-wrap">
                    <div className="buttons">
                        {this.renderButton(ASC)}
                        {this.renderButton(DESC)}
                    </div>
                </div>
            </div>
        );
    }

    private renderButton(dir: SortDir): JSX.Element {
        const { activeSortDir } = this.props;
        const isDisabled = dir === activeSortDir;
        const buttonClasses = classNames(
            "gd-button",
            "gd-button-primary",
            "gd-button-small",
            "icon-dropdown",
            "icon-right",
            {
                "button-sort-asc": dir === ASC,
                "button-sort-desc": dir === DESC,
                disabled: isDisabled,
            },
        );

        const onClick: () => void = dir === ASC ? this.sortAsc : this.sortDesc;
        const msg: string = dir === ASC ? "visualizations.asc" : "visualizations.desc";

        return (
            <button onClick={onClick} disabled={isDisabled} className={buttonClasses}>
                <FormattedMessage id={msg} />
            </button>
        );
    }

    private handleSort(dir: SortDir, e: any): void {
        this.props.onSortChange(dir, e);
        this.props.onClose();
    }
}

export const TableSortBubbleContent = injectIntl(TableSortBubbleContentClass);
