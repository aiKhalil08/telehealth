import React, { FC } from 'react';
import styles from './Widget.module.css';

interface WidgetProps {
    classes?: string,
    children: React.ReactNode
}

const Widget: FC<WidgetProps> = ({classes = '', children}) => {
    return (
        <div data-testid="Widget" className={`rounded-xl bg-white border border-grey-200 ${classes}`}>
            {children}
        </div>
    );
}

export default Widget;
