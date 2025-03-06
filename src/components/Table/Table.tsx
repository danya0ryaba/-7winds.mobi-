import { CurrentRowType } from '../../types/types';
import { Row } from '../Row/Row';

import style from './Table.module.scss';

type TableType = {
    rowsArray: CurrentRowType[]
}

export const Table: React.FC<TableType> = ({
    rowsArray,
}) => {

    const renderRows = (rows: CurrentRowType[], paddingLeft: number = 0) => {
        return rows.map((row) => (
            <span key={row.id} className={style.row}>
                <Row
                    {...row}
                    paddingLeft={paddingLeft}
                />
                {row.child && row.child.length > 0 && renderRows(row.child, paddingLeft + 20)}
            </span>
        ));
    };

    return (
        <div className={style.table}>
            {renderRows(rowsArray)}
        </div>
    );
}

// ФУНКЦИИ ДЛЯ РАБОТЫ С API ВЫНЕСТИ СЮДА, ЧТОБЫ НЕ СОЗДАВАТЬ КАЖДЫЙ РАЗ