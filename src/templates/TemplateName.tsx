import React, { FC } from 'react';
import styles from './TemplateName.module.css';

interface TemplateNameProps {}

const TemplateName: FC<TemplateNameProps> = () => {
    return (
        <div data-testid="TemplateName" className='px-9 py-6'>
        </div>
    );
}

export default TemplateName;
